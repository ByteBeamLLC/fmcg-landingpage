import { useState, useCallback } from "react";
import {
  Search,
  Copy,
  Check,
  FileText,
  Download,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Shield,
  Lock,
  Target,
  FileCheck,
  Briefcase,
  Building2,
  Scale,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
import { findContractClauses } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

// SEO Content
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload Your Contract",
    description: "Drop your contract PDF or image. Scanned documents are OCR'd automatically.",
  },
  {
    title: "Select Clause Types",
    description: "Choose which clauses to find: NDA, non-compete, termination, indemnification, and more.",
  },
  {
    title: "AI Searches & Extracts",
    description: "Our AI reads the entire contract and locates each clause with exact text quotes.",
  },
  {
    title: "Review Risk Levels",
    description: "Each clause is rated Low/Medium/High risk with explanations of potential concerns.",
  },
];

const FEATURES = [
  {
    icon: Target,
    title: "Precise Extraction",
    description: "Finds exact clause text with document location, not just summaries.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Assessment",
    description: "Each clause rated Low/Medium/High risk with explanations of concerns.",
  },
  {
    icon: Zap,
    title: "10+ Clause Types",
    description: "NDA, non-compete, termination, indemnification, IP, payment terms, and more.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Text extraction happens in your browser. We don't store your contracts.",
  },
  {
    icon: FileCheck,
    title: "Plain English Summaries",
    description: "Each clause explained in simple terms, not legal jargon.",
  },
  {
    icon: Shield,
    title: "Missing Clause Detection",
    description: "Shows which important clauses are NOT in your contract.",
  },
];

const USE_CASES = [
  {
    icon: Briefcase,
    title: "Due Diligence Reviews",
    description: "Quickly find indemnification, liability, and IP clauses across multiple contracts during M&A or investment review.",
  },
  {
    icon: Building2,
    title: "Vendor Contract Review",
    description: "Locate termination conditions, auto-renewal clauses, and liability caps in vendor agreements.",
  },
  {
    icon: Scale,
    title: "Legal Teams",
    description: "Speed up contract review by instantly finding specific clauses instead of reading entire documents.",
  },
  {
    icon: Users,
    title: "HR & Recruitment",
    description: "Find non-compete, confidentiality, and IP assignment clauses in employment contracts.",
  },
];

const WHAT_YOU_GET = [
  "Exact clause text quoted from document",
  "Location/section of each clause",
  "Plain English summary",
  "Risk level (Low/Medium/High)",
  "Risk explanation and concerns",
  "List of clauses NOT found",
  "Additional notes and observations",
  "Downloadable JSON report",
];

const TECHNICAL_INFO = {
  description:
    "Our clause finder uses large language models trained on millions of contracts. The AI understands legal document structure, clause variations, and risk patterns. For scanned documents, we use Tesseract OCR. All processing is encrypted end-to-end.",
  technologies: ["GPT-4 / Claude AI", "Tesseract OCR", "PDF.js", "256-bit Encryption"],
};

