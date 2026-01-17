import { useState, useCallback } from "react";
import { RefreshCw, Image as ImageIcon, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import {
  convertImageFormat,
  type ImageFormat,
  getExtensionForMimeType,
} from "@/lib/tools/image-utils";

const FAQS = [
  {
    question: "How do I convert image format online?",
    answer:
      "Upload your image, select the target format (JPG, PNG, or WebP), and click 'Convert'. Download your converted image instantly.",
  },
  {
    question: "Is this image converter free?",
    answer:
      "Yes! Convert images between formats completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "What's the difference between JPG, PNG, and WebP?",
    answer:
      "JPG is best for photos (smaller size, no transparency). PNG is best for graphics with transparency. WebP offers the best compression while supporting transparency.",
  },
  {
    question: "Will converting affect image quality?",
    answer:
      "We use high-quality conversion with 92% quality for JPG/WebP. PNG is lossless. Converting from a lossy format (JPG) to lossless (PNG) won't recover lost quality.",
  },
  {
    question: "What about transparency?",
    answer:
      "PNG and WebP support transparency. When converting to JPG (which doesn't support transparency), transparent areas become white.",
  },
  {
    question: "Is my image data secure?",
    answer:
      "100% secure. All processing happens in your browser. Your images never leave your device.",
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

const FORMAT_OPTIONS: { value: ImageFormat; label: string; description: string }[] = [
  {
    value: "image/jpeg",
    label: "JPG",
    description: "Best for photos, smaller size",
  },
  {
    value: "image/png",
    label: "PNG",
    description: "Lossless, supports transparency",
  },
  {
    value: "image/webp",
    label: "WebP",
    description: "Modern format, best compression",
  },
];

export default function ImageConverter() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("image/jpeg");
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
        }
        setPreviewUrl(URL.createObjectURL(file));
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
      const result = await convertImageFormat(selectedFile, targetFormat, 0.92);
      setConvertedImage(result);
      setStatus("completed");
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("error");
    }
  }, [selectedFile, targetFormat]);

  const getOutputFilename = () => {
    if (!selectedFile) return "converted-image";
    const name = selectedFile.name.replace(/\.[^/.]+$/, "");
    const ext = getExtensionForMimeType(targetFormat);
    return `${name}.${ext}`;
  };

  const getCurrentFormat = () => {
    if (!selectedFile) return "Unknown";
    const type = selectedFile.type;
    if (type.includes("jpeg") || type.includes("jpg")) return "JPG";
    if (type.includes("png")) return "PNG";
    if (type.includes("webp")) return "WebP";
    if (type.includes("gif")) return "GIF";
    if (type.includes("bmp")) return "BMP";
    return selectedFile.name.split(".").pop()?.toUpperCase() || "Unknown";
  };

  return (
    <ToolLayout
      title="Image Format Converter - Convert JPG PNG WebP Free"
      description="Convert images between JPG, PNG, and WebP formats online for free. No signup, no watermarks, instant download. Works on any device."
      category="Image Tools"
      keywords="image converter, convert jpg to png, png to jpg, jpg to webp, image format converter, convert image online free, change image format"
      toolContext="image-converter"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <FileUploader
                accept={{
                  "image/*": [".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload image to convert (max 10MB)"
              />

              {selectedFile && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-blue-100 flex items-center justify-center">
                      <ImageIcon className="size-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)} • {getCurrentFormat()} format
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-sm font-medium">Convert To</Label>
                <RadioGroup
                  value={targetFormat}
                  onValueChange={(v) => setTargetFormat(v as ImageFormat)}
                  className="grid grid-cols-3 gap-4"
                >
                  {FORMAT_OPTIONS.map((option) => (
                    <Label
                      key={option.value}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                        targetFormat === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      <span className="text-lg font-bold">{option.label}</span>
                      <span className="text-xs text-muted-foreground text-center">
                        {option.description}
                      </span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <Button
                onClick={handleConvert}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <RefreshCw className="mr-2 size-4" />
                {status === "processing" ? "Converting..." : "Convert Image"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus status={status} />
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {convertedImage ? (
                <div className="text-center space-y-4">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <RefreshCw className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Image Converted!</h3>
                    <p className="text-sm text-muted-foreground">
                      {getCurrentFormat()} → {getExtensionForMimeType(targetFormat).toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      New size: {formatFileSize(convertedImage.size)}
                    </p>
                  </div>
                  <DownloadButton
                    data={convertedImage}
                    filename={getOutputFilename()}
                    mimeType={targetFormat}
                    size="lg"
                  >
                    Download Converted Image
                  </DownloadButton>
                </div>
              ) : previewUrl ? (
                <div className="text-center space-y-4">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-h-64 max-w-full rounded-lg border"
                  />
                  <p className="text-sm text-muted-foreground">Original image preview</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <RefreshCw className="size-12 mx-auto mb-4 opacity-20" />
                  <p>Converted image will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Image Format Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
