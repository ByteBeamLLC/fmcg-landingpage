import { useState, useCallback } from "react";
import { Smartphone, Image as ImageIcon, FileText } from "lucide-react";
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
import { convertHeicToJpg } from "@/lib/tools/image-utils";

const FAQS = [
  {
    question: "What is a HEIC file?",
    answer:
      "HEIC (High Efficiency Image Container) is Apple's image format used by iPhones and iPads. It offers better compression than JPG while maintaining quality, but isn't supported by all devices and software.",
  },
  {
    question: "How do I convert HEIC to JPG?",
    answer:
      "Upload your HEIC photo from your iPhone or iPad, and click 'Convert to JPG'. Download your converted JPG image instantly.",
  },
  {
    question: "Is this HEIC converter free?",
    answer:
      "Yes! Convert HEIC photos to JPG completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "Will converting affect image quality?",
    answer:
      "We use 92% quality for JPG output, which maintains excellent quality while keeping file sizes reasonable. There may be slight quality reduction due to JPG compression.",
  },
  {
    question: "Can I convert multiple HEIC files?",
    answer:
      "Currently, you can convert one file at a time. Upload a new file after downloading the converted one to process more images.",
  },
  {
    question: "Is my photo data secure?",
    answer:
      "100% secure. All processing happens in your browser. Your photos never leave your device.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Image Compressor",
    description: "Reduce image file size",
    href: "/tools/image-compressor",
    icon: ImageIcon,
    category: "Image Tools",
  },
  {
    title: "Image to Text (OCR)",
    description: "Extract text from images",
    href: "/tools/image-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
];

export default function HeicToJpg() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      if (files.length > 0) {
        const file = files[0];
        setSelectedFile(file);
        setConvertedImage(null);
        setStatus("idle");

        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
      } else {
        setSelectedFile(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
      }
    },
    [previewUrl]
  );

  const handleConvert = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");

    try {
      const result = await convertHeicToJpg(selectedFile);
      setConvertedImage(result);
      setPreviewUrl(URL.createObjectURL(result));
      setStatus("completed");
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("error");
    }
  }, [selectedFile]);

  const getOutputFilename = () => {
    if (!selectedFile) return "converted-image.jpg";
    const name = selectedFile.name.replace(/\.(heic|heif)$/i, "");
    return `${name}.jpg`;
  };

  return (
    <ToolLayout
      title="HEIC to JPG Converter - Convert iPhone Photos Free"
      description="Convert HEIC to JPG online for free. Transform iPhone and iPad photos to JPG format instantly. No signup, no watermarks, works on any device."
      category="Image Tools"
      keywords="heic to jpg, convert heic to jpg, heic converter, iphone photo converter, heic to jpeg, convert heic online free, heif to jpg"
      toolContext="heic-to-jpg"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <FileUploader
                accept={{
                  "image/heic": [".heic"],
                  "image/heif": [".heif"],
                }}
                maxSize={20 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload HEIC photo from iPhone/iPad (max 20MB)"
              />

              {selectedFile && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-purple-100 flex items-center justify-center">
                      <Smartphone className="size-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)} • HEIC format
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleConvert}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Smartphone className="mr-2 size-4" />
                {status === "processing" ? "Converting..." : "Convert to JPG"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus status={status} />

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Why Convert HEIC to JPG?</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Share photos with Windows users who can't open HEIC</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Upload to websites that don't support HEIC format</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Edit photos in software that requires JPG</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Print photos at services that only accept JPG</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {convertedImage && previewUrl ? (
                <div className="text-center space-y-4">
                  <img
                    src={previewUrl}
                    alt="Converted"
                    className="max-h-64 max-w-full rounded-lg border"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">Photo Converted!</h3>
                    <p className="text-sm text-muted-foreground">
                      HEIC → JPG • {formatFileSize(convertedImage.size)}
                    </p>
                  </div>
                  <DownloadButton
                    data={convertedImage}
                    filename={getOutputFilename()}
                    mimeType="image/jpeg"
                    size="lg"
                  >
                    Download JPG Photo
                  </DownloadButton>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Smartphone className="size-12 mx-auto mb-4 opacity-20" />
                  <p>Converted JPG will appear here</p>
                  <p className="text-xs mt-2">
                    Upload a HEIC photo from your iPhone or iPad
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="HEIC to JPG Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
