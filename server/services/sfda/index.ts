/**
 * Public API for the SFDA tool services. Re-exports the three tool functions
 * and the shared types so route handlers have a single import surface.
 */

export type { SfdaUploadedFile, SfdaToolResult } from "./types.js";
export { isOpenRouterConfigured } from "../../lib/openrouter.js";
export { generateSpcPil } from "./spc-pil-generator.js";
export { translateSpcPilToArabic } from "./spc-pil-arabic-translator.js";
export { runDossierGapAnalysis } from "./dossier-gap-analysis.js";
