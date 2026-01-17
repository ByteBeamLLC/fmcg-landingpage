import { useState, useCallback } from "react";
import { Table, Download, FileText, AlertCircle, Copy, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  DownloadButton,
  ToolFAQ,
  RelatedTools,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import * as pdfjsLib from "pdfjs-dist";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const FAQS = [
  {
    question: "How does the PDF table extractor work?",
    answer:
      "Upload your PDF and we analyze the text layout to detect table structures. Text items are grouped by position into rows and columns, then exported as CSV or displayed in a table format.",
  },
  {
    question: "What types of PDFs work best?",
    answer:
      "Text-based PDFs with clearly formatted tables work best. Complex nested tables, scanned documents, or tables spanning multiple pages may have reduced accuracy.",
  },
  {
    question: "Is my PDF data secure?",
    answer:
      "Yes. All processing happens locally in your browser using JavaScript. Your PDF is never uploaded to any server.",
  },
  {
    question: "Can I extract multiple tables from one PDF?",
    answer:
      "Yes! The tool attempts to detect multiple tables per page and across pages. Each detected table is shown separately.",
  },
  {
    question: "What formats can I export to?",
    answer:
      "You can copy table data directly, download as CSV for Excel/Google Sheets, or view the structured table in your browser.",
  },
  {
    question: "Why are some tables not detected correctly?",
    answer:
      "Table detection relies on text positioning. PDFs with images instead of text, unusual layouts, or merged cells may not be detected accurately.",
  },
];

const RELATED_TOOLS = [
  {
    title: "PDF to Text",
    description: "Extract all text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
  {
    title: "Excel to CSV",
    description: "Convert Excel to CSV",
    href: "/tools/excel-to-csv",
    icon: Table,
    category: "Document Conversion",
  },
];

interface TextItem {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ExtractedTable {
  pageNumber: number;
  tableIndex: number;
  headers: string[];
  rows: string[][];
}

export default function PDFTableExtractor() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [tables, setTables] = useState<ExtractedTable[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedTable, setCopiedTable] = useState<number | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setTables([]);
      setStatus("idle");
      setError(null);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const detectTables = (textItems: TextItem[]): ExtractedTable[] => {
    if (textItems.length === 0) return [];

    // Sort by Y (top to bottom) then X (left to right)
    const sortedItems = [...textItems].sort((a, b) => {
      const yDiff = b.y - a.y; // Higher Y is at top in PDF coordinates
      if (Math.abs(yDiff) > 5) return yDiff;
      return a.x - b.x;
    });

    // Group items by rows (similar Y position)
    const rows: TextItem[][] = [];
    let currentRow: TextItem[] = [];
    let currentY = sortedItems[0]?.y || 0;

    for (const item of sortedItems) {
      if (Math.abs(item.y - currentY) > 8) {
        if (currentRow.length > 0) {
          rows.push(currentRow.sort((a, b) => a.x - b.x));
        }
        currentRow = [item];
        currentY = item.y;
      } else {
        currentRow.push(item);
      }
    }
    if (currentRow.length > 0) {
      rows.push(currentRow.sort((a, b) => a.x - b.x));
    }

    // Detect column boundaries
    const allXPositions = sortedItems.map(item => item.x);
    const xBuckets = new Map<number, number>();

    for (const x of allXPositions) {
      const bucketKey = Math.round(x / 20) * 20;
      xBuckets.set(bucketKey, (xBuckets.get(bucketKey) || 0) + 1);
    }

    // Find consistent column positions (positions that appear in many rows)
    const minRowsForColumn = Math.max(3, rows.length * 0.2);
    const columnPositions = [...xBuckets.entries()]
      .filter(([_, count]) => count >= minRowsForColumn)
      .map(([pos]) => pos)
      .sort((a, b) => a - b);

    if (columnPositions.length < 2) {
      // Not enough consistent columns for a table
      return [];
    }

    // Build table from rows
    const tableRows: string[][] = [];

    for (const row of rows) {
      const cells: string[] = new Array(columnPositions.length).fill("");

      for (const item of row) {
        // Find closest column
        let closestCol = 0;
        let minDist = Math.abs(item.x - columnPositions[0]);

        for (let i = 1; i < columnPositions.length; i++) {
          const dist = Math.abs(item.x - columnPositions[i]);
          if (dist < minDist) {
            minDist = dist;
            closestCol = i;
          }
        }

        // Append to cell (in case multiple items map to same cell)
        cells[closestCol] = cells[closestCol]
          ? cells[closestCol] + " " + item.str
          : item.str;
      }

      // Only add rows that have at least 2 non-empty cells
      const nonEmptyCells = cells.filter(c => c.trim()).length;
      if (nonEmptyCells >= 2) {
        tableRows.push(cells.map(c => c.trim()));
      }
    }

    if (tableRows.length < 2) {
      return [];
    }

    // Assume first row is header
    return [{
      pageNumber: 1,
      tableIndex: 0,
      headers: tableRows[0],
      rows: tableRows.slice(1),
    }];
  };

  const handleExtractTables = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setProgress(0);
    setError(null);
    setTables([]);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const allTables: ExtractedTable[] = [];
      const totalPages = pdf.numPages;

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        setProgress((pageNum / totalPages) * 100);

        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        const textItems: TextItem[] = textContent.items
          .filter((item: any) => item.str && item.str.trim())
          .map((item: any) => ({
            str: item.str,
            x: item.transform[4],
            y: item.transform[5],
            width: item.width || 0,
            height: item.height || 0,
          }));

        const pageTables = detectTables(textItems);

        for (let i = 0; i < pageTables.length; i++) {
          allTables.push({
            ...pageTables[i],
            pageNumber: pageNum,
            tableIndex: allTables.length + 1,
          });
        }
      }

      if (allTables.length === 0) {
        setError("No tables detected in this PDF. The document may not contain structured table data.");
        setStatus("error");
      } else {
        setTables(allTables);
        setStatus("completed");
      }
    } catch (err) {
      console.error("Table extraction error:", err);
      setError(err instanceof Error ? err.message : "Failed to extract tables");
      setStatus("error");
    }
  }, [selectedFile]);

  const tableToCSV = (table: ExtractedTable): string => {
    const escape = (str: string) => {
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const headerRow = table.headers.map(escape).join(",");
    const dataRows = table.rows.map(row => row.map(escape).join(","));
    return [headerRow, ...dataRows].join("\n");
  };

  const handleCopyTable = (index: number) => {
    const table = tables[index];
    const csv = tableToCSV(table);
    navigator.clipboard.writeText(csv);
    setCopiedTable(index);
    setTimeout(() => setCopiedTable(null), 2000);
  };

  return (
    <ToolLayout
      title="PDF Table Extractor - Extract Tables from PDF Free"
      description="Extract tables from PDF documents instantly. Convert PDF tables to CSV or Excel format. Free online PDF table extraction tool."
      category="PDF Tools"
      keywords="pdf table extractor, extract table from pdf, pdf to csv, pdf to excel, table extraction, free pdf tool"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                }}
                maxSize={20 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload PDF with tables (max 20MB)"
              />

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Table className="h-4 w-4" />
                <AlertDescription>
                  Works best with text-based PDFs containing clearly formatted tables.
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleExtractTables}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Table className="mr-2 size-4" />
                {status === "processing" ? "Extracting..." : "Extract Tables"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={status === "processing" ? `Processing PDF... ${Math.round(progress)}%` : ""}
          />
        </div>

        <div className="space-y-4">
          <Card className="h-full min-h-[500px]">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Table className="size-4" />
                  Extracted Tables ({tables.length})
                </h3>
              </div>

              {tables.length > 0 ? (
                <Tabs defaultValue="0" className="flex-1 flex flex-col">
                  <TabsList className="w-full justify-start overflow-x-auto">
                    {tables.map((table, idx) => (
                      <TabsTrigger key={idx} value={idx.toString()}>
                        Table {idx + 1} (Page {table.pageNumber})
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {tables.map((table, idx) => (
                    <TabsContent key={idx} value={idx.toString()} className="flex-1 flex flex-col mt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-muted-foreground">
                          {table.headers.length} columns, {table.rows.length} rows
                        </span>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyTable(idx)}
                          >
                            {copiedTable === idx ? (
                              <Check className="size-4 mr-1" />
                            ) : (
                              <Copy className="size-4 mr-1" />
                            )}
                            {copiedTable === idx ? "Copied!" : "Copy"}
                          </Button>
                          <DownloadButton
                            data={tableToCSV(table)}
                            filename={`table-${idx + 1}.csv`}
                            mimeType="text/csv"
                            variant="outline"
                            size="sm"
                          >
                            <Download className="size-4 mr-1" />
                            CSV
                          </DownloadButton>
                        </div>
                      </div>

                      <div className="flex-1 overflow-auto border rounded-lg">
                        <table className="w-full text-sm">
                          <thead className="bg-muted/50 sticky top-0">
                            <tr>
                              {table.headers.map((header, hIdx) => (
                                <th
                                  key={hIdx}
                                  className="text-left p-2 font-medium border-b whitespace-nowrap"
                                >
                                  {header || `Column ${hIdx + 1}`}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {table.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="border-b last:border-0 hover:bg-muted/30">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="p-2 whitespace-nowrap">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Table className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a PDF to extract tables</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="PDF Table Extractor" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
