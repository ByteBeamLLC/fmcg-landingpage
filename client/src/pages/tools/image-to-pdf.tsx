import { useState, useCallback } from "react";
import {
  ImagePlus,
  GripVertical,
  Trash2,
  FileText,
  Image,
  Shrink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  DownloadButton,
  ToolFAQ,
  RelatedTools,
  formatFileSize,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { imagesToPDF } from "@/lib/tools/pdf-utils";
import { motion, Reorder } from "framer-motion";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

const FAQS = [
  {
    question: "What image formats are supported?",
    answer:
      "We support JPG/JPEG and PNG images. Other formats will be automatically converted to PNG before being added to the PDF.",
  },
  {
    question: "Can I reorder images before creating the PDF?",
    answer:
      "Yes! Simply drag and drop the images in the list to arrange them in your desired order before clicking Convert.",
  },
  {
    question: "Is there a limit on the number of images?",
    answer:
      "You can add up to 50 images at once, with each image up to 10MB in size.",
  },
  {
    question: "Will image quality be preserved?",
    answer:
      "Yes, images are embedded at their original resolution. The PDF page size matches each image's dimensions.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All processing happens locally in your browser. Your images are never uploaded to any server.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Image Compressor",
    description: "Reduce image file sizes",
    href: "/tools/image-compressor",
    icon: Shrink,
    category: "Image Tools",
  },
  {
    title: "PDF to Text Extractor",
    description: "Extract text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "PDF Tools",
  },
];

export default function ImageToPDF() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);
  const [resultPdf, setResultPdf] = useState<Blob | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    const newImageFiles: ImageFile[] = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setImageFiles((prev) => [...prev, ...newImageFiles].slice(0, 50));
    setResultPdf(null);
    setStatus("idle");
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setImageFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
    setResultPdf(null);
    setStatus("idle");
  }, []);

  const handleReorder = useCallback((newOrder: ImageFile[]) => {
    setImageFiles(newOrder);
    setResultPdf(null);
    setStatus("idle");
  }, []);

  const handleConvert = useCallback(async () => {
    if (imageFiles.length === 0) return;

    setStatus("processing");
    setResultPdf(null);

    try {
      const files = imageFiles.map((i) => i.file);
      const pdf = await imagesToPDF(files);
      setResultPdf(pdf);
      setStatus("completed");
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("error");
    }
  }, [imageFiles]);

  const totalSize = imageFiles.reduce((sum, f) => sum + f.file.size, 0);

  return (
    <ToolLayout
      title="Free Image to PDF Converter"
      description="Convert images to PDF documents. Combine multiple JPG, PNG images into a single PDF file. Free, fast, and secure."
      category="Image Tools"
      keywords="image to pdf, jpg to pdf, png to pdf, convert images to pdf, image to pdf converter"
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <Card>
          <CardContent className="p-6">
            <FileUploader
              accept={{
                "image/*": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"],
              }}
              maxSize={10 * 1024 * 1024}
              multiple={true}
              maxFiles={50}
              onFilesSelected={handleFilesSelected}
              description="Upload images to convert to PDF (max 50 images, 10MB each)"
            />
          </CardContent>
        </Card>

        {/* Image List */}
        {imageFiles.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">
                  Images ({imageFiles.length})
                </h3>
                <div className="text-sm text-muted-foreground">
                  {formatFileSize(totalSize)}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop to reorder. Each image will be a separate page in the PDF.
              </p>

              <Reorder.Group
                axis="y"
                values={imageFiles}
                onReorder={handleReorder}
                className="space-y-2"
              >
                {imageFiles.map((imageFile, index) => (
                  <Reorder.Item
                    key={imageFile.id}
                    value={imageFile}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      layout
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                    >
                      <GripVertical className="size-5 text-muted-foreground" />
                      <img
                        src={imageFile.preview}
                        alt={imageFile.file.name}
                        className="size-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">
                          {imageFile.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(imageFile.file.size)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          Page {index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveFile(imageFile.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => {
                    imageFiles.forEach((f) => URL.revokeObjectURL(f.preview));
                    setImageFiles([]);
                    setResultPdf(null);
                    setStatus("idle");
                  }}
                >
                  Clear All
                </Button>
                <Button
                  onClick={handleConvert}
                  disabled={imageFiles.length === 0 || status === "processing"}
                  size="lg"
                  className="gap-2"
                >
                  <ImagePlus className="size-4" />
                  {status === "processing" ? "Converting..." : "Convert to PDF"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <ProcessingStatus
          status={status}
          message={
            status === "processing"
              ? "Converting images to PDF..."
              : status === "completed"
              ? "Your PDF is ready to download!"
              : undefined
          }
        />

        {resultPdf && status === "completed" && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    PDF Created Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    {imageFiles.length} images converted |{" "}
                    {formatFileSize(resultPdf.size)}
                  </p>
                </div>
                <DownloadButton
                  data={resultPdf}
                  filename="images.pdf"
                  mimeType="application/pdf"
                  size="lg"
                >
                  Download PDF
                </DownloadButton>
              </div>
            </CardContent>
          </Card>
        )}

        {imageFiles.length === 0 && (
          <div className="text-center py-8">
            <Image className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Upload Images to Get Started
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select images to convert them into a PDF document.
              You can reorder them before converting.
            </p>
          </div>
        )}
      </div>

      <ToolFAQ faqs={FAQS} toolName="Image to PDF Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
