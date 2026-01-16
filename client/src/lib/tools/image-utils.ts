import imageCompression from "browser-image-compression";

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number; // 0-1
  useWebWorker?: boolean;
}

/**
 * Compress an image file
 */
export async function compressImage(
  imageFile: File,
  options: CompressionOptions = {}
): Promise<File> {
  const defaultOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    ...options,
  };

  const compressedFile = await imageCompression(imageFile, defaultOptions);
  return compressedFile;
}

/**
 * Resize an image to specific dimensions
 */
export async function resizeImage(
  imageFile: File,
  width: number,
  height: number,
  maintainAspectRatio: boolean = true
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let targetWidth = width;
      let targetHeight = height;

      if (maintainAspectRatio) {
        const aspectRatio = img.width / img.height;
        if (width / height > aspectRatio) {
          targetWidth = height * aspectRatio;
        } else {
          targetHeight = width / aspectRatio;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Use high-quality image scaling
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      // Determine output format based on input
      const outputType = imageFile.type === "image/png" ? "image/png" : "image/jpeg";
      const quality = outputType === "image/jpeg" ? 0.92 : undefined;

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not resize image"));
          }
        },
        outputType,
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };

    img.src = url;
  });
}

export type ImageFormat = "image/jpeg" | "image/png" | "image/webp" | "image/gif";

/**
 * Convert an image to a different format
 */
export async function convertImageFormat(
  imageFile: File,
  targetFormat: ImageFormat,
  quality: number = 0.92
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Handle transparency for JPEG (which doesn't support it)
      if (targetFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Could not convert image format"));
          }
        },
        targetFormat,
        quality
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
 * Get image dimensions without loading it fully
 */
export async function getImageDimensions(
  imageFile: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(imageFile);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not load image"));
    };

    img.src = url;
  });
}

/**
 * Create a thumbnail from an image
 */
export async function createThumbnail(
  imageFile: File,
  maxSize: number = 200
): Promise<Blob> {
  const dimensions = await getImageDimensions(imageFile);
  const aspectRatio = dimensions.width / dimensions.height;

  let width: number;
  let height: number;

  if (dimensions.width > dimensions.height) {
    width = maxSize;
    height = maxSize / aspectRatio;
  } else {
    height = maxSize;
    width = maxSize * aspectRatio;
  }

  return resizeImage(imageFile, width, height, true);
}

/**
 * Convert HEIC image to JPEG or PNG
 */
export async function convertHeicToJpg(heicFile: File): Promise<Blob> {
  // Dynamic import to avoid loading heic2any unless needed
  const heic2any = (await import("heic2any")).default;

  const result = await heic2any({
    blob: heicFile,
    toType: "image/jpeg",
    quality: 0.92,
  });

  // heic2any can return array or single blob
  if (Array.isArray(result)) {
    return result[0];
  }
  return result;
}

/**
 * Check if a file is a HEIC image
 */
export function isHeicImage(file: File): boolean {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    file.name.toLowerCase().endsWith(".heic") ||
    file.name.toLowerCase().endsWith(".heif")
  );
}

/**
 * Get file extension for a MIME type
 */
export function getExtensionForMimeType(mimeType: string): string {
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/heic": "heic",
    "image/heif": "heif",
  };
  return extensions[mimeType] || "jpg";
}

/**
 * Get MIME type for a file extension
 */
export function getMimeTypeForExtension(extension: string): ImageFormat {
  const mimeTypes: Record<string, ImageFormat> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };
  return mimeTypes[extension.toLowerCase()] || "image/jpeg";
}
