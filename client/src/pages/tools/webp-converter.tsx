import { useState, useCallback } from "react";
import { Zap, Image as ImageIcon, FileText } from "lucide-react";
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
import { convertImageFormat } from "@/lib/tools/image-utils";

type ConversionMode = "to-webp" | "from-webp";

const FAQS = [
  {
    question: "What is WebP format?",
    answer:
      "WebP is a modern image format developed by Google that provides superior compression. It can reduce file sizes by 25-35% compared to JPG and PNG while maintaining the same quality.",
  },
  {
    question: "How do I convert to or from WebP?",
    answer:
      "Upload your image, select whether you want to convert TO WebP or FROM WebP, and click 'Convert'. Download your converted image instantly.",
  },
  {
    question: "Is this WebP converter free?",
    answer:
      "Yes! Convert images to and from WebP completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "Why should I use WebP?",
    answer:
      "WebP offers smaller file sizes (faster loading websites), supports transparency like PNG, and supports animation like GIF. It's ideal for web use.",
  },
  {
    question: "Is WebP supported everywhere?",
    answer:
      "WebP is supported by all modern browsers (Chrome, Firefox, Safari, Edge). For older systems, you can convert WebP to JPG or PNG using this tool.",
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

export default function WebpConverter() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [conversionMode, setConversionMode] = useState<ConversionMode>("to-webp");
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

        // Auto-detect conversion mode
        if (file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp")) {
          setConversionMode("from-webp");
        } else {
          setConversionMode("to-webp");
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
      const targetFormat = conversionMode === "to-webp" ? "image/webp" : "image/jpeg";
      const result = await convertImageFormat(selectedFile, targetFormat, 0.92);
      setConvertedImage(result);
      setStatus("completed");
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("error");
    }
  }, [selectedFile, conversionMode]);

  const getOutputFilename = () => {
    if (!selectedFile) return "converted-image";
    const name = selectedFile.name.replace(/\.[^/.]+$/, "");
    const ext = conversionMode === "to-webp" ? "webp" : "jpg";
    return `${name}.${ext}`;
  };

  const getCurrentFormat = () => {
    if (!selectedFile) return "Unknown";
    const type = selectedFile.type;
    if (type.includes("webp")) return "WebP";
    if (type.includes("jpeg") || type.includes("jpg")) return "JPG";
    if (type.includes("png")) return "PNG";
    if (type.includes("gif")) return "GIF";
    return selectedFile.name.split(".").pop()?.toUpperCase() || "Unknown";
  };

  return (
    <ToolLayout
      title="WebP Converter - Convert to/from WebP Free Online"
      description="Convert images to WebP or WebP to JPG/PNG online for free. Reduce image file sizes with modern WebP format. No signup, instant download."
      category="Image Tools"
      keywords="webp converter, convert to webp, webp to jpg, webp to png, jpg to webp, png to webp, webp converter online free"
      toolContext="image-compressor"
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
                    <div className="size-10 rounded bg-green-100 flex items-center justify-center">
                      <Zap className="size-5 text-green-600" />
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
                <Label className="text-sm font-medium">Conversion Direction</Label>
                <RadioGroup
                  value={conversionMode}
                  onValueChange={(v) => setConversionMode(v as ConversionMode)}
                  className="grid grid-cols-2 gap-4"
                >
                  <Label
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                      conversionMode === "to-webp"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="to-webp" className="sr-only" />
                    <span className="text-lg font-bold">→ WebP</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Convert JPG/PNG to WebP
                    </span>
                  </Label>
                  <Label
                    className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                      conversionMode === "from-webp"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <RadioGroupItem value="from-webp" className="sr-only" />
                    <span className="text-lg font-bold">WebP →</span>
                    <span className="text-xs text-muted-foreground text-center">
                      Convert WebP to JPG
                    </span>
                  </Label>
                </RadioGroup>
              </div>

              <Button
                onClick={handleConvert}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Zap className="mr-2 size-4" />
                {status === "processing"
                  ? "Converting..."
                  : conversionMode === "to-webp"
                  ? "Convert to WebP"
                  : "Convert to JPG"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus status={status} />

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Benefits of WebP</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>25-35% smaller than JPG at same quality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Supports transparency like PNG</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Faster website loading times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Supported by all modern browsers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {convertedImage ? (
                <div className="text-center space-y-4">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Zap className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Image Converted!</h3>
                    <p className="text-sm text-muted-foreground">
                      {getCurrentFormat()} → {conversionMode === "to-webp" ? "WebP" : "JPG"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      New size: {formatFileSize(convertedImage.size)}
                    </p>
                  </div>
                  <DownloadButton
                    data={convertedImage}
                    filename={getOutputFilename()}
                    mimeType={conversionMode === "to-webp" ? "image/webp" : "image/jpeg"}
                    size="lg"
                  >
                    Download {conversionMode === "to-webp" ? "WebP" : "JPG"} Image
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
                  <Zap className="size-12 mx-auto mb-4 opacity-20" />
                  <p>Converted image will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="WebP Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
