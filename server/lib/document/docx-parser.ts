/**
 * DOCX text extraction — verbatim port of pharma-tools/lib/document/docx-parser.ts
 */

export async function extractTextFromDocx(buffer: Buffer): Promise<string> {
  const mod = (await import("mammoth")) as {
    default?: { extractRawText: (opts: { buffer: Buffer }) => Promise<{ value: string }> };
    extractRawText?: (opts: { buffer: Buffer }) => Promise<{ value: string }>;
  };
  const mammoth = (mod.extractRawText ? mod : mod.default!) as {
    extractRawText: (opts: { buffer: Buffer }) => Promise<{ value: string }>;
  };
  const result = await mammoth.extractRawText({ buffer });
  return result.value || "";
}

export async function extractHtmlFromDocx(buffer: Buffer): Promise<string> {
  const mod = (await import("mammoth")) as {
    default?: { convertToHtml: (opts: { buffer: Buffer }) => Promise<{ value: string }> };
    convertToHtml?: (opts: { buffer: Buffer }) => Promise<{ value: string }>;
  };
  const mammoth = (mod.convertToHtml ? mod : mod.default!) as {
    convertToHtml: (opts: { buffer: Buffer }) => Promise<{ value: string }>;
  };
  const result = await mammoth.convertToHtml({ buffer });
  return result.value || "";
}
