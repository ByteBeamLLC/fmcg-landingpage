/**
 * SmPC & PIL Generator — verbatim port of pharma-tools/app/api/tools/pil-spc-generation/route.ts.
 *
 * Adapted only for the framework boundary: removed Supabase auth + tool_jobs
 * tracking, returns combined markdown for the client. Prompts and orchestration
 * are unchanged — this is the IP that drives output quality.
 */

import { generateText } from "../../lib/openrouter.js";
import {
  extractTextFromPdf,
  base64ToBuffer,
} from "../../lib/document/pdf-parser.js";
import {
  prepareImageForVision,
  isImageMimeType,
} from "../../lib/document/image-processor.js";
import { getPilGuidelines, getSpcGuidelines } from "../../lib/guidelines/index.js";
import type { SfdaUploadedFile, SfdaToolResult } from "./types.js";

export async function generateSpcPil(
  files: SfdaUploadedFile[]
): Promise<SfdaToolResult> {
  // Extract text from each input
  const inputTexts: Record<string, string> = {};
  for (const file of files) {
    const buffer = base64ToBuffer(file.base64);
    if (file.mimeType === "application/pdf") {
      inputTexts[file.inputId] = await extractTextFromPdf(buffer);
    } else if (isImageMimeType(file.mimeType)) {
      inputTexts[file.inputId] = prepareImageForVision(file.base64, file.mimeType);
    } else if (file.mimeType.includes("wordprocessingml")) {
      const { extractTextFromDocx } = await import("../../lib/document/docx-parser.js");
      inputTexts[file.inputId] = await extractTextFromDocx(buffer);
    }
  }

  // Map fmcg input IDs to pharma-tools' internal names
  const originator_pil =
    inputTexts.originator_pil || inputTexts.originator_pil || "";
  const originator_spc = inputTexts.originator_smpc || inputTexts.originator_spc || "";
  const new_drug_data = inputTexts.product_data || inputTexts.new_drug_data || "";
  const stability_study = inputTexts.stability_study || "";

  // Load focused regulatory guideline sections (cached after first load)
  const [pilGuidelines, spcGuidelines] = await Promise.all([
    getPilGuidelines(),
    getSpcGuidelines(),
  ]);

  // Step 1: Extract new drug data + resolve storage conditions
  const extractionPrompt = `You are a pharmaceutical regulatory specialist. Analyze the following documents and extract ALL information needed to create a generic drug PIL and SPC.

ORIGINATOR PIL:
${originator_pil || "[Not provided]"}

ORIGINATOR SPC:
${originator_spc || "[Not provided]"}

NEW DRUG DATA:
${new_drug_data || "[Not provided]"}

${stability_study ? `STABILITY STUDY:\n${stability_study}` : ""}

Extract and return in clearly labeled sections:

1. ORIGINATOR DRUG INFO:
   - Trade name, generic/INN name, active ingredients, dosage form, strength
   - MAH name and address
   - Manufacturer name and address

2. NEW DRUG INFO:
   - Brand name, generic/INN name, active ingredient(s), dosage form, strength
   - Full excipients list
   - MAH name and full address
   - Manufacturer name and full address
   - Pharmacovigilance contacts (email, phone, etc.)
   - All pack sizes
   - Product physical description/appearance

3. RESOLVED STORAGE CONDITIONS:
   - If a stability study is provided, derive the storage conditions from the stability data
   - If no stability study, use the originator's storage conditions
   - Express in standard pharmaceutical format (e.g., "Store below 30°C", "Do not store above 25°C", etc.)

Return all extracted information clearly and completely. Do not omit any data points.`;

  const systemMessage = {
    role: "system" as const,
    content:
      "You are a pharmaceutical regulatory document generator. Output ONLY the requested document content. Do not include any preamble, introduction, commentary, acknowledgment, or explanation before or after the document. Start directly with the document content.",
  };

  const { text: extractedData } = await generateText({
    messages: [systemMessage, { role: "user", content: extractionPrompt }],
    temperature: 0.1,
  });

  // Parse storage conditions from extracted data for use in PIL prompt
  const storageConditionsMatch = extractedData.match(
    /RESOLVED STORAGE CONDITIONS[:\s]*([\s\S]*?)(?=\n\n|\n[A-Z]|$)/i
  );
  const storageConditionsFinal = storageConditionsMatch
    ? storageConditionsMatch[1].trim()
    : "Store below 30°C. Do not refrigerate or freeze.";

  // Step 2: Generate English PIL using the comprehensive SFDA/GCC prompt
  const pilPrompt = `You are a senior pharmaceutical regulatory affairs specialist creating a Patient Information Leaflet (PIL) for a new generic drug to be registered with SFDA (Saudi Food and Drug Authority).

  TASK: Create a complete English PIL for the new generic drug by adapting the originator's PIL content, following SFDA/GCC PIL format.

  ═══════════════════════════════════════════
  CRITICAL RULES (from regulatory process):
  ═══════════════════════════════════════════
  1. COPY-PASTE medical content from the originator PIL — do NOT alter, rephrase, or add any medical claims. A generic drug relies on the originator's clinical evidence.
  2. COMPLETELY REDACT all originator proprietary information:
     - Remove the originator's trade name (replace with the new drug's brand name)
     - Remove the originator's MAH name and address
     - Remove the originator's manufacturer name and address
     - Remove any originator-specific identifiers, logos, or references
  3. SUBSTITUTE with new drug data:
     - New brand name: from the NEW DRUG DATA below
     - New MAH: from the NEW DRUG DATA below
     - New manufacturer: from the NEW DRUG DATA below
     - New excipients: from the NEW DRUG DATA below
     - New pack sizes: from the NEW DRUG DATA below
     - New product description (appearance): from the NEW DRUG DATA below
  4. STORAGE CONDITIONS must use: ${storageConditionsFinal}
  5. The PIL must include SFDA pharmacovigilance reporting information AND the new drug's own pharmacovigilance contacts from the NEW DRUG DATA below.

  ═══════════════════════════════════════════
  SFDA PIL STRUCTURE (mandatory sections):
  ═══════════════════════════════════════════

  **HEADER:**
  Package leaflet: Information for the patient
  [Brand Name] [strength] [dosage form]
  [Generic/INN name]
  Read all of this leaflet carefully before you start taking this medicine because it contains important information for you.
  - Keep this leaflet. You may need to read it again.
  - If you have any further questions, ask your doctor or pharmacist.
  - This medicine has been prescribed for you only. Do not pass it on to others. It may harm them, even if their signs of illness are the same as yours.
  - If you get any side effects, talk to your doctor or pharmacist. This includes any possible side effects not listed in this leaflet. See section 4.

  **SECTION 1: What [Brand Name] is and what it is used for**
  - Product description (what it is, pharmacotherapeutic group in patient-friendly language)
  - All therapeutic indications from originator
  - Brief explanation of how it works (if in originator PIL)

  **SECTION 2: What you need to know before you take [Brand Name]**
  - **Do not take [Brand Name]:** All contraindications from originator (preserve ALL, omitting any is a regulatory failure)
  - **Warnings and precautions:** Talk to your doctor or pharmacist before taking [Brand Name] — all warnings from originator
  - **Children and adolescents:** pediatric information if applicable
  - **Other medicines and [Brand Name]:** All drug interactions from originator
  - **[Brand Name] with food, drink and alcohol:** if applicable
  - **Pregnancy, breast-feeding and fertility:** from originator
  - **Driving and using machines:** from originator
  - **[Brand Name] contains [excipient warnings]:** excipient-specific warnings (e.g., lactose, sodium) from originator, updated with new excipient list

  **SECTION 3: How to take [Brand Name]**
  - Dosage for adults (and elderly if different)
  - Dosage for children/adolescents (if applicable)
  - Method of administration
  - Duration of treatment
  - **If you take more [Brand Name] than you should:** overdose information from originator
  - **If you forget to take [Brand Name]:** missed dose instructions
  - **If you stop taking [Brand Name]:** withdrawal/discontinuation information if applicable

  **SECTION 4: Possible side effects**
  - Introduction: "Like all medicines, this medicine can cause side effects, although not everybody gets them."
  - Side effects organized by frequency:
    - Very common (may affect more than 1 in 10 people)
    - Common (may affect up to 1 in 10 people)
    - Uncommon (may affect up to 1 in 100 people)
    - Rare (may affect up to 1 in 1,000 people)
    - Very rare (may affect up to 1 in 10,000 people)
    - Not known (frequency cannot be estimated from available data)
  - ALL side effects from originator must be included
  - IMPORTANT: Do NOT use MedDRA System Organ Class headings in the PIL — list side effects by frequency only (SOC listings are for SPC only)
  - The frequency convention definitions (e.g., "Very common: may affect more than 1 in 10 people") should appear inline with each frequency group, NOT as a separate block before the side effects list
  - List the most serious side effects first with clear instructions on what action to take, then list all other side effects by frequency (most frequent first)
  - **Reporting of side effects:**
    Include BOTH:
    a) "To report any side effect(s):
       Saudi Arabia:
       - National Pharmacovigilance Centre (NPC)
       - SFDA Call Center: 19999
       - E-mail: npc.drug@sfda.gov.sa
       - Website: https://ade.sfda.gov.sa/
       Other GCC States: Please contact the relevant competent authority."
    b) The new drug's own pharmacovigilance contacts from the NEW DRUG DATA below

  **SECTION 5: How to store [Brand Name]**
  - Keep this medicine out of the sight and reach of children.
  - Do not use this medicine after the expiry date which is stated on [carton/label/blister]. The expiry date refers to the last day of that month.
  - Storage conditions: ${storageConditionsFinal}
  - Do not throw away any medicines via wastewater or household waste. Ask your pharmacist how to throw away medicines you no longer use. These measures will help protect the environment.

  **SECTION 6: Further information**
  - **What [Brand Name] contains:**
    - The active substance is: [from new drug data]
    - The other ingredients are: [full excipients list from new drug data]
  - **What [Brand Name] looks like and contents of the pack:**
    - Physical description from new drug data
    - All pack sizes from new drug data
    - "Not all pack sizes may be marketed."
  - **Marketing Authorisation Holder:**
    [MAH name and full address from new drug data]
  - **Manufacturer:**
    [Manufacturer name and full address from new drug data]
  - **Date of last revision:** [Leave as placeholder: MM/YYYY]

  IMPORTANT: Do NOT include the Council of Arab Health Ministers statement or the SFDA approval statement. These are added separately during final document formatting. The PIL content ends after Section 6.

  ═══════════════════════════════════════════
  FORMATTING GUIDELINES:
  ═══════════════════════════════════════════
  - Use markdown formatting: **bold** for headings, bullet points for lists
  - Section headings should be bold and numbered (1. through 6.)
  - Subsection headings bold but not numbered
  - Single line spacing within paragraphs
  - Preserve all bullet point structures from originator

  ═══════════════════════════════════════════
  REGULATORY KNOWLEDGE (use as authoritative reference):
  ═══════════════════════════════════════════
  ${pilGuidelines}

  ═══════════════════════════════════════════
  SOURCE DOCUMENTS:
  ═══════════════════════════════════════════
  ORIGINATOR PIL:
  ${originator_pil || "[Not provided]"}

  ORIGINATOR SPC (for supplementary medical information):
  ${originator_spc || "[Not provided]"}

  NEW DRUG DATA (extracted):
  ${extractedData}

  RESOLVED STORAGE CONDITIONS:
  ${storageConditionsFinal}

  OUTPUT INSTRUCTIONS: Start your response directly with "Package leaflet: Information for the patient" — do NOT include any preamble, introduction, commentary, or explanation. Output ONLY the PIL document content.`;

  const { text: pilEnglish } = await generateText({
    messages: [systemMessage, { role: "user", content: pilPrompt }],
    temperature: 0.3,
    maxTokens: 16000,
  });

  // Step 3: Generate English SPC
  const spcPrompt = `You are a senior pharmaceutical regulatory affairs specialist creating a Summary of Product Characteristics (SPC) for a new generic drug to be registered with SFDA (Saudi Food and Drug Authority).

  TASK: Create a complete English SPC for the new generic drug by adapting the originator's SPC content, following GCC/SFDA SPC format.

  ═══════════════════════════════════════════
  CRITICAL RULES:
  ═══════════════════════════════════════════
  1. COPY-PASTE all clinical/pharmacological content from the originator SPC — do NOT alter, rephrase, or add any medical/scientific claims.
  2. COMPLETELY REDACT all originator proprietary information and SUBSTITUTE with new drug data.
  3. STORAGE CONDITIONS must use: ${storageConditionsFinal}
  4. Include SFDA pharmacovigilance reporting information in section 4.8.
  5. Use MedDRA System Organ Class (SOC) headings for adverse reactions in section 4.8 (unlike the PIL which uses frequency-only).

  ═══════════════════════════════════════════
  SPC STRUCTURE (GCC/SFDA mandatory sections):
  ═══════════════════════════════════════════
  1. Name of the Medicinal Product
  2. Qualitative and Quantitative Composition
  3. Pharmaceutical Form
  4. Clinical Particulars
     4.1 Therapeutic indications
     4.2 Posology and method of administration
     4.3 Contraindications
     4.4 Special warnings and precautions for use
     4.5 Interaction with other medicinal products and other forms of interaction
     4.6 Fertility, pregnancy and lactation
     4.7 Effects on ability to drive and use machines
     4.8 Undesirable effects (with SFDA NPC reporting box)
     4.9 Overdose
  5. Pharmacological Properties
     5.1 Pharmacodynamic properties
     5.2 Pharmacokinetic properties
     5.3 Preclinical safety data
  6. Pharmaceutical Particulars
     6.1 List of excipients
     6.2 Incompatibilities
     6.3 Shelf life
     6.4 Special precautions for storage
     6.5 Nature and contents of container
     6.6 Special precautions for disposal and other handling
  7. Marketing Authorisation Holder
  8. Date of First Authorisation/Renewal of the Authorisation
  9. Date of Revision of the Text

  ═══════════════════════════════════════════
  REGULATORY KNOWLEDGE:
  ═══════════════════════════════════════════
  ${spcGuidelines}

  ═══════════════════════════════════════════
  SOURCE DOCUMENTS:
  ═══════════════════════════════════════════
  ORIGINATOR SPC:
  ${originator_spc || "[Not provided]"}

  ORIGINATOR PIL (for supplementary information):
  ${originator_pil || "[Not provided]"}

  NEW DRUG DATA (extracted):
  ${extractedData}

  RESOLVED STORAGE CONDITIONS:
  ${storageConditionsFinal}

  OUTPUT INSTRUCTIONS: Start your response directly with "SUMMARY OF PRODUCT CHARACTERISTICS" — do NOT include any preamble, introduction, commentary, or explanation. Output ONLY the SPC document content.`;

  const { text: spcEnglish } = await generateText({
    messages: [systemMessage, { role: "user", content: spcPrompt }],
    temperature: 0.3,
    maxTokens: 16000,
  });

  return {
    documents: [
      {
        id: "pil_english",
        title: "Patient Information Leaflet (English)",
        markdown: pilEnglish,
      },
      {
        id: "spc_english",
        title: "Summary of Product Characteristics (English)",
        markdown: spcEnglish,
      },
      {
        id: "extracted_data",
        title: "Extracted Drug Data",
        markdown: extractedData,
      },
    ],
    model:
      process.env.OPENROUTER_SFDA_MODEL ||
      process.env.OPENROUTER_MODEL ||
      "google/gemini-2.5-pro",
  };
}
