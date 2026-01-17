import { useState, useCallback } from "react";
import { UserCircle, Copy, Check, FileText, Download, AlertCircle, Briefcase, GraduationCap, Award, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  ToolLayout,
  FileUploader,
  ProcessingStatus,
  DownloadButton,
  ToolFAQ,
  RelatedTools,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { performOCR, type OCRProgress } from "@/lib/tools/ocr-utils";
import { parseResume } from "@/lib/tools/openrouter";
import { extractTextFromPDF } from "@/lib/tools/pdf-utils";

const FAQS = [
  {
    question: "How does the resume parser work?",
    answer:
      "Upload your resume (PDF or image), and our AI extracts key information like contact details, work experience, education, skills, and certifications into a structured JSON format.",
  },
  {
    question: "What resume formats are supported?",
    answer:
      "We support PDF resumes and image formats (JPG, PNG). Works with any resume layout, including creative designs, traditional formats, and ATS-optimized resumes.",
  },
  {
    question: "Is my resume data secure?",
    answer:
      "Yes. PDF text extraction and image OCR happen locally in your browser. Only the extracted text is sent to our AI for parsing. We never store your resumes.",
  },
  {
    question: "What data does the resume parser extract?",
    answer:
      "Contact info (name, email, phone), professional summary, work experience with dates and descriptions, education, skills, certifications, languages, and social links.",
  },
  {
    question: "Can I use this for ATS screening?",
    answer:
      "Yes! The structured JSON output can be imported into applicant tracking systems, HR software, or used to analyze resume content programmatically.",
  },
  {
    question: "How accurate is the resume parsing?",
    answer:
      "Our AI achieves high accuracy on well-formatted resumes. For best results, use clear section headings and avoid complex multi-column layouts.",
  },
];

const RELATED_TOOLS = [
  {
    title: "PDF to Text",
    description: "Extract text from PDF documents",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "OCR & Text Extraction",
  },
  {
    title: "Contract Analyzer",
    description: "Analyze contract terms with AI",
    href: "/tools/contract-analyzer",
    icon: FileText,
    category: "AI Document Processing",
    isAIPowered: true,
  },
];

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    highlights: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    graduationDate: string;
    gpa: string | null;
  }>;
  skills: string[];
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
  linkedIn: string | null;
  website: string | null;
}

