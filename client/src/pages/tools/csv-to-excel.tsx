import { useState, useCallback } from "react";
import { Table, FileSpreadsheet, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    question: "How do I convert CSV to Excel?",
    answer:
      "Upload your CSV file and click 'Convert to Excel'. Your file will be converted to an Excel spreadsheet (.xlsx) that you can download instantly.",
  },
  {
    question: "Is this CSV to Excel converter free?",
    answer:
      "Yes! Convert CSV files to Excel completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "Will my data formatting be preserved?",
    answer:
      "Yes, all your data will be preserved. Numbers, text, and dates are converted accurately. Column structure is maintained exactly as in your CSV.",
  },
  {
    question: "What CSV formats are supported?",
    answer:
      "We support standard CSV files with comma separators. Files with semicolons, tabs, or other delimiters are also auto-detected.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "You can convert CSV files up to 10MB. This is typically enough for files with hundreds of thousands of rows.",
  },
  {
    question: "Is my data secure?",
    answer:
      "100% secure. All processing happens in your browser. Your CSV data never leaves your device.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Excel to CSV",
    description: "Convert Excel to CSV format",
    href: "/tools/excel-to-csv",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
  {
    title: "JSON to Excel",
    description: "Convert JSON data to Excel",
    href: "/tools/json-to-excel",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
];

export default function CsvToExcel() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setConvertedFile(null);
      setStatus("idle");
      setRowCount(0);
      setColumnCount(0);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");

    try {
      const text = await selectedFile.text();
      const workbook = XLSX.read(text, { type: "string" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Get row and column counts
      const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
      setRowCount(range.e.r + 1);
      setColumnCount(range.e.c + 1);

      // Convert to Excel format
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      setConvertedFile(blob);
      setStatus("completed");
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("error");
    }
  }, [selectedFile]);

  const getOutputFilename = () => {
    if (!selectedFile) return "converted.xlsx";
    const name = selectedFile.name.replace(/\.csv$/i, "");
    return `${name}.xlsx`;
  };

  return (
    <ToolLayout
      title="CSV to Excel Converter - Convert CSV to XLSX Free"
      description="Convert CSV to Excel online for free. Transform CSV files to Excel spreadsheets (.xlsx) instantly. No signup, no watermarks, works on any device."
      category="Document Conversion"
      keywords="csv to excel, convert csv to xlsx, csv to xlsx converter, csv to spreadsheet, csv to excel online free, convert csv file to excel"
      toolContext="pdf-merger"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <FileUploader
                accept={{
                  "text/csv": [".csv"],
                  "application/vnd.ms-excel": [".csv"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload CSV file (max 10MB)"
              />

              {selectedFile && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-green-100 flex items-center justify-center">
                      <Table className="size-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)} • CSV file
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
                <FileSpreadsheet className="mr-2 size-4" />
                {status === "processing" ? "Converting..." : "Convert to Excel"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus status={status} />
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {convertedFile ? (
                <div className="text-center space-y-4">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <FileSpreadsheet className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Conversion Complete!</h3>
                    <p className="text-sm text-muted-foreground">
                      {rowCount} rows × {columnCount} columns
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Size: {formatFileSize(convertedFile.size)}
                    </p>
                  </div>
                  <DownloadButton
                    data={convertedFile}
                    filename={getOutputFilename()}
                    mimeType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    size="lg"
                  >
                    Download Excel File
                  </DownloadButton>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <FileSpreadsheet className="size-12 mx-auto mb-4 opacity-20" />
                  <p>Excel file will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="CSV to Excel Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
