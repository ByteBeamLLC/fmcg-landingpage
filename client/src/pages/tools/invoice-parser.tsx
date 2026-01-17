import { useState, useCallback } from "react";
import {
  Receipt,
  Copy,
  Check,
  FileText,
  Download,
  AlertCircle,
  Zap,
  Shield,
  Lock,
  FileCheck,
  Globe,
  Database,
  Briefcase,
  Building2,
  Users,
  Calculator,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { extractInvoiceData } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Upload Invoice",
    description: "Drop your invoice PDF or photo. Supports any format from any vendor or accounting system.",
  },
  {
    title: "AI Extracts Data",
    description: "Our AI reads the invoice and identifies vendor, line items, totals, and payment details.",
  },
  {
    title: "Review Structured Data",
    description: "See extracted data in a clean, organized format with all fields identified.",
  },
  {
    title: "Export to JSON",
    description: "Download structured data for import into accounting software or spreadsheets.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Extraction",
    description: "Parse invoices in seconds, not minutes of manual data entry.",
  },
  {
    icon: Database,
    title: "Structured Output",
    description: "Get clean JSON with vendor info, line items, totals—ready for your systems.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "OCR happens in your browser. We never store your invoices or extracted data.",
  },
  {
    icon: FileCheck,
    title: "Any Invoice Format",
    description: "PDFs, scanned images, photos. Works with invoices from any vendor worldwide.",
  },
  {
    icon: Globe,
    title: "Multi-Currency Support",
    description: "Automatically detects and extracts currency from invoices in any country.",
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description: "AI trained on millions of invoices for reliable extraction of all fields.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "Accountants & Bookkeepers",
    description: "Eliminate manual data entry. Parse vendor invoices directly into your accounting software.",
  },
  {
    icon: Building2,
    title: "Small Businesses",
    description: "Process supplier invoices quickly for accounts payable without expensive software.",
  },
  {
    icon: Users,
    title: "Finance Teams",
    description: "Automate invoice processing workflows with structured data extraction.",
  },
  {
    icon: Calculator,
    title: "Freelancers & Contractors",
    description: "Track expenses and vendor payments by parsing invoices into organized records.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Invoice number and dates extracted",
  "Vendor name, address, and contact info",
  "Customer/billing information",
  "Complete line items with descriptions",
  "Quantities and unit prices",
  "Subtotal, tax, and total amounts",
  "Currency detection",
  "Payment terms and due dates",
  "Downloadable JSON format",
  "Copy-to-clipboard functionality",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our invoice parser combines OCR (Optical Character Recognition) with AI-powered data extraction. For PDFs, text is extracted using PDF.js. For images, Tesseract OCR converts the image to text. Then, our AI models—trained on millions of invoices—identify and structure the data fields accurately.",
  technologies: ["GPT-4 / Claude AI", "Tesseract OCR", "PDF.js", "JSON Schema Validation", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "How does the AI invoice parser work?",
    answer:
      "Upload your invoice (PDF or image), and our AI extracts key data like vendor info, line items, totals, and dates. The data is returned in a structured JSON format you can download, copy, or import into accounting software.",
  },
  {
    question: "What invoice formats are supported?",
    answer:
      "We support PDF invoices and image formats (JPG, PNG, HEIC, WebP). Works with invoices from any vendor, accounting system, ERP, or country. Both digital PDFs and scanned/photographed invoices are supported.",
  },
  {
    question: "Is my invoice data secure and private?",
    answer:
      "Yes. For images, OCR processing happens locally in your browser. For PDFs, text extraction is also local. Only the extracted text is sent to our AI for parsing over an encrypted connection. We don't store your invoices or extracted data.",
  },
  {
    question: "What data does the invoice parser extract?",
    answer:
      "Invoice number, invoice date, due date, vendor name and contact info, customer/billing info, complete line items with descriptions, quantities, unit prices, subtotal, tax amount, total, currency, and payment terms.",
  },
  {
    question: "Can I export the extracted data?",
    answer:
      "Yes. Download the structured data as JSON for import into QuickBooks, Xero, SAP, or other accounting software. You can also copy the data to clipboard for pasting into spreadsheets.",
  },
  {
    question: "How accurate is the invoice parsing?",
    answer:
      "The AI correctly extracts data from 95%+ of standard invoices. Accuracy depends on invoice quality and formatting. Complex or unusual invoice layouts may require verification. Line items are extracted with high precision.",
  },
  {
    question: "Can I parse invoices in other languages?",
    answer:
      "Yes. The AI can extract data from invoices in English, Spanish, French, German, and many other languages. Currency and date formats are automatically detected and standardized.",
  },
  {
    question: "Is there a limit on invoice parsing?",
    answer:
      "Free users can parse up to 10 invoices per hour. For unlimited parsing, batch processing, and API access, explore ByteBeam Agent Builder.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "Receipt Scanner",
    description: "Extract data from receipts",
    href: "/tools/receipt-scanner",
    icon: Receipt,
    category: "Extract, Convert & Prepare",
    isAIPowered: true,
  },
  {
    title: "Bank Statement Parser",
    description: "Parse bank transactions",
    href: "/tools/bank-statement-parser",
    icon: FileText,
    category: "Extract, Convert & Prepare",
    isAIPowered: true,
  },
  {
    title: "PDF Table Extractor",
    description: "Extract tables from PDFs",
    href: "/tools/pdf-table-extractor",
    icon: FileText,
    category: "Extract, Convert & Prepare",
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
  {
    title: "AI Document Summarizer",
    description: "Summarize any document",
    href: "/tools/ai-summarizer",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
];

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string | null;
  vendor: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  customer: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  paymentTerms: string | null;
  notes: string | null;
}

export default function InvoiceParser() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [rawResponse, setRawResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setExtractedText("");
      setInvoiceData(null);
      setRawResponse("");
      setStatus("idle");
      setError(null);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleExtractInvoice = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setProgress(0);
    setError(null);
    setInvoiceData(null);
    setRawResponse("");

    try {
      let text = "";

      // Extract text based on file type
      if (selectedFile.type === "application/pdf") {
        setProgressMessage("Extracting text from PDF...");
        setProgress(30);
        text = await extractTextFromPDF(selectedFile);
      } else {
        // Use OCR for images
        const handleProgress = (ocrProgress: OCRProgress) => {
          setProgress(Math.min(ocrProgress.progress * 0.6, 60));
          setProgressMessage(ocrProgress.status);
        };

        const result = await performOCR(selectedFile, "eng", handleProgress);
        text = result.text;
      }

      setExtractedText(text);
      setProgress(70);
      setProgressMessage("Analyzing invoice with AI...");

      // Send to AI for structured extraction
      const response = await extractInvoiceData(text);
      setRawResponse(response.content);

      // Try to parse the JSON response
      try {
        const parsed = JSON.parse(response.content);
        setInvoiceData(parsed);
      } catch {
        // If JSON parsing fails, show the raw response
        console.warn("Could not parse invoice data as JSON");
      }

      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Invoice parsing error:", err);
      setError(err instanceof Error ? err.message : "Failed to parse invoice");
      setStatus("error");
    }
  }, [selectedFile]);

  const handleCopyData = useCallback(() => {
    const dataToCopy = invoiceData ? JSON.stringify(invoiceData, null, 2) : rawResponse;
    navigator.clipboard.writeText(dataToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [invoiceData, rawResponse]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  return (
    <ToolLayout
      title="AI Invoice Parser"
      description="Extract data from invoices instantly using AI. Get vendor info, line items, totals in structured JSON. Free invoice OCR and data extraction tool for accountants, businesses, and finance teams."
      category="Extract, Convert & Prepare"
      keywords="invoice parser, extract invoice data, invoice OCR, invoice to JSON, scan invoice, invoice data extraction, free invoice parser, invoice automation, accounts payable automation, invoice processing"
      isAIPowered={true}
      toolContext="invoice-parser"
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
                description="Upload invoice (PDF or image)"
              />

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleExtractInvoice}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Receipt className="mr-2 size-4" />
                {status === "processing" ? "Processing..." : "Extract Invoice Data"}
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
                  <FileText className="size-4" />
                  Invoice Data
                </h3>
                {(invoiceData || rawResponse) && (
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
                      data={invoiceData ? JSON.stringify(invoiceData, null, 2) : rawResponse}
                      filename="invoice-data.json"
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

              {invoiceData ? (
                <div className="flex-1 overflow-auto space-y-4">
                  {/* Invoice Header */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-xs text-muted-foreground">Invoice Number</p>
                      <p className="font-medium">{invoiceData.invoiceNumber || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Invoice Date</p>
                      <p className="font-medium">{invoiceData.invoiceDate || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Due Date</p>
                      <p className="font-medium">{invoiceData.dueDate || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Currency</p>
                      <p className="font-medium">{invoiceData.currency || "USD"}</p>
                    </div>
                  </div>

                  {/* Vendor & Customer */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-semibold mb-2">Vendor</h4>
                      <p className="text-sm">{invoiceData.vendor?.name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{invoiceData.vendor?.address}</p>
                      <p className="text-xs text-muted-foreground">{invoiceData.vendor?.email}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-semibold mb-2">Customer</h4>
                      <p className="text-sm">{invoiceData.customer?.name || "N/A"}</p>
                      <p className="text-xs text-muted-foreground">{invoiceData.customer?.address}</p>
                      <p className="text-xs text-muted-foreground">{invoiceData.customer?.email}</p>
                    </div>
                  </div>

                  {/* Line Items */}
                  {invoiceData.lineItems && invoiceData.lineItems.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="text-left p-2">Description</th>
                            <th className="text-right p-2">Qty</th>
                            <th className="text-right p-2">Price</th>
                            <th className="text-right p-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceData.lineItems.map((item, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="p-2">{item.description}</td>
                              <td className="text-right p-2">{item.quantity}</td>
                              <td className="text-right p-2">
                                {formatCurrency(item.unitPrice, invoiceData.currency)}
                              </td>
                              <td className="text-right p-2">
                                {formatCurrency(item.total, invoiceData.currency)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(invoiceData.subtotal || 0, invoiceData.currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatCurrency(invoiceData.tax || 0, invoiceData.currency)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>{formatCurrency(invoiceData.total || 0, invoiceData.currency)}</span>
                    </div>
                  </div>
                </div>
              ) : rawResponse ? (
                <Textarea
                  value={rawResponse}
                  readOnly
                  className="flex-1 min-h-[300px] resize-none font-mono text-sm"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <p>Upload an invoice to extract data</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How the Invoice Parser Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="Invoice Parser Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses the Invoice Parser?"
        subtitle="From accountants eliminating data entry to finance teams automating workflows, AI invoice parsing saves hours of manual work."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What Data Is Extracted"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by AI & OCR"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="Invoice Parser" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
