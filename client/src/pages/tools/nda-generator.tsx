import { useState, useCallback } from "react";
import {
  FileText,
  Download,
  Shield,
  AlertCircle,
  Zap,
  Lock,
  FileCheck,
  Clock,
  Settings,
  Briefcase,
  Building2,
  Users,
  Handshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToolLayout,
  ProcessingStatus,
  ToolFAQ,
  RelatedTools,
  HowItWorks,
  Features,
  UseCases,
  WhatYouGet,
  TechnicalInfo,
} from "@/components/tools";
import type { ProcessingState } from "@/components/tools";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

// SEO Content: How It Works Steps
const HOW_IT_WORKS_STEPS = [
  {
    title: "Choose NDA Type",
    description: "Select mutual NDA (both parties share info) or one-way NDA (one party discloses).",
  },
  {
    title: "Enter Party Details",
    description: "Fill in names and addresses of the disclosing and receiving parties.",
  },
  {
    title: "Customize Terms",
    description: "Set confidentiality period, governing state, purpose, and any additional terms.",
  },
  {
    title: "Generate & Download",
    description: "Get a professional PDF instantly. Print, sign, and you're ready to go.",
  },
];

// SEO Content: Features
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Create a professional NDA in under 2 minutes. No signup or login required.",
  },
  {
    icon: Shield,
    title: "Legally Sound Template",
    description: "Based on standard NDA language used by law firms. Ready for attorney review.",
  },
  {
    icon: Lock,
    title: "100% Private",
    description: "All PDF generation happens in your browser. Your data never touches a server.",
  },
  {
    icon: FileCheck,
    title: "Mutual or One-Way",
    description: "Choose between mutual NDAs or unilateral agreements based on your needs.",
  },
  {
    icon: Clock,
    title: "Flexible Duration",
    description: "Set confidentiality periods from 1 to 10 years to match your requirements.",
  },
  {
    icon: Settings,
    title: "Customizable Terms",
    description: "Add custom clauses, specify purpose, and set governing jurisdiction.",
  },
];

// SEO Content: Use Cases
const USE_CASES = [
  {
    icon: Briefcase,
    title: "Startups & Entrepreneurs",
    description: "Protect your business ideas when pitching to investors, partners, or potential employees.",
  },
  {
    icon: Building2,
    title: "Businesses & Corporations",
    description: "Standard NDAs for vendor discussions, partnership explorations, and M&A due diligence.",
  },
  {
    icon: Users,
    title: "Freelancers & Consultants",
    description: "Protect client information and your own proprietary methods when starting new projects.",
  },
  {
    icon: Handshake,
    title: "Business Development",
    description: "Quick NDAs for preliminary discussions with potential partners or acquisition targets.",
  },
];

// SEO Content: What You Get
const WHAT_YOU_GET = [
  "Professional PDF ready for signatures",
  "Complete definition of confidential information",
  "Clear obligations for receiving party",
  "Standard exclusions from confidentiality",
  "Specified confidentiality duration",
  "Return of materials clause",
  "No license granted provision",
  "Remedies for breach section",
  "Governing law specification",
  "Signature blocks for both parties",
];

// SEO Content: Technical Info
const TECHNICAL_INFO = {
  description:
    "Our NDA generator uses pdf-lib to create professional PDF documents entirely in your browser. No data is sent to any server—everything happens locally on your device. The template is based on standard NDA language commonly used in business transactions, covering all essential clauses including confidentiality obligations, exclusions, term, and remedies.",
  technologies: ["pdf-lib", "Client-Side PDF Generation", "Zero Server Storage", "Browser-Based Processing"],
};

