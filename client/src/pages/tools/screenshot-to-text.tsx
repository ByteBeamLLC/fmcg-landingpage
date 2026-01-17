import { useState, useCallback } from "react";
import { MonitorUp, Copy, Check, Languages, FileText } from "lucide-react";
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
    question: "How do I extract text from a screenshot?",
    answer:
      "Simply upload or paste your screenshot, select the language, and click 'Extract Text'. Our OCR tool will recognize and extract all text from your screenshot instantly.",
  },
  {
    question: "Is this screenshot to text converter free?",
    answer:
      "Yes! Our screenshot OCR tool is 100% free with no limits. Extract text from as many screenshots as you need without signup or payment.",
  },
  {
    question: "Can I copy text from a screenshot on my phone?",
    answer:
      "Yes! Our tool works on any device. Take a screenshot on your iPhone or Android, upload it, and extract the text instantly.",
  },
  {
    question: "What screenshot formats are supported?",
    answer:
      "We support all common formats: PNG (most screenshots), JPG, WebP, and more. Any image format your device produces will work.",
  },
  {
    question: "Is my screenshot data private?",
    answer:
      "Completely private! All OCR processing happens locally in your browser. Your screenshots never leave your device.",
  },
  {
    question: "Can I extract text from a screenshot of a website?",
    answer:
      "Yes! Our tool can extract text from any screenshot - websites, apps, documents, error messages, code snippets, and more.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Image to Text (OCR)",
    description: "Extract text from any image",
    href: "/tools/image-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
  {
    title: "Photo to Text",
    description: "Convert photos to editable text",
    href: "/tools/photo-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
];

export default function ScreenshotToText() {
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
      title="Screenshot to Text - Extract Text from Screenshots Free"
      description="Extract text from screenshots instantly. Copy text from any screenshot on Windows, Mac, iPhone or Android. Free OCR tool, no signup required."
      category="OCR & Text Extraction"
      keywords="screenshot to text, extract text from screenshot, copy text from screenshot, screenshot OCR, screen capture to text, screenshot text extractor"
      toolContext="image-to-text"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "image/*": [".png", ".jpg", ".jpeg", ".webp", ".bmp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload screenshot (PNG, JPG, WebP)"
              />

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

              <Button
                onClick={handleExtractText}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <MonitorUp className="mr-2 size-4" />
                {status === "processing" ? "Extracting..." : "Extract Text"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={getProgressMessage()}
          />
        </div>

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
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <DownloadButton
                      data={extractedText}
                      filename="screenshot-text.txt"
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
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Screenshot to Text" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
