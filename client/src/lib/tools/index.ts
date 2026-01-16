// PDF utilities
export {
  mergePDFs,
  splitPDF,
  compressPDF,
  removePages,
  rotatePages,
  imagesToPDF,
  getPDFPageCount,
  getPDFMetadata,
} from "./pdf-utils";

// Image utilities
export {
  compressImage,
  resizeImage,
  convertImageFormat,
  getImageDimensions,
  createThumbnail,
  convertHeicToJpg,
  isHeicImage,
  getExtensionForMimeType,
  getMimeTypeForExtension,
} from "./image-utils";
export type { CompressionOptions, ImageFormat } from "./image-utils";

// OCR utilities
export {
  performOCR,
  performBatchOCR,
  extractTextFromImage,
  detectLanguage,
  terminateOCRWorker,
  SUPPORTED_LANGUAGES,
} from "./ocr-utils";
export type { OCRProgress, OCRResult, OCRLanguage } from "./ocr-utils";

// OpenRouter AI utilities
export {
  summarizeDocument,
  translateDocument,
  extractData,
  chatWithDocument,
  analyzeContract,
  parseResume,
  extractInvoiceData,
  extractReceiptData,
  scanBusinessCard,
  checkAIServiceStatus,
  getRateLimitStatus,
} from "./openrouter";
export type {
  ChatMessage,
  AIRequestOptions,
  AIResponse,
  DocumentSummaryRequest,
  TranslationRequest,
  DataExtractionRequest,
  ChatWithDocumentRequest,
} from "./openrouter";
