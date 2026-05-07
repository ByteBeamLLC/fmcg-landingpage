/**
 * Shared types for the SFDA tool services.
 */

export interface SfdaUploadedFile {
  inputId: string;
  fileName: string;
  mimeType: string;
  base64: string;
}

export interface SfdaToolResult {
  markdown: string;
  model: string;
}

export { isOpenRouterConfigured } from "../../lib/openrouter.js";
