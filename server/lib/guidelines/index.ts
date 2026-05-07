/**
 * Verbatim port of pharma-tools/lib/guidelines/index.ts.
 *
 * Loads SFDA Template V1.3 + GCC Guidance V3.1 PDFs from disk, caches their
 * full text, and extracts focused sections used by the SFDA tool prompts.
 *
 * Path note: pharma-tools used `process.cwd() + "lib/guidelines/<file>"`.
 * Here the PDFs live under `server/lib/guidelines/`. On Vercel functions
 * `process.cwd()` is `/var/task`, and `vercel.json` includes the PDFs via
 * the `functions[].includeFiles` glob.
 */

import { readFile } from "fs/promises";
import { join } from "path";
import { extractTextFromPdf } from "../document/pdf-parser.js";

let cachedGuidance: string | null = null;
let cachedTemplate: string | null = null;
let cachedSections: Record<string, string> | null = null;

async function extractPdfText(filename: string): Promise<string> {
  const filePath = join(process.cwd(), "server", "lib", "guidelines", filename);
  const buffer = await readFile(filePath);
  return extractTextFromPdf(buffer);
}

async function ensureLoaded(): Promise<{ guidance: string; template: string }> {
  if (!cachedGuidance) {
    cachedGuidance = await extractPdfText("GuidanceLabelingSPCandPILv31_0.pdf");
  }
  if (!cachedTemplate) {
    cachedTemplate = await extractPdfText("TemplateLabelingSPC-PILV13.pdf");
  }
  return { guidance: cachedGuidance, template: cachedTemplate };
}

function findIndex(text: string, marker: string, startAfter: number): number {
  const idx = text.indexOf(marker, startAfter);
  return idx !== -1 ? idx : text.length;
}

async function getSections(): Promise<Record<string, string>> {
  if (cachedSections) return cachedSections;

  const { guidance, template } = await ensureLoaded();

  // GCC Guidance V3.1 — extract actual content sections (past table of contents)
  const gccSpcStart = guidance.indexOf(
    "SUMMARY OF PRODUCT CHARACTERISTICS (SPC)\n\nFor"
  );
  const gccPilStart = guidance.indexOf(
    "PATIENT INFORMATION LEAFLET (PIL)\n\nA separate"
  );
  const gccAppendixStart = guidance.indexOf("Appendix 1:\n");
  const gccSpcIdx =
    gccSpcStart !== -1
      ? gccSpcStart
      : findIndex(guidance, "SUMMARY OF PRODUCT CHARACTERISTICS (SPC)", 5000);
  const gccPilIdx =
    gccPilStart !== -1
      ? gccPilStart
      : findIndex(guidance, "PATIENT INFORMATION LEAFLET (PIL)", 50000);
  const gccAppIdx =
    gccAppendixStart !== -1
      ? gccAppendixStart
      : findIndex(guidance, "Appendix 1:", 60000);

  // SFDA Template V1.3 — extract actual content sections (past TOC and intro)
  const sfdaSpcStart = template.indexOf(
    "SUMMARY OF PRODUCT CHARACTERISTICS\n\n[ADD"
  );
  const sfdaPilEnStart = template.indexOf(
    "PATIENT INFORMATION LEAFLET\n\nPatient Information Leaflet"
  );
  const sfdaPilArStart = template.indexOf("ARABIC PATIENT INFORMATION LEAFLET");
  const sfdaAppendixStart = template.indexOf("APPENDIX 1:");
  const sfdaSpcIdx =
    sfdaSpcStart !== -1
      ? sfdaSpcStart
      : findIndex(template, "SUMMARY OF PRODUCT CHARACTERISTICS", 8000);
  const sfdaPilEnIdx =
    sfdaPilEnStart !== -1
      ? sfdaPilEnStart
      : findIndex(template, "PATIENT INFORMATION LEAFLET", 18000);
  const sfdaPilArIdx =
    sfdaPilArStart !== -1
      ? sfdaPilArStart
      : findIndex(template, "ARABIC PATIENT INFORMATION", 30000);
  const sfdaAppIdx =
    sfdaAppendixStart !== -1
      ? sfdaAppendixStart
      : findIndex(template, "APPENDIX 1", 40000);

  cachedSections = {
    gccPil: guidance.substring(gccPilIdx, gccAppIdx),
    gccSpc: guidance.substring(gccSpcIdx, gccPilIdx),
    sfdaPilEn: template.substring(sfdaPilEnIdx, sfdaPilArIdx),
    sfdaPilAr: template.substring(sfdaPilArIdx, sfdaAppIdx),
    sfdaSpc: template.substring(sfdaSpcIdx, sfdaPilEnIdx),
  };

  return cachedSections;
}

/** GCC Guidance V3.1 — PIL-specific rules (Section 5) */
export async function getGccPilGuidance(): Promise<string> {
  const s = await getSections();
  return s.gccPil;
}

/** GCC Guidance V3.1 — SPC-specific rules (Section 4) */
export async function getGccSpcGuidance(): Promise<string> {
  const s = await getSections();
  return s.gccSpc;
}

/** SFDA Template V1.3 — English PIL template */
export async function getSfdaPilTemplate(): Promise<string> {
  const s = await getSections();
  return s.sfdaPilEn;
}

/** SFDA Template V1.3 — Arabic PIL template */
export async function getSfdaPilArabicTemplate(): Promise<string> {
  const s = await getSections();
  return s.sfdaPilAr;
}

/** SFDA Template V1.3 — SPC template */
export async function getSfdaSpcTemplate(): Promise<string> {
  const s = await getSections();
  return s.sfdaSpc;
}

/** Combined PIL guidelines (GCC rules + SFDA template) */
export async function getPilGuidelines(): Promise<string> {
  const s = await getSections();
  return `SFDA TEMPLATE V1.3 — PIL SECTION:\n${s.sfdaPilEn}\n\nGCC GUIDANCE V3.1 — PIL RULES:\n${s.gccPil}`;
}

/** Combined SPC guidelines (GCC rules + SFDA template) */
export async function getSpcGuidelines(): Promise<string> {
  const s = await getSections();
  return `SFDA TEMPLATE V1.3 — SPC SECTION:\n${s.sfdaSpc}\n\nGCC GUIDANCE V3.1 — SPC RULES:\n${s.gccSpc}`;
}

/** Combined PIL + SPC guidelines for gap analysis */
export async function getAllGuidelines(): Promise<string> {
  const s = await getSections();
  return `SFDA TEMPLATE V1.3 — PIL:\n${s.sfdaPilEn}\n\nSFDA TEMPLATE V1.3 — SPC:\n${s.sfdaSpc}\n\nGCC GUIDANCE V3.1 — PIL RULES:\n${s.gccPil}\n\nGCC GUIDANCE V3.1 — SPC RULES:\n${s.gccSpc}`;
}

/** Full text of SFDA Template V1.3 */
export async function getFullTemplate(): Promise<string> {
  const { template } = await ensureLoaded();
  return template;
}

/** Full text of GCC Guidance V3.1 */
export async function getFullGuidance(): Promise<string> {
  const { guidance } = await ensureLoaded();
  return guidance;
}
