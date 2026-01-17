import { useState, useCallback } from "react";
import {
  Search,
  FileText,
  Copy,
  Check,
  Download,
  AlertCircle,
  X,
  File,
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Lock,
  FileCheck,
  Globe,
  Brain,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  DownloadButton,
  ToolFAQ,
  RelatedTools,
  HowItWorks,
  Features,
  WhatYouGet,
  TechnicalInfo,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { performOCR, type OCRProgress } from "@/lib/tools/ocr-utils";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload Documents",
    description: "Upload PDFs, scanned documents, or images—technical manuals, TSBs, SOPs, compliance docs.",
  },
  {
    title: "Describe What You Need",
    description: "Type what you're looking for in plain language. No need to guess exact keywords.",
  },
  {
    title: "AI Searches by Meaning",
    description: "Our AI understands context and finds relevant sections even when exact words don't match.",
  },
  {
    title: "Review Results",
    description: "Get ranked results with excerpts, relevance scores, and AI summary of findings.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Brain,
    title: "Semantic Search",
    description: "Finds content by meaning, not just keywords. Search 'engine overheating' to find 'coolant system procedure'.",
  },
  {
    icon: FileCheck,
    title: "Multi-Document Search",
    description: "Upload and search across multiple documents at once. Perfect for large documentation sets.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "Text extraction happens in your browser. Documents never leave your device until you search.",
  },
  {
    icon: Globe,
    title: "Any Document Format",
    description: "PDFs, scanned documents, images, text files. OCR extracts text from non-digital sources.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get ranked results with relevance scores and key excerpts in seconds.",
  },
  {
    icon: Shield,
    title: "Technical Language Support",
    description: "Understands technical terminology in automotive, aviation, pharma, and manufacturing domains.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Semantic search across multiple documents",
  "Ranked results by relevance (High/Medium/Low)",
  "Key excerpts from each matching document",
  "AI-generated summary of findings",
  "Multi-format support (PDF, images, text)",
  "OCR for scanned documents and photos",
  "Word count and processing status",
  "Exportable search results",
  "Copy-to-clipboard functionality",
  "Privacy-first local text extraction",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our AI document search uses advanced large language models (LLMs) for semantic understanding. Unlike keyword search that requires exact matches, our AI understands synonyms, context, and technical terminology. Documents are processed locally using PDF.js and Tesseract OCR, then semantic search is performed via our AI. This approach catches relevant content that traditional search misses.",
  technologies: ["GPT-4 / Claude AI", "Semantic Vector Search", "Tesseract OCR", "PDF.js", "256-bit Encryption"],
};

