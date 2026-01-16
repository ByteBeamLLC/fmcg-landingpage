import Tesseract, { RecognizeResult, Worker } from "tesseract.js";

export interface OCRProgress {
  status: string;
  progress: number;
}

export interface OCRResult {
  text: string;
  confidence: number;
  words: Array<{
    text: string;
    confidence: number;
    bbox: { x0: number; y0: number; x1: number; y1: number };
  }>;
  lines: Array<{
    text: string;
    confidence: number;
  }>;
  paragraphs: Array<{
    text: string;
    confidence: number;
  }>;
}

export type OCRLanguage =
  | "eng"
  | "ara"
  | "fra"
  | "deu"
  | "spa"
  | "ita"
  | "por"
  | "rus"
  | "chi_sim"
  | "chi_tra"
  | "jpn"
  | "kor";

export const SUPPORTED_LANGUAGES: Record<OCRLanguage, string> = {
  eng: "English",
  ara: "Arabic",
  fra: "French",
  deu: "German",
  spa: "Spanish",
  ita: "Italian",
  por: "Portuguese",
  rus: "Russian",
  chi_sim: "Chinese (Simplified)",
  chi_tra: "Chinese (Traditional)",
  jpn: "Japanese",
  kor: "Korean",
};

let workerInstance: Worker | null = null;

/**
 * Initialize the Tesseract worker
 */
async function getWorker(language: OCRLanguage = "eng"): Promise<Worker> {
  if (workerInstance) {
    await workerInstance.terminate();
  }

  workerInstance = await Tesseract.createWorker(language, 1, {
    logger: (m) => {
      // Logger for debugging, can be removed in production
      if (m.status === "recognizing text") {
        // Progress can be tracked here
      }
    },
  });

  return workerInstance;
}

/**
 * Perform OCR on an image file
 */
export async function performOCR(
  imageFile: File | Blob | string,
  language: OCRLanguage = "eng",
  onProgress?: (progress: OCRProgress) => void
): Promise<OCRResult> {
  const worker = await Tesseract.createWorker(language, 1, {
    logger: (m) => {
      if (onProgress) {
        onProgress({
          status: m.status,
          progress: m.progress * 100,
        });
      }
    },
  });

  try {
    const result: RecognizeResult = await worker.recognize(imageFile);

    const ocrResult: OCRResult = {
      text: result.data.text,
      confidence: result.data.confidence,
      words: result.data.words.map((word) => ({
        text: word.text,
        confidence: word.confidence,
        bbox: word.bbox,
      })),
      lines: result.data.lines.map((line) => ({
        text: line.text,
        confidence: line.confidence,
      })),
      paragraphs: result.data.paragraphs.map((para) => ({
        text: para.text,
        confidence: para.confidence,
      })),
    };

    return ocrResult;
  } finally {
    await worker.terminate();
  }
}

/**
 * Perform OCR on multiple images
 */
export async function performBatchOCR(
  imageFiles: (File | Blob | string)[],
  language: OCRLanguage = "eng",
  onProgress?: (fileIndex: number, progress: OCRProgress) => void
): Promise<OCRResult[]> {
  const results: OCRResult[] = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const result = await performOCR(imageFiles[i], language, (progress) => {
      if (onProgress) {
        onProgress(i, progress);
      }
    });
    results.push(result);
  }

  return results;
}

/**
 * Extract text from an image with preprocessing
 */
export async function extractTextFromImage(
  imageFile: File,
  options: {
    language?: OCRLanguage;
    preprocessImage?: boolean;
    onProgress?: (progress: OCRProgress) => void;
  } = {}
): Promise<string> {
  const { language = "eng", preprocessImage = false, onProgress } = options;

  let imageToProcess: File | string = imageFile;

  // If preprocessing is enabled, we could apply filters here
  // For now, we'll pass the image directly
  if (preprocessImage) {
    imageToProcess = await preprocessForOCR(imageFile);
  }

  const result = await performOCR(imageToProcess, language, onProgress);
  return result.text;
}

/**
 * Preprocess image for better OCR results
 */
async function preprocessForOCR(imageFile: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Draw original image
      ctx.drawImage(img, 0, 0);

      // Get image data for processing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Convert to grayscale and increase contrast
      for (let i = 0; i < data.length; i += 4) {
        // Grayscale
        const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;

        // Increase contrast
        const contrast = 1.2;
        const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
        const newGray = Math.max(0, Math.min(255, factor * (gray - 128) + 128));

        // Apply threshold for cleaner text
        const threshold = 128;
        const final = newGray > threshold ? 255 : 0;

        data[i] = final;
        data[i + 1] = final;
        data[i + 2] = final;
      }

      ctx.putImageData(imageData, 0, 0);

      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };

    img.src = url;
  });
}

/**
 * Detect the dominant language in an image
 * This is a simple heuristic based on character detection
 */
export async function detectLanguage(imageFile: File): Promise<OCRLanguage> {
  // First, try with English to get some text
  const result = await performOCR(imageFile, "eng");
  const text = result.text;

  // Check for Arabic characters
  if (/[\u0600-\u06FF]/.test(text)) return "ara";

  // Check for Chinese characters
  if (/[\u4e00-\u9fff]/.test(text)) return "chi_sim";

  // Check for Japanese characters
  if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) return "jpn";

  // Check for Korean characters
  if (/[\uac00-\ud7af]/.test(text)) return "kor";

  // Check for Cyrillic (Russian)
  if (/[\u0400-\u04FF]/.test(text)) return "rus";

  // Default to English
  return "eng";
}

/**
 * Clean up OCR worker
 */
export async function terminateOCRWorker(): Promise<void> {
  if (workerInstance) {
    await workerInstance.terminate();
    workerInstance = null;
  }
}
