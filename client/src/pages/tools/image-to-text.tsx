import { useState, useCallback } from "react";
import { FileText, Copy, Check, Languages, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  DownloadButton,
  ToolFAQ,
  RelatedTools,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import {
  performOCR,
  SUPPORTED_LANGUAGES,
  type OCRLanguage,
  type OCRProgress,
} from "@/lib/tools/ocr-utils";

const FAQS = [
  {
    question: "How do I convert an image to text?",
    answer:
      "Simply upload your image (JPG, PNG, or screenshot) to our free image to text converter. Select your language, click 'Extract Text', and the OCR tool will automatically recognize and extract all text from your image. You can then copy or download the extracted text.",
  },
  {
    question: "Is this image to text converter free?",
    answer:
      "Yes, our image to text converter is 100% free with no limits. There's no signup required, no watermarks, and no hidden fees. You can convert as many images to text as you need.",
  },
  {
    question: "What image formats can I convert to text?",
    answer:
      "Our OCR tool supports all common image formats: JPG/JPEG, PNG, GIF, BMP, TIFF, and WebP. You can also extract text from screenshots, scanned documents, photos of receipts, business cards, and handwritten notes.",
  },
  {
    question: "Can I extract text from a photo on my phone?",
    answer:
      "Yes! Our photo to text converter works on any device including iPhone and Android. Simply upload a photo from your camera roll or take a new picture and extract the text instantly.",
  },
  {
    question: "What languages does the OCR support?",
    answer:
      "We support 12 languages: English, Arabic, French, German, Spanish, Italian, Portuguese, Russian, Chinese (Simplified and Traditional), Japanese, and Korean. Select your language before extracting for best accuracy.",
  },
  {
    question: "Is my image data secure and private?",
    answer:
      "Absolutely. All OCR processing happens locally in your browser using Tesseract.js. Your images are never uploaded to any server. Once you close the page, all data is gone - ensuring complete privacy.",
  },
  {
    question: "How accurate is the text extraction?",
    answer:
      "Our OCR typically achieves 95%+ accuracy on clear, printed text. For best results, use high-resolution images with good lighting, ensure text is not skewed, and select the correct language.",
  },
  {
    question: "Can I extract text from a screenshot?",
    answer:
      "Yes! Our screenshot to text feature works perfectly. Take a screenshot on your computer or phone, upload it, and extract all the text instantly. Great for copying text from images, PDFs, or locked documents.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Screenshot to Text",
    description: "Convert screenshots to editable text",
    href: "/tools/screenshot-to-text",
    icon: Image,
    category: "OCR & Text Extraction",
  },
  {
    title: "PDF to Text Extractor",
    description: "Extract text from PDF documents",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
  {
    title: "Handwriting to Text",
    description: "Convert handwritten notes to digital text",
    href: "/tools/handwriting-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
];

export default function ImageToText() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [language, setLanguage] = useState<OCRLanguage>("eng");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setExtractedText("");
      setStatus("idle");
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleExtractText = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setProgress(0);
    setExtractedText("");

    try {
      const handleProgress = (ocrProgress: OCRProgress) => {
        setProgress(ocrProgress.progress);
        setProgressMessage(ocrProgress.status);
      };

      const result = await performOCR(selectedFile, language, handleProgress);
      setExtractedText(result.text);
      setStatus("completed");
    } catch (error) {
      console.error("OCR error:", error);
      setStatus("error");
      setProgressMessage(
        error instanceof Error ? error.message : "Failed to extract text"
      );
    }
  }, [selectedFile, language]);

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [extractedText]);

  const getProgressMessage = () => {
    if (progressMessage.includes("loading")) return "Loading OCR engine...";
    if (progressMessage.includes("initializing")) return "Initializing...";
    if (progressMessage.includes("recognizing")) return "Extracting text...";
    return progressMessage || "Processing...";
  };

  return (
    <ToolLayout
      title="Image to Text Converter - Free Online OCR Tool"
      description="Convert image to text instantly with our free OCR tool. Extract text from JPG, PNG, screenshots & photos. Supports 12 languages. No signup, 100% private."
      category="OCR & Text Extraction"
      keywords="image to text, photo to text, picture to text, OCR online free, extract text from image, jpg to text, png to text, screenshot to text, image text extractor, convert image to text, free OCR converter, online OCR, text from image"
      toolContext="image-to-text"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "image/*": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".webp"],
                }}
                maxSize={10 * 1024 * 1024} // 10MB
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Supports JPG, PNG, GIF, BMP, TIFF, WebP"
              />

              {/* Language Selection */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Languages className="size-4" />
                  <span>Language:</span>
                </div>
                <Select
                  value={language}
                  onValueChange={(value) => setLanguage(value as OCRLanguage)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
                      <SelectItem key={code} value={code}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Extract Button */}
              <Button
                onClick={handleExtractText}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                {status === "processing" ? "Extracting..." : "Extract Text"}
              </Button>
            </CardContent>
          </Card>

          {/* Processing Status */}
          <ProcessingStatus
            status={status}
            progress={progress}
            message={getProgressMessage()}
          />
        </div>

        {/* Right Column - Results */}
        <div className="space-y-4">
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="size-4" />
                  Extracted Text
                </h3>
                {extractedText && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyText}
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="size-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <DownloadButton
                      data={extractedText}
                      filename="extracted-text.txt"
                      mimeType="text/plain"
                      variant="outline"
                      size="sm"
                    >
                      Download
                    </DownloadButton>
                  </div>
                )}
              </div>
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder="Extracted text will appear here..."
                className="flex-1 min-h-[300px] resize-none font-mono text-sm"
                readOnly={status === "processing"}
              />
              {extractedText && (
                <p className="text-xs text-muted-foreground mt-2">
                  {extractedText.split(/\s+/).filter(Boolean).length} words |{" "}
                  {extractedText.length} characters
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          How to Use Image to Text Converter
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Upload Image</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop your image or click to browse. Supports JPG, PNG,
                and other formats.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Select Language</h3>
              <p className="text-sm text-muted-foreground">
                Choose the language of the text in your image for better
                accuracy.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Extract & Download</h3>
              <p className="text-sm text-muted-foreground">
                Click Extract Text, then copy or download your extracted text.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <ToolFAQ faqs={FAQS} toolName="Image to Text Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
