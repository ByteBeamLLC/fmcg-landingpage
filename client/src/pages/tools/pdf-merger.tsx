import { useState, useCallback } from "react";
import {
  FilePlus,
  GripVertical,
  Trash2,
  FileText,
  Scissors,
  Minimize2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { mergePDFs, getPDFPageCount } from "@/lib/tools/pdf-utils";
import { motion, Reorder } from "framer-motion";

interface PDFFile {
  id: string;
  file: File;
  pageCount: number | null;
}

const FAQS = [
  {
    question: "How does the PDF Merger work?",
    answer:
      "Our PDF Merger combines multiple PDF files into a single document. All processing happens in your browser using pdf-lib, ensuring your files never leave your device.",
  },
  {
    question: "Is there a limit on the number of PDFs I can merge?",
    answer:
      "You can merge up to 20 PDF files at once, with a total combined size limit of 100MB. For most use cases, this is more than sufficient.",
  },
  {
    question: "Can I reorder the PDFs before merging?",
    answer:
      "Yes! Simply drag and drop the files in the list to arrange them in your desired order before clicking Merge.",
  },
  {
    question: "Will the merged PDF maintain the original quality?",
    answer:
      "Yes, the merger preserves all content, formatting, images, and links from the original PDFs without any quality loss.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely! All processing happens locally in your browser. Your PDFs are never uploaded to any server, ensuring complete privacy.",
  },
  {
    question: "What if my PDF is password-protected?",
    answer:
      "Password-protected PDFs may not merge correctly. Please remove the password protection first using our PDF Unlock tool.",
  },
];

const RELATED_TOOLS = [
  {
    title: "PDF Splitter",
    description: "Split PDFs into separate pages or sections",
    href: "/tools/pdf-splitter",
    icon: Scissors,
    category: "PDF Tools",
  },
  {
    title: "PDF Compressor",
    description: "Reduce PDF file size while maintaining quality",
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

export default function PDFMerger() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [pdfFiles, setPdfFiles] = useState<PDFFile[]>([]);
  const [mergedPdf, setMergedPdf] = useState<Blob | null>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    const newPdfFiles: PDFFile[] = [];

    for (const file of files) {
      try {
        const pageCount = await getPDFPageCount(file);
        newPdfFiles.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          pageCount,
        });
      } catch (error) {
        console.error(`Error reading ${file.name}:`, error);
        newPdfFiles.push({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          pageCount: null,
        });
      }
    }

    setPdfFiles((prev) => [...prev, ...newPdfFiles].slice(0, 20));
    setMergedPdf(null);
    setStatus("idle");
  }, []);

  const handleRemoveFile = useCallback((id: string) => {
    setPdfFiles((prev) => prev.filter((f) => f.id !== id));
    setMergedPdf(null);
    setStatus("idle");
  }, []);

  const handleReorder = useCallback((newOrder: PDFFile[]) => {
    setPdfFiles(newOrder);
    setMergedPdf(null);
    setStatus("idle");
  }, []);

  const handleMerge = useCallback(async () => {
    if (pdfFiles.length < 2) return;

    setStatus("processing");
    setProgress(0);

    try {
      const files = pdfFiles.map((p) => p.file);
      const merged = await mergePDFs(files);
      setMergedPdf(merged);
      setStatus("completed");
    } catch (error) {
      console.error("Merge error:", error);
      setStatus("error");
    }
  }, [pdfFiles]);

  const totalPages = pdfFiles.reduce(
    (sum, f) => sum + (f.pageCount || 0),
    0
  );
  const totalSize = pdfFiles.reduce((sum, f) => sum + f.file.size, 0);

  return (
    <ToolLayout
      title="Free PDF Merger - Combine PDFs Online"
      description="Merge multiple PDF files into one document for free. Drag and drop to reorder, then combine. No signup required, 100% private."
      category="PDF Tools"
      keywords="merge pdf, combine pdf, join pdf, pdf merger online, free pdf combiner, merge pdf files"
    >
      <div className="space-y-6">
        {/* Upload Section */}
        <Card>
          <CardContent className="p-6">
            <FileUploader
              accept={{
                "application/pdf": [".pdf"],
              }}
              maxSize={25 * 1024 * 1024} // 25MB per file
              multiple={true}
              maxFiles={20}
              onFilesSelected={handleFilesSelected}
              description="Upload PDFs to merge (max 20 files, 25MB each)"
            />
          </CardContent>
        </Card>

        {/* File List */}
        {pdfFiles.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">
                  Files to Merge ({pdfFiles.length})
                </h3>
                <div className="text-sm text-muted-foreground">
                  {totalPages} pages | {formatFileSize(totalSize)}
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop to reorder files. The merged PDF will follow this
                order.
              </p>

              <Reorder.Group
                axis="y"
                values={pdfFiles}
                onReorder={handleReorder}
                className="space-y-2"
              >
                {pdfFiles.map((pdfFile, index) => (
                  <Reorder.Item
                    key={pdfFile.id}
                    value={pdfFile}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      layout
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border hover:border-primary/30 transition-colors"
                    >
                      <GripVertical className="size-5 text-muted-foreground" />
                      <div className="size-10 rounded bg-red-100 flex items-center justify-center shrink-0">
                        <FileText className="size-5 text-red-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">
                          {pdfFile.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatFileSize(pdfFile.file.size)}
                          {pdfFile.pageCount !== null &&
                            ` | ${pdfFile.pageCount} page${
                              pdfFile.pageCount !== 1 ? "s" : ""
                            }`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">
                          #{index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveFile(pdfFile.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>

              {/* Actions */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPdfFiles([]);
                    setMergedPdf(null);
                    setStatus("idle");
                  }}
                >
                  Clear All
                </Button>
                <Button
                  onClick={handleMerge}
                  disabled={pdfFiles.length < 2 || status === "processing"}
                  size="lg"
                  className="gap-2"
                >
                  <FilePlus className="size-4" />
                  {status === "processing" ? "Merging..." : "Merge PDFs"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Processing Status */}
        <ProcessingStatus
          status={status}
          progress={progress}
          message={
            status === "processing"
              ? "Merging your PDFs..."
              : status === "completed"
              ? "Your merged PDF is ready to download!"
              : undefined
          }
        />

        {/* Download Result */}
        {mergedPdf && status === "completed" && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    PDFs Merged Successfully!
                  </h3>
                  <p className="text-sm text-green-700">
                    Combined {pdfFiles.length} files into {totalPages} pages |{" "}
                    {formatFileSize(mergedPdf.size)}
                  </p>
                </div>
                <DownloadButton
                  data={mergedPdf}
                  filename="merged.pdf"
                  mimeType="application/pdf"
                  size="lg"
                >
                  Download Merged PDF
                </DownloadButton>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State Message */}
        {pdfFiles.length === 0 && (
          <div className="text-center py-8">
            <FilePlus className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Upload PDFs to Get Started
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Select multiple PDF files to merge them into a single document.
              You'll be able to reorder them before merging.
            </p>
          </div>
        )}

        {pdfFiles.length === 1 && (
          <div className="text-center py-4 px-6 rounded-lg bg-yellow-50 border border-yellow-200">
            <p className="text-yellow-800">
              Add at least one more PDF file to merge.
            </p>
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          How to Merge PDF Files
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Upload PDFs</h3>
              <p className="text-sm text-muted-foreground">
                Select multiple PDF files you want to merge. You can upload up
                to 20 files.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Reorder Files</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop to arrange the files in your desired order for the
                merged document.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Merge & Download</h3>
              <p className="text-sm text-muted-foreground">
                Click Merge PDFs and download your combined document when ready.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <ToolFAQ faqs={FAQS} toolName="PDF Merger" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