// SEO Content: FAQs (8 questions)
const FAQS = [
  {
    question: "What is an NDA (Non-Disclosure Agreement)?",
    answer:
      "A Non-Disclosure Agreement (NDA) is a legal contract that establishes confidentiality between parties. It protects sensitive information—like business plans, trade secrets, or customer data—from being shared with unauthorized third parties. NDAs are essential for business discussions, partnerships, and employment.",
  },
  {
    question: "What types of NDAs can I generate?",
    answer:
      "You can generate two types: Mutual NDAs (both parties share and receive confidential information) and One-Way/Unilateral NDAs (one party discloses information to the other). Choose mutual for partnerships and discussions; choose one-way for employee agreements or vendor disclosure.",
  },
  {
    question: "Is this NDA legally binding?",
    answer:
      "This generator creates a standard NDA template based on commonly used legal language. For the NDA to be legally binding, both parties must sign it. We recommend having a qualified attorney review the document before signing, especially for high-stakes situations.",
  },
  {
    question: "What information do I need to create an NDA?",
    answer:
      "You'll need: names and addresses of both parties, the purpose of the NDA (what you're discussing), the confidentiality period (1-10 years), and the governing state/jurisdiction. You can also add custom terms if needed.",
  },
  {
    question: "Can I customize the NDA terms?",
    answer:
      "Yes. You can specify the confidentiality period, add additional terms, describe the specific purpose, and select the governing jurisdiction. For complex customizations or industry-specific requirements, consult a lawyer.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No. All PDF generation happens locally in your browser using client-side processing. Your party names, addresses, and terms are never sent to any server. The data exists only on your device until you close the browser.",
  },
  {
    question: "What does a standard NDA include?",
    answer:
      "Our NDA includes: definition of confidential information, obligations of the receiving party, standard exclusions (public knowledge, prior possession, etc.), term and duration, return of materials requirement, no license granted clause, remedies for breach, and governing law.",
  },
  {
    question: "Should I have a lawyer review the NDA?",
    answer:
      "For important business relationships or high-value transactions, yes. While this template covers standard NDA provisions, a lawyer can customize it for your specific situation, ensure state-specific compliance, and add industry-specific protections.",
  },
];

