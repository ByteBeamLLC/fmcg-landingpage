import { useState, useCallback } from "react";
import { RotateCw, FileText, FilePlus, Scissors } from "lucide-react";
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
import { rotatePages, getPDFPageCount } from "@/lib/tools/pdf-utils";

type RotationAngle = 90 | 180 | 270;

const FAQS = [
  {
    question: "How do I rotate a PDF online?",
    answer:
      "Upload your PDF, select the rotation angle (90°, 180°, or 270°), and click 'Rotate PDF'. Download your rotated PDF instantly.",
  },
  {
    question: "Is this PDF rotator free?",
    answer:
      "Yes! Rotate PDFs completely free with no limits. No signup, no watermarks, no hidden fees.",
  },
  {
    question: "Can I rotate specific pages in a PDF?",
    answer:
      "Currently, the tool rotates all pages by the same angle. For page-specific rotation, use our PDF Splitter to extract pages, rotate, then merge.",
  },
  {
    question: "Will rotating affect PDF quality?",
    answer:
      "No quality loss! The rotation is lossless - all text, images, and formatting remain exactly the same, just rotated.",
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

export default function PDFRotate() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotationAngle, setRotationAngle] = useState<RotationAngle>(90);
  const [rotatedPdf, setRotatedPdf] = useState<Blob | null>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setRotatedPdf(null);
      setStatus("idle");
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

  const handleRotate = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");

    try {
      const result = await rotatePages(selectedFile, rotationAngle);
      setRotatedPdf(result);
      setStatus("completed");
    } catch (error) {
      console.error("Rotation error:", error);
      setStatus("error");
    }
  }, [selectedFile, rotationAngle]);

  return (
    <ToolLayout
      title="Rotate PDF Online Free - PDF Page Rotator"
      description="Rotate PDF pages online for free. Turn PDF pages 90°, 180°, or 270°. No signup, no watermarks, instant download."
      category="PDF Tools"
      keywords="rotate pdf, pdf rotator, turn pdf, rotate pdf pages, rotate pdf online free, flip pdf, pdf rotation tool"
      toolContext="pdf-rotate"
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
                description="Upload PDF to rotate (max 25MB)"
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
                <Label className="text-sm font-medium">Rotation Angle</Label>
                <RadioGroup
                  value={rotationAngle.toString()}
                  onValueChange={(v) => setRotationAngle(parseInt(v) as RotationAngle)}
                  className="grid grid-cols-3 gap-4"
                >
                  {[
                    { value: "90", label: "90° Right" },
                    { value: "180", label: "180°" },
                    { value: "270", label: "90° Left" },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                        rotationAngle.toString() === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value={option.value} className="sr-only" />
                      <RotateCw
                        className="size-6"
                        style={{
                          transform: `rotate(${parseInt(option.value)}deg)`,
                        }}
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <Button
                onClick={handleRotate}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <RotateCw className="mr-2 size-4" />
                {status === "processing" ? "Rotating..." : "Rotate PDF"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus status={status} />
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col items-center justify-center">
              {rotatedPdf ? (
                <div className="text-center space-y-4">
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                    <RotateCw className="size-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">PDF Rotated!</h3>
                    <p className="text-sm text-muted-foreground">
                      All {pageCount} pages rotated {rotationAngle}°
                    </p>
                  </div>
                  <DownloadButton
                    data={rotatedPdf}
                    filename={`rotated-${selectedFile?.name || "document.pdf"}`}
                    mimeType="application/pdf"
                    size="lg"
                  >
                    Download Rotated PDF
                  </DownloadButton>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <RotateCw className="size-12 mx-auto mb-4 opacity-20" />
                  <p>Rotated PDF will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="PDF Rotator" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
