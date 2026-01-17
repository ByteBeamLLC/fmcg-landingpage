import { useState, useCallback } from "react";
import { FileSpreadsheet, Table, FileText } from "lucide-react";
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
    question: "How do I convert Excel to CSV?",
    answer:
      "Upload your Excel file (.xlsx or .xls) and click 'Convert to CSV'. Your spreadsheet will be converted to a CSV file that you can download instantly.",
  },
  {
    question: "Is this Excel to CSV converter free?",
    answer:
      "Yes! Convert Excel files to CSV completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "Which sheet gets converted?",
    answer:
      "The first sheet (active sheet) in your Excel workbook is converted to CSV. If you need to convert multiple sheets, you can download them separately.",
  },
  {
    question: "Will formulas be converted?",
    answer:
      "Formulas are converted to their calculated values. The CSV will contain the actual data, not the formulas themselves.",
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
    title: "CSV to Excel",
    description: "Convert CSV to Excel format",
    href: "/tools/csv-to-excel",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
  {
    title: "Excel to JSON",
    description: "Convert Excel to JSON format",
    href: "/tools/excel-to-json",
    icon: FileText,
    category: "Document Conversion",
  },
];

export default function ExcelToCsv() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);
  const [sheetName, setSheetName] = useState("");

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setConvertedFile(null);
      setStatus("idle");
      setRowCount(0);
      setColumnCount(0);
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

      // Get row and column counts
      const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
      setRowCount(range.e.r + 1);
      setColumnCount(range.e.c + 1);

      // Convert to CSV
      const csv = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

      setConvertedFile(blob);
      setStatus("completed");
    } catch (error) {
      console.error("Conversion error:", error);
      setStatus("error");
    }
  }, [selectedFile]);

  const getOutputFilename = () => {
    if (!selectedFile) return "converted.csv";
    const name = selectedFile.name.replace(/\.(xlsx|xls)$/i, "");
    return `${name}.csv`;
  };

  return (
    <ToolLayout
      title="Excel to CSV Converter - Convert XLSX to CSV Free"
      description="Convert Excel to CSV online for free. Transform Excel spreadsheets (.xlsx, .xls) to CSV format instantly. No signup, no watermarks, works on any device."
      category="Document Conversion"
      keywords="excel to csv, convert xlsx to csv, excel to csv converter, xlsx to csv, xls to csv, convert excel to csv online free"
      toolContext="excel-to-csv"
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
                <Table className="mr-2 size-4" />
                {status === "processing" ? "Converting..." : "Convert to CSV"}
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
                    <Table className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Conversion Complete!</h3>
                    <p className="text-sm text-muted-foreground">
                      Sheet: {sheetName}
                    </p>
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
                    mimeType="text/csv"
                    size="lg"
                  >
                    Download CSV File
                  </DownloadButton>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Table className="size-12 mx-auto mb-4 opacity-20" />
                  <p>CSV file will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Excel to CSV Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
