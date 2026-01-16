import { useState, useCallback } from "react";
import { FileText, Copy, Check, ScanText, FilePlus } from "lucide-react";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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

// Set up PDF.js worker - using unpkg which has all npm versions
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;

const FAQS = [
  {
    question: "How do I convert PDF to text online?",
    answer:
      "Upload your PDF file, click 'Extract Text', and all text content will be extracted instantly. Copy the text to clipboard or download as a TXT file.",
  },
  {
    question: "Is this PDF to text converter free?",
    answer:
      "Yes! Our PDF to text extractor is 100% free with no limits. Convert as many PDFs as you need without registration or hidden fees.",
  },
  {
    question: "Can I extract text from scanned PDFs?",
    answer:
      "This tool extracts embedded text from digital PDFs. For scanned documents (image-based PDFs), use our Image to Text (OCR) tool instead.",
  },
  {
    question: "Does it preserve text formatting?",
    answer:
      "The text content and reading order are preserved. Complex formatting like tables and columns may not be perfectly maintained, but all text is extracted.",
  },
  {
    question: "Is my PDF data secure?",
    answer:
      "Absolutely secure! All text extraction happens locally in your browser. Your PDF is never uploaded to any server - it stays on your device.",
  },
  {
    question: "Can I extract text from large PDFs?",
    answer:
      "Yes, you can extract text from PDFs up to 25MB with up to 500 pages. Processing time depends on the document size.",
  },
  {
    question: "How do I copy text from a PDF?",
    answer:
      "Upload your PDF, click 'Extract Text', then use the 'Copy' button to copy all extracted text to your clipboard. You can also download as a TXT file.",
  },
  {
    question: "Can I extract text from PDF on mobile?",
    answer:
      "Yes! Our PDF text extractor works on any device - iPhone, Android, tablet, or desktop. No app installation required.",
  },
];

const RELATED_TOOLS = [
  {
    title: "Image to Text (OCR)",
    description: "Extract text from images and scanned documents",
    href: "/tools/image-to-text",
    icon: ScanText,
    category: "OCR & Text Extraction",
  },
  {
    title: "PDF Merger",
    description: "Combine multiple PDF files",
    href: "/tools/pdf-merger",
    icon: FilePlus,
    category: "PDF Tools",
  },
];

export default function PDFToText() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setExtractedText("");
      setStatus("idle");
      setPageCount(0);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleExtractText = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setProgress(0);
    setExtractedText("");

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();

      // Load PDF with explicit options
      const loadingTask = getDocument({
        data: arrayBuffer,
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      });

      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      setPageCount(numPages);

      let fullText = "";

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(" ");

        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
        setProgress((i / numPages) * 100);
      }

      setExtractedText(fullText.trim());
      setStatus("completed");
    } catch (error: any) {
      console.error("PDF extraction error:", error);
      console.error("Error details:", error?.message, error?.name);
      setStatus("error");
    }
  }, [selectedFile]);

  const handleCopyText = useCallback(() => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [extractedText]);

  return (
    <ToolLayout
      title="PDF to Text Converter - Extract Text from PDF Free"
      description="Extract text from PDF online for free. Convert PDF to text instantly, copy to clipboard or download as TXT. No signup, no watermarks, 100% secure."
      category="OCR & Text Extraction"
      keywords="pdf to text, extract text from pdf, pdf to text converter, pdf text extractor, convert pdf to txt, copy text from pdf, pdf to text online free, get text from pdf"
      toolContext="pdf-to-text"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                }}
                maxSize={25 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload a PDF to extract text (max 25MB)"
              />

              {selectedFile && (
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
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleExtractText}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                {status === "processing" ? "Extracting..." : "Extract Text"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={
              status === "processing"
                ? `Extracting text from page ${Math.ceil(
                    (progress / 100) * pageCount
                  )} of ${pageCount}...`
                : undefined
            }
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <FileText className="size-4" />
                  Extracted Text
                </h3>
                {extractedText && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyText}
                      className="gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="size-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="size-4" />
                          Copy
                        </>
                      )}
                    </Button>
                    <DownloadButton
                      data={extractedText}
                      filename="extracted-text.txt"
                      mimeType="text/plain"
                      variant="outline"
                      size="sm"
                    >
                      Download
                    </DownloadButton>
                  </div>
                )}
              </div>
              <Textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                placeholder="Extracted text will appear here..."
                className="flex-1 min-h-[300px] resize-none font-mono text-sm"
                readOnly={status === "processing"}
              />
              {extractedText && (
                <p className="text-xs text-muted-foreground mt-2">
                  {extractedText.split(/\s+/).filter(Boolean).length} words |{" "}
                  {extractedText.length} characters
                  {pageCount > 0 && ` | ${pageCount} pages`}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="PDF to Text Extractor" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
