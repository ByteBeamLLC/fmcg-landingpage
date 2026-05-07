/**
 * Shared types for the SFDA tool services.
 */

export interface SfdaUploadedFile {
  inputId: string;
  fileName: string;
  mimeType: string;
  base64: string;
}

/** A single output document — each one renders in its own card client-side. */
export interface SfdaDocument {
  /** Stable ID for keying / download filenames. */
  id: string;
  /** Display title shown above the document content. */
  title: string;
  /** Markdown content of the document. */
  markdown: string;
  /** Set true for Arabic documents so the DOCX export uses RTL formatting. */
  rtl?: boolean;
}

export interface SfdaToolResult {
  documents: SfdaDocument[];
  model: string;
}

export { isOpenRouterConfigured } from "../../lib/openrouter.js";