// Related Tools (expanded for better internal linking)
const RELATED_TOOLS = [
  {
    title: "Contract Analyzer",
    description: "Analyze any contract with AI",
    href: "/tools/contract-analyzer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Contract Clause Finder",
    description: "Find specific clauses in contracts",
    href: "/tools/contract-clause-finder",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Contract Comparison",
    description: "Compare two contract versions",
    href: "/tools/contract-compare",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "Legal Summarizer",
    description: "Summarize legal documents",
    href: "/tools/legal-summarizer",
    icon: FileText,
    category: "Contract & Legal",
    isAIPowered: true,
  },
  {
    title: "PDF to Text",
    description: "Extract text from PDFs",
    href: "/tools/pdf-to-text",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
  {
    title: "PDF Merger",
    description: "Combine multiple PDFs",
    href: "/tools/pdf-merger",
    icon: FileText,
    category: "Extract, Convert & Prepare",
  },
];

interface NDAFormData {
  ndaType: "unilateral" | "mutual";
  disclosingPartyName: string;
  disclosingPartyAddress: string;
  receivingPartyName: string;
  receivingPartyAddress: string;
  purpose: string;
  confidentialityPeriod: string;
  governingState: string;
  effectiveDate: string;
  additionalTerms: string;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
  "Wisconsin", "Wyoming", "District of Columbia"
];

export default function NDAGenerator() {
  const [status, setStatus] = useState<ProcessingState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<NDAFormData>({
    ndaType: "mutual",
    disclosingPartyName: "",
    disclosingPartyAddress: "",
    receivingPartyName: "",
    receivingPartyAddress: "",
    purpose: "",
    confidentialityPeriod: "2",
    governingState: "California",
    effectiveDate: new Date().toISOString().split("T")[0],
    additionalTerms: "",
  });

  const updateField = (field: keyof NDAFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.disclosingPartyName.trim()) {
      setError("Disclosing party name is required");
      return false;
    }
    if (!formData.receivingPartyName.trim()) {
      setError("Receiving party name is required");
      return false;
    }
    if (!formData.purpose.trim()) {
      setError("Purpose of NDA is required");
      return false;
    }
    setError(null);
    return true;
  };

  const generatePDF = useCallback(async () => {
    if (!validateForm()) return;

    setStatus("processing");

    try {
      const pdfDoc = await PDFDocument.create();
      const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

      let page = pdfDoc.addPage([612, 792]); // Letter size
      const { height } = page.getSize();
      const margin = 72;
      const lineHeight = 14;
      let y = height - margin;

      const drawText = (text: string, options: { bold?: boolean; size?: number; indent?: number } = {}) => {
        const font = options.bold ? timesRomanBold : timesRoman;
        const size = options.size || 11;
        const indent = options.indent || 0;

        // Word wrap
        const words = text.split(' ');
        let line = '';
        const maxWidth = 612 - margin * 2 - indent;

        for (const word of words) {
          const testLine = line + (line ? ' ' : '') + word;
          const textWidth = font.widthOfTextAtSize(testLine, size);

          if (textWidth > maxWidth && line) {
            page.drawText(line, {
              x: margin + indent,
              y,
              size,
              font,
              color: rgb(0, 0, 0),
            });
            y -= lineHeight;
            line = word;

            // Check for page overflow
            if (y < margin) {
              page = pdfDoc.addPage([612, 792]);
              y = height - margin;
            }
          } else {
            line = testLine;
          }
        }

        if (line) {
          page.drawText(line, {
            x: margin + indent,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
          });
          y -= lineHeight;
        }
      };

      const addSpace = (lines: number = 1) => {
        y -= lineHeight * lines;
        if (y < margin) {
          page = pdfDoc.addPage([612, 792]);
          y = height - margin;
        }
      };

      // Title
      const title = formData.ndaType === "mutual"
        ? "MUTUAL NON-DISCLOSURE AGREEMENT"
        : "NON-DISCLOSURE AGREEMENT";

      page.drawText(title, {
        x: 612 / 2 - timesRomanBold.widthOfTextAtSize(title, 14) / 2,
        y,
        size: 14,
        font: timesRomanBold,
        color: rgb(0, 0, 0),
      });
      y -= lineHeight * 2;

      // Effective Date
      drawText(`This Non-Disclosure Agreement ("Agreement") is entered into as of ${formData.effectiveDate} ("Effective Date") by and between:`);
      addSpace();

      // Parties
      drawText(`${formData.disclosingPartyName}`, { bold: true });
      if (formData.disclosingPartyAddress) {
        drawText(`${formData.disclosingPartyAddress}`);
      }
      drawText(`(hereinafter referred to as "Disclosing Party")`);
      addSpace();

      drawText("AND");
      addSpace();

      drawText(`${formData.receivingPartyName}`, { bold: true });
      if (formData.receivingPartyAddress) {
        drawText(`${formData.receivingPartyAddress}`);
      }
      drawText(`(hereinafter referred to as "Receiving Party")`);
      addSpace();

      if (formData.ndaType === "mutual") {
        drawText("The Disclosing Party and Receiving Party are collectively referred to as the \"Parties\" and individually as a \"Party.\"");
        addSpace();
      }

      // Purpose
      drawText("1. PURPOSE", { bold: true });
      drawText(`The Parties wish to explore a potential business relationship regarding: ${formData.purpose}. In connection with this opportunity, each Party may disclose certain confidential and proprietary information to the other Party.`, { indent: 20 });
      addSpace();

      // Definition of Confidential Information
      drawText("2. DEFINITION OF CONFIDENTIAL INFORMATION", { bold: true });
      drawText(`"Confidential Information" means any data or information, oral or written, that is disclosed by one Party to the other and that is designated as "confidential" or that, under the circumstances, should reasonably be understood to be confidential. This includes, but is not limited to: business plans, customer lists, financial information, technical data, trade secrets, and any other proprietary information.`, { indent: 20 });
      addSpace();

      // Obligations
      drawText("3. OBLIGATIONS OF RECEIVING PARTY", { bold: true });
      drawText(`The Receiving Party agrees to: (a) hold the Confidential Information in strict confidence; (b) not disclose the Confidential Information to any third parties without prior written consent; (c) use the Confidential Information only for the Purpose stated above; (d) protect the Confidential Information using the same degree of care it uses to protect its own confidential information, but no less than reasonable care.`, { indent: 20 });
      addSpace();

      // Exclusions
      drawText("4. EXCLUSIONS", { bold: true });
      drawText(`Confidential Information does not include information that: (a) is or becomes publicly available through no fault of the Receiving Party; (b) was in the Receiving Party's possession prior to disclosure; (c) is independently developed by the Receiving Party without use of Confidential Information; (d) is rightfully obtained from a third party without restriction.`, { indent: 20 });
      addSpace();

      // Term
      drawText("5. TERM", { bold: true });
      drawText(`This Agreement shall remain in effect for ${formData.confidentialityPeriod} years from the Effective Date. The obligations of confidentiality shall survive the termination of this Agreement.`, { indent: 20 });
      addSpace();

      // Return of Materials
      drawText("6. RETURN OF MATERIALS", { bold: true });
      drawText(`Upon termination of this Agreement or upon request, the Receiving Party shall promptly return or destroy all Confidential Information and any copies thereof.`, { indent: 20 });
      addSpace();

      // No License
      drawText("7. NO LICENSE", { bold: true });
      drawText(`Nothing in this Agreement grants any rights or license to the Receiving Party in or to any Confidential Information, except the limited right to use such information for the Purpose.`, { indent: 20 });
      addSpace();

      // Remedies
      drawText("8. REMEDIES", { bold: true });
      drawText(`The Parties acknowledge that any breach of this Agreement may cause irreparable harm for which monetary damages may be inadequate. Accordingly, the non-breaching Party shall be entitled to seek equitable relief, including injunction and specific performance, in addition to any other remedies available at law.`, { indent: 20 });
      addSpace();

      // Governing Law
      drawText("9. GOVERNING LAW", { bold: true });
      drawText(`This Agreement shall be governed by and construed in accordance with the laws of the State of ${formData.governingState}, without regard to its conflicts of law principles.`, { indent: 20 });
      addSpace();

      // Additional Terms
      if (formData.additionalTerms.trim()) {
        drawText("10. ADDITIONAL TERMS", { bold: true });
        drawText(formData.additionalTerms, { indent: 20 });
        addSpace();
      }

      // Entire Agreement
      const nextSection = formData.additionalTerms.trim() ? "11" : "10";
      drawText(`${nextSection}. ENTIRE AGREEMENT`, { bold: true });
      drawText(`This Agreement constitutes the entire agreement between the Parties concerning the subject matter hereof and supersedes all prior agreements and understandings.`, { indent: 20 });
      addSpace(2);

      // Signature Blocks
      drawText("IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.");
      addSpace(2);

      drawText("DISCLOSING PARTY:", { bold: true });
      addSpace();
      drawText("Signature: _________________________________");
      addSpace();
      drawText(`Name: ${formData.disclosingPartyName}`);
      addSpace();
      drawText("Date: _________________________________");
      addSpace(2);

      drawText("RECEIVING PARTY:", { bold: true });
      addSpace();
      drawText("Signature: _________________________________");
      addSpace();
      drawText(`Name: ${formData.receivingPartyName}`);
      addSpace();
      drawText("Date: _________________________________");

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `NDA-${formData.disclosingPartyName.replace(/\s+/g, "_")}-${formData.receivingPartyName.replace(/\s+/g, "_")}.pdf`);

      setStatus("completed");
    } catch (err) {
      console.error("PDF generation error:", err);
      setError("Failed to generate PDF. Please try again.");
      setStatus("error");
    }
  }, [formData]);

  return (
    <ToolLayout
      title="Free NDA Generator"
      description="Generate professional NDA (Non-Disclosure Agreement) documents instantly. Create mutual or unilateral NDAs with customizable terms. Free NDA template generator for business, startups, and freelancers."
      category="Contract & Legal"
      keywords="NDA generator, non-disclosure agreement, NDA template, free NDA, confidentiality agreement, mutual NDA, create NDA, NDA form, business NDA, startup NDA, freelancer NDA"
    >
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label className="mb-2 block">Agreement Type</Label>
                <RadioGroup
                  value={formData.ndaType}
                  onValueChange={(value) => updateField("ndaType", value as "unilateral" | "mutual")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mutual" id="mutual" />
                    <Label htmlFor="mutual" className="cursor-pointer">Mutual NDA</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="unilateral" id="unilateral" />
                    <Label htmlFor="unilateral" className="cursor-pointer">One-Way NDA</Label>
                  </div>
                </RadioGroup>
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.ndaType === "mutual"
                    ? "Both parties share confidential information"
                    : "One party discloses to the other"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="effectiveDate">Effective Date</Label>
                  <Input
                    id="effectiveDate"
                    type="date"
                    value={formData.effectiveDate}
                    onChange={(e) => updateField("effectiveDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="period">Confidentiality Period</Label>
                  <Select
                    value={formData.confidentialityPeriod}
                    onValueChange={(value) => updateField("confidentialityPeriod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Disclosing Party</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="disclosingName">Full Name / Company Name *</Label>
                    <Input
                      id="disclosingName"
                      value={formData.disclosingPartyName}
                      onChange={(e) => updateField("disclosingPartyName", e.target.value)}
                      placeholder="Acme Corporation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="disclosingAddress">Address</Label>
                    <Input
                      id="disclosingAddress"
                      value={formData.disclosingPartyAddress}
                      onChange={(e) => updateField("disclosingPartyAddress", e.target.value)}
                      placeholder="123 Main St, City, State 12345"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Receiving Party</h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="receivingName">Full Name / Company Name *</Label>
                    <Input
                      id="receivingName"
                      value={formData.receivingPartyName}
                      onChange={(e) => updateField("receivingPartyName", e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="receivingAddress">Address</Label>
                    <Input
                      id="receivingAddress"
                      value={formData.receivingPartyAddress}
                      onChange={(e) => updateField("receivingPartyAddress", e.target.value)}
                      placeholder="456 Oak Ave, City, State 67890"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label htmlFor="purpose">Purpose of NDA *</Label>
                <Textarea
                  id="purpose"
                  value={formData.purpose}
                  onChange={(e) => updateField("purpose", e.target.value)}
                  placeholder="e.g., Discussing potential business partnership regarding software development services"
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="state">Governing State</Label>
                <Select
                  value={formData.governingState}
                  onValueChange={(value) => updateField("governingState", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="additional">Additional Terms (Optional)</Label>
                <Textarea
                  id="additional"
                  value={formData.additionalTerms}
                  onChange={(e) => updateField("additionalTerms", e.target.value)}
                  placeholder="Any additional clauses or special terms..."
                  className="min-h-[60px]"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  This is a template. We recommend having a lawyer review before signing.
                </AlertDescription>
              </Alert>

              <Button
                onClick={generatePDF}
                disabled={status === "processing"}
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 size-4" />
                {status === "processing" ? "Generating..." : "Generate NDA PDF"}
              </Button>
            </CardContent>
          </Card>

          {status !== "idle" && (
            <ProcessingStatus
              status={status}
              message={status === "processing" ? "Generating PDF..." : "PDF generated successfully!"}
            />
          )}
        </div>

        <div className="space-y-4">
          <Card className="h-full">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-4">
                <FileText className="size-4" />
                NDA Preview
              </h3>

              <div className="p-4 bg-muted/50 rounded-lg space-y-4 text-sm">
                <div className="text-center font-semibold">
                  {formData.ndaType === "mutual"
                    ? "MUTUAL NON-DISCLOSURE AGREEMENT"
                    : "NON-DISCLOSURE AGREEMENT"}
                </div>

                <p>
                  This Agreement is entered into as of{" "}
                  <span className="font-medium">{formData.effectiveDate || "[Date]"}</span> by:
                </p>

                <div className="pl-4 border-l-2">
                  <p className="font-medium">{formData.disclosingPartyName || "[Disclosing Party]"}</p>
                  <p className="text-muted-foreground text-xs">{formData.disclosingPartyAddress || "[Address]"}</p>
                </div>

                <p className="text-center">AND</p>

                <div className="pl-4 border-l-2">
                  <p className="font-medium">{formData.receivingPartyName || "[Receiving Party]"}</p>
                  <p className="text-muted-foreground text-xs">{formData.receivingPartyAddress || "[Address]"}</p>
                </div>

                <div className="border-t pt-4">
                  <p className="font-medium">Purpose:</p>
                  <p className="text-muted-foreground">{formData.purpose || "[Purpose of NDA]"}</p>
                </div>

                <div className="border-t pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-xs">Duration</p>
                    <p className="font-medium">{formData.confidentialityPeriod} years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Governing Law</p>
                    <p className="font-medium">{formData.governingState}</p>
                  </div>
                </div>

                <div className="border-t pt-4 text-muted-foreground text-xs">
                  <p>The generated PDF will include:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Definition of Confidential Information</li>
                    <li>Obligations of Receiving Party</li>
                    <li>Exclusions from Confidential Information</li>
                    <li>Term and Termination</li>
                    <li>Return of Materials</li>
                    <li>Remedies</li>
                    <li>Signature blocks for both parties</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEO Content Sections */}
      <HowItWorks
        title="How the NDA Generator Works"
        steps={HOW_IT_WORKS_STEPS}
      />

      <Features
        title="NDA Generator Features"
        features={FEATURES}
      />

      <UseCases
        title="Who Uses the NDA Generator?"
        subtitle="From startups protecting ideas to enterprises managing vendor relationships, NDAs are essential for business confidentiality."
        useCases={USE_CASES}
      />

      <WhatYouGet
        title="What's in the Generated NDA"
        items={WHAT_YOU_GET}
      />

      <TechnicalInfo
        title="Secure Client-Side Generation"
        description={TECHNICAL_INFO.description}
        technologies={TECHNICAL_INFO.technologies}
      />

      <ToolFAQ faqs={FAQS} toolName="NDA Generator" />
      <RelatedTools tools={RELATED_TOOLS} />
    </ToolLayout>
  );
}
