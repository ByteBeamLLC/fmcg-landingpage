import { useState, useCallback } from "react";
import { Landmark, Copy, Check, FileText, Download, AlertCircle, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react";
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
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { performOCR, type OCRProgress } from "@/lib/tools/ocr-utils";
import { extractBankStatementData } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

const FAQS = [
  {
    question: "How does the bank statement parser work?",
    answer:
      "Upload your bank statement (PDF or image), and our AI extracts transactions, balances, and account information into a structured format you can download as JSON or CSV.",
  },
  {
    question: "What bank statement formats are supported?",
    answer:
      "Works with statements from any bank worldwide. Supports PDF statements and scanned images. Best results with clear, text-based PDFs.",
  },
  {
    question: "Is my bank statement data secure?",
    answer:
      "Yes. Text extraction happens locally in your browser. Account numbers are truncated to last 4 digits in the output. We never store your financial data.",
  },
  {
    question: "What data does the parser extract?",
    answer:
      "Account holder, bank name, statement period, opening/closing balances, all transactions with dates and amounts, and summary totals for credits and debits.",
  },
  {
    question: "Can I export to accounting software?",
    answer:
      "Yes! Download the structured data as JSON for import into QuickBooks, Xero, or other accounting software, or convert to CSV for Excel.",
  },
  {
    question: "Is there a limit on statement parsing?",
    answer:
      "Free users can parse up to 10 statements per hour. For unlimited access, sign up for ByteBeam Agent Builder.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Invoice Parser",
    description: "Extract data from invoices",
    href: "/tools/invoice-parser",
    icon: FileText,
    category: "AI Document Processing",
    isAIPowered: true,
  },
  {
    title: "Receipt Scanner",
    description: "Scan and extract receipt data",
    href: "/tools/receipt-scanner",
    icon: FileText,
    category: "AI Document Processing",
    isAIPowered: true,
  },
];

interface BankStatementData {
  accountHolder: string;
  accountNumber: string;
  bankName: string;
  statementPeriod: {
    startDate: string;
    endDate: string;
  };
  openingBalance: number;
  closingBalance: number;
  currency: string;
  transactions: Array<{
    date: string;
    description: string;
    type: "credit" | "debit";
    amount: number;
    balance: number;
  }>;
  totalCredits: number;
  totalDebits: number;
  summary: {
    deposits: number;
    withdrawals: number;
    fees: number;
    interest: number;
  };
}

export default function BankStatementParser() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [statementData, setStatementData] = useState<BankStatementData | null>(null);
  const [rawResponse, setRawResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setExtractedText("");
      setStatementData(null);
      setRawResponse("");
      setStatus("idle");
      setError(null);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleParseStatement = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setProgress(0);
    setError(null);
    setStatementData(null);
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
      setProgressMessage("Parsing statement with AI...");

      const response = await extractBankStatementData(text);
      setRawResponse(response.content);

      try {
        const parsed = JSON.parse(response.content);
        setStatementData(parsed);
      } catch {
        console.warn("Could not parse statement data as JSON");
      }

      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Statement parsing error:", err);
      setError(err instanceof Error ? err.message : "Failed to parse statement");
      setStatus("error");
    }
  }, [selectedFile]);

  const handleCopyData = useCallback(() => {
    const dataToCopy = statementData ? JSON.stringify(statementData, null, 2) : rawResponse;
    navigator.clipboard.writeText(dataToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [statementData, rawResponse]);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  const convertToCSV = () => {
    if (!statementData?.transactions) return "";
    const headers = ["Date", "Description", "Type", "Amount", "Balance"];
    const rows = statementData.transactions.map((t) => [
      t.date,
      `"${t.description.replace(/"/g, '""')}"`,
      t.type,
      t.amount,
      t.balance,
    ]);
    return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  };

  return (
    <ToolLayout
      title="Bank Statement Parser - Extract Transactions Free"
      description="Parse bank statements instantly using AI. Extract transactions, balances, and account info in structured format. Free bank statement OCR tool."
      category="AI Document Processing"
      keywords="bank statement parser, extract bank transactions, bank OCR, statement to CSV, bank statement converter, free bank parser"
      isAIPowered={true}
      toolContext="bank-statement-parser"
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
                description="Upload bank statement (PDF or image)"
              />

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Landmark className="h-4 w-4" />
                <AlertDescription>
                  Account numbers are truncated for privacy. Only the last 4 digits are extracted.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleParseStatement}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Landmark className="mr-2 size-4" />
                {status === "processing" ? "Parsing..." : "Parse Statement"}
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
                  <Landmark className="size-4" />
                  Statement Data
                </h3>
                {(statementData || rawResponse) && (
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
                      data={statementData ? JSON.stringify(statementData, null, 2) : rawResponse}
                      filename="bank-statement.json"
                      mimeType="application/json"
                      variant="outline"
                      size="sm"
                    >
                      <Download className="size-4 mr-1" />
                      JSON
                    </DownloadButton>
                    {statementData?.transactions && (
                      <DownloadButton
                        data={convertToCSV()}
                        filename="transactions.csv"
                        mimeType="text/csv"
                        variant="outline"
                        size="sm"
                      >
                        CSV
                      </DownloadButton>
                    )}
                  </div>
                )}
              </div>

              {statementData ? (
                <div className="flex-1 overflow-auto space-y-4">
                  {/* Account Header */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{statementData.bankName || "Unknown Bank"}</h4>
                        <p className="text-sm text-muted-foreground">{statementData.accountHolder}</p>
                        <p className="text-sm text-muted-foreground">
                          Account: ****{statementData.accountNumber}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {statementData.statementPeriod?.startDate} - {statementData.statementPeriod?.endDate}
                      </Badge>
                    </div>
                  </div>

                  {/* Balance Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-xs text-muted-foreground">Opening Balance</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(statementData.openingBalance || 0, statementData.currency)}
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-xs text-muted-foreground">Closing Balance</p>
                      <p className="text-lg font-semibold">
                        {formatCurrency(statementData.closingBalance || 0, statementData.currency)}
                      </p>
                    </div>
                  </div>

                  {/* Credits/Debits Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                        <TrendingUp className="size-4" />
                        <span className="text-xs">Total Credits</span>
                      </div>
                      <p className="text-lg font-semibold text-green-700 dark:text-green-400">
                        +{formatCurrency(statementData.totalCredits || 0, statementData.currency)}
                      </p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                        <TrendingDown className="size-4" />
                        <span className="text-xs">Total Debits</span>
                      </div>
                      <p className="text-lg font-semibold text-red-700 dark:text-red-400">
                        -{formatCurrency(statementData.totalDebits || 0, statementData.currency)}
                      </p>
                    </div>
                  </div>

                  {/* Transactions */}
                  {statementData.transactions && statementData.transactions.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 font-medium text-sm flex items-center gap-2">
                        <ArrowUpDown className="size-4" />
                        Transactions ({statementData.transactions.length})
                      </div>
                      <div className="max-h-[300px] overflow-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/30 sticky top-0">
                            <tr>
                              <th className="text-left p-2">Date</th>
                              <th className="text-left p-2">Description</th>
                              <th className="text-right p-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {statementData.transactions.map((txn, idx) => (
                              <tr key={idx}>
                                <td className="p-2 text-muted-foreground">{txn.date}</td>
                                <td className="p-2 max-w-[200px] truncate">{txn.description}</td>
                                <td
                                  className={`p-2 text-right font-medium ${
                                    txn.type === "credit" ? "text-green-600" : "text-red-600"
                                  }`}
                                >
                                  {txn.type === "credit" ? "+" : "-"}
                                  {formatCurrency(Math.abs(txn.amount), statementData.currency)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
                    <Landmark className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a bank statement to parse</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Bank Statement Parser" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