export default function ResumeParser() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [rawResponse, setRawResponse] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setExtractedText("");
      setResumeData(null);
      setRawResponse("");
      setStatus("idle");
      setError(null);
    } else {
      setSelectedFile(null);
    }
  }, []);

  const handleParseResume = useCallback(async () => {
    if (!selectedFile) return;

    setStatus("processing");
    setProgress(0);
    setError(null);
    setResumeData(null);
    setRawResponse("");

    try {
      let text = "";

      // Extract text based on file type
      if (selectedFile.type === "application/pdf") {
        setProgressMessage("Extracting text from PDF...");
        setProgress(30);
        text = await extractTextFromPDF(selectedFile);
      } else {
        // Use OCR for images
        const handleProgress = (ocrProgress: OCRProgress) => {
          setProgress(Math.min(ocrProgress.progress * 0.6, 60));
          setProgressMessage(ocrProgress.status);
        };

        const result = await performOCR(selectedFile, "eng", handleProgress);
        text = result.text;
      }

      setExtractedText(text);
      setProgress(70);
      setProgressMessage("Parsing resume with AI...");

      // Send to AI for structured extraction
      const response = await parseResume(text);
      setRawResponse(response.content);

      // Try to parse the JSON response
      try {
        const parsed = JSON.parse(response.content);
        setResumeData(parsed);
      } catch {
        console.warn("Could not parse resume data as JSON");
      }

      setStatus("completed");
      setProgress(100);
    } catch (err) {
      console.error("Resume parsing error:", err);
      setError(err instanceof Error ? err.message : "Failed to parse resume");
      setStatus("error");
    }
  }, [selectedFile]);

  const handleCopyData = useCallback(() => {
    const dataToCopy = resumeData ? JSON.stringify(resumeData, null, 2) : rawResponse;
    navigator.clipboard.writeText(dataToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [resumeData, rawResponse]);

  return (
    <ToolLayout
      title="Resume Parser - Extract Resume Data Free"
      description="Parse resumes and CVs instantly using AI. Extract contact info, experience, education, skills in structured JSON. Free ATS-compatible resume parser."
      category="AI Document Processing"
      keywords="resume parser, CV parser, extract resume data, parse resume, ATS parser, resume to JSON, free resume parser"
      isAIPowered={true}
      toolContext="resume-parser"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <FileUploader
                accept={{
                  "application/pdf": [".pdf"],
                  "image/*": [".jpg", ".jpeg", ".png", ".heic", ".webp"],
                }}
                maxSize={10 * 1024 * 1024}
                multiple={false}
                onFilesSelected={handleFilesSelected}
                description="Upload resume (PDF or image)"
              />

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={handleParseResume}
                disabled={!selectedFile || status === "processing"}
                className="w-full"
                size="lg"
              >
                <UserCircle className="mr-2 size-4" />
                {status === "processing" ? "Parsing..." : "Parse Resume"}
              </Button>
            </CardContent>
          </Card>

          <ProcessingStatus
            status={status}
            progress={progress}
            message={progressMessage || "Processing..."}
          />

          {extractedText && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Extracted Text</h3>
                <Textarea
                  value={extractedText}
                  readOnly
                  className="min-h-[150px] text-xs font-mono"
                />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card className="h-full">
            <CardContent className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <UserCircle className="size-4" />
                  Resume Data
                </h3>
                {(resumeData || rawResponse) && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyData}
                      className="gap-2"
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                    <DownloadButton
                      data={resumeData ? JSON.stringify(resumeData, null, 2) : rawResponse}
                      filename="resume-data.json"
                      mimeType="application/json"
                      variant="outline"
                      size="sm"
                    >
                      <Download className="size-4 mr-1" />
                      JSON
                    </DownloadButton>
                  </div>
                )}
              </div>

              {resumeData ? (
                <div className="flex-1 overflow-auto space-y-4">
                  {/* Contact Header */}
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-xl">{resumeData.name || "Unknown"}</h4>
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-muted-foreground">
                      {resumeData.email && <span>{resumeData.email}</span>}
                      {resumeData.phone && <span>• {resumeData.phone}</span>}
                      {resumeData.location && <span>• {resumeData.location}</span>}
                    </div>
                    <div className="mt-2 flex gap-2">
                      {resumeData.linkedIn && (
                        <Badge variant="outline" className="text-xs">
                          <Globe className="size-3 mr-1" />
                          LinkedIn
                        </Badge>
                      )}
                      {resumeData.website && (
                        <Badge variant="outline" className="text-xs">
                          <Globe className="size-3 mr-1" />
                          Website
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Summary */}
                  {resumeData.summary && (
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-2 text-sm">Professional Summary</h5>
                      <p className="text-sm text-muted-foreground">{resumeData.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {resumeData.experience && resumeData.experience.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 font-medium text-sm flex items-center gap-2">
                        <Briefcase className="size-4" />
                        Experience ({resumeData.experience.length})
                      </div>
                      <div className="divide-y">
                        {resumeData.experience.map((exp, idx) => (
                          <div key={idx} className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{exp.title}</p>
                                <p className="text-sm text-muted-foreground">{exp.company}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                            {exp.description && (
                              <p className="text-sm mt-2">{exp.description}</p>
                            )}
                            {exp.highlights && exp.highlights.length > 0 && (
                              <ul className="mt-2 text-sm list-disc list-inside text-muted-foreground">
                                {exp.highlights.slice(0, 3).map((h, i) => (
                                  <li key={i}>{h}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {resumeData.education && resumeData.education.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 font-medium text-sm flex items-center gap-2">
                        <GraduationCap className="size-4" />
                        Education ({resumeData.education.length})
                      </div>
                      <div className="divide-y">
                        {resumeData.education.map((edu, idx) => (
                          <div key={idx} className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium">{edu.degree}</p>
                                <p className="text-sm text-muted-foreground">{edu.institution}</p>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {edu.graduationDate}
                              </span>
                            </div>
                            {edu.gpa && (
                              <p className="text-sm text-muted-foreground mt-1">GPA: {edu.gpa}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {resumeData.skills && resumeData.skills.length > 0 && (
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-2 text-sm">Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {resumeData.certifications && resumeData.certifications.length > 0 && (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-4 py-2 font-medium text-sm flex items-center gap-2">
                        <Award className="size-4" />
                        Certifications ({resumeData.certifications.length})
                      </div>
                      <div className="divide-y">
                        {resumeData.certifications.map((cert, idx) => (
                          <div key={idx} className="px-4 py-2 flex justify-between">
                            <div>
                              <p className="text-sm font-medium">{cert.name}</p>
                              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">{cert.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {resumeData.languages && resumeData.languages.length > 0 && (
                    <div className="p-4 border rounded-lg">
                      <h5 className="font-semibold mb-2 text-sm flex items-center gap-2">
                        <Globe className="size-4" />
                        Languages
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {resumeData.languages.map((lang, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {lang.language} - {lang.proficiency}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : rawResponse ? (
                <Textarea
                  value={rawResponse}
                  readOnly
                  className="flex-1 min-h-[300px] resize-none font-mono text-sm"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  <p>Upload a resume to parse</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ToolFAQ faqs={FAQS} toolName="Resume Parser" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
