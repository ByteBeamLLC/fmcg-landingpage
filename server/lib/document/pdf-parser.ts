/**
 * PDF text extraction — verbatim port of pharma-tools/lib/document/pdf-parser.ts
 *
 * Implementation note: pdf-parse v1's `index.js` has a debug-mode side effect
 * that reads a sample PDF from disk on import and crashes inside Vercel's
 * serverless functions. We import the inner lib path to skip it, and we
 * lazy-import to keep cold-start light.
 */

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  // @ts-expect-error - pdf-parse has no types for the inner lib path
  const mod = await import("pdf-parse/lib/pdf-parse.js");
  const pdfParse = (typeof mod === "function" ? mod : mod.default) as (
    buf: Buffer
  ) => Promise<{ text: string }>;
  const data = await pdfParse(buffer);
  return data.text || "";
}

export function base64ToBuffer(base64: string): Buffer {
  return Buffer.from(base64, "base64");
}
