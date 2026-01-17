import { useState, useCallback } from "react";
import {
  FileText,
  Copy,
  Check,
  Download,
  AlertCircle,
  Sparkles,
  Languages,
  Zap,
  Shield,
  Lock,
  FileCheck,
  Globe,
  Clock,
  Briefcase,
  GraduationCap,
  Users,
  BookOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  HowItWorks,
  Features,
  UseCases,
  WhatYouGet,
  TechnicalInfo,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { performOCR, type OCRProgress } from "@/lib/tools/ocr-utils";
import { summarizeDocument } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload or Paste",
    description: "Upload a PDF, image with text, or paste text directly into the tool.",
  },
  {
    title: "Choose Length",
    description: "Select short, medium, or long summary based on how much detail you need.",
  },
  {
    title: "AI Summarizes",
    description: "Our AI reads the entire document and extracts the most important information.",
  },
  {
    title: "Download & Share",
    description: "Copy the summary or download it. Available in multiple languages.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Summaries",
    description: "Get concise summaries in seconds, not hours of reading long documents.",
  },
  {
    icon: Shield,
    title: "Key Points Extraction",
    description: "AI identifies and highlights the most important information in your document.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Text extraction happens in your browser. We never store your documents.",
  },
  {
    icon: FileCheck,
    title: "Any Document Type",
    description: "PDFs, images, articles, reports, research papers, contracts—all supported.",
  },
  {
    icon: Globe,
    title: "Multi-Language Output",
    description: "Get summaries in English, Spanish, French, German, Arabic, Chinese, and more.",
  },
  {
    icon: Clock,
    title: "Adjustable Length",
    description: "Choose short bullet points or detailed paragraphs based on your needs.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "Business Professionals",
    description: "Quickly summarize reports, proposals, and meeting notes to save time and stay informed.",
  },
  {
    icon: GraduationCap,
    title: "Students & Researchers",
    description: "Summarize research papers, textbooks, and academic articles for faster studying.",
  },
  {
    icon: BookOpen,
    title: "Content Creators",
    description: "Condense source material into key points for articles, videos, and presentations.",
  },
  {
    icon: Users,
    title: "Teams & Managers",
    description: "Create executive summaries from lengthy documents to share with stakeholders.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Concise, accurate document summaries",
  "Key points and main arguments extracted",
  "Adjustable summary length (short/medium/long)",
  "Multi-language output options",
  "Compression ratio statistics",
  "Word count before and after",
  "Copy-to-clipboard functionality",
  "Downloadable summary text file",
  "Support for PDFs and images (OCR)",
  "Privacy-first local text extraction",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our document summarizer uses advanced large language models (LLMs) trained on millions of documents. The AI understands context, identifies key arguments, and generates coherent summaries that capture essential information. For PDFs and images, text is extracted locally using PDF.js and Tesseract OCR before AI summarization.",
  technologies: ["GPT-4 / Claude AI", "Extractive & Abstractive Summarization", "Tesseract OCR", "PDF.js", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "How does the AI document summarizer work?",
    answer:
      "Upload your document (PDF or image) or paste text directly, select your desired summary length, and our AI analyzes the entire content. It identifies key points, main arguments, and essential information, then generates a concise summary.",
  },
  {
    question: "What document types are supported?",
    answer:
      "We support PDF documents, images with text (using OCR), and direct text input. Works with articles, reports, contracts, research papers, meeting notes, books, and any text-based content.",
  },
  {
    question: "Is my document data secure and private?",
    answer:
      "Yes. Text extraction from PDFs and images happens locally in your browser—your files never leave your device. Only the extracted text is sent to our AI for summarization over an encrypted connection. We don't store your documents.",
  },
  {
    question: "What summary lengths are available?",
    answer:
      "Choose from three levels: Short (2-3 sentences, key points only), Medium (1-2 paragraphs, main ideas), or Long (3-4 paragraphs, comprehensive overview). Select based on how much detail you need.",
  },
  {
    question: "Can I get summaries in different languages?",
    answer:
      "Yes! You can summarize documents in any language and choose to output the summary in English, Spanish, French, German, Italian, Portuguese, Arabic, Chinese, Japanese, or Korean.",
  },
  {
    question: "How accurate are the AI summaries?",
    answer:
      "The AI produces accurate summaries that capture the main points of most documents. However, for highly technical or specialized content, some nuances may be simplified. Always review summaries for critical use cases.",
  },
  {
    question: "What's the maximum document size?",
    answer:
      "You can upload files up to 10MB. For very long documents, the AI focuses on the most important sections. Most articles, reports, and papers work well within this limit.",
  },
  {
    question: "Is there a limit on document summarization?",
    answer:
      "Free users can summarize up to 10 documents per hour. For unlimited summarization, batch processing, and team features, explore ByteBeam's document automation platform.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "PDF Chat",
    description: "Chat with your documents",
    href: "/tools/pdf-chat",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
  {
    title: "AI File Search",
    description: "Search across multiple documents",
    href: "/tools/file-search",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
  {
    title: "Legal Summarizer",
    description: "Summarize legal documents",
    href: "/tools/legal-summarizer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Contract Analyzer",
    description: "Analyze contracts with AI",
    href: "/tools/contract-analyzer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "PDF to Text",
    description: "Extract text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "Image to Text",
    description: "OCR for images",
    href: "/tools/image-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
];

const LANGUAGES = [
  { code: "auto", name: "Same as document" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ar", name: "Arabic" },
  { code: "zh", name: "Chinese" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
];

type SummaryLength = "short" | "medium" | "long";

export default function AISummarizer() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState<SummaryLength>("medium");
  const [language, setLanguage] = useState("auto");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<"file" | "text">("file");

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setSummary("");
      setError(null);
      setStatus("processing");
      setProgress(0);

      try {
        let text = "";

        if (file.type === "application/pdf") {
          setProgressMessage("Extracting text from PDF...");
          setProgress(50);
          text = await extractTextFromPDF(file);
        } else {
          const handleProgress = (ocrProgress: OCRProgress) => {
            setProgress(Math.min(ocrProgress.progress * 0.8, 80));
            setProgressMessage(ocrProgress.status);
          };

          const result = await performOCR(file, "eng", handleProgress);
          text = result.text;
        }

        setInputText(text);
        setStatus("idle");
        setProgress(100);
      } catch (err) {
        console.error("Text extraction error:", err);
        setError("Failed to extract text. Please try another file.");
        setStatus("error");
      }
    } else {
      setSelectedFile(null);
      setInputText("");
    }
  }, []);

  const handleSummarize = useCallback(async () => {
    if (!inputText.trim()) {
      setError("Please provide text to summarize");
      return;
    }

    setStatus("processing");
    setProgress(0);
    setError(null);
    setSummary("");
    setProgressMessage("Generating summary with AI...");

    try {
      setProgress(50);
      const response = await summarizeDocument({
        text: inputText,
        length: summaryLength,
        language: language !== "auto" ? language : undefined,
      });

      setSummary(response.content);
      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Summarization error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate summary");
      setStatus("error");
    }
  }, [inputText, summaryLength, language]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [summary]);

  const wordCount = inputText.trim().split(/\s+/).filter(Boolean).length;
  const summaryWordCount = summary.trim().split(/\s+/).filter(Boolean).length;

  return (
    <ToolLayout
      title="AI Document Summarizer"
      description="Summarize documents instantly using AI. Get concise summaries of PDFs, articles, reports, and research papers. Choose short, medium, or long summaries in multiple languages. Free AI summarizer tool."
      category="Search, Chat & Summarization"
      keywords="AI summarizer, document summarizer, summarize PDF, text summarizer, article summarizer, free summarizer, AI summary, research paper summarizer, report summary, meeting notes summarizer"
      isAIPowered={true}
      toolContext="document-summarization"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2 mb-4">
                <Button
                  variant={inputMode === "file" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMode("file")}
                >
                  Upload File
                </Button>
                <Button
                  variant={inputMode === "text" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setInputMode("text")}
                >
                  Paste Text
                </Button>
              </div>

              {inputMode === "file" ? (
                <FileUploader
                  accept={{
                    "application/pdf": [".pdf"],
                    "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                  }}
                  maxSize={10 * 1024 * 1024}
                  multiple={false}
                  onFilesSelected={handleFilesSelected}
                  description="Upload document (PDF or image)"
                />
              ) : (
                <div className="space-y-2">
                  <Label>Paste your text</Label>
                  <Textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste the text you want to summarize..."
                    className="min-h-[200px]"
                  />
                  {wordCount > 0 && (
                    <p className="text-xs text-muted-foreground text-right">
                      {wordCount.toLocaleString()} words
                    </p>
                  )}
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 pt-2">
                <div>
                  <Label className="mb-2 block">Summary Length</Label>
                  <RadioGroup
                    value={summaryLength}
                    onValueChange={(value) => setSummaryLength(value as SummaryLength)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="short" id="short" />
                      <Label htmlFor="short" className="cursor-pointer">Short</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="long" id="long" />
                      <Label htmlFor="long" className="cursor-pointer">Long</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Languages className="size-4" />
                    <span>Output:</span>
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleSummarize}
                disabled={!inputText.trim() || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Sparkles className="mr-2 size-4" />
                {status === "processing" ? "Summarizing..." : "Summarize Document"}
              </Button>
            </CardContent>
          </Card>

          {status !== "idle" && (
            <ProcessingStatus
              status={status}
              progress={progress}
              message={progressMessage || "Processing..."}
            />
          )}

          {inputMode === "file" && inputText && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">Extracted Text</h3>
                  <span className="text-xs text-muted-foreground">
                    {wordCount.toLocaleString()} words
                  </span>
                </div>
                <Textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[150px] text-sm"
                />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  AI Summary
                </h3>
                {summary && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {summaryWordCount} words
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="gap-2"
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <DownloadButton
                      data={summary}
                      filename="summary.txt"
                      mimeType="text/plain"
                      variant="outline"
                      size="sm"
                    >
                      <Download className="size-4 mr-1" />
                      TXT
                    </DownloadButton>
                  </div>
                )}
              </div>

              {summary ? (
                <div className="flex-1 overflow-auto">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                      {summary}
                    </p>
                  </div>

                  {wordCount > 0 && summaryWordCount > 0 && (
                    <div className="mt-4 p-3 border rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Compression</span>
                        <span className="font-medium">
                          {Math.round((1 - summaryWordCount / wordCount) * 100)}% reduction
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">Original</span>
                        <span>{wordCount.toLocaleString()} words</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Summary</span>
                        <span>{summaryWordCount.toLocaleString()} words</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Sparkles className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a document or paste text to generate a summary</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How the AI Summarizer Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="AI Summarizer Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses the AI Summarizer?"
        subtitle="From business professionals saving time on reports to students studying research papers, AI summarization makes reading more efficient."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What You Get"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by Advanced AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="AI Document Summarizer" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
