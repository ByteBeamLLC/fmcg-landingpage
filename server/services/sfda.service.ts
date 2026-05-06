/**
 * SFDA Tools service
 *
 * Server-side processing for the three SFDA regulatory tools — adapted from
 * the pharma-tools (READ ONLY) implementation. The prompts mirror the
 * authoritative pipeline; the heavyweight regulatory-PDF caching is
 * intentionally omitted so this preview can run on Vercel's stateless
 * serverless functions without bundling ~1.6MB of guidance PDFs.
 */

// Lazy-loaded inside extractFileText so the function cold-start doesn't pay
// the cost of loading these (and so a parser-load failure doesn't take the
// whole API down on import).
type PdfParseModule = (buf: Buffer) => Promise<{ text: string }>;
type MammothModule = {
  extractRawText: (opts: { buffer: Buffer }) => Promise<{ value: string }>;
};

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
// Pharma-grade prompts need a strong model; Gemini 2.5 Pro mirrors pharma-tools.
const SFDA_MODEL =
  process.env.OPENROUTER_SFDA_MODEL || "google/gemini-2.5-pro";

export interface SfdaUploadedFile {
  inputId: string;
  fileName: string;
  mimeType: string;
  base64: string;
}

export interface SfdaToolResult {
  markdown: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: { role: string; content: string };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export function isOpenRouterConfigured(): boolean {
  return !!OPENROUTER_API_KEY;
}

async function callOpenRouter(
  messages: ChatMessage[],
  options: { maxTokens?: number; temperature?: number; model?: string } = {}
): Promise<SfdaToolResult> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured on the server");
  }
  const model = options.model || SFDA_MODEL;
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://bytebeam.co",
      "X-Title": "ByteBeam SFDA Tools",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: options.maxTokens ?? 12000,
      temperature: options.temperature ?? 0.25,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message ||
        `OpenRouter API error: ${response.status} ${response.statusText}`
    );
  }
  const data: OpenRouterResponse = await response.json();
  return {
    markdown: data.choices[0]?.message?.content || "",
    model,
    usage: data.usage
      ? {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
          totalTokens: data.usage.total_tokens,
        }
      : undefined,
  };
}

async function extractFileText(file: SfdaUploadedFile): Promise<string> {
  const buffer = Buffer.from(file.base64, "base64");
  const mt = file.mimeType || "";
  if (mt === "application/pdf" || file.fileName.toLowerCase().endsWith(".pdf")) {
    try {
      // pdf-parse v1's index.js has a debug-mode side effect that reads a
      // test PDF from disk on import — fails inside a Vercel function.
      // Skip the entry point by loading the inner lib module directly.
      // @ts-expect-error - pdf-parse has no types for the inner lib path
      const mod = (await import("pdf-parse/lib/pdf-parse.js")) as
        | { default: PdfParseModule }
        | PdfParseModule;
      const pdfParse = (typeof mod === "function" ? mod : mod.default) as PdfParseModule;
      const data = await pdfParse(buffer);
      return data.text || "";
    } catch (err) {
      return `[Could not extract PDF text: ${err instanceof Error ? err.message : String(err)}]`;
    }
  }
  if (
    mt.includes("wordprocessingml") ||
    file.fileName.toLowerCase().endsWith(".docx")
  ) {
    try {
      const mammothMod = (await import("mammoth")) as { default: MammothModule } | MammothModule;
      const mammoth = ("extractRawText" in mammothMod
        ? mammothMod
        : mammothMod.default) as MammothModule;
      const result = await mammoth.extractRawText({ buffer });
      return result.value || "";
    } catch (err) {
      return `[Could not extract DOCX text: ${err instanceof Error ? err.message : String(err)}]`;
    }
  }
  // Fallback for txt/csv/etc.
  try {
    return buffer.toString("utf-8").slice(0, 200_000);
  } catch {
    return "[Unsupported file type]";
  }
}

