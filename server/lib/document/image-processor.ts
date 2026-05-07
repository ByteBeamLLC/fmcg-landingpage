/**
 * Verbatim port of pharma-tools/lib/document/image-processor.ts
 *
 * Prepare image data for AI vision processing.
 * Ensures proper data URI format for multimodal LLM input.
 */
export function prepareImageForVision(base64: string, mimeType: string): string {
  if (base64.startsWith("data:")) return base64;
  return `data:${mimeType};base64,${base64}`;
}

export function isImageMimeType(mimeType: string): boolean {
  return mimeType.startsWith("image/");
}
