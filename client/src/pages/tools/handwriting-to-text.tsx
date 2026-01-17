import { useState, useCallback } from "react";
import { PenTool, Copy, Check, Languages, FileText } from "lucide-react";
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
    question: "How do I convert handwriting to text?",
    answer:
      "Upload a photo or scan of your handwritten notes, select the language, and click 'Extract Text'. Our OCR will recognize your handwriting and convert it to editable text.",
  },
  {
    question: "Is this handwriting to text converter free?",
    answer:
      "Yes! Convert handwritten notes to text for free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "What types of handwriting does it recognize?",
    answer:
      "Our tool works best with clear, legible handwriting. Print-style handwriting typically works better than cursive. Well-lit, high-contrast images give the best results.",
  },
  {
    question: "Can I convert handwritten notes from my phone?",
    answer:
      "Absolutely! Take a photo of your handwritten notes with your iPhone or Android camera and upload it directly. Make sure the image is well-lit and in focus.",
  },
  {
    question: "Is my handwritten document data secure?",
    answer:
      "100% secure. All OCR processing happens locally in your browser. Your handwritten notes are never uploaded to any server.",
  },
  {
    question: "What languages are supported for handwriting?",
    answer:
      "We support 12 languages including English, Arabic, Chinese, Japanese, Korean, Spanish, French, German, and more. Select your language before processing.",
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

export default function HandwritingToText() {
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
      title="Handwriting to Text Converter - Convert Notes to Text Free"
      description="Convert handwritten notes to text online for free. OCR tool to digitize handwriting from photos or scans. No signup required, works on any device."
      category="OCR & Text Extraction"
      keywords="handwriting to text, convert handwriting to text, handwritten notes to text, handwriting OCR, digitize handwriting, handwriting recognition"
      toolContext="handwriting-to-text"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp", ".bmp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload handwritten notes (JPG, PNG, HEIC)"
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
                <PenTool className="mr-2 size-4" />
                {status === "processing" ? "Recognizing..." : "Extract Text"}
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
                      filename="handwriting-text.txt"
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

      <ToolFAQ faqs={FAQS} toolName="Handwriting to Text Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
