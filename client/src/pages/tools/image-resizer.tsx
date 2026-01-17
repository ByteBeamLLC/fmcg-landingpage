import { useState, useCallback } from "react";
import { Maximize2, Image as ImageIcon, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { resizeImage, getImageDimensions } from "@/lib/tools/image-utils";

const FAQS = [
  {
    question: "How do I resize an image online?",
    answer:
      "Upload your image, enter the desired width and height, and click 'Resize Image'. Download your resized image instantly.",
  },
  {
    question: "Is this image resizer free?",
    answer:
      "Yes! Resize images completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "Will resizing affect image quality?",
    answer:
      "We use high-quality image scaling algorithms to minimize quality loss. Enlarging images significantly may reduce sharpness, but downscaling typically preserves quality well.",
  },
  {
    question: "What is aspect ratio lock?",
    answer:
      "When aspect ratio is locked, changing the width automatically calculates the height (and vice versa) to maintain the original image proportions and prevent distortion.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support JPG, PNG, WebP, GIF, and BMP formats. The output format matches your input format.",
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

const PRESET_SIZES = [
  { name: "HD", width: 1280, height: 720 },
  { name: "Full HD", width: 1920, height: 1080 },
  { name: "4K", width: 3840, height: 2160 },
  { name: "Instagram", width: 1080, height: 1080 },
  { name: "Twitter", width: 1200, height: 675 },
  { name: "Facebook", width: 1200, height: 630 },
];

export default function ImageResizer() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [targetWidth, setTargetWidth] = useState("");
  const [targetHeight, setTargetHeight] = useState("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizedImage, setResizedImage] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setResizedImage(null);
      setStatus("idle");

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));

      try {
        const dimensions = await getImageDimensions(file);
        setOriginalDimensions(dimensions);
        setTargetWidth(dimensions.width.toString());
        setTargetHeight(dimensions.height.toString());
      } catch {
        setOriginalDimensions({ width: 0, height: 0 });
      }
    } else {
      setSelectedFile(null);
      setOriginalDimensions({ width: 0, height: 0 });
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  }, [previewUrl]);

  const handleWidthChange = useCallback(
    (value: string) => {
      setTargetWidth(value);
      if (maintainAspectRatio && originalDimensions.width > 0) {
        const ratio = originalDimensions.height / originalDimensions.width;
        const newHeight = Math.round(parseInt(value) * ratio);
        if (!isNaN(newHeight)) {
          setTargetHeight(newHeight.toString());
        }
      }
    },
    [maintainAspectRatio, originalDimensions]
  );

  const handleHeightChange = useCallback(
    (value: string) => {
      setTargetHeight(value);
      if (maintainAspectRatio && originalDimensions.height > 0) {
        const ratio = originalDimensions.width / originalDimensions.height;
        const newWidth = Math.round(parseInt(value) * ratio);
        if (!isNaN(newWidth)) {
          setTargetWidth(newWidth.toString());
        }
      }
    },
    [maintainAspectRatio, originalDimensions]
  );

  const handlePresetClick = useCallback(
    (preset: { width: number; height: number }) => {
      if (maintainAspectRatio) {
        const originalRatio = originalDimensions.width / originalDimensions.height;
        const presetRatio = preset.width / preset.height;

        if (originalRatio > presetRatio) {
          setTargetWidth(preset.width.toString());
          setTargetHeight(Math.round(preset.width / originalRatio).toString());
        } else {
          setTargetHeight(preset.height.toString());
          setTargetWidth(Math.round(preset.height * originalRatio).toString());
        }
      } else {
        setTargetWidth(preset.width.toString());
        setTargetHeight(preset.height.toString());
      }
    },
    [maintainAspectRatio, originalDimensions]
  );

  const handleResize = useCallback(async () => {
    if (!selectedFile) return;

    const width = parseInt(targetWidth);
    const height = parseInt(targetHeight);

    if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
      return;
    }

    setStatus("processing");

    try {
      const result = await resizeImage(selectedFile, width, height, false);
      setResizedImage(result);
      setStatus("completed");
    } catch (error) {
      console.error("Resize error:", error);
      setStatus("error");
    }
  }, [selectedFile, targetWidth, targetHeight]);

  const getOutputFilename = () => {
    if (!selectedFile) return "resized-image";
    const name = selectedFile.name.replace(/\.[^/.]+$/, "");
    const ext = selectedFile.type === "image/png" ? "png" : "jpg";
    return `${name}-${targetWidth}x${targetHeight}.${ext}`;
  };

  return (
    <ToolLayout
      title="Resize Image Online Free - Image Resizer Tool"
      description="Resize images online for free. Change image dimensions to any size. Supports JPG, PNG, WebP. No signup, no watermarks, instant download."
      category="Image Tools"
      keywords="resize image, image resizer, resize photo, change image size, resize picture online free, resize image dimensions, photo resizer"
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
                description="Upload image to resize (max 10MB)"
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
                        {formatFileSize(selectedFile.size)} • {originalDimensions.width} x{" "}
                        {originalDimensions.height}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">New Dimensions</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="aspect-ratio" className="text-xs text-muted-foreground">
                      Lock aspect ratio
                    </Label>
                    <Switch
                      id="aspect-ratio"
                      checked={maintainAspectRatio}
                      onCheckedChange={setMaintainAspectRatio}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Width (px)</Label>
                    <Input
                      type="number"
                      value={targetWidth}
                      onChange={(e) => handleWidthChange(e.target.value)}
                      disabled={!selectedFile}
                      min={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Height (px)</Label>
                    <Input
                      type="number"
                      value={targetHeight}
                      onChange={(e) => handleHeightChange(e.target.value)}
                      disabled={!selectedFile}
                      min={1}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Presets</Label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_SIZES.map((preset) => (
                      <Button
                        key={preset.name}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePresetClick(preset)}
                        disabled={!selectedFile}
                        className="text-xs"
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                onClick={handleResize}
                disabled={
                  !selectedFile ||
                  !targetWidth ||
                  !targetHeight ||
                  status === "processing"
                }
                className="w-full"
                size="lg"
              >
                <Maximize2 className="mr-2 size-4" />
                {status === "processing" ? "Resizing..." : "Resize Image"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus status={status} />
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {resizedImage ? (
                <div className="text-center space-y-4">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Maximize2 className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Image Resized!</h3>
                    <p className="text-sm text-muted-foreground">
                      New size: {targetWidth} x {targetHeight} pixels
                    </p>
                  </div>
                  <DownloadButton
                    data={resizedImage}
                    filename={getOutputFilename()}
                    mimeType={selectedFile?.type || "image/jpeg"}
                    size="lg"
                  >
                    Download Resized Image
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
                  <Maximize2 className="size-12 mx-auto mb-4 opacity-20" />
                  <p>Resized image will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Image Resizer" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
