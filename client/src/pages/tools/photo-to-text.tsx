import { useState, useCallback } from "react";
import { Camera, Copy, Check, Languages, FileText } from "lucide-react";
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
    question: "How do I convert a photo to text?",
    answer:
      "Upload your photo, select the text language, and click 'Extract Text'. Our OCR will scan the photo and extract all readable text in seconds.",
  },
  {
    question: "Is this photo to text converter free?",
    answer:
      "Yes! Convert unlimited photos to text for free. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "Can I extract text from phone camera photos?",
    answer:
      "Absolutely! Upload photos directly from your iPhone or Android camera roll. Works with any photo containing text.",
  },
  {
    question: "What types of photos work best?",
    answer:
      "Clear, well-lit photos with readable text work best. We support documents, signs, receipts, business cards, book pages, and more.",
  },
  {
    question: "Is my photo data secure?",
    answer:
      "100% secure. All processing happens locally in your browser. Your photos are never uploaded to any server.",
  },
  {
    question: "What languages can I extract from photos?",
    answer:
      "We support 12 languages including English, Arabic, Chinese, Japanese, Korean, Spanish, French, German, and more.",
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
    title: "Screenshot to Text",
    description: "Extract text from screenshots",
    href: "/tools/screenshot-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
];

export default function PhotoToText() {
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
    }
  }, [selectedFile, language]);

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [extractedText]);

  return (
    <ToolLayout
      title="Photo to Text Converter - Extract Text from Photos Free"
      description="Convert photos to text instantly. Extract text from camera photos, documents, signs, receipts. Free OCR tool for iPhone & Android. No signup required."
      category="OCR & Text Extraction"
      keywords="photo to text, extract text from photo, picture to text, camera to text, photo OCR, convert photo to text, text from picture"
      toolContext="photo-to-text"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload photo (JPG, PNG, HEIC)"
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
                <Camera className="mr-2 size-4" />
                {status === "processing" ? "Extracting..." : "Extract Text"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={progressMessage || "Processing..."}
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
                      filename="photo-text.txt"
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

      <ToolFAQ faqs={FAQS} toolName="Photo to Text Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