async function extractAllInputs(
  files: SfdaUploadedFile[]
): Promise<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const file of files) {
    out[file.inputId] = await extractFileText(file);
  }
  return out;
}

// ─────────────────────────────────────────────────────────────────────────
// Tool 1 — SmPC & PIL Generator
// ─────────────────────────────────────────────────────────────────────────

export async function generateSpcPil(
  files: SfdaUploadedFile[]
): Promise<SfdaToolResult> {
  const inputs = await extractAllInputs(files);
  const systemMessage: ChatMessage = {
    role: "system",
    content:
      "You are a senior pharmaceutical regulatory affairs specialist creating SmPC and PIL drafts for SFDA Module 1.3 submission. Output ONLY the requested document content as clean markdown — no preamble, no commentary.",
  };
  const prompt = `TASK: From the originator pack and new-product data below, produce two draft documents in this exact order:

1. **English Summary of Product Characteristics (SmPC)** — GCC/SFDA structure (sections 1–9, including the standard sub-sections of 4.x, with MedDRA SOC headings in 4.8).
2. **English Patient Information Leaflet (PIL)** — SFDA 6-section format (Section 1: What is X / what it is used for; Section 2: What you need to know before; Section 3: How to take; Section 4: Possible side effects organised by frequency band; Section 5: How to store; Section 6: Further information including MAH and Manufacturer).

CRITICAL RULES:
- Copy clinical content from the originator without altering medical claims; substitute proprietary fields (brand, MAH, manufacturer, excipients, pack sizes, storage) with the new-product data.
- Include SFDA pharmacovigilance reporting block in SmPC §4.8 and PIL §4 (NPC, SFDA Call Center 19999, npc.drug@sfda.gov.sa, https://ade.sfda.gov.sa/).
- Use standard frequency categories in PIL (Very common ≥1/10, Common ≥1/100, Uncommon ≥1/1000, Rare ≥1/10000, Very rare <1/10000, Not known); SmPC uses MedDRA SOC.
- Mark unresolved fields as **[CONFIRM: …]** rather than inventing values.
- Output as clean markdown with clear headings (##, ###) and bullet lists. Each document begins with a level-1 heading: "# Summary of Product Characteristics" and "# Patient Information Leaflet" respectively, separated by a horizontal rule (---).

═══════════════════════════════════════════
ORIGINATOR SmPC:
═══════════════════════════════════════════
${inputs.originator_smpc || "[Not provided]"}

═══════════════════════════════════════════
ORIGINATOR PIL:
═══════════════════════════════════════════
${inputs.originator_pil || "[Not provided]"}

═══════════════════════════════════════════
NEW PRODUCT DATA:
═══════════════════════════════════════════
${inputs.product_data || "[Not provided]"}

${inputs.stability_study ? `═══════════════════════════════════════════\nSTABILITY STUDY:\n═══════════════════════════════════════════\n${inputs.stability_study}\n` : ""}

OUTPUT INSTRUCTIONS: Begin directly with "# Summary of Product Characteristics" — no preamble.`;

  return callOpenRouter([systemMessage, { role: "user", content: prompt }], {
    temperature: 0.25,
    maxTokens: 14000,
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Tool 2 — Arabic SmPC & PIL Translator
// ─────────────────────────────────────────────────────────────────────────

export async function translateSpcPilToArabic(
  files: SfdaUploadedFile[]
): Promise<SfdaToolResult> {
  const inputs = await extractAllInputs(files);
  const systemMessage: ChatMessage = {
    role: "system",
    content:
      "You are an expert pharmaceutical regulatory translator producing SFDA-compliant Arabic SmPC and PIL drafts. Output ONLY the translated documents as clean markdown — no preamble, no commentary.",
  };
  const prompt = `TASK: Translate the English SmPC and PIL below into Modern Standard Arabic (MSA) for SFDA submission. Preserve section structure; use SFDA-recognised regulatory phrasing, not literal/automated translation.

CRITICAL TRANSLATION RULES (SFDA market conventions):

A. ALWAYS TRANSLITERATE (phonetic Arabic):
- INN/generic drug names (e.g., paracetamol → باراسيتامول)
- Brand/trade names — bold throughout, drop ®/™
- Chemical/pharmaceutical excipient names (hypromellose → هايبروميلوز)
- Proper-noun parts of syndrome/disease names

B. ALWAYS TRANSLATE (proper Arabic):
- Anatomical terms (liver → الكبد), common diseases (epilepsy → الصرع, diabetes → السكري)
- ALL symptom/side-effect descriptions (headache → صداع, nausea → غثيان, diarrhoea → إسهال)
- Drug class names (proton pump inhibitors → مثبطات مضخة البروتون, NSAIDs → مضادات الالتهاب غير الستيرويدية)

C. FORMATTING:
- Western Arabic numerals (1,2,3) consistently — not Eastern (١,٢,٣)
- EXP, email addresses, URLs, E-numbers stay in Latin script
- PIL Section 6 sub-sections use Arabic letter sequence (أ، ب، ت، ث) not (a, b, c, d)
- Patient addressed in masculine by default; feminine only in pregnancy/breastfeeding sections
- Include SFDA pharmacovigilance contact in Arabic PIL Section 4 + SmPC §4.8
- Frequency categories use the standard Arabic regulatory wording

OUTPUT FORMAT:
- Two markdown documents separated by a horizontal rule (---)
- Document 1: "# ملخص خصائص المنتج (Arabic SmPC)"
- Document 2: "# نشرة معلومات المريض (Arabic PIL)"

═══════════════════════════════════════════
ENGLISH SmPC:
═══════════════════════════════════════════
${inputs.english_smpc || "[Not provided]"}

═══════════════════════════════════════════
ENGLISH PIL:
═══════════════════════════════════════════
${inputs.english_pil || "[Not provided]"}

OUTPUT INSTRUCTIONS: Begin directly with "# ملخص خصائص المنتج (Arabic SmPC)" — no preamble.`;

  return callOpenRouter([systemMessage, { role: "user", content: prompt }], {
    temperature: 0.2,
    maxTokens: 14000,
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Tool 3 — Dossier Gap Analysis
// ─────────────────────────────────────────────────────────────────────────

export async function runDossierGapAnalysis(
  files: SfdaUploadedFile[]
): Promise<SfdaToolResult> {
  const inputs = await extractAllInputs(files);
  const systemMessage: ChatMessage = {
    role: "system",
    content:
      "You are a senior pharmaceutical regulatory reviewer conducting an SFDA Module 1.3 alignment review. Output ONLY the requested gap-analysis report as clean markdown — no preamble, no commentary.",
  };
  const prompt = `TASK: Perform a structured gap analysis across the three documents (English PIL, Arabic PIL, English SmPC) against SFDA Module 1.3 expectations and GCC labelling guidance. Score every checklist item as ✅ PASS, ❌ FAIL, or ⚠️ WARNING with a one-line justification.

CHECKLIST (number each item, status on its own line, blank line between items):

A. Content alignment (PIL EN ↔ SmPC EN)
1. Therapeutic indications match
2. Contraindications match (PIL §2 ↔ SmPC §4.3)
3. Warnings and precautions match (PIL §2 ↔ SmPC §4.4)
4. Drug interactions match (PIL ↔ SmPC §4.5)
5. Pregnancy / lactation match (PIL ↔ SmPC §4.6)
6. Driving / machines match (PIL ↔ SmPC §4.7)
7. Side-effect set is complete and consistent (PIL §4 ↔ SmPC §4.8)
8. Overdose information matches (PIL ↔ SmPC §4.9)
9. Dosage matches (PIL §3 ↔ SmPC §4.2)
10. Storage matches (PIL §5 ↔ SmPC §6.4)

B. Translation completeness (PIL EN ↔ PIL AR)
11. All 6 PIL sections present in Arabic
12. No missing subsections or content blocks
13. Side-effect list complete in Arabic
14. All warnings / contraindications translated
15. Council of Arab Health Ministers statement present in Arabic with correct attribution
16. SFDA pharmacovigilance contact info present in Arabic
17. Translation reads as professional regulatory Arabic, not literal/automated

B2. Arabic terminology compliance (SFDA market conventions)
18. INN/generic names transliterated (e.g., باراسيتامول)
19. Brand name transliterated and bolded; never left in Latin script in Arabic body
20. Symptom and disease descriptions use proper Arabic medical terms
21. Drug class names translated (e.g., مثبطات مضخة البروتون)
22. Chemical excipient names transliterated
23. Patient addressed in masculine by default; feminine only in pregnancy/breastfeeding sections
24. Western Arabic numerals (1,2,3) used consistently
25. EXP / email / URLs / E-numbers remain in Latin script
26. Section 6 sub-sections use Arabic letter sequence (أ، ب، ت، ث)

C. Proprietary information redaction
27. No originator trade name remains
28. No originator MAH / manufacturer remains
29. No originator-specific identifiers remain

D. New drug data substitution
30. New brand name used throughout
31. New MAH name and address in PIL §6 + SmPC §7
32. New manufacturer name and address in PIL §6
33. New excipients list in PIL §6 + SmPC §6.1
34. New pack sizes in PIL §6 + SmPC §6.5
35. Product physical description in PIL §6 + SmPC §3

E. Regulatory compliance
36. SFDA pharmacovigilance block in PIL (NPC, 19999, npc.drug@sfda.gov.sa, ade.sfda.gov.sa)
37. SFDA pharmacovigilance block in SmPC §4.8
38. PIL follows SFDA 6-section format
39. SmPC follows GCC sections 1–9
40. SmPC §4.8 includes mandatory sub-sections (a. summary, b. tabulated by MedDRA SOC, c. selected reactions, d. paediatric)
41. Frequency categories use standard cutoffs (Very common ≥1/10 … Not known)
42. PIL does NOT use MedDRA SOC headings (SOC is SmPC-only)

OUTPUT FORMAT — IMPORTANT RENDERING RULES:
- Markdown only: headings (#, ##, ###), **bold**, bullets. NO tables, NO code blocks, NO JSON.
- Each checklist item on its own line, status on the next line, blank line between items.
- Use horizontal rules (---) between sections.

OVERALL STRUCTURE:

# SFDA Dossier Gap Analysis Report

## Executive Summary
**Overall Status:** APPROVED / REQUIRES REVISION
**Counts:** X PASS, X FAIL, X WARNING
**Critical issues:** [list each FAIL briefly, or "None"]

---

## A. Content Alignment (PIL EN ↔ SmPC EN)
[items 1–10]

---

## B. Translation Completeness (PIL EN ↔ PIL AR)
[items 11–17]

---

## B2. Arabic Terminology Compliance
[items 18–26]

---

## C. Proprietary Redaction
[items 27–29]

---

## D. New Drug Data Substitution
[items 30–35]

---

## E. Regulatory Compliance
[items 36–42]

---

## Recommendations
**Critical (must fix before submission):**
1. …

**Important:**
1. …

**Minor:**
1. …

═══════════════════════════════════════════
DOCUMENTS TO REVIEW:
═══════════════════════════════════════════

ENGLISH PIL:
${inputs.english_pil || "[Not provided]"}

ARABIC PIL:
${inputs.arabic_pil || "[Not provided]"}

ENGLISH SmPC:
${inputs.english_smpc || "[Not provided]"}

NEW DRUG DATA:
${inputs.product_data || "[Not provided]"}

OUTPUT INSTRUCTIONS: Begin directly with "# SFDA Dossier Gap Analysis Report" — no preamble.`;

  return callOpenRouter([systemMessage, { role: "user", content: prompt }], {
    temperature: 0.2,
    maxTokens: 14000,
  });
}
