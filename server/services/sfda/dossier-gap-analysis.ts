/**
 * Dossier Gap Analysis — verbatim port of pharma-tools/app/api/tools/gap-analysis/route.ts.
 *
 * Adapted only for the framework boundary (no Supabase auth, no tool_jobs
 * tracking). Prompts and orchestration are unchanged.
 */

import { generateText, type Message } from "../../lib/openrouter.js";
import {
  extractTextFromPdf,
  base64ToBuffer,
} from "../../lib/document/pdf-parser.js";
import { extractTextFromDocx } from "../../lib/document/docx-parser.js";
import { getFullTemplate, getFullGuidance } from "../../lib/guidelines/index.js";
import type { SfdaUploadedFile, SfdaToolResult } from "./types.js";

interface RunGapAnalysisOptions {
  storageConditions?: string;
}

export async function runDossierGapAnalysis(
  files: SfdaUploadedFile[],
  options: RunGapAnalysisOptions = {}
): Promise<SfdaToolResult> {
  const storageConditions = options.storageConditions;

  // Extract text from all uploaded documents
  const inputTexts: Record<string, string> = {};
  for (const file of files) {
    const buffer = base64ToBuffer(file.base64);
    if (file.mimeType === "application/pdf") {
      inputTexts[file.inputId] = await extractTextFromPdf(buffer);
    } else if (file.mimeType.includes("wordprocessingml")) {
      inputTexts[file.inputId] = await extractTextFromDocx(buffer);
    } else if (file.mimeType.startsWith("image/")) {
      inputTexts[file.inputId] =
        `[Image file: ${file.fileName}. Base64 content provided separately.]`;
    }
  }

  // Build image content parts for any image files (new drug data)
  const imageContentParts: Array<{ type: "image_url"; image_url: { url: string } }> = [];
  for (const file of files) {
    if (file.mimeType.startsWith("image/")) {
      imageContentParts.push({
        type: "image_url",
        image_url: { url: `data:${file.mimeType};base64,${file.base64}` },
      });
    }
  }

  // Map fmcg input IDs to pharma-tools internal naming
  const pil_english = inputTexts.english_pil || inputTexts.pil_english || "";
  const pil_arabic = inputTexts.arabic_pil || inputTexts.pil_arabic || "";
  const spc_english = inputTexts.english_smpc || inputTexts.spc_english || "";
  const new_drug_data = inputTexts.product_data || inputTexts.new_drug_data || "";

  // Load full regulatory reference documents
  const [templateText, guidanceText] = await Promise.all([
    getFullTemplate(),
    getFullGuidance(),
  ]);

  const storageConditionsFinal = storageConditions || "[Not provided]";

  const analysisPrompt = `You are a senior pharmaceutical regulatory reviewer conducting a compliance review of newly created PIL and SPC documents for a generic drug registered with SFDA.

TASK: Perform a comprehensive alignment review and gap analysis across the three generated documents (PIL English, PIL Arabic, SPC English). You MUST verify compliance against the two authoritative regulatory documents provided below — the SFDA Template V1.3 and GCC Guidance V3.1. These are your primary reference standards for this review.

═══════════════════════════════════════════
REGULATORY REFERENCE STANDARDS:
═══════════════════════════════════════════
SFDA TEMPLATE V1.3 — The official template defining exact section structure, headings, mandatory statements (Council of Arab Health Ministers, SFDA approval), formatting rules, and appendices (Appendix 1: Pregnancy statements, Appendix 2: Lactation statements, Appendix 4: Storage labeling statements). Use this to verify structural compliance, exact wording of mandatory text, and correct Arabic headings/content:
${templateText}

GCC GUIDANCE V3.1 — The official guidance with detailed rules for each SPC and PIL section, adverse reaction formatting (MedDRA SOC, frequency categories with exact cutoffs), section 4.8 mandatory sub-sections (a-e), cross-referencing rules, and content requirements. Use this to verify clinical content organization, frequency categorization, and section-specific rules:
${guidanceText}

═══════════════════════════════════════════
REVIEW CHECKLIST — Evaluate each item as: ✅ PASS | ❌ FAIL | ⚠️ WARNING
═══════════════════════════════════════════

**A. CONTENT ALIGNMENT (PIL EN ↔ SPC EN)**
These documents must contain identical medical information (different structure is expected, but content must align 100%):

1. Therapeutic indications — same indications in both documents
2. Contraindications — all contraindications in PIL match SPC section 4.3
3. Warnings and precautions — PIL section 2 warnings match SPC section 4.4
4. Drug interactions — PIL interactions match SPC section 4.5
5. Pregnancy/lactation — PIL matches SPC section 4.6
6. Driving/machines — PIL matches SPC section 4.7
7. Side effects — all adverse reactions in PIL match SPC section 4.8
8. Overdose — PIL overdose information matches SPC section 4.9
9. Dosage and administration — PIL section 3 matches SPC section 4.2
10. Storage conditions — PIL section 5 matches SPC section 6.4

**B. TRANSLATION COMPLETENESS AND QUALITY (PIL EN ↔ PIL AR)**
11. All 6 sections present in Arabic PIL
12. No missing subsections or content blocks
13. Side effects list complete — every side effect in English appears in Arabic
14. All warnings and contraindications translated completely
15. Council of Arab Health Ministers statement present in Arabic with correct EXACT wording from Template V1.3
16. SFDA pharmacovigilance contact info present in Arabic
17. Translation is contextual and professional — NOT literal/automated translation

**B2. ARABIC TERMINOLOGY COMPLIANCE (per SFDA market conventions)**
These rules reflect how translations are done across all SFDA-approved leaflets in the Saudi market:
18. INN/generic drug names are TRANSLITERATED (phonetic Arabic), never translated descriptively (e.g., paracetamol → باراسيتامول, NOT a descriptive Arabic term)
19. Brand name is TRANSLITERATED into Arabic script and bolded throughout — never left in Latin script in Arabic body text, (R)/(TM) symbols dropped
20. Disease names, symptoms, and side effects use proper Arabic medical terms (e.g., headache → صداع, nausea → غثيان, diarrhoea → إسهال, epilepsy → الصرع, diabetes → السكري) — NOT transliterated
21. Drug class names are TRANSLATED to Arabic (e.g., proton pump inhibitors → مثبطات مضخة البروتون, alpha-blockers → حاصرات ألفا, NSAIDs → مضادات الالتهاب غير الستيرويدية) — NOT transliterated
22. Excipient names: chemical/pharmaceutical names transliterated (e.g., hypromellose → هايبروميلوز), common materials translated (e.g., starch → نشا, castor oil → زيت الخروع)
23. Technical medical terms include parenthetical lay Arabic explanations where appropriate (e.g., neutropenia → قلّة العدلات (انخفاض عدد كريات الدم البيضاء))
24. Patient addressed in masculine by default, feminine ONLY in pregnancy/breastfeeding sections
25. Numbers use Western Arabic numerals (1,2,3) consistently, not Eastern (١,٢,٣)
26. EXP, email addresses, URLs, and E-numbers remain in Latin script
27. Section 6 sub-sections use Arabic letter sequence (أ، ب، ت، ث) not Latin (a, b, c, d)
28. No incorrectly connected or disconnected Arabic words (word connection quality check)

**C. STORAGE CONDITION ALIGNMENT**
29. PIL EN storage condition matches: ${storageConditionsFinal}
30. PIL AR storage condition matches: ${storageConditionsFinal}
31. SPC section 6.4 matches: ${storageConditionsFinal}

**D. PROPRIETARY INFORMATION REDACTION**
32. No originator trade name remaining in any document
33. No originator MAH name/address remaining in any document
34. No originator manufacturer name/address remaining in any document
35. No originator-specific identifiers, logos, or references remaining

**E. NEW DRUG DATA SUBSTITUTION**
36. New brand name correctly used throughout all documents
37. New MAH name and address in PIL section 6 and SPC section 7
38. New manufacturer name and address in PIL section 6
39. New excipients list in PIL section 6 and SPC section 6.1
40. New pack sizes in PIL section 6 and SPC section 6.5
41. Product physical description in PIL section 6 and SPC section 3

**F. REGULATORY COMPLIANCE**
42. SFDA pharmacovigilance reporting info present in PIL (NPC, 19999, npc.drug@sfda.gov.sa, https://ade.sfda.gov.sa/)
43. SFDA pharmacovigilance reporting info present in SPC section 4.8
44. New drug's own pharmacovigilance contacts included
45. Council of Arab Health Ministers statement in PIL (English and Arabic) with attribution lines (Council + Union of Arab Pharmacists)
46. PIL section structure follows SFDA 6-section format
47. SPC section structure follows GCC format (sections 1-9, per GCC Guidance v3.1)
48. SPC section 4.8 includes all mandatory sub-sections (a. Summary, b. Tabulated adverse reactions by MedDRA SOC, c. Selected adverse reactions, d. Paediatric population)
49. No medical claims altered from originator
50. Side effect frequency categories use standard terms (Very common ≥1/10, Common ≥1/100, Uncommon ≥1/1000, Rare ≥1/10000, Very rare <1/10000, Not known)
51. PIL does NOT use MedDRA SOC headings (SOC is for SPC only)
52. SFDA approval statement present in both English and Arabic PIL

═══════════════════════════════════════════
OUTPUT FORMAT — IMPORTANT RENDERING RULES:
═══════════════════════════════════════════
This report will be read directly by a Regulatory Affairs expert. It MUST be easy to scan and read.

CRITICAL FORMATTING RULES:
- Do NOT use markdown tables (they do not render in this viewer)
- Do NOT output JSON, code blocks, or structured data
- Use markdown headings (#, ##, ###), bold (**text**), and bullet points
- Each checklist item MUST be on its own line, clearly separated
- Put a blank line between every checklist item for readability
- Use horizontal rules (---) to separate major sections

FORMAT EACH CHECKLIST ITEM EXACTLY LIKE THIS (one item per block, blank line between items):

**1. Therapeutic indications match**
✅ PASS — Indications are aligned. PIL uses appropriate lay terminology for the patient audience.

**2. Contraindications match**
❌ FAIL — The SPC lists "Agranulocytosis" as a Very rare adverse reaction in section 4.8, but this is missing from the PIL section 4 side effects list.

**3. Warnings and precautions match**
⚠️ WARNING — PIL section 2 covers the key warnings but uses simplified language compared to SPC section 4.4. Verify this is acceptable.

USE THIS OVERALL STRUCTURE:

# Alignment Review Report

## Executive Summary

**Overall Status:** APPROVED / REQUIRES REVISION

**Total:** X PASS, X FAIL, X WARNING

**Critical Issues Requiring Immediate Attention:**
- [list each FAIL item briefly, or "None"]

---

## A. Content Alignment (PIL EN ↔ SPC EN)

[Each item as shown above, numbered, with status and finding on separate lines, blank line between items]

---

## B. Translation Completeness (PIL EN ↔ PIL AR)

[Each item as shown above]

---

## B2. Arabic Terminology Compliance

[Each item as shown above]

---

## C. Storage Condition Alignment

[Each item as shown above]

---

## D. Proprietary Information Redaction

[Each item as shown above]

---

## E. New Drug Data Substitution

[Each item as shown above]

---

## F. Regulatory Compliance

[Each item as shown above]

---

## Recommendations

List specific corrections needed, numbered and grouped:

**Critical (must fix before submission):**
1. [correction]

**Important (should fix):**
1. [correction]

**Minor (optional improvements):**
1. [correction]

═══════════════════════════════════════════
DOCUMENTS TO REVIEW:
═══════════════════════════════════════════

PIL ENGLISH:
${pil_english || "[Not provided]"}

PIL ARABIC:
${pil_arabic || "[Not provided]"}

SPC ENGLISH:
${spc_english || "[Not provided]"}

NEW DRUG DATA:
${new_drug_data || "[Not provided]"}

RESOLVED STORAGE CONDITIONS:
${storageConditionsFinal}`;

  const systemMessage: Message = {
    role: "system",
    content:
      "You are a senior pharmaceutical regulatory reviewer. Output ONLY the requested alignment review report. Do not include any preamble, introduction, commentary, acknowledgment, or explanation before the report. Start directly with the report content.",
  };

  // Build message content - include images if any new drug data images were uploaded
  const userContent: Array<
    | { type: "text"; text: string }
    | { type: "image_url"; image_url: { url: string } }
  > = [{ type: "text", text: analysisPrompt }, ...imageContentParts];

  const userMessage: Message = {
    role: "user",
    content: imageContentParts.length > 0 ? userContent : analysisPrompt,
  };

  const { text: report } = await generateText({
    messages: [systemMessage, userMessage],
    temperature: 0.2,
    maxTokens: 16000,
  });

  return {
    markdown: report,
    model:
      process.env.OPENROUTER_SFDA_MODEL ||
      process.env.OPENROUTER_MODEL ||
      "google/gemini-2.5-pro",
  };
}
