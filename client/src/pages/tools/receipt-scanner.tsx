import { useState, useCallback } from "react";
import {
  Receipt,
  Copy,
  Check,
  FileText,
  Download,
  AlertCircle,
  ShoppingCart,
  Zap,
  Shield,
  Lock,
  Camera,
  Globe,
  Tag,
  Briefcase,
  Users,
  Calculator,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
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
import { extractReceiptData } from "@/lib/tools/openrouter";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Take a Photo",
    description: "Snap a photo of your receipt or upload an existing image from your device.",
  },
  {
    title: "OCR Reads the Receipt",
    description: "Our OCR technology extracts all text from the receipt image locally in your browser.",
  },
  {
    title: "AI Structures the Data",
    description: "AI identifies merchant, items, prices, totals, and categorizes the expense.",
  },
  {
    title: "Export for Expense Tracking",
    description: "Download JSON for import into expense apps, accounting software, or spreadsheets.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Scanning",
    description: "Extract receipt data in seconds. No more manual entry of purchases.",
  },
  {
    icon: Camera,
    title: "Photo-Friendly",
    description: "Works with phone photos, even crumpled or faded thermal receipts.",
  },
  {
    icon: Lock,
    title: "Privacy Protected",
    description: "OCR happens in your browser. We never store your receipts or purchase data.",
  },
  {
    icon: Tag,
    title: "Auto-Categorization",
    description: "AI automatically categorizes expenses: groceries, restaurant, retail, gas, etc.",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: "Works with receipts from any country. Currency is automatically detected.",
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description: "AI trained on millions of receipts for reliable extraction of all fields.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "Business Travelers",
    description: "Scan expense receipts on the go. Export data for reimbursement reports.",
  },
  {
    icon: Users,
    title: "Small Business Owners",
    description: "Track business purchases without manual entry. Keep organized expense records.",
  },
  {
    icon: Calculator,
    title: "Accountants & Bookkeepers",
    description: "Process client receipts quickly for expense categorization and tax preparation.",
  },
  {
    icon: Wallet,
    title: "Personal Finance",
    description: "Track spending by scanning shopping receipts into your budget app.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Merchant name and address",
  "Purchase date and time",
  "Individual items with quantities",
  "Item prices extracted",
  "Subtotal and tax amounts",
  "Total purchase amount",
  "Payment method detection",
  "Auto expense categorization",
  "Currency detection",
  "Downloadable JSON export",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our receipt scanner uses Tesseract OCR to extract text from receipt images locally in your browser. The extracted text is then analyzed by our AI models—trained on millions of receipts—to identify and structure merchant info, line items, and totals. Works with thermal paper receipts, printed receipts, and photographed receipts.",
  technologies: ["GPT-4 / Claude AI", "Tesseract OCR", "Local Image Processing", "256-bit Encryption"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "How does the receipt scanner work?",
    answer:
      "Take a photo or upload an image of your receipt. Our OCR reads the text locally in your browser, then AI extracts structured data like store name, items, prices, and totals into a clean JSON format.",
  },
  {
    question: "What receipt types are supported?",
    answer:
      "Works with receipts from any store: grocery, restaurant, retail, gas stations, pharmacies, and more. Supports thermal paper receipts, printed receipts, and even photographed handwritten receipts.",
  },
  {
    question: "Is my receipt data secure and private?",
    answer:
      "Yes. OCR processing happens entirely in your browser—your receipt image never leaves your device. Only the extracted text is sent to our AI for parsing over an encrypted connection. We never store your receipts.",
  },
  {
    question: "What data does the receipt scanner extract?",
    answer:
      "Merchant name and address, date and time, individual items with quantities and prices, subtotal, tax amount, total, payment method (cash/card), and automatic expense category (groceries, dining, retail, etc.).",
  },
  {
    question: "Can I use this for expense tracking?",
    answer:
      "Yes! Download the extracted data as JSON and import it into expense tracking apps like Expensify, QuickBooks, or spreadsheets. Perfect for business expense reports and personal budgeting.",
  },
  {
    question: "What are tips for better receipt scanning?",
    answer:
      "Use good lighting, lay the receipt flat on a contrasting surface, capture the entire receipt in frame, avoid shadows and glare, and ensure the image is in focus. Even crumpled receipts work if text is legible.",
  },
  {
    question: "Does it work with faded receipts?",
    answer:
      "Yes, to an extent. Our OCR can handle somewhat faded thermal paper receipts. However, severely faded receipts where text is barely visible may have reduced accuracy. Scan receipts promptly for best results.",
  },
  {
    question: "Is there a limit on receipt scanning?",
    answer:
      "Free users can scan up to 10 receipts per hour. For unlimited scanning, batch processing, and API access, explore ByteBeam Agent Builder.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "Invoice Parser",
    description: "Extract data from invoices",
    href: "/tools/invoice-parser",
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
    title: "Image to Text",
    description: "OCR for any image",
    href: "/tools/image-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
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
    title: "AI Document Summarizer",
    description: "Summarize documents",
    href: "/tools/ai-summarizer",
    icon: FileText,
    category: "Search, Chat & Summarization",
    isAIPowered: true,
  },
  {
    title: "PDF to Text",
    description: "Extract text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
];

interface ReceiptData {
  merchant: {
    name: string;
    address: string;
    phone: string;
  };
  date: string;
  time: string | null;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  currency: string;
  category: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  groceries: "bg-green-100 text-green-800",
  restaurant: "bg-orange-100 text-orange-800",
  retail: "bg-blue-100 text-blue-800",
  gas: "bg-yellow-100 text-yellow-800",
  other: "bg-gray-100 text-gray-800",
};

export default function ReceiptScanner() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [rawResponse, setRawResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setExtractedText("");
      setReceiptData(null);
      setRawResponse("");
      setStatus("idle");
      setError(null);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleScanReceipt = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setProgress(0);
    setError(null);
    setReceiptData(null);
    setRawResponse("");

    try {
      // Use OCR to extract text
      const handleProgress = (ocrProgress: OCRProgress) => {
        setProgress(Math.min(ocrProgress.progress * 0.6, 60));
        setProgressMessage(ocrProgress.status);
      };

      const result = await performOCR(selectedFile, "eng", handleProgress);
      const text = result.text;

      setExtractedText(text);
      setProgress(70);
      setProgressMessage("Analyzing receipt with AI...");

      // Send to AI for structured extraction
      const response = await extractReceiptData(text);
      setRawResponse(response.content);

      // Try to parse the JSON response
      try {
        const parsed = JSON.parse(response.content);
        setReceiptData(parsed);
      } catch {
        console.warn("Could not parse receipt data as JSON");
      }

      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Receipt scanning error:", err);
      setError(err instanceof Error ? err.message : "Failed to scan receipt");
      setStatus("error");
    }
  }, [selectedFile]);

  const handleCopyData = useCallback(() => {
    const dataToCopy = receiptData ? JSON.stringify(receiptData, null, 2) : rawResponse;
    navigator.clipboard.writeText(dataToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [receiptData, rawResponse]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  return (
    <ToolLayout
      title="AI Receipt Scanner"
      description="Scan receipts and extract data instantly using AI. Get store info, items, prices, totals in structured JSON. Free receipt OCR and expense tracking tool for business travelers and accountants."
      category="Extract, Convert & Prepare"
      keywords="receipt scanner, scan receipt, receipt OCR, receipt to text, extract receipt data, expense tracker, receipt parser, expense report, receipt to JSON, receipt digitizer"
      isAIPowered={true}
      toolContext="receipt-scanner"
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
                description="Upload receipt photo (JPG, PNG, HEIC)"
              />

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleScanReceipt}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Receipt className="mr-2 size-4" />
                {status === "processing" ? "Scanning..." : "Scan Receipt"}
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
                  <ShoppingCart className="size-4" />
                  Receipt Data
                </h3>
                {(receiptData || rawResponse) && (
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
                      data={receiptData ? JSON.stringify(receiptData, null, 2) : rawResponse}
                      filename="receipt-data.json"
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

              {receiptData ? (
                <div className="flex-1 overflow-auto space-y-4">
                  {/* Merchant Header */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{receiptData.merchant?.name || "Unknown Store"}</h4>
                        <p className="text-sm text-muted-foreground">{receiptData.merchant?.address}</p>
                        {receiptData.merchant?.phone && (
                          <p className="text-sm text-muted-foreground">{receiptData.merchant.phone}</p>
                        )}
                      </div>
                      {receiptData.category && (
                        <Badge className={CATEGORY_COLORS[receiptData.category.toLowerCase()] || CATEGORY_COLORS.other}>
                          {receiptData.category}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-3 flex gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date: </span>
                        <span className="font-medium">{receiptData.date || "N/A"}</span>
                      </div>
                      {receiptData.time && (
                        <div>
                          <span className="text-muted-foreground">Time: </span>
                          <span className="font-medium">{receiptData.time}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Items List */}
                  {receiptData.items && receiptData.items.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 font-medium text-sm">
                        Items ({receiptData.items.length})
                      </div>
                      <div className="divide-y">
                        {receiptData.items.map((item, idx) => (
                          <div key={idx} className="px-4 py-2 flex justify-between items-center">
                            <div>
                              <span className="text-sm">{item.description}</span>
                              {item.quantity > 1 && (
                                <span className="text-xs text-muted-foreground ml-2">
                                  x{item.quantity}
                                </span>
                              )}
                            </div>
                            <span className="font-medium">
                              {formatCurrency(item.price, receiptData.currency)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Totals */}
                  <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatCurrency(receiptData.subtotal || 0, receiptData.currency)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatCurrency(receiptData.tax || 0, receiptData.currency)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>{formatCurrency(receiptData.total || 0, receiptData.currency)}</span>
                    </div>
                    {receiptData.paymentMethod && (
                      <div className="flex justify-between text-sm pt-2 border-t">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span>{receiptData.paymentMethod}</span>
                      </div>
                    )}
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
                  <p>Upload a receipt photo to scan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How the Receipt Scanner Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="Receipt Scanner Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses the Receipt Scanner?"
        subtitle="From business travelers tracking expenses to accountants processing client receipts, AI receipt scanning eliminates manual data entry."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What Data Is Extracted"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Powered by OCR & AI"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="Receipt Scanner" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
