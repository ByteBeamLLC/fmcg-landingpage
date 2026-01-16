import { useState, useCallback } from "react";
import {
  Shrink,
  Image,
  ArrowRight,
  CheckCircle,
  ImagePlus,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
import { compressImage } from "@/lib/tools/image-utils";

const FAQS = [
  {
    question: "How does image compression work?",
    answer:
      "We use browser-image-compression to reduce image file sizes by optimizing encoding, reducing dimensions, and adjusting quality while maintaining visual fidelity.",
  },
  {
    question: "Will compression affect image quality?",
    answer:
      "You can control the balance between size and quality using the slider. Lower quality settings result in smaller files but may show some visual degradation.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support JPG, PNG, GIF, and WebP formats. The compressed image will maintain its original format.",
  },
  {
    question: "What's the maximum file size?",
    answer:
      "You can compress images up to 20MB in size.",
  },
  {
    question: "Is my data secure?",
    answer:
      "All compression happens locally in your browser. Your images are never uploaded to any server.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Image to PDF",
    description: "Convert images to PDF documents",
    href: "/tools/image-to-pdf",
    icon: ImagePlus,
    category: "Image Tools",
  },
  {
    title: "Image Format Converter",
    description: "Convert between image formats",
    href: "/tools/image-converter",
    icon: RefreshCw,
    category: "Image Tools",
  },
];

export default function ImageCompressor() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedImage, setCompressedImage] = useState<File | null>(null);
  const [compressedPreview, setCompressedPreview] = useState<string>("");
  const [quality, setQuality] = useState<number>(80);
  const [maxWidth, setMaxWidth] = useState<number>(1920);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setOriginalSize(file.size);
      setPreview(URL.createObjectURL(file));
      setCompressedImage(null);
      setCompressedPreview("");
      setStatus("idle");
    } else {
      setSelectedFile(null);
      setPreview("");
      setOriginalSize(0);
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setCompressedImage(null);
    setCompressedPreview("");

    try {
      const compressed = await compressImage(selectedFile, {
        maxSizeMB: (quality / 100) * 2, // Scale max size based on quality
        maxWidthOrHeight: maxWidth,
        useWebWorker: true,
      });

      setCompressedImage(compressed);
      setCompressedPreview(URL.createObjectURL(compressed));
      setStatus("completed");
    } catch (error) {
      console.error("Compression error:", error);
      setStatus("error");
    }
  }, [selectedFile, quality, maxWidth]);

  const compressionSavings = compressedImage
    ? ((originalSize - compressedImage.size) / originalSize) * 100
    : 0;

  return (
    <ToolLayout
      title="Free Image Compressor - Reduce Image Size Online"
      description="Compress JPG, PNG, and WebP images to reduce file size while maintaining quality. Free, fast, and secure - all processing in your browser."
      category="Image Tools"
      keywords="image compressor, compress image, reduce image size, image optimizer, compress jpg, compress png"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <FileUploader
                accept={{
                  "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
                }}
                maxSize={20 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload an image to compress (max 20MB)"
              />

              {/* Image Preview */}
              {preview && (
                <div className="relative rounded-lg overflow-hidden border border-border">
                  <img
                    src={preview}
                    alt="Original"
                    className="w-full h-48 object-contain bg-muted"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                    Original: {formatFileSize(originalSize)}
                  </div>
                </div>
              )}

              {/* Quality Slider */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Quality: {quality}%
                </Label>
                <Slider
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Smaller file</span>
                  <span>Better quality</span>
                </div>
              </div>

              {/* Max Width */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Max Width/Height: {maxWidth}px
                </Label>
                <Slider
                  value={[maxWidth]}
                  onValueChange={(value) => setMaxWidth(value[0])}
                  min={640}
                  max={4096}
                  step={64}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>640px</span>
                  <span>4096px</span>
                </div>
              </div>

              {/* Compress Button */}
              <Button
                onClick={handleCompress}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Shrink className="size-4 mr-2" />
                {status === "processing" ? "Compressing..." : "Compress Image"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            message={
              status === "processing"
                ? "Compressing your image..."
                : status === "error"
                ? "Failed to compress image. Please try again."
                : undefined
            }
          />
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Before/After Comparison */}
          {compressedImage && status === "completed" && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="size-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">
                    Compression Complete!
                  </h3>
                </div>

                {/* Compressed Preview */}
                <div className="relative rounded-lg overflow-hidden border border-green-200 mb-4">
                  <img
                    src={compressedPreview}
                    alt="Compressed"
                    className="w-full h-48 object-contain bg-white"
                  />
                </div>

                {/* Size Comparison */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex-1 text-center p-3 rounded-lg bg-white/60">
                    <p className="text-xs text-muted-foreground mb-1">
                      Original
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {formatFileSize(originalSize)}
                    </p>
                  </div>

                  <ArrowRight className="size-5 text-green-600" />

                  <div className="flex-1 text-center p-3 rounded-lg bg-white/60">
                    <p className="text-xs text-muted-foreground mb-1">
                      Compressed
                    </p>
                    <p className="text-lg font-bold text-green-700">
                      {formatFileSize(compressedImage.size)}
                    </p>
                  </div>
                </div>

                {/* Savings Badge */}
                <div className="text-center mb-4">
                  {compressionSavings > 0 ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800">
                      <Shrink className="size-4" />
                      <span className="font-semibold">
                        {compressionSavings.toFixed(1)}% size reduction
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-800">
                      <span className="text-sm">
                        Image is already well-optimized
                      </span>
                    </div>
                  )}
                </div>

                <DownloadButton
                  data={
                    compressedImage
                      ? new Blob([compressedImage], { type: compressedImage.type })
                      : null
                  }
                  filename={`compressed-${selectedFile?.name || "image.jpg"}`}
                  mimeType={compressedImage?.type || "image/jpeg"}
                  size="lg"
                  className="w-full"
                >
                  Download Compressed Image
                </DownloadButton>
              </CardContent>
            </Card>
          )}

          {/* Features Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Adjustable Quality</p>
                    <p className="text-xs text-muted-foreground">
                      Fine-tune compression level
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Resize Images</p>
                    <p className="text-xs text-muted-foreground">
                      Set maximum dimensions
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">100% Private</p>
                    <p className="text-xs text-muted-foreground">
                      All processing in browser
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Multiple Formats</p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG, WebP, GIF
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Image Compressor" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
