import { useState, useCallback } from "react";
import {
  Minimize2,
  FileText,
  FilePlus,
  Scissors,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { compressPDF, getPDFMetadata } from "@/lib/tools/pdf-utils";

type CompressionLevel = "low" | "medium" | "high";

const COMPRESSION_OPTIONS: {
  value: CompressionLevel;
  label: string;
  description: string;
}[] = [
  {
    value: "low",
    label: "Low Compression",
    description: "Minimal size reduction, highest quality",
  },
  {
    value: "medium",
    label: "Medium Compression",
    description: "Balanced size reduction and quality",
  },
  {
    value: "high",
    label: "High Compression",
    description: "Maximum size reduction, good quality",
  },
];

const FAQS = [
  {
    question: "How does PDF compression work?",
    answer:
      "Our PDF compressor removes unnecessary metadata, optimizes internal structures, and uses object streams to reduce file size while maintaining content quality.",
  },
  {
    question: "Will compression affect my PDF quality?",
    answer:
      "Text and vector graphics remain unchanged. For PDFs with images, you may notice slight quality reduction at high compression, but text remains crisp and clear.",
  },
  {
    question: "What's the maximum file size I can compress?",
    answer:
      "You can compress PDFs up to 25MB in size. For larger files, consider splitting them first using our PDF Splitter tool.",
  },
  {
    question: "Is my PDF data secure?",
    answer:
      "Yes! All compression happens locally in your browser. Your files are never uploaded to our servers, ensuring complete privacy.",
  },
  {
    question: "How much can I reduce my PDF size?",
    answer:
      "Results vary based on the PDF content. PDFs with lots of metadata and non-optimized content can see 20-50% reduction. Already optimized PDFs may show minimal reduction.",
  },
  {
    question: "Can I compress password-protected PDFs?",
    answer:
      "If you know the password, you can compress the PDF. Otherwise, use our PDF Unlock tool first to remove password protection.",
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
    title: "PDF Splitter",
    description: "Split PDFs into separate pages",
    href: "/tools/pdf-splitter",
    icon: Scissors,
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

export default function PDFCompressor() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedPdf, setCompressedPdf] = useState<Blob | null>(null);
  const [compressionLevel, setCompressionLevel] =
    useState<CompressionLevel>("medium");
  const [pageCount, setPageCount] = useState<number>(0);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setOriginalSize(file.size);
      setCompressedPdf(null);
      setStatus("idle");

      try {
        const metadata = await getPDFMetadata(file);
        setPageCount(metadata.pageCount);
      } catch (error) {
        console.error("Error reading PDF metadata:", error);
        setPageCount(0);
      }
    } else {
      setSelectedFile(null);
      setOriginalSize(0);
      setPageCount(0);
    }
  }, []);

  const handleCompress = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setCompressedPdf(null);

    try {
      const compressed = await compressPDF(selectedFile, compressionLevel);
      setCompressedPdf(compressed);
      setStatus("completed");
    } catch (error) {
      console.error("Compression error:", error);
      setStatus("error");
    }
  }, [selectedFile, compressionLevel]);

  const compressionSavings = compressedPdf
    ? ((originalSize - compressedPdf.size) / originalSize) * 100
    : 0;

  return (
    <ToolLayout
      title="Free PDF Compressor - Reduce PDF Size Online"
      description="Compress PDF files to reduce file size while maintaining quality. Free, fast, and secure - all processing happens in your browser."
      category="PDF Tools"
      keywords="compress pdf, reduce pdf size, pdf compressor online, free pdf compression, shrink pdf, pdf size reducer"
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
                maxSize={25 * 1024 * 1024} // 25MB
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload a PDF to compress (max 25MB)"
              />

              {/* File Info */}
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
                        {formatFileSize(originalSize)}
                        {pageCount > 0 &&
                          ` | ${pageCount} page${pageCount !== 1 ? "s" : ""}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Compression Level */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Compression Level
                </Label>
                <RadioGroup
                  value={compressionLevel}
                  onValueChange={(value) =>
                    setCompressionLevel(value as CompressionLevel)
                  }
                  className="space-y-2"
                >
                  {COMPRESSION_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer"
                      onClick={() => setCompressionLevel(option.value)}
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div className="flex-1">
                        <Label
                          htmlFor={option.value}
                          className="font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Compress Button */}
              <Button
                onClick={handleCompress}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <Minimize2 className="size-4 mr-2" />
                {status === "processing" ? "Compressing..." : "Compress PDF"}
              </Button>
            </CardContent>
          </Card>

          {/* Processing Status */}
          <ProcessingStatus
            status={status}
            message={
              status === "processing"
                ? "Compressing your PDF..."
                : status === "error"
                ? "Failed to compress PDF. Please try again."
                : undefined
            }
          />
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Before/After Comparison */}
          {compressedPdf && status === "completed" && (
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="size-5 text-green-600" />
                  <h3 className="font-semibold text-green-800">
                    Compression Complete!
                  </h3>
                </div>

                <div className="flex items-center justify-between gap-4 mb-6">
                  {/* Original */}
                  <div className="flex-1 text-center p-4 rounded-lg bg-white/60">
                    <p className="text-xs text-muted-foreground mb-1">
                      Original
                    </p>
                    <p className="text-lg font-bold text-foreground">
                      {formatFileSize(originalSize)}
                    </p>
                  </div>

                  <ArrowRight className="size-5 text-green-600" />

                  {/* Compressed */}
                  <div className="flex-1 text-center p-4 rounded-lg bg-white/60">
                    <p className="text-xs text-muted-foreground mb-1">
                      Compressed
                    </p>
                    <p className="text-lg font-bold text-green-700">
                      {formatFileSize(compressedPdf.size)}
                    </p>
                  </div>
                </div>

                {/* Savings Badge */}
                <div className="text-center mb-6">
                  {compressionSavings > 0 ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800">
                      <Minimize2 className="size-4" />
                      <span className="font-semibold">
                        {compressionSavings.toFixed(1)}% size reduction
                      </span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-800">
                      <span className="text-sm">
                        This PDF is already well-optimized
                      </span>
                    </div>
                  )}
                </div>

                <DownloadButton
                  data={compressedPdf}
                  filename={`${selectedFile?.name.replace(".pdf", "")}-compressed.pdf`}
                  mimeType="application/pdf"
                  size="lg"
                  className="w-full"
                >
                  Download Compressed PDF
                </DownloadButton>
              </CardContent>
            </Card>
          )}

          {/* Features Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">
                Why Use Our PDF Compressor?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">100% Browser-Based</p>
                    <p className="text-xs text-muted-foreground">
                      Files never leave your device
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Quality Preserved</p>
                    <p className="text-xs text-muted-foreground">
                      Text and graphics remain crisp
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">No Signup Required</p>
                    <p className="text-xs text-muted-foreground">
                      Use instantly, completely free
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Fast Processing</p>
                    <p className="text-xs text-muted-foreground">
                      Compress PDFs in seconds
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">
                Compression Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  For email attachments, use High Compression to stay under size
                  limits.
                </li>
                <li>
                  For archiving, use Medium Compression for the best balance.
                </li>
                <li>
                  For printing, use Low Compression to maintain maximum quality.
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="mt-12 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          How to Compress a PDF
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Upload PDF</h3>
              <p className="text-sm text-muted-foreground">
                Select the PDF file you want to compress. Supports files up to
                25MB.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Level</h3>
              <p className="text-sm text-muted-foreground">
                Select your preferred compression level based on your needs.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-sm text-muted-foreground">
                Click Compress and download your smaller PDF file.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <ToolFAQ faqs={FAQS} toolName="PDF Compressor" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
