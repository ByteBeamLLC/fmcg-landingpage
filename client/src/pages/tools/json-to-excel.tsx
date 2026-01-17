import { useState, useCallback } from "react";
import { Braces, FileSpreadsheet, Table } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
    question: "How do I convert JSON to Excel?",
    answer:
      "Upload a JSON file or paste JSON data, then click 'Convert to Excel'. Your JSON array or object will be converted to an Excel spreadsheet with proper columns.",
  },
  {
    question: "Is this JSON to Excel converter free?",
    answer:
      "Yes! Convert JSON to Excel completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "What JSON structure is supported?",
    answer:
      "We support JSON arrays of objects (most common for data). Each object becomes a row, and keys become column headers. Nested objects are flattened.",
  },
  {
    question: "Can I paste JSON directly?",
    answer:
      "Yes! You can either upload a .json file or paste your JSON data directly into the text area. Both methods work the same way.",
  },
  {
    question: "How are nested objects handled?",
    answer:
      "Nested objects are flattened with dot notation in the column headers. For example, 'user.name' would be a column header for nested data.",
  },
  {
    question: "Is my data secure?",
    answer:
      "100% secure. All processing happens in your browser. Your JSON data never leaves your device.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Excel to JSON",
    description: "Convert Excel to JSON format",
    href: "/tools/excel-to-json",
    icon: Braces,
    category: "Document Conversion",
  },
  {
    title: "CSV to Excel",
    description: "Convert CSV to Excel format",
    href: "/tools/csv-to-excel",
    icon: FileSpreadsheet,
    category: "Document Conversion",
  },
];

function flattenObject(obj: any, prefix = ""): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else if (Array.isArray(value)) {
      result[newKey] = JSON.stringify(value);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

export default function JsonToExcel() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jsonText, setJsonText] = useState("");
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);
  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);
  const [error, setError] = useState("");

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setConvertedFile(null);
      setStatus("idle");
      setError("");

      try {
        const text = await file.text();
        setJsonText(text);
      } catch {
        setError("Could not read file");
      }
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!jsonText.trim()) return;

    setStatus("processing");
    setError("");

    try {
      let data = JSON.parse(jsonText);

      // Ensure data is an array
      if (!Array.isArray(data)) {
        data = [data];
      }

      // Flatten nested objects
      const flattenedData = data.map((item: any) =>
        typeof item === "object" && item !== null ? flattenObject(item) : { value: item }
      );

      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(flattenedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

      // Get counts
      const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
      setRowCount(range.e.r);
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
    } catch (err) {
      console.error("Conversion error:", err);
      setError(err instanceof SyntaxError ? "Invalid JSON format" : "Conversion failed");
      setStatus("error");
    }
  }, [jsonText]);

  const getOutputFilename = () => {
    if (selectedFile) {
      const name = selectedFile.name.replace(/\.json$/i, "");
      return `${name}.xlsx`;
    }
    return "data.xlsx";
  };

  return (
    <ToolLayout
      title="JSON to Excel Converter - Convert JSON to XLSX Free"
      description="Convert JSON to Excel online for free. Transform JSON data to Excel spreadsheets (.xlsx) instantly. No signup, no watermarks, works on any device."
      category="Document Conversion"
      keywords="json to excel, convert json to xlsx, json to spreadsheet, json to excel converter, json to xlsx online free, convert json to excel"
      toolContext="pdf-merger"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <FileUploader
                accept={{
                  "application/json": [".json"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload JSON file (max 10MB)"
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium">Or paste JSON data</Label>
                <Textarea
                  value={jsonText}
                  onChange={(e) => {
                    setJsonText(e.target.value);
                    setSelectedFile(null);
                    setError("");
                  }}
                  placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
                  className="min-h-[200px] font-mono text-sm"
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>

              <Button
                onClick={handleConvert}
                disabled={!jsonText.trim() || status === "processing"}
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
                  <p className="text-xs mt-2">
                    Upload a JSON file or paste data to convert
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="JSON to Excel Converter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
