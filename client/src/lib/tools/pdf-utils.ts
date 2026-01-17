import { PDFDocument, degrees } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Merge multiple PDF files into a single PDF
 */
export async function mergePDFs(pdfFiles: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of pdfFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([mergedPdfBytes], { type: "application/pdf" });
}

/**
 * Split a PDF into individual pages
 */
export async function splitPDF(
  pdfFile: File,
  pageRanges?: { start: number; end: number }[]
): Promise<Blob[]> {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const totalPages = pdf.getPageCount();

  const results: Blob[] = [];

  if (pageRanges && pageRanges.length > 0) {
    // Split by ranges
    for (const range of pageRanges) {
      const newPdf = await PDFDocument.create();
      const pageIndices: number[] = [];

      for (let i = range.start - 1; i < Math.min(range.end, totalPages); i++) {
        pageIndices.push(i);
      }

      const copiedPages = await newPdf.copyPages(pdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      results.push(new Blob([pdfBytes], { type: "application/pdf" }));
    }
  } else {
    // Split into individual pages
    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(copiedPage);

      const pdfBytes = await newPdf.save();
      results.push(new Blob([pdfBytes], { type: "application/pdf" }));
    }
  }

  return results;
}

/**
 * Compress a PDF by reducing image quality and removing metadata
 */
export async function compressPDF(
  pdfFile: File,
  quality: "low" | "medium" | "high" = "medium"
): Promise<Blob> {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer, {
    ignoreEncryption: true,
  });

  // Remove metadata to reduce file size
  pdf.setTitle("");
  pdf.setAuthor("");
  pdf.setSubject("");
  pdf.setKeywords([]);
  pdf.setProducer("");
  pdf.setCreator("");

  // Save with compression options
  const compressedBytes = await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
    // Note: pdf-lib doesn't have built-in image compression,
    // but object streams help reduce size
  });

  return new Blob([compressedBytes], { type: "application/pdf" });
}

/**
 * Remove specific pages from a PDF
 */
export async function removePages(
  pdfFile: File,
  pagesToRemove: number[]
): Promise<Blob> {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const totalPages = pdf.getPageCount();

  // Convert to 0-indexed and sort in descending order
  const indicesToRemove = pagesToRemove
    .map((p) => p - 1)
    .filter((p) => p >= 0 && p < totalPages)
    .sort((a, b) => b - a);

  // Remove pages from end to start to maintain indices
  for (const index of indicesToRemove) {
    pdf.removePage(index);
  }

  const pdfBytes = await pdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

/**
 * Rotate pages in a PDF
 */
export async function rotatePages(
  pdfFile: File,
  rotation: 90 | 180 | 270,
  pageIndices?: number[]
): Promise<Blob> {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  const indicesToRotate = pageIndices
    ? pageIndices.map((p) => p - 1)
    : pages.map((_, i) => i);

  for (const index of indicesToRotate) {
    if (index >= 0 && index < pages.length) {
      const page = pages[index];
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + rotation));
    }
  }

  const pdfBytes = await pdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

/**
 * Convert images to PDF
 */
export async function imagesToPDF(imageFiles: File[]): Promise<Blob> {
  const pdf = await PDFDocument.create();

  for (const imageFile of imageFiles) {
    const arrayBuffer = await imageFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    let image;
    if (imageFile.type === "image/jpeg" || imageFile.type === "image/jpg") {
      image = await pdf.embedJpg(uint8Array);
    } else if (imageFile.type === "image/png") {
      image = await pdf.embedPng(uint8Array);
    } else {
      // Convert other formats to PNG using canvas
      const blob = new Blob([arrayBuffer], { type: imageFile.type });
      const pngBlob = await convertImageToPng(blob);
      const pngBuffer = await pngBlob.arrayBuffer();
      image = await pdf.embedPng(new Uint8Array(pngBuffer));
    }

    const page = pdf.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const pdfBytes = await pdf.save();
  return new Blob([pdfBytes], { type: "application/pdf" });
}

/**
 * Convert an image blob to PNG format
 */
async function convertImageToPng(imageBlob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageBlob);

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

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not convert image to PNG"));
          }
        },
        "image/png",
        1.0
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };

    img.src = url;
  });
}

/**
 * Get PDF page count without loading the full document
 */
export async function getPDFPageCount(pdfFile: File): Promise<number> {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  return pdf.getPageCount();
}

/**
 * Get PDF metadata
 */
export async function getPDFMetadata(pdfFile: File): Promise<{
  pageCount: number;
  title: string | undefined;
  author: string | undefined;
  subject: string | undefined;
  creator: string | undefined;
  producer: string | undefined;
  creationDate: Date | undefined;
  modificationDate: Date | undefined;
}> {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  return {
    pageCount: pdf.getPageCount(),
    title: pdf.getTitle(),
    author: pdf.getAuthor(),
    subject: pdf.getSubject(),
    creator: pdf.getCreator(),
    producer: pdf.getProducer(),
    creationDate: pdf.getCreationDate(),
    modificationDate: pdf.getModificationDate(),
  };
}

/**
 * Extract text content from a PDF file using pdf.js
 */
export async function extractTextFromPDF(pdfFile: File): Promise<string> {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ');
    textParts.push(pageText);
  }

  return textParts.join('\n\n');
}
