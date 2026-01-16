import { useState, useCallback } from "react";
import {
  Scissors,
  FileText,
  FilePlus,
  Minimize2,
  Download,
} from "lucide-react";
import JSZip from "jszip";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { splitPDF, getPDFPageCount } from "@/lib/tools/pdf-utils";

type SplitMode = "all" | "range" | "custom";

const FAQS = [
  {
    question: "How does the PDF Splitter work?",
    answer:
      "Our PDF Splitter extracts pages from your PDF into separate files. You can split every page into individual PDFs or specify custom page ranges.",
  },
  {
    question: "Can I split a PDF into specific page ranges?",
    answer:
      "Yes! You can extract specific page ranges (e.g., 1-5, 10-15) or split every page into individual PDF files.",
  },
  {
    question: "Is there a page limit?",
    answer:
      "You can split PDFs with up to 500 pages. The maximum file size is 25MB.",
  },
  {
    question: "How are split files delivered?",
    answer:
      "If you split into multiple files, they are packaged into a ZIP archive for easy download. Single range extractions download as a regular PDF.",
  },
  {
    question: "Is my PDF data secure?",
    answer:
      "Yes! All processing happens locally in your browser. Your files never leave your device.",
  },
];

const RELATED_TOOLS = [
  {
    title: "PDF Merger",
    description: "Combine multiple PDF files into one",
    href: "/tools/pdf-merger",
    icon: FilePlus,
    category: "PDF Tools",
  },
  {
    title: "PDF Compressor",
    description: "Reduce PDF file size",
    href: "/tools/pdf-compressor",
    icon: Minimize2,
    category: "PDF Tools",
  },
  {
    title: "PDF to Text Extractor",
    description: "Extract text content from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "PDF Tools",
  },
];

export default function PDFSplitter() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [splitMode, setSplitMode] = useState<SplitMode>("all");
  const [rangeStart, setRangeStart] = useState<string>("1");
  const [rangeEnd, setRangeEnd] = useState<string>("");
  const [splitResult, setSplitResult] = useState<Blob | null>(null);
  const [resultFileName, setResultFileName] = useState<string>("");

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setSplitResult(null);
      setStatus("idle");

      try {
        const count = await getPDFPageCount(file);
        setPageCount(count);
        setRangeEnd(count.toString());
      } catch (error) {
        console.error("Error reading PDF:", error);
        setPageCount(0);
      }
    } else {
      setSelectedFile(null);
      setPageCount(0);
    }
  }, []);

  const handleSplit = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setSplitResult(null);

    try {
      let pageRanges: { start: number; end: number }[] | undefined;

      if (splitMode === "range") {
        const start = parseInt(rangeStart) || 1;
        const end = parseInt(rangeEnd) || pageCount;
        pageRanges = [{ start, end }];
      }

      const splitPdfs = await splitPDF(selectedFile, pageRanges);

      if (splitPdfs.length === 1) {
        // Single file - download directly
        setSplitResult(splitPdfs[0]);
        setResultFileName(
          `${selectedFile.name.replace(".pdf", "")}-pages-${rangeStart}-${rangeEnd}.pdf`
        );
      } else {
        // Multiple files - create ZIP
        const zip = new JSZip();
        const baseName = selectedFile.name.replace(".pdf", "");

        splitPdfs.forEach((pdf, index) => {
          zip.file(`${baseName}-page-${index + 1}.pdf`, pdf);
        });

        const zipBlob = await zip.generateAsync({ type: "blob" });
        setSplitResult(zipBlob);
        setResultFileName(`${baseName}-split.zip`);
      }

      setStatus("completed");
    } catch (error) {
      console.error("Split error:", error);
      setStatus("error");
    }
  }, [selectedFile, splitMode, rangeStart, rangeEnd, pageCount]);

  return (
    <ToolLayout
      title="Free PDF Splitter - Extract Pages Online"
      description="Split PDF files into individual pages or extract specific page ranges. Free, fast, and secure - all processing happens in your browser."
      category="PDF Tools"
      keywords="split pdf, extract pdf pages, pdf splitter online, separate pdf pages, free pdf splitter"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Upload & Settings */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                }}
                maxSize={25 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload a PDF to split (max 25MB)"
              />

              {/* File Info */}
              {selectedFile && pageCount > 0 && (
                <div className="p-4 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-red-100 flex items-center justify-center">
                      <FileText className="size-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)} | {pageCount} page
                        {pageCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Split Mode */}
              {pageCount > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-3 block">
                    Split Mode
                  </Label>
                  <RadioGroup
                    value={splitMode}
                    onValueChange={(value) => setSplitMode(value as SplitMode)}
                    className="space-y-2"
                  >
                    <div
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={() => setSplitMode("all")}
                    >
                      <RadioGroupItem value="all" id="all" />
                      <div className="flex-1">
                        <Label htmlFor="all" className="font-medium cursor-pointer">
                          Split All Pages
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Extract each page as a separate PDF ({pageCount} files)
                        </p>
                      </div>
                    </div>
                    <div
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={() => setSplitMode("range")}
                    >
                      <RadioGroupItem value="range" id="range" />
                      <div className="flex-1">
                        <Label htmlFor="range" className="font-medium cursor-pointer">
                          Extract Page Range
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Extract a specific range of pages
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Range Inputs */}
              {splitMode === "range" && pageCount > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="start" className="text-sm">
                      From Page
                    </Label>
                    <Input
                      id="start"
                      type="number"
                      min={1}
                      max={pageCount}
                      value={rangeStart}
                      onChange={(e) => setRangeStart(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="end" className="text-sm">
                      To Page
                    </Label>
                    <Input
                      id="end"
                      type="number"
                      min={1}
                      max={pageCount}
                      value={rangeEnd}
                      onChange={(e) => setRangeEnd(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {/* Split Button */}
              <Button
                onClick={handleSplit}
                disabled={!selectedFile || pageCount === 0 || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Scissors className="size-4 mr-2" />
                {status === "processing" ? "Splitting..." : "Split PDF"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            message={
              status === "processing"
                ? "Splitting your PDF..."
                : status === "error"
                ? "Failed to split PDF. Please try again."
                : undefined
            }
          />
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {splitResult && status === "completed" && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6 text-center">
                <Download className="size-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-green-800 mb-2">
                  PDF Split Successfully!
                </h3>
                <p className="text-sm text-green-700 mb-4">
                  {splitMode === "all"
                    ? `${pageCount} pages extracted as separate PDFs`
                    : `Pages ${rangeStart}-${rangeEnd} extracted`}
                </p>
                <DownloadButton
                  data={splitResult}
                  filename={resultFileName}
                  mimeType={
                    resultFileName.endsWith(".zip")
                      ? "application/zip"
                      : "application/pdf"
                  }
                  size="lg"
                >
                  Download {resultFileName.endsWith(".zip") ? "ZIP" : "PDF"}
                </DownloadButton>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Split every page into separate PDF files</li>
                <li>Extract specific page ranges</li>
                <li>Download multiple pages as ZIP archive</li>
                <li>100% browser-based, files never uploaded</li>
                <li>No signup required</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="PDF Splitter" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
