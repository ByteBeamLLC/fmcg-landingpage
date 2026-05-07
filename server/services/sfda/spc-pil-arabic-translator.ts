/**
 * SmPC & PIL Arabic Translator — verbatim port of pharma-tools/app/api/tools/pil-spc-translation/route.ts.
 *
 * Adapted only for the framework boundary (no Supabase auth or job tracking).
 * Prompts and orchestration are unchanged.
 */

import { generateText } from "../../lib/openrouter.js";
import {
  extractTextFromPdf,
  base64ToBuffer,
} from "../../lib/document/pdf-parser.js";
import { extractTextFromDocx } from "../../lib/document/docx-parser.js";
import {
  getSfdaPilArabicTemplate,
  getGccPilGuidance,
  getSpcGuidelines,
} from "../../lib/guidelines/index.js";
import type { SfdaUploadedFile, SfdaToolResult } from "./types.js";

export async function translateSpcPilToArabic(
  files: SfdaUploadedFile[]
): Promise<SfdaToolResult> {
  // Extract text
  const inputTexts: Record<string, string> = {};
  for (const file of files) {
    const buffer = base64ToBuffer(file.base64);
    if (file.mimeType === "application/pdf") {
      inputTexts[file.inputId] = await extractTextFromPdf(buffer);
    } else if (file.mimeType.includes("wordprocessingml")) {
      inputTexts[file.inputId] = await extractTextFromDocx(buffer);
    }
  }

  // Map fmcg input IDs to pharma-tools internal names
  const english_pil = inputTexts.english_pil || "";
  const english_spc = inputTexts.english_smpc || inputTexts.english_spc || "";

  const systemMessage = {
    role: "system" as const,
    content:
      "You are a pharmaceutical regulatory document translator. Output ONLY the translated document content. Do not include any preamble, introduction, commentary, acknowledgment, or explanation before or after the document. Start directly with the translated document content.",
  };

  // Load focused regulatory guideline sections for translation
  const [sfdaPilArabic, gccPilGuidance, spcGuidelines] = await Promise.all([
    getSfdaPilArabicTemplate(),
    getGccPilGuidance(),
    getSpcGuidelines(),
  ]);

  // Translate PIL to Arabic
  const pilArabicPrompt = `You are an expert pharmaceutical translator specializing in Arabic medical translation for SFDA (Saudi Food and Drug Authority) compliance.

TASK: Translate the complete English PIL below into Modern Standard Arabic (MSA) suitable for patient information leaflets registered with SFDA.

═══════════════════════════════════════════
CRITICAL TRANSLATION RULES:
═══════════════════════════════════════════

1. CONTEXTUAL TRANSLATION — This must be a professional, contextual pharmaceutical translation. Do NOT produce automated, static, or literal word-for-word translation. The translation must read naturally in Arabic as if originally written by an Arabic-speaking regulatory affairs specialist.

2. SFDA MARKET CONSISTENCY — Terminology must be translated in the SAME WAY it is translated by all companies in the Saudi market as approved by SFDA. Use established pharmaceutical Arabic terminology that is consistent with other SFDA-approved leaflets.

3. TERMINOLOGY DECISION RULES (based on SFDA-approved leaflet conventions):

   **A. ALWAYS TRANSLITERATE (phonetic Arabic spelling):**
   - ALL INN/generic drug names: e.g., paracetamol → باراسيتامول, omeprazole → أوميبرازول, teriflunomide → تيريفلونوميد, carbamazepine → كاربامازيبين, alfuzosin → الألفوزوسين
   - ALL brand/trade names: e.g., Panadol → بانادول — ALWAYS transliterate into Arabic script and **bold**. NEVER leave brand names in Latin script in the Arabic body text. Drop (R)/(TM) symbols.
   - Proper noun parts of syndrome/disease names: e.g., Stevens-Johnson → ستيفنز جونسون, Zollinger-Ellison → زولينجر إليسون, Cushing → كوشينغ, Helicobacter pylori → هيلِكوباكتر بيلوري
   - Chemical/pharmaceutical excipient names: e.g., hypromellose → هايبروميلوز, povidone → بوفيدون, macrogol → ماكروغول, mannitol → مانيتول
   - Terms with no established Arabic equivalent: use phonetic transliteration

   **B. ALWAYS TRANSLATE (proper Arabic):**
   - Anatomical terms: liver → الكبد, kidney → الكلى, heart → القلب, brain → الدماغ, prostate → البروستات
   - Common disease descriptions: inflammation → التهاب, infection → عدوى, ulcer → قرحة, cancer → سرطان, allergy → حساسية, epilepsy → الصرع, diabetes → السكري, asthma → الربو, depression → الاكتئاب
   - ALL symptom/side effect descriptions: headache → صداع, dizziness → دوار, nausea → غثيان, vomiting → تقيؤ, diarrhoea → إسهال, rash → طفح جلدي, pain → ألم, tiredness → تعب, constipation → إمساك, dry mouth → جفاف الفم, hair loss → تساقط الشعر
   - ALL drug class names: immunosuppressants → مثبطات المناعة, anticoagulants → مضادات التخثر, antibiotics → المضادات الحيوية, proton pump inhibitors → مثبطات مضخة البروتون, alpha-blockers → حاصرات ألفا, NSAIDs → مضادات الالتهاب غير الستيرويدية, corticosteroids → الستيرويدات القشرية
   - Dosage forms: tablets → أقراص, capsules → كبسولات, film-coated tablets → أقراص مغلفة بغشاء رقيق, oral solution → محلول فموي, gastro-resistant capsules → كبسولات مقاومة للمعدة
   - Common excipient materials with known Arabic names: starch → نشا, talc → تلك, castor oil → زيت الخروع, iron oxide → أكسيد الحديد, water → الماء
   - Body processes/lab terms: blood pressure → ضغط الدم, liver enzymes → إنزيمات الكبد, white blood cells → كريات الدم البيضاء, platelets → الصفائح الدموية

   **C. HYBRID (transliterate + add Arabic explanation):**
   - For technical medical terms, transliterate the term and add a lay Arabic explanation in parentheses: e.g., orthostatic hypotension → نقص الضغط الشرياني القيامي (هبوط في ضغط الدم عند الوقوف), neutropenia → قلّة العدلات (انخفاض عدد كريات الدم البيضاء)
   - Syndromes: transliterate the proper noun, translate the descriptive part: e.g., Stevens-Johnson syndrome → متلازمة ستيفنز - جونسون

4. PATIENT ADDRESSING CONVENTIONS:
   - Address the patient in 2nd person singular MASCULINE by default: "يجب عليك" (you must), "تحدث إلى طبيبك" (talk to your doctor)
   - Switch to FEMININE form ONLY in pregnancy and breastfeeding sections: "لا تتناولي" (do not take [feminine]), "إذا كنت حاملاً" (if you are pregnant), "إذا كنت ترضعين رضاعة طبيعية" (if you are breastfeeding)

5. NUMBERS, UNITS, AND LATIN SCRIPT:
   - Use Western Arabic numerals (1, 2, 3) consistently — not Eastern Arabic (١, ٢, ٣)
   - Dosage numbers stay as numerals, never spelled out: "500 mg" → "500 ملجم"
   - Units: use ملجم or ملغم for milligrams (pick one and be consistent throughout)
   - Temperature: "30°C" → "30 درجة مئوية"
   - E-numbers stay in original format: E171, E132
   - "EXP" stays in Latin script
   - Email addresses and URLs stay in Latin script: npc.drug@sfda.gov.sa, https://ade.sfda.gov.sa/
   - English abbreviations like ALT, GERD, MS may be retained in parentheses alongside the Arabic

6. SUB-SECTION NUMBERING:
   - In Section 6, use Arabic letter sequence (أ، ب، ت، ث) instead of Latin (a, b, c, d) for sub-sections

7. WORD CONNECTION CHECK:
   - Verify that Arabic words that should be connected are properly connected, and words that should be separate are not incorrectly joined. This is a common translation quality issue.

═══════════════════════════════════════════
SECTION HEADINGS — Use EXACT standard SFDA Arabic PIL headings from Template V1.3:
   - Header: "نشرة الدواء: معلومات للمريض" (Package leaflet: Information for the patient)
   - Introductory text (POM): "اقرأ هذه النشرة كاملة بعناية تامة قبل القيام بتناول هذا الدواء حيث أنها تحتوي على معلومات تهمك"
   - Section 1: "1. ما هو [Brand Name]، وماهي دواعي استعماله" (What it is and what it is used for)
   - Section 2: "2. ما الذي يجب عليك معرفته قبل تناول [Brand Name]" (What you need to know before taking)
     * "لا تتناول [Brand Name]" (Do not take)
     * "تحذيرات واحتياطات" (Warnings and precautions)
     * "الأطفال والمراهقون" (Children and adolescents)
     * "أدوية أخرى و[Brand Name]" (Other medicines)
     * "تناول [Brand Name] مع الطعام والشراب والكحول" (With food, drink and alcohol)
     * "الحمل والرضاعة الطبيعية والخصوبة" (Pregnancy, breast-feeding and fertility)
     * "القيادة واستخدام الآلات" (Driving and using machines)
   - Section 3: "3. ما هي طريقة تناول [Brand Name]" (How to take)
     * "إذا تناولت [Brand Name] أكثر مما ينبغي" (If you take more than you should)
     * "إذا نسيت تناول [Brand Name]" (If you forget to take)
     * "إذا توقفت عن تناول [Brand Name]" (If you stop taking)
   - Section 4: "4. الأعراض الجانبية المحتملة" (Possible side effects)
     * Frequency terms:
       - شائعة جداً (Very common)
       - شائعة (Common)
       - غير شائعة (Uncommon)
       - نادرة (Rare)
       - نادرة جداً (Very rare)
       - غير معروفة (Not known)
     * "الإبلاغ عن الأعراض الجانبية" (Reporting of side effects)
     * Side effects reporting Arabic format:
       "للإبلاغ حول الأعراض الجانبية التي قد تحدث يرجى التواصل عبر العناوين التالية:
       المملكة العربية السعودية:
       المركز الوطني للتيقظ الدوائي:
       مركز الاتصال الموحد: 19999
       البريد الإلكتروني: npc.drug@sfda.gov.sa
       الموقع الإلكتروني: https://ade.sfda.gov.sa
       دول الخليج العربي الأخرى: الرجاء الاتصال بالجهات الوطنية في كل دولة"
   - Section 5: "5. طريقة تخزين [Brand Name]" (How to store)
   - Section 6: "6. محتويات العلبة ومعلومات إضافية أخرى" (Contents of the pack and other information)
     * "ما هي محتويات [Brand Name]" (What it contains)
     * "ما هو شكل [Brand Name] ووصفه، وعلى ماذا تحتوي العبوة" (What it looks like and contents of the pack)
     * "اسم وعنوان مالك رخصة التسويق والمصنع" (Marketing Authorisation Holder and Manufacturer)
   - End with: "تمت مراجعة هذه النشرة في [MM/YYYY]"

8. FORMATTING:
   - Right-to-left (RTL) text direction
   - Maintain identical section structure as the English PIL — same number of sections, sub-sections, and content blocks
   - Preserve ALL medical content — omitting anything is a regulatory violation
   - Bold headings, bullet points preserved
   - Brand name must be bolded wherever it appears in Arabic text
   - Arabic text is naturally more verbose than English — this is expected and correct. Add parenthetical lay explanations for technical terms as needed (this is standard SFDA leaflet practice)
   - Formal Modern Standard Arabic (MSA) register, patient-friendly tone

9. IMPORTANT: Do NOT include the Council of Arab Health Ministers statement (مجلس وزراء الصحة العرب) or the SFDA approval statement (تمت الموافقة على هذه النشرة). These are added separately during final document formatting. The Arabic PIL content ends after Section 6.

═══════════════════════════════════════════
REGULATORY KNOWLEDGE (use as authoritative reference for Arabic PIL template):
═══════════════════════════════════════════
SFDA TEMPLATE V1.3 — ARABIC PIL TEMPLATE (exact Arabic headings, introductory text, mandatory statements):
${sfdaPilArabic}

GCC GUIDANCE V3.1 — PIL RULES:
${gccPilGuidance}

═══════════════════════════════════════════
ENGLISH PIL TO TRANSLATE:
═══════════════════════════════════════════
${english_pil || "[Not provided]"}

OUTPUT INSTRUCTIONS: Start your response directly with "نشرة الدواء: معلومات للمريض" — do NOT include any preamble, introduction, commentary, or explanation in any language. Output ONLY the Arabic PIL document content. Every section, every subsection, every piece of medical content must be translated. Do not skip or summarize anything.`;

  const { text: pilArabic } = await generateText({
    messages: [systemMessage, { role: "user", content: pilArabicPrompt }],
    temperature: 0.2,
    maxTokens: 16000,
  });

  // Translate SPC to Arabic
  const spcArabicPrompt = `You are an expert pharmaceutical translator specializing in Arabic medical translation for SFDA (Saudi Food and Drug Authority) compliance.

TASK: Translate the complete English SPC below into Modern Standard Arabic (MSA) suitable for Summary of Product Characteristics registered with SFDA.

═══════════════════════════════════════════
CRITICAL TRANSLATION RULES:
═══════════════════════════════════════════

1. CONTEXTUAL TRANSLATION — Professional, contextual pharmaceutical translation. NOT literal word-for-word. Must read naturally in Arabic as if originally written by an Arabic-speaking regulatory affairs specialist.

2. SFDA MARKET CONSISTENCY — Use established pharmaceutical Arabic terminology consistent with other SFDA-approved documents.

3. TERMINOLOGY RULES:
   - TRANSLITERATE: ALL INN/generic drug names, brand names (bold in Arabic script), proper noun parts of syndrome names, chemical excipient names
   - TRANSLATE: Anatomical terms, disease descriptions, symptom descriptions, drug class names, dosage forms, body processes, lab terms
   - HYBRID: Technical medical terms (transliterate + lay Arabic explanation in parentheses), syndromes (transliterate proper noun, translate descriptive part)

4. SPC-SPECIFIC RULES:
   - SPC is for healthcare professionals — use formal medical Arabic register
   - MedDRA System Organ Class (SOC) headings should be translated using standard Arabic medical terminology
   - Adverse reactions table structure must be preserved
   - Pharmacokinetic parameters and units stay in standard scientific notation
   - ATC codes stay as-is
   - Include the Arabic SFDA pharmacovigilance reporting box in section 4.8

5. NUMBERS AND UNITS:
   - Use Western Arabic numerals (1, 2, 3) consistently
   - Dosage numbers as numerals: "500 mg" → "500 ملجم"
   - Scientific notation preserved: Cmax, Tmax, AUC, t½
   - Email addresses and URLs in Latin script

6. FORMATTING:
   - RTL text direction
   - Maintain identical section structure (sections 1-11)
   - Preserve ALL scientific content — omitting anything is a regulatory violation
   - Bold headings, tables, and bullet points preserved

═══════════════════════════════════════════
REGULATORY KNOWLEDGE:
═══════════════════════════════════════════
${spcGuidelines}

═══════════════════════════════════════════
ENGLISH SPC TO TRANSLATE:
═══════════════════════════════════════════
${english_spc || "[Not provided]"}

OUTPUT INSTRUCTIONS: Start your response directly with the SPC title heading in Arabic — do NOT include any preamble, introduction, commentary, or explanation in any language. Output ONLY the Arabic SPC document content. Every section, every subsection, every piece of scientific content must be translated. Do not skip or summarize anything.`;

  const { text: spcArabic } = await generateText({
    messages: [systemMessage, { role: "user", content: spcArabicPrompt }],
    temperature: 0.2,
    maxTokens: 16000,
  });

  return {
    documents: [
      {
        id: "pil_arabic",
        title: "نشرة معلومات المريض (Arabic PIL)",
        markdown: pilArabic,
        rtl: true,
      },
      {
        id: "spc_arabic",
        title: "ملخص خصائص المنتج (Arabic SmPC)",
        markdown: spcArabic,
        rtl: true,
      },
    ],
    model:
      process.env.OPENROUTER_SFDA_MODEL ||
      process.env.OPENROUTER_MODEL ||
      "google/gemini-2.5-pro",
  };
}