const FAQS = [
  {
    question: "How does the contract clause finder work?",
    answer:
      "Upload your contract, select the clause types you want to find, and our AI searches for and extracts those specific clauses with exact text, summaries, and risk assessments.",
  },
  {
    question: "What clause types can be found?",
    answer:
      "Confidentiality/NDA, non-compete, termination, indemnification, limitation of liability, force majeure, dispute resolution/arbitration, intellectual property, payment terms, and warranty clauses.",
  },
  {
    question: "Is my contract data secure?",
    answer:
      "Yes. Text extraction happens locally in your browser. Only the extracted text is sent to our AI for analysis over an encrypted connection. We don't store your contracts.",
  },
  {
    question: "What information is provided for each clause?",
    answer:
      "For each clause: exact text quote, location in document, plain English summary, risk level (Low/Medium/High), and detailed explanation of potential concerns.",
  },
  {
    question: "What if a clause isn't found?",
    answer:
      "The tool reports which clauses were NOT found in your contract. Missing important clauses (like limitation of liability) can be as significant as problematic ones.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. This tool provides informational analysis only. For legal advice, consult a qualified attorney. The AI may miss important nuances or jurisdiction-specific issues.",
  },
  {
    question: "Can I search for custom clause types?",
    answer:
      "Currently, the tool searches for 10 common clause types. For custom clause extraction, explore ByteBeam Agent Builder.",
  },
  {
    question: "Is there a limit on clause finding?",
    answer:
      "Free users can analyze up to 10 contracts per hour. For unlimited access, sign up for ByteBeam Agent Builder.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Contract Analyzer",
    description: "Full contract analysis",
    href: "/tools/contract-analyzer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Contract Comparison",
    description: "Compare two contracts",
    href: "/tools/contract-compare",
    icon: FileText,
    category: "Contract & Legal",
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
    title: "NDA Generator",
    description: "Generate NDAs instantly",
    href: "/tools/nda-generator",
    icon: FileText,
    category: "Contract & Legal",
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
    title: "PDF Chat",
    description: "Chat with documents",
    href: "/tools/pdf-chat",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
];

const DEFAULT_CLAUSE_TYPES = [
  { id: "confidentiality", label: "Confidentiality / NDA", checked: true },
  { id: "noncompete", label: "Non-Compete", checked: true },
  { id: "termination", label: "Termination", checked: true },
  { id: "indemnification", label: "Indemnification", checked: true },
  { id: "liability", label: "Limitation of Liability", checked: true },
  { id: "forcemajeure", label: "Force Majeure", checked: false },
  { id: "arbitration", label: "Dispute Resolution / Arbitration", checked: false },
  { id: "ip", label: "Intellectual Property", checked: false },
  { id: "payment", label: "Payment Terms", checked: false },
  { id: "warranty", label: "Warranty", checked: false },
];

interface ClauseResult {
  type: string;
  location: string;
  exactText: string;
  summary: string;
  riskLevel: "Low" | "Medium" | "High";
  riskExplanation: string;
}

interface ClauseFinderResult {
  clausesFound: ClauseResult[];
  clausesNotFound: string[];
  additionalNotes: string;
}

const RISK_COLORS = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-red-100 text-red-800 border-red-200",
};

