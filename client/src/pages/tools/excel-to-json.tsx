import { useState, useCallback } from "react";
import { FileSpreadsheet, Braces, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import * as XLSX from "xlsx";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  DownloadButton,
  ToolFAQ,
  RelatedTools,
  formatFileSize,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";

const FAQS = [
  {
    question: "How do I convert Excel to JSON?",
    answer:
      "Upload your Excel file (.xlsx or .xls) and click 'Convert to JSON'. Your spreadsheet data will be converted to a JSON array where each row becomes an object.",
  },
  {
    question: "Is this Excel to JSON converter free?",
    answer:
      "Yes! Convert Excel files to JSON completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "How is the JSON structured?",
    answer:
      "The first row of your Excel sheet is used as property names (keys). Each subsequent row becomes a JSON object with those properties.",
  },
  {
    question: "Which sheet gets converted?",
    answer:
      "The first sheet (active sheet) in your Excel workbook is converted. If you need to convert multiple sheets, you can process them separately.",
  },
  {
    question: "What Excel formats are supported?",
    answer:
      "We support both .xlsx (Excel 2007+) and .xls (Excel 97-2003) formats.",
  },
  {
    question: "Is my data secure?",
    answer:
      "100% secure. All processing happens in your browser. Your Excel data never leaves your device.",
  },
];

const RELATED_TOOLS = [
  {
    title: "JSON to Excel",
    description: "Convert JSON to Excel format",
    href: "/tools/json-to-excel",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
  {
    title: "Excel to CSV",
    description: "Convert Excel to CSV format",
    href: "/tools/excel-to-csv",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
];

export default function ExcelToJson() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jsonOutput, setJsonOutput] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [sheetName, setSheetName] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setJsonOutput("");
      setStatus("idle");
      setRowCount(0);
      setSheetName("");
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const firstSheet = workbook.SheetNames[0];
      setSheetName(firstSheet);
      const worksheet = workbook.Sheets[firstSheet];

      // Convert to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setRowCount(jsonData.length);

      // Format JSON with indentation
      const jsonString = JSON.stringify(jsonData, null, 2);
      setJsonOutput(jsonString);
      setStatus("completed");
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("error");
    }
  }, [selectedFile]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [jsonOutput]);

  const getOutputFilename = () => {
    if (!selectedFile) return "data.json";
    const name = selectedFile.name.replace(/\.(xlsx|xls)$/i, "");
    return `${name}.json`;
  };

  return (
    <ToolLayout
      title="Excel to JSON Converter - Convert XLSX to JSON Free"
      description="Convert Excel to JSON online for free. Transform Excel spreadsheets (.xlsx, .xls) to JSON format instantly. No signup, no watermarks, works on any device."
      category="Document Conversion"
      keywords="excel to json, convert xlsx to json, excel to json converter, xlsx to json, xls to json, convert excel to json online free"
      toolContext="pdf-merger"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <FileUploader
                accept={{
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                  "application/vnd.ms-excel": [".xls"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload Excel file (.xlsx, .xls) - max 10MB"
              />

              {selectedFile && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-green-100 flex items-center justify-center">
                      <FileSpreadsheet className="size-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)} • Excel file
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleConvert}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Braces className="mr-2 size-4" />
                {status === "processing" ? "Converting..." : "Convert to JSON"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus status={status} />
        </div>

        <div className="space-y-4">
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Braces className="size-4" />
                  JSON Output
                  {sheetName && (
                    <span className="text-xs text-muted-foreground font-normal">
                      ({sheetName} • {rowCount} rows)
                    </span>
                  )}
                </h3>
                {jsonOutput && (
                  <div className="flex items-center gap-2">
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
                      data={jsonOutput}
                      filename={getOutputFilename()}
                      mimeType="application/json"
                      variant="outline"
                      size="sm"
                    >
                      Download
                    </DownloadButton>
                  </div>
                )}
              </div>
              <Textarea
                value={jsonOutput}
                readOnly
                placeholder="JSON output will appear here..."
                className="flex-1 min-h-[300px] resize-none font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Excel to JSON Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
