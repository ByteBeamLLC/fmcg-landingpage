import { useState, useCallback, useRef, useEffect } from "react";
import { EyeOff, Download, FileText, AlertCircle, Undo, Trash2, ZoomIn, ZoomOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  ToolFAQ,
  RelatedTools,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import * as pdfjsLib from "pdfjs-dist";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const FAQS = [
  {
    question: "How does the PDF redactor work?",
    answer:
      "Upload your PDF, then draw rectangles over the areas you want to redact. The tool permanently blacks out those areas in the PDF, removing the underlying content.",
  },
  {
    question: "Is the redaction permanent?",
    answer:
      "Yes. Unlike simple overlay tools, this redactor removes the underlying content. The original text under redacted areas cannot be recovered from the output PDF.",
  },
  {
    question: "Is my PDF data secure?",
    answer:
      "Yes. All processing happens locally in your browser. Your PDF is never uploaded to any server, making it safe for sensitive documents.",
  },
  {
    question: "What types of content can be redacted?",
    answer:
      "You can redact any visible content: text, images, signatures, personal information, financial data, or any area you select.",
  },
  {
    question: "Can I redact multiple pages?",
    answer:
      "Yes! Navigate between pages and add redactions to any page. All redactions are applied when you download the final PDF.",
  },
  {
    question: "Can I undo redactions?",
    answer:
      "Yes, you can undo redactions before downloading. Once you download the redacted PDF, the changes are permanent.",
  },
];

const RELATED_TOOLS = [
  {
    title: "PDF Compressor",
    description: "Reduce PDF file size",
    href: "/tools/pdf-compressor",
    icon: FileText,
    category: "PDF Tools",
  },
  {
    title: "PDF to Text",
    description: "Extract text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
];

interface RedactionArea {
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function PDFRedactor() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [redactions, setRedactions] = useState<RedactionArea[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [currentRect, setCurrentRect] = useState<RedactionArea | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setRedactions([]);
      setCurrentPage(1);
      setError(null);

      try {
        const arrayBuffer = await files[0].arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setStatus("idle");
      } catch (err) {
        console.error("PDF load error:", err);
        setError("Failed to load PDF. Please try another file.");
        setStatus("error");
      }
    } else {
      setSelectedFile(null);
      setPdfDoc(null);
    }
  }, []);

  // Render current page
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || !overlayRef.current) return;

    const renderPage = async () => {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current!;
      const context = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const overlay = overlayRef.current!;
      overlay.width = viewport.width;
      overlay.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      // Draw existing redactions for this page
      drawRedactions();
    };

    renderPage();
  }, [pdfDoc, currentPage, scale]);

  // Draw redactions overlay
  const drawRedactions = useCallback(() => {
    if (!overlayRef.current) return;

    const ctx = overlayRef.current.getContext("2d")!;
    ctx.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);

    // Draw saved redactions for current page
    const pageRedactions = redactions.filter((r) => r.page === currentPage);
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";

    for (const r of pageRedactions) {
      ctx.fillRect(r.x * scale, r.y * scale, r.width * scale, r.height * scale);
    }

    // Draw current rectangle being drawn
    if (currentRect) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.fillRect(
        currentRect.x * scale,
        currentRect.y * scale,
        currentRect.width * scale,
        currentRect.height * scale
      );
      ctx.strokeRect(
        currentRect.x * scale,
        currentRect.y * scale,
        currentRect.width * scale,
        currentRect.height * scale
      );
    }
  }, [redactions, currentPage, scale, currentRect]);

  useEffect(() => {
    drawRedactions();
  }, [drawRedactions]);

  const getCanvasCoordinates = (e: React.MouseEvent): { x: number; y: number } => {
    const canvas = overlayRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const coords = getCanvasCoordinates(e);
    setIsDrawing(true);
    setDrawStart(coords);
    setCurrentRect({
      page: currentPage,
      x: coords.x,
      y: coords.y,
      width: 0,
      height: 0,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !drawStart) return;

    const coords = getCanvasCoordinates(e);
    setCurrentRect({
      page: currentPage,
      x: Math.min(drawStart.x, coords.x),
      y: Math.min(drawStart.y, coords.y),
      width: Math.abs(coords.x - drawStart.x),
      height: Math.abs(coords.y - drawStart.y),
    });
  };

  const handleMouseUp = () => {
    if (currentRect && currentRect.width > 5 && currentRect.height > 5) {
      setRedactions((prev) => [...prev, currentRect]);
    }
    setIsDrawing(false);
    setDrawStart(null);
    setCurrentRect(null);
  };

  const handleUndo = () => {
    setRedactions((prev) => prev.slice(0, -1));
  };

  const handleClearPage = () => {
    setRedactions((prev) => prev.filter((r) => r.page !== currentPage));
  };

  const handleClearAll = () => {
    setRedactions([]);
  };

  const handleDownload = useCallback(async () => {
    if (!selectedFile || redactions.length === 0) return;

    setStatus("processing");

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfLibDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfLibDoc.getPages();

      for (const redaction of redactions) {
        if (redaction.page <= pages.length) {
          const page = pages[redaction.page - 1];
          const { height } = page.getSize();

          // PDF coordinates are bottom-up, canvas coordinates are top-down
          const pdfY = height - redaction.y - redaction.height;

          page.drawRectangle({
            x: redaction.x,
            y: pdfY,
            width: redaction.width,
            height: redaction.height,
            color: rgb(0, 0, 0),
          });
        }
      }

      const pdfBytes = await pdfLibDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `redacted-${selectedFile.name}`);

      setStatus("completed");
    } catch (err) {
      console.error("PDF redaction error:", err);
      setError("Failed to save redacted PDF. Please try again.");
      setStatus("error");
    }
  }, [selectedFile, redactions]);

  const pageRedactionCount = redactions.filter((r) => r.page === currentPage).length;

  return (
    <ToolLayout
      title="PDF Redactor - Anonymize Documents Free"
      description="Redact sensitive information from PDF documents. Permanently black out text, images, and personal data. Free online PDF redaction tool."
      category="PDF Tools"
      keywords="pdf redactor, redact pdf, anonymize pdf, black out pdf, remove sensitive info, pdf privacy, free pdf redactor"
    >
      <div className="grid lg:grid-cols-3 gap-6">
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
                description="Upload PDF to redact (max 20MB)"
              />

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {pdfDoc && (
                <>
                  <div className="space-y-2">
                    <Label>Zoom: {Math.round(scale * 100)}%</Label>
                    <div className="flex items-center gap-2">
                      <ZoomOut className="size-4" />
                      <Slider
                        value={[scale]}
                        onValueChange={([value]) => setScale(value)}
                        min={0.5}
                        max={2}
                        step={0.1}
                        className="flex-1"
                      />
                      <ZoomIn className="size-4" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                      >
                        Prev
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage >= totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Redactions on this page:</span>
                      <span className="font-medium">{pageRedactionCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Total redactions:</span>
                      <span className="font-medium">{redactions.length}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUndo}
                      disabled={redactions.length === 0}
                    >
                      <Undo className="size-4 mr-1" />
                      Undo
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearPage}
                      disabled={pageRedactionCount === 0}
                    >
                      Clear Page
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearAll}
                      disabled={redactions.length === 0}
                    >
                      <Trash2 className="size-4 mr-1" />
                      Clear All
                    </Button>
                  </div>

                  <Alert>
                    <EyeOff className="h-4 w-4" />
                    <AlertDescription>
                      Click and drag on the PDF to select areas to redact.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleDownload}
                    disabled={redactions.length === 0 || status === "processing"}
                    className="w-full"
                    size="lg"
                  >
                    <Download className="mr-2 size-4" />
                    {status === "processing"
                      ? "Processing..."
                      : `Download Redacted PDF (${redactions.length} redactions)`}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {status !== "idle" && (
            <ProcessingStatus
              status={status}
              message={status === "processing" ? "Applying redactions..." : "PDF redacted successfully!"}
            />
          )}
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full min-h-[600px]">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <EyeOff className="size-4" />
                  PDF Preview
                </h3>
                {pdfDoc && (
                  <span className="text-sm text-muted-foreground">
                    Draw rectangles to mark areas for redaction
                  </span>
                )}
              </div>

              {pdfDoc ? (
                <div
                  ref={containerRef}
                  className="flex-1 overflow-auto bg-gray-100 rounded-lg flex items-center justify-center p-4"
                >
                  <div className="relative inline-block shadow-lg">
                    <canvas ref={canvasRef} className="block" />
                    <canvas
                      ref={overlayRef}
                      className="absolute top-0 left-0 cursor-crosshair"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <EyeOff className="size-12 mx-auto mb-4 opacity-50" />
                    <p>Upload a PDF to start redacting</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="PDF Redactor" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