export default function ContractClauseFinder() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [clauseData, setClauseData] = useState<ClauseFinderResult | null>(null);
  const [rawResponse, setRawResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [clauseTypes, setClauseTypes] = useState(DEFAULT_CLAUSE_TYPES);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setExtractedText("");
      setClauseData(null);
      setRawResponse("");
      setStatus("idle");
      setError(null);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const toggleClauseType = (id: string) => {
    setClauseTypes((prev) =>
      prev.map((ct) => (ct.id === id ? { ...ct, checked: !ct.checked } : ct))
    );
  };

  const handleFindClauses = useCallback(async () => {
    if (!selectedFile) return;

    const selectedClauses = clauseTypes.filter((ct) => ct.checked).map((ct) => ct.label);
    if (selectedClauses.length === 0) {
      setError("Please select at least one clause type to find");
      return;
    }

    setStatus("processing");
    setProgress(0);
    setError(null);
    setClauseData(null);
    setRawResponse("");

    try {
      let text = "";

      if (selectedFile.type === "application/pdf") {
        setProgressMessage("Extracting text from PDF...");
        setProgress(30);
        text = await extractTextFromPDF(selectedFile);
      } else {
        const handleProgress = (ocrProgress: OCRProgress) => {
          setProgress(Math.min(ocrProgress.progress * 0.6, 60));
          setProgressMessage(ocrProgress.status);
        };

        const result = await performOCR(selectedFile, "eng", handleProgress);
        text = result.text;
      }

      setExtractedText(text);
      setProgress(70);
      setProgressMessage("Finding clauses with AI...");

      const response = await findContractClauses(text, selectedClauses);
      setRawResponse(response.content);

      try {
        const parsed = JSON.parse(response.content);
        setClauseData(parsed);
      } catch {
        console.warn("Could not parse clause data as JSON");
      }

      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Clause finder error:", err);
      setError(err instanceof Error ? err.message : "Failed to find clauses");
      setStatus("error");
    }
  }, [selectedFile, clauseTypes]);

  const handleCopyData = useCallback(() => {
    const dataToCopy = clauseData ? JSON.stringify(clauseData, null, 2) : rawResponse;
    navigator.clipboard.writeText(dataToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [clauseData, rawResponse]);

  return (
    <ToolLayout
      title="AI Contract Clause Finder"
      description="Find specific clauses in contracts using AI. Search for NDA, non-compete, termination, indemnification clauses and get risk assessments. Free contract clause extractor."
      category="Contract & Legal"
      keywords="contract clause finder, find NDA clause, contract clause search, legal clause finder, non-compete clause finder, indemnification clause, termination clause, free clause extractor"
      isAIPowered={true}
      toolContext="contract-clause-finder"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload contract (PDF or image, max 10MB)"
              />

              <div className="space-y-3">
                <Label className="text-sm font-medium">Clause Types to Find</Label>
                <div className="grid grid-cols-2 gap-2">
                  {clauseTypes.map((ct) => (
                    <div key={ct.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={ct.id}
                        checked={ct.checked}
                        onCheckedChange={() => toggleClauseType(ct.id)}
                      />
                      <Label htmlFor={ct.id} className="text-sm cursor-pointer">
                        {ct.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleFindClauses}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Search className="mr-2 size-4" />
                {status === "processing" ? "Searching..." : "Find Clauses"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={progressMessage || "Processing..."}
          />

          {extractedText && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Extracted Text</h3>
                <Textarea
                  value={extractedText}
                  readOnly
                  className="min-h-[150px] text-xs font-mono"
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
                  <Search className="size-4 text-primary" />
                  Clauses Found
                </h3>
                {(clauseData || rawResponse) && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyData}
                      className="gap-2"
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <DownloadButton
                      data={clauseData ? JSON.stringify(clauseData, null, 2) : rawResponse}
                      filename="clauses-found.json"
                      mimeType="application/json"
                      variant="outline"
                      size="sm"
                    >
                      <Download className="size-4 mr-1" />
                      JSON
                    </DownloadButton>
                  </div>
                )}
              </div>

              {clauseData ? (
                <div className="flex-1 overflow-auto space-y-4">
                  <div className="flex gap-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="size-4" />
                      <span className="text-sm font-medium">
                        {clauseData.clausesFound?.length || 0} Found
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <XCircle className="size-4" />
                      <span className="text-sm">
                        {clauseData.clausesNotFound?.length || 0} Not Found
                      </span>
                    </div>
                  </div>

                  {clauseData.clausesFound && clauseData.clausesFound.length > 0 && (
                    <div className="space-y-3">
                      {clauseData.clausesFound.map((clause, idx) => (
                        <div key={idx} className="border rounded-lg overflow-hidden">
                          <div className="bg-muted/50 px-4 py-2 flex items-center justify-between">
                            <span className="font-medium text-sm">{clause.type}</span>
                            <Badge className={RISK_COLORS[clause.riskLevel] || RISK_COLORS.Medium}>
                              {clause.riskLevel} Risk
                            </Badge>
                          </div>
                          <div className="p-4 space-y-3">
                            {clause.location && (
                              <p className="text-xs text-muted-foreground">
                                Location: {clause.location}
                              </p>
                            )}
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Summary</p>
                              <p className="text-sm">{clause.summary}</p>
                            </div>
                            {clause.exactText && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">Exact Text</p>
                                <p className="text-xs bg-muted/30 p-2 rounded italic">
                                  "{clause.exactText.slice(0, 300)}
                                  {clause.exactText.length > 300 ? "..." : ""}"
                                </p>
                              </div>
                            )}
                            {clause.riskExplanation && (
                              <div className="flex items-start gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded">
                                <AlertTriangle className="size-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                                  {clause.riskExplanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {clauseData.clausesNotFound && clauseData.clausesNotFound.length > 0 && (
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                        <XCircle className="size-4 text-muted-foreground" />
                        Clauses Not Found
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {clauseData.clausesNotFound.map((clause, idx) => (
                          <Badge key={idx} variant="outline" className="text-muted-foreground">
                            {clause}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {clauseData.additionalNotes && (
                    <div className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2">Additional Notes</h4>
                      <p className="text-sm text-muted-foreground">{clauseData.additionalNotes}</p>
                    </div>
                  )}
                </div>
              ) : rawResponse ? (
                <Textarea
                  value={rawResponse}
                  readOnly
                  className="flex-1 min-h-[300px] resize-none font-mono text-sm"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Search className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a contract to find clauses</p>
                    <p className="text-sm mt-1">Select clause types and click Find</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks title="How the Clause Finder Works" steps={HOW_IT_WORKS_STEPS} />
      <Features title="Clause Finder Features" features={FEATURES} />
      <UseCases
        title="Who Uses This Clause Finder?"
        subtitle="Find specific clauses instantly instead of reading entire contracts."
        useCases={USE_CASES}
      />
      <WhatYouGet title="What's Included in the Report" items={WHAT_YOU_GET} />
      <TechnicalInfo
        title="Powered by Advanced AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="Contract Clause Finder" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