const FAQS = [
  {
    question: "How is AI search different from regular PDF search?",
    answer:
      "Regular search requires exact keyword matches. AI search understands meaning and context - search for 'payment terms' and it finds 'invoices due within 30 days' even without those exact words. It's less picky on keywords and finds what you actually need.",
  },
  {
    question: "What industries use this tool?",
    answer:
      "Automotive shops searching Technical Service Bulletins (TSBs), aviation technicians with maintenance manuals, oil & gas workers with SOPs and safety protocols, pharmaceutical teams with compliance binders and validation documents, and anyone dealing with large technical documentation.",
  },
  {
    question: "Can I search multiple documents at once?",
    answer:
      "Yes! Upload multiple PDFs, manuals, or scanned documents. The AI searches across all of them simultaneously and tells you which document each result came from - perfect for finding that one paragraph hidden on page 147.",
  },
  {
    question: "What file types are supported?",
    answer:
      "PDFs (including scanned documents), images (JPG, PNG, HEIC, WebP), and text files. Scanned documents and images are processed with OCR to extract searchable text before AI analysis.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Text extraction happens locally in your browser. Only the extracted text is sent to our AI for analysis. We don't store your documents - important for compliance-sensitive industries like pharma and aviation.",
  },
  {
    question: "How does it handle technical documentation?",
    answer:
      "The AI understands technical language and context. Search aircraft maintenance manuals, equipment SOPs, regulatory submissions, or service bulletins using natural language - describe the problem or symptom instead of guessing exact keywords.",
  },
  {
    question: "Why is traditional document search frustrating?",
    answer:
      "Most built-in PDF search requires exact keyword matches. When you're searching hundreds of pages in a technical manual or compliance binder, you often don't know the exact terminology used. AI search understands what you mean, not just what you type.",
  },
  {
    question: "Can it search scanned PDFs and images?",
    answer:
      "Yes. Scanned documents and photos are processed with OCR (Optical Character Recognition) to extract text before searching. This works for scanned TSBs, handwritten notes, photographed manuals, and legacy documents.",
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
    title: "AI Summarizer",
    description: "Summarize long documents",
    href: "/tools/ai-summarizer",
    icon: FileText,
    category: "Search, Chat & Summarization",
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
    title: "Policy Analyzer",
    description: "Analyze insurance policies",
    href: "/tools/policy-analyzer",
    icon: FileText,
    category: "Policy & Compliance",
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

interface FileWithText {
  file: File;
  text: string;
  status: "pending" | "processing" | "completed" | "error";
  error?: string;
}

interface SearchResult {
  fileName: string;
  relevance: string;
  excerpts: string[];
  summary: string;
}

async function aiFileSearch(query: string, documents: { name: string; content: string }[]): Promise<{ results: SearchResult[]; summary: string }> {
  const response = await fetch("/api/tools/file-search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, documents }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Search failed");
  }

  return response.json();
}

export default function FileSearch() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [files, setFiles] = useState<FileWithText[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchSummary, setSearchSummary] = useState("");
  const [searched, setSearched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractText = async (file: File, index: number, total: number): Promise<string> => {
    const baseProgress = (index / total) * 100;
    const progressPerFile = 100 / total;

    if (file.type === "application/pdf") {
      setProgressMessage(`Extracting text from ${file.name}...`);
      return await extractTextFromPDF(file);
    } else if (file.type === "text/plain") {
      setProgressMessage(`Reading ${file.name}...`);
      return await file.text();
    } else {
      // Image file - use OCR
      const handleProgress = (ocrProgress: OCRProgress) => {
        setProgress(baseProgress + ocrProgress.progress * progressPerFile);
        setProgressMessage(`OCR on ${file.name}: ${ocrProgress.status}`);
      };
      const result = await performOCR(file, "eng", handleProgress);
      return result.text;
    }
  };

  const handleFilesSelected = useCallback(async (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) {
      setFiles([]);
      return;
    }

    setStatus("processing");
    setProgress(0);
    setError(null);
    setResults([]);
    setSearchSummary("");
    setSearched(false);

    const newFiles: FileWithText[] = selectedFiles.map((file) => ({
      file,
      text: "",
      status: "pending" as const,
    }));
    setFiles(newFiles);

    // Process files one by one
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setProgressMessage(`Processing ${file.name}...`);

      try {
        const text = await extractText(file, i, selectedFiles.length);
        newFiles[i] = { ...newFiles[i], text, status: "completed" };
        setFiles([...newFiles]);
      } catch (err) {
        console.error(`Error processing ${file.name}:`, err);
        newFiles[i] = {
          ...newFiles[i],
          status: "error",
          error: err instanceof Error ? err.message : "Failed to extract text",
        };
        setFiles([...newFiles]);
      }

      setProgress(((i + 1) / selectedFiles.length) * 100);
    }

    setStatus("completed");
    setProgressMessage("All files processed");
  }, []);

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setResults([]);
    setSearchSummary("");
    setSearched(false);
  };

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query");
      return;
    }

    const completedFiles = files.filter(f => f.status === "completed" && f.text);
    if (completedFiles.length === 0) {
      setError("No documents ready for search");
      return;
    }

    setStatus("processing");
    setProgress(50);
    setProgressMessage("AI is searching your documents...");
    setError(null);
    setResults([]);
    setSearchSummary("");

    try {
      const documents = completedFiles.map(f => ({
        name: f.file.name,
        content: f.text.slice(0, 50000), // Limit content size
      }));

      const response = await aiFileSearch(searchQuery, documents);
      setResults(response.results);
      setSearchSummary(response.summary);
      setSearched(true);
      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Search error:", err);
      setError(err instanceof Error ? err.message : "Search failed");
      setStatus("error");
    }
  }, [searchQuery, files]);

  const handleCopyResults = () => {
    const text = [
      `Search Query: ${searchQuery}`,
      "",
      `Summary: ${searchSummary}`,
      "",
      "Results:",
      ...results.map(r => [
        `\n--- ${r.fileName} (${r.relevance}) ---`,
        r.summary,
        "",
        "Key excerpts:",
        ...r.excerpts.map(e => `• ${e}`),
      ].join("\n")),
    ].join("\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getResultsText = () => {
    return [
      `Search Query: ${searchQuery}`,
      "",
      `Summary: ${searchSummary}`,
      "",
      "Results:",
      ...results.map(r => [
        `\n--- ${r.fileName} (${r.relevance}) ---`,
        r.summary,
        "",
        "Key excerpts:",
        ...r.excerpts.map(e => `• ${e}`),
      ].join("\n")),
    ].join("\n");
  };

  const completedFilesCount = files.filter((f) => f.status === "completed").length;
  const totalWords = files.reduce((sum, f) => {
    if (f.status === "completed" && f.text) {
      return sum + f.text.split(/\s+/).filter(Boolean).length;
    }
    return sum;
  }, 0);

  const getRelevanceBadge = (relevance: string) => {
    switch (relevance.toLowerCase()) {
      case "high":
        return <Badge className="bg-green-500">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case "low":
        return <Badge className="bg-gray-500">Low</Badge>;
      default:
        return <Badge variant="outline">{relevance}</Badge>;
    }
  };

  return (
    <ToolLayout
      title="AI Document Search - Semantic Search for PDFs"
      description="Search inside multiple PDFs and documents using AI. Find information in technical manuals, TSBs, SOPs, compliance binders, and maintenance documentation. Semantic search understands meaning, not just keywords."
      category="Search, Chat & Summarization"
      keywords="search PDF, search multiple documents, find in PDF, search technical manual, TSB search, technical service bulletin lookup, search SOP, search maintenance manual, aircraft maintenance manual search, compliance document search, semantic document search, AI PDF search, search inside PDF, multi-document search, regulatory document search, validation document search"
      isAIPowered={true}
      toolContext="file-search"
    >
      <div className="space-y-6">
        {/* Value Proposition */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4">
          <h2 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Stop Guessing Keywords. Search by Meaning.
          </h2>
          <p className="text-sm text-muted-foreground">
            Traditional PDF search requires exact matches. Our AI understands what you're looking for -
            search for "engine overheating fix" and find "coolant system service procedure" even when the exact words don't match.
            Perfect for Technical Service Bulletins, maintenance manuals, SOPs, and compliance documentation.
          </p>
        </div>

        {/* File Upload Section */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <FileUploader
              accept={{
                "application/pdf": [".pdf"],
                "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                "text/plain": [".txt"],
              }}
              maxSize={20 * 1024 * 1024}
              multiple={true}
              onFilesSelected={handleFilesSelected}
              description="Upload PDFs, scanned documents, or images (TSBs, manuals, SOPs, compliance docs)"
            />

            {files.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">
                    Uploaded Files ({completedFilesCount}/{files.length} processed)
                  </Label>
                  {totalWords > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {totalWords.toLocaleString()} words indexed
                    </span>
                  )}
                </div>
                <ScrollArea className="h-32 border rounded-md p-2">
                  <div className="space-y-1">
                    {files.map((fileData, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-1 px-2 rounded hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <File className="size-4 shrink-0 text-muted-foreground" />
                          <span className="text-sm truncate">{fileData.file.name}</span>
                          {fileData.status === "processing" && (
                            <Badge variant="secondary" className="shrink-0">Processing...</Badge>
                          )}
                          {fileData.status === "completed" && (
                            <Badge variant="outline" className="shrink-0 text-green-600">Ready</Badge>
                          )}
                          {fileData.status === "error" && (
                            <Badge variant="destructive" className="shrink-0">Error</Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="shrink-0 size-6 p-0"
                          onClick={() => removeFile(index)}
                        >
                          <X className="size-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>

        {status === "processing" && !searched && (
          <ProcessingStatus
            status={status}
            progress={progress}
            message={progressMessage}
          />
        )}

        {/* Search Section */}
        {completedFilesCount > 0 && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="size-4 text-primary" />
                  What are you looking for?
                </Label>
                <Textarea
                  placeholder="Describe what you need in plain language...

Examples:
• transmission shifting problems on 2019 models
• coolant leak repair procedure
• safety shutdown sequence for pump maintenance
• indemnification and liability clauses
• calibration requirements for temperature sensors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="min-h-[140px]"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || status === "processing"}
                  size="lg"
                  className="px-8"
                >
                  <Sparkles className="size-4 mr-2" />
                  {status === "processing" ? "Searching..." : "Search Documents"}
                  <ArrowRight className="size-4 ml-2" />
                </Button>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {searched && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Search className="size-4 text-primary" />
                  Search Results
                  <Badge variant="secondary">
                    {results.length} {results.length === 1 ? "document" : "documents"}
                  </Badge>
                </h3>
                {results.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyResults}
                    >
                      {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <DownloadButton
                      data={getResultsText()}
                      filename="search-results.txt"
                      mimeType="text/plain"
                      variant="outline"
                      size="sm"
                    >
                      <Download className="size-4 mr-1" />
                      Export
                    </DownloadButton>
                  </div>
                )}
              </div>

              {/* Overall Summary */}
              {searchSummary && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    AI Summary
                  </h4>
                  <p className="text-sm text-muted-foreground">{searchSummary}</p>
                </div>
              )}

              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="px-4 py-3 bg-muted/30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="size-4 text-muted-foreground" />
                          <span className="font-medium">{result.fileName}</span>
                        </div>
                        {getRelevanceBadge(result.relevance)}
                      </div>
                      <div className="p-4 space-y-3">
                        <p className="text-sm">{result.summary}</p>

                        {result.excerpts.length > 0 && (
                          <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground">Key excerpts:</Label>
                            {result.excerpts.map((excerpt, i) => (
                              <div key={i} className="text-sm bg-muted/30 p-2 rounded border-l-2 border-primary/50">
                                "{excerpt}"
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="size-12 mx-auto mb-4 opacity-50" />
                  <p>No relevant content found for your search</p>
                  <p className="text-sm mt-1">Try describing the problem differently or using related terms</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {files.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="size-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Search Documents by Meaning, Not Keywords</h3>
              <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                Upload technical manuals, service bulletins, SOPs, compliance documents, or any PDFs.
                Describe what you're looking for in plain language - our AI finds the relevant sections
                even when exact words don't match.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <Badge variant="outline">Technical Service Bulletins</Badge>
                <Badge variant="outline">Maintenance Manuals</Badge>
                <Badge variant="outline">SOPs & Procedures</Badge>
                <Badge variant="outline">Compliance Binders</Badge>
                <Badge variant="outline">Regulatory Documents</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Use Cases Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Who Uses This Tool?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium">Automotive Technicians</p>
                <p className="text-muted-foreground">
                  Search Technical Service Bulletins (TSBs) and OEM service data by describing symptoms
                  instead of guessing manufacturer terminology.
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Aviation Maintenance</p>
                <p className="text-muted-foreground">
                  Find procedures in Aircraft Maintenance Manuals (AMMs), flight ops guides,
                  and FAA documentation without memorizing section numbers.
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Oil & Gas / Manufacturing</p>
                <p className="text-muted-foreground">
                  Search Standard Operating Procedures (SOPs), safety protocols, equipment manuals,
                  and startup/shutdown sequences.
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-medium">Pharmaceutical & Biotech</p>
                <p className="text-muted-foreground">
                  Navigate validation documents, compliance binders, GMP procedures,
                  and regulatory submissions efficiently.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How AI Document Search Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="AI Document Search Features"
        features={FEATURES}
      />

      <WhatYouGet
        title="What You Get with AI Search"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by Semantic AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="AI Document Search" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
