import { useState, useCallback } from "react";
import { Trash2, FileText, FilePlus, Scissors } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { removePages, getPDFPageCount } from "@/lib/tools/pdf-utils";

const FAQS = [
  {
    question: "How do I remove pages from a PDF?",
    answer:
      "Upload your PDF, enter the page numbers you want to remove (e.g., '1, 3, 5' or '2-4'), and click 'Remove Pages'. Download your modified PDF instantly.",
  },
  {
    question: "Is this PDF page remover free?",
    answer:
      "Yes! Remove pages from PDFs completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "Can I remove multiple pages at once?",
    answer:
      "Yes! You can remove multiple pages by separating them with commas (1, 3, 5) or specifying ranges (2-4). You can also combine both (1, 3-5, 7).",
  },
  {
    question: "Will removing pages affect PDF quality?",
    answer:
      "No quality loss! The remaining pages retain all their original text, images, and formatting exactly as they were.",
  },
  {
    question: "Is my PDF data secure?",
    answer:
      "100% secure. All processing happens in your browser. Your PDF never leaves your device.",
  },
];

const RELATED_TOOLS = [
  {
    title: "PDF Merger",
    description: "Combine multiple PDFs",
    href: "/tools/pdf-merger",
    icon: FilePlus,
    category: "PDF Tools",
  },
  {
    title: "PDF Splitter",
    description: "Split PDFs into pages",
    href: "/tools/pdf-splitter",
    icon: Scissors,
    category: "PDF Tools",
  },
];

function parsePageInput(input: string, maxPages: number): number[] {
  const pages: Set<number> = new Set();
  const parts = input.split(",").map((s) => s.trim());

  for (const part of parts) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map((n) => parseInt(n.trim()));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = Math.max(1, start); i <= Math.min(maxPages, end); i++) {
          pages.add(i);
        }
      }
    } else {
      const num = parseInt(part);
      if (!isNaN(num) && num >= 1 && num <= maxPages) {
        pages.add(num);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export default function PDFPageRemover() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pagesToRemove, setPagesToRemove] = useState("");
  const [resultPdf, setResultPdf] = useState<Blob | null>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setResultPdf(null);
      setStatus("idle");
      setPagesToRemove("");
      try {
        const count = await getPDFPageCount(file);
        setPageCount(count);
      } catch {
        setPageCount(0);
      }
    } else {
      setSelectedFile(null);
      setPageCount(0);
    }
  }, []);

  const handleRemovePages = useCallback(async () => {
    if (!selectedFile || !pagesToRemove.trim()) return;

    const parsedPages = parsePageInput(pagesToRemove, pageCount);
    if (parsedPages.length === 0) {
      return;
    }

    if (parsedPages.length >= pageCount) {
      return;
    }

    setStatus("processing");

    try {
      const result = await removePages(selectedFile, parsedPages);
      setResultPdf(result);
      setStatus("completed");
    } catch (error) {
      console.error("Page removal error:", error);
      setStatus("error");
    }
  }, [selectedFile, pagesToRemove, pageCount]);

  const parsedPages = pagesToRemove
    ? parsePageInput(pagesToRemove, pageCount)
    : [];

  return (
    <ToolLayout
      title="Remove Pages from PDF Online Free - PDF Page Deleter"
      description="Delete pages from PDF online for free. Remove unwanted pages from any PDF file. No signup, no watermarks, instant download."
      category="PDF Tools"
      keywords="remove pages from pdf, delete pdf pages, pdf page remover, remove page from pdf online free, delete pages in pdf, pdf page deleter"
      toolContext="pdf-merger"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <FileUploader
                accept={{ "application/pdf": [".pdf"] }}
                maxSize={25 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload PDF to remove pages (max 25MB)"
              />

              {selectedFile && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-red-100 flex items-center justify-center">
                      <FileText className="size-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)} • {pageCount} pages
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-sm font-medium">Pages to Remove</Label>
                <Input
                  placeholder="e.g., 1, 3, 5-7"
                  value={pagesToRemove}
                  onChange={(e) => setPagesToRemove(e.target.value)}
                  disabled={!selectedFile}
                />
                <p className="text-xs text-muted-foreground">
                  Enter page numbers separated by commas, or ranges (e.g., 2-4)
                </p>
                {parsedPages.length > 0 && (
                  <p className="text-xs text-primary">
                    Will remove {parsedPages.length} page(s): {parsedPages.join(", ")}
                  </p>
                )}
              </div>

              <Button
                onClick={handleRemovePages}
                disabled={
                  !selectedFile ||
                  parsedPages.length === 0 ||
                  parsedPages.length >= pageCount ||
                  status === "processing"
                }
                className="w-full"
                size="lg"
              >
                <Trash2 className="mr-2 size-4" />
                {status === "processing" ? "Removing..." : "Remove Pages"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus status={status} />
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {resultPdf ? (
                <div className="text-center space-y-4">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <Trash2 className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Pages Removed!</h3>
                    <p className="text-sm text-muted-foreground">
                      Removed {parsedPages.length} page(s), {pageCount - parsedPages.length} remaining
                    </p>
                  </div>
                  <DownloadButton
                    data={resultPdf}
                    filename={`modified-${selectedFile?.name || "document.pdf"}`}
                    mimeType="application/pdf"
                    size="lg"
                  >
                    Download Modified PDF
                  </DownloadButton>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Trash2 className="size-12 mx-auto mb-4 opacity-20" />
                  <p>Modified PDF will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="PDF Page Remover" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
