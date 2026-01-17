import { useState, useCallback } from "react";
import { QrCode, Copy, Check, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import jsQR from "jsqr";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  ToolFAQ,
  RelatedTools,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";

const FAQS = [
  {
    question: "How do I scan a QR code from an image?",
    answer:
      "Upload an image containing a QR code, and our tool will automatically detect and decode it. The content will be displayed instantly.",
  },
  {
    question: "Is this QR code reader free?",
    answer:
      "Yes! Scan and decode unlimited QR codes for free. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "What image formats are supported?",
    answer:
      "We support all common image formats including JPG, PNG, WebP, GIF, and BMP. Screenshots work perfectly too.",
  },
  {
    question: "Can I scan QR codes from screenshots?",
    answer:
      "Yes! Take a screenshot of any QR code and upload it. Our scanner will detect and decode it automatically.",
  },
  {
    question: "What types of QR codes can be read?",
    answer:
      "We can read all standard QR codes including URLs, text, email, phone numbers, WiFi credentials, and more.",
  },
  {
    question: "Is my data secure?",
    answer:
      "100% secure. All QR code scanning happens in your browser. Your images never leave your device.",
  },
];

const RELATED_TOOLS = [
  {
    title: "QR Code Generator",
    description: "Create custom QR codes",
    href: "/tools/qr-code-generator",
    icon: QrCode,
    category: "QR & Barcode",
  },
];

export default function QRCodeReader() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [decodedContent, setDecodedContent] = useState("");
  const [copied, setCopied] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFilesSelected = useCallback(
    async (files: File[]) => {
      if (files.length === 0) {
        setDecodedContent("");
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        return;
      }

      const file = files[0];
      setStatus("processing");
      setDecodedContent("");

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(URL.createObjectURL(file));

      try {
        // Create image from file
        const img = new Image();
        const imageUrl = URL.createObjectURL(file);

        img.onload = () => {
          // Create canvas and draw image
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            setStatus("error");
            URL.revokeObjectURL(imageUrl);
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          // Decode QR code
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          URL.revokeObjectURL(imageUrl);

          if (code) {
            setDecodedContent(code.data);
            setStatus("completed");
          } else {
            setDecodedContent("");
            setStatus("error");
          }
        };

        img.onerror = () => {
          URL.revokeObjectURL(imageUrl);
          setStatus("error");
        };

        img.src = imageUrl;
      } catch (error) {
        console.error("QR scan error:", error);
        setStatus("error");
      }
    },
    [previewUrl]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(decodedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [decodedContent]);

  const isUrl = decodedContent.startsWith("http://") || decodedContent.startsWith("https://");

  return (
    <ToolLayout
      title="QR Code Reader - Scan QR Codes from Image Free"
      description="Scan and decode QR codes from images online for free. Upload a screenshot or photo of a QR code to read its content instantly. No signup required."
      category="QR & Barcode"
      keywords="qr code reader, scan qr code, qr code scanner, read qr code from image, qr code decoder, scan qr code online free, qr scanner"
      toolContext="pdf-merger"
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
                description="Upload image with QR code"
              />

              {previewUrl && (
                <div className="flex justify-center">
                  <img
                    src={previewUrl}
                    alt="Uploaded image"
                    className="max-h-48 rounded-lg border"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            message={
              status === "error"
                ? "No QR code found in the image. Try a clearer image."
                : undefined
            }
          />
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {decodedContent ? (
                <div className="text-center space-y-4 w-full max-w-md">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <QrCode className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">QR Code Decoded!</h3>
                    <p className="text-sm text-muted-foreground">
                      Content found in the QR code:
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50 border text-left break-all">
                    <p className="font-mono text-sm">{decodedContent}</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={handleCopy} variant="outline" className="gap-2">
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    {isUrl && (
                      <Button asChild className="gap-2">
                        <a href={decodedContent} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-4" />
                          Open Link
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <QrCode className="size-24 mx-auto mb-4 opacity-20" />
                  <p>Upload an image to scan QR code</p>
                  <p className="text-xs mt-2">
                    Works with screenshots, photos, or any image with a QR code
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="QR Code Reader" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
