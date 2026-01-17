import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle2, Sparkles } from "lucide-react";

interface ToolCTAConfig {
  headline: string;
  subheadline: string;
  benefits: string[];
  ctaText: string;
  smeRole: string; // Industry-specific SME (e.g., "legal team", "finance team")
}

// Per-tool CTA configurations
const TOOL_CTA_CONFIG: Record<string, ToolCTAConfig> = {
  // ═══════════════════════════════════════════════════════════════
  // CONTRACT & LEGAL TOOLS
  // ═══════════════════════════════════════════════════════════════
  "contract-analyzer": {
    headline: "Reviewing Contracts One at a Time?",
    subheadline: "Your legal team's contract analysis logic can run on every deal—automatically.",
    benefits: [
      "Process 100+ contracts/week with consistent risk scoring",
      "Capture your senior attorneys' review criteria in an Excel-like builder",
      "Full audit trail for every clause flagged and decision made",
    ],
    ctaText: "See How Legal Teams Scale Contract Review",
    smeRole: "legal team",
  },
  "contract-clause-finder": {
    headline: "Hunting for Clauses Across Hundreds of Contracts?",
    subheadline: "Define what you're looking for once—your agent finds it in every contract, forever.",
    benefits: [
      "Search criteria built by your lawyers, not engineers",
      "Instant alerts when risky clauses appear in new contracts",
      "Export findings with citations back to source documents",
    ],
    ctaText: "Automate Clause Detection",
    smeRole: "legal team",
  },
  // Alias for contract-comparison toolContext
  "contract-comparison": {
    headline: "Comparing Contract Versions Manually?",
    subheadline: "Your redline rules and approval criteria can run automatically on every revision.",
    benefits: [
      "Flag deviations from your standard terms instantly",
      "Your attorneys define what changes matter—the agent catches them",
      "Complete version history with audit trail",
    ],
    ctaText: "Scale Contract Comparison",
    smeRole: "legal team",
  },
  // Alias for legal-summarization toolContext
  "legal-summarization": {
    headline: "Briefing Stakeholders on Legal Documents?",
    subheadline: "Your summarization criteria can be applied to every document that hits your desk.",
    benefits: [
      "Summaries formatted exactly how your team needs them",
      "Key terms and risks highlighted automatically",
      "Consistent output your executives can rely on",
    ],
    ctaText: "Automate Legal Summaries",
    smeRole: "legal team",
  },
  // Alias for policy-analysis toolContext
  "policy-analysis": {
    headline: "Reviewing Policies for Compliance Gaps?",
    subheadline: "Your compliance team's review checklist can run on every policy update automatically.",
    benefits: [
      "Define compliance criteria once, apply to all policies",
      "Instant gap identification when regulations change",
      "Audit-ready reports with full traceability",
    ],
    ctaText: "Scale Policy Reviews",
    smeRole: "compliance team",
  },
  "nda-generator": {
    headline: "Creating NDAs from Scratch Every Time?",
    subheadline: "Your legal team's NDA templates and rules can generate compliant agreements instantly.",
    benefits: [
      "Standard terms enforced automatically across all NDAs",
      "Custom clauses triggered by deal type or counterparty",
      "Version control and approval workflows built in",
    ],
    ctaText: "Automate NDA Generation",
    smeRole: "legal team",
  },

  // ═══════════════════════════════════════════════════════════════
  // FINANCE & ACCOUNTING TOOLS
  // ═══════════════════════════════════════════════════════════════
  "invoice-parser": {
    headline: "Still Processing Invoices Manually?",
    subheadline: "Turn your AP team's validation rules into an AI agent that never sleeps.",
    benefits: [
      "85% reduction in invoice processing time",
      "Your approval rules applied to every invoice automatically",
      "Complete audit trail for financial compliance",
    ],
    ctaText: "See Automated Invoice Processing",
    smeRole: "finance team",
  },
  "receipt-scanner": {
    headline: "Drowning in Expense Receipts?",
    subheadline: "Your expense policies can validate and categorize every receipt automatically.",
    benefits: [
      "Policy violations flagged before reimbursement",
      "Automatic categorization using your chart of accounts",
      "Audit-ready expense reports with source receipts attached",
    ],
    ctaText: "Automate Expense Processing",
    smeRole: "finance team",
  },
  "bank-statement-parser": {
    headline: "Reconciling Transactions by Hand?",
    subheadline: "Your reconciliation rules can match and categorize transactions automatically.",
    benefits: [
      "Automatic transaction categorization using your rules",
      "Exception flagging for items that need human review",
      "Month-end close in hours, not days",
    ],
    ctaText: "Automate Bank Reconciliation",
    smeRole: "finance team",
  },
  "1099-generator": {
    headline: "Preparing 1099s Manually Each Year?",
    subheadline: "Your tax team's validation rules can generate compliant forms automatically.",
    benefits: [
      "Pull vendor data and validate against IRS requirements",
      "Automatic threshold checking and form generation",
      "Audit trail for every form generated",
    ],
    ctaText: "Automate 1099 Processing",
    smeRole: "tax team",
  },
  "w2-generator": {
    headline: "W-2 Season Keeping Your Team Up at Night?",
    subheadline: "Your payroll team's validation rules can generate compliant W-2s automatically.",
    benefits: [
      "Employee data validation against payroll records",
      "Automatic calculation verification and error flagging",
      "Bulk generation with individual audit trails",
    ],
    ctaText: "Automate W-2 Processing",
    smeRole: "payroll team",
  },

  // ═══════════════════════════════════════════════════════════════
  // HR & RECRUITMENT TOOLS
  // ═══════════════════════════════════════════════════════════════
  "resume-parser": {
    headline: "Screening Resumes One by One?",
    subheadline: "Your hiring criteria can screen and rank every applicant automatically.",
    benefits: [
      "Your job requirements become automatic screening rules",
      "Candidates ranked by fit—your recruiters review the top matches",
      "Bias-reduced screening with consistent criteria",
    ],
    ctaText: "Scale Resume Screening",
    smeRole: "recruiting team",
  },
  "lease-generator": {
    headline: "Drafting Lease Agreements from Scratch?",
    subheadline: "Your property management rules can generate compliant leases automatically.",
    benefits: [
      "Standard terms and local compliance built into every lease",
      "Custom clauses triggered by property type or tenant profile",
      "Approval workflows for exceptions",
    ],
    ctaText: "Automate Lease Generation",
    smeRole: "property management team",
  },

  // ═══════════════════════════════════════════════════════════════
  // DOCUMENT PROCESSING & OCR TOOLS
  // ═══════════════════════════════════════════════════════════════
  "image-to-text": {
    headline: "Extracting Text from Documents at Scale?",
    subheadline: "Your extraction rules can pull structured data from any document type automatically.",
    benefits: [
      "Define what fields to extract—the agent finds them",
      "Works on scanned documents, photos, and PDFs",
      "Structured output ready for your systems",
    ],
    ctaText: "Automate Document Extraction",
    smeRole: "operations team",
  },
  "pdf-to-text": {
    headline: "Converting PDFs to Usable Data?",
    subheadline: "Your data extraction rules can process thousands of PDFs without manual work.",
    benefits: [
      "Extract specific fields based on your business rules",
      "Handle varying PDF formats with consistent output",
      "Direct integration with your existing systems",
    ],
    ctaText: "Scale PDF Processing",
    smeRole: "operations team",
  },
  "handwriting-to-text": {
    headline: "Digitizing Handwritten Documents?",
    subheadline: "Your transcription and validation rules can process handwritten forms automatically.",
    benefits: [
      "Field validation against your business rules",
      "Exception routing for illegible entries",
      "Structured data output for downstream systems",
    ],
    ctaText: "Automate Handwriting Digitization",
    smeRole: "operations team",
  },
  "photo-to-text": {
    headline: "Processing Photos of Documents?",
    subheadline: "Your extraction criteria can pull data from photos as accurately as typed documents.",
    benefits: [
      "Works with any document photographed in the field",
      "Quality checks and auto-enhancement built in",
      "Structured output matching your data schema",
    ],
    ctaText: "Automate Photo Document Processing",
    smeRole: "field operations team",
  },
  "screenshot-to-text": {
    headline: "Capturing Data from Screenshots?",
    subheadline: "Your data capture rules can extract structured information from any screenshot.",
    benefits: [
      "Pull data from legacy systems without API access",
      "Automated quality validation and error checking",
      "Integration with your modern data systems",
    ],
    ctaText: "Automate Screenshot Data Capture",
    smeRole: "operations team",
  },
  "pdf-table-extractor": {
    headline: "Pulling Tables from Complex PDFs?",
    subheadline: "Your table structure rules can extract data from any PDF format automatically.",
    benefits: [
      "Handle multi-page tables and varying layouts",
      "Column mapping based on your data schema",
      "Direct export to your databases or spreadsheets",
    ],
    ctaText: "Automate Table Extraction",
    smeRole: "data team",
  },

  // ═══════════════════════════════════════════════════════════════
  // PDF MANIPULATION TOOLS
  // ═══════════════════════════════════════════════════════════════
  "pdf-merger": {
    headline: "Assembling Document Packages for Submissions?",
    subheadline: "Your document assembly rules can compile compliant packages automatically.",
    benefits: [
      "Auto-assemble with correct ordering and formatting",
      "Validation rules catch missing sections before submission",
      "Audit trail for regulatory compliance",
    ],
    ctaText: "Automate Document Assembly",
    smeRole: "compliance team",
  },
  "pdf-splitter": {
    headline: "Splitting Documents for Different Recipients?",
    subheadline: "Your distribution rules can route document sections automatically.",
    benefits: [
      "Intelligent section detection based on your criteria",
      "Automatic routing to the right teams or systems",
      "Tracking and audit trail for every split",
    ],
    ctaText: "Automate Document Distribution",
    smeRole: "operations team",
  },
  "pdf-compressor": {
    headline: "Preparing Documents for Portal Uploads?",
    subheadline: "Your submission requirements can optimize every document automatically.",
    benefits: [
      "Portal-specific size and format optimization",
      "Quality validation before submission",
      "Batch processing for high-volume submissions",
    ],
    ctaText: "Automate Document Preparation",
    smeRole: "submissions team",
  },
  "pdf-redactor": {
    headline: "Redacting Sensitive Information Manually?",
    subheadline: "Your redaction rules can protect sensitive data across all documents automatically.",
    benefits: [
      "PII detection based on your compliance requirements",
      "Consistent redaction across thousands of documents",
      "Audit log proving redaction compliance",
    ],
    ctaText: "Automate Document Redaction",
    smeRole: "compliance team",
  },
  "pdf-page-remover": {
    headline: "Removing Pages from Documents Regularly?",
    subheadline: "Your document cleanup rules can process files automatically at scale.",
    benefits: [
      "Rules-based page removal for consistent output",
      "Batch processing for high-volume workflows",
      "Version tracking with full audit trail",
    ],
    ctaText: "Automate Document Cleanup",
    smeRole: "operations team",
  },
  "pdf-rotate": {
    headline: "Fixing Document Orientation Issues?",
    subheadline: "Your document standards can be applied to every file automatically.",
    benefits: [
      "Auto-detect and correct orientation issues",
      "Consistent formatting across all documents",
      "Batch processing for incoming document streams",
    ],
    ctaText: "Automate Document Standardization",
    smeRole: "operations team",
  },

  // ═══════════════════════════════════════════════════════════════
  // IMAGE PROCESSING TOOLS
  // ═══════════════════════════════════════════════════════════════
  "image-to-pdf": {
    headline: "Converting Images to PDFs for Submissions?",
    subheadline: "Your document standards can convert and format images automatically.",
    benefits: [
      "Consistent PDF output matching submission requirements",
      "Batch conversion with quality optimization",
      "Metadata and naming conventions applied automatically",
    ],
    ctaText: "Automate Image-to-PDF Conversion",
    smeRole: "operations team",
  },
  "image-compressor": {
    headline: "Optimizing Images for Web or Submissions?",
    subheadline: "Your image standards can be applied to every file automatically.",
    benefits: [
      "Size and quality targets enforced consistently",
      "Format conversion based on destination requirements",
      "Batch processing for product catalogs or submissions",
    ],
    ctaText: "Automate Image Processing",
    smeRole: "operations team",
  },
  "image-resizer": {
    headline: "Resizing Images for Different Platforms?",
    subheadline: "Your image size requirements can be applied to every file automatically.",
    benefits: [
      "Platform-specific sizes generated in one batch",
      "Consistent cropping and aspect ratio rules",
      "Automated workflow for product or marketing images",
    ],
    ctaText: "Automate Image Resizing",
    smeRole: "marketing team",
  },
  "image-converter": {
    headline: "Converting Images Between Formats?",
    subheadline: "Your format requirements can be applied to every image automatically.",
    benefits: [
      "Automatic format conversion based on destination",
      "Quality preservation rules built into the workflow",
      "Batch processing for large image libraries",
    ],
    ctaText: "Automate Image Conversion",
    smeRole: "operations team",
  },
  "heic-to-jpg": {
    headline: "Converting iPhone Photos for Business Use?",
    subheadline: "Your image processing rules can handle any format automatically.",
    benefits: [
      "Automatic detection and conversion of mobile formats",
      "Quality and size optimization in the same workflow",
      "Seamless integration with your document systems",
    ],
    ctaText: "Automate Format Conversion",
    smeRole: "operations team",
  },
  "webp-converter": {
    headline: "Converting WebP Images for Compatibility?",
    subheadline: "Your format requirements can process any image type automatically.",
    benefits: [
      "Universal format output for any system",
      "Quality preservation with size optimization",
      "Batch processing for web content workflows",
    ],
    ctaText: "Automate Image Format Handling",
    smeRole: "web team",
  },

  // ═══════════════════════════════════════════════════════════════
  // DATA CONVERSION TOOLS
  // ═══════════════════════════════════════════════════════════════
  "excel-to-json": {
    headline: "Converting Spreadsheets for System Integration?",
    subheadline: "Your data transformation rules can process any spreadsheet automatically.",
    benefits: [
      "Schema mapping defined once, applied to all files",
      "Validation rules catch data issues before import",
      "Direct integration with APIs and databases",
    ],
    ctaText: "Automate Data Transformation",
    smeRole: "data team",
  },
  "json-to-excel": {
    headline: "Generating Reports from System Data?",
    subheadline: "Your report templates can be populated automatically from any data source.",
    benefits: [
      "Consistent formatting across all generated reports",
      "Scheduled report generation and distribution",
      "Data validation before report creation",
    ],
    ctaText: "Automate Report Generation",
    smeRole: "reporting team",
  },
  "excel-to-csv": {
    headline: "Preparing Data for System Imports?",
    subheadline: "Your data preparation rules can process files automatically.",
    benefits: [
      "Format conversion with data validation built in",
      "Column mapping and transformation rules",
      "Batch processing for regular data feeds",
    ],
    ctaText: "Automate Data Preparation",
    smeRole: "data team",
  },
  "csv-to-excel": {
    headline: "Converting Data Exports for Analysis?",
    subheadline: "Your data formatting rules can create analysis-ready spreadsheets automatically.",
    benefits: [
      "Consistent formatting and formula application",
      "Multiple data sources combined into single reports",
      "Scheduled conversion for regular data workflows",
    ],
    ctaText: "Automate Data Formatting",
    smeRole: "analytics team",
  },

  // ═══════════════════════════════════════════════════════════════
  // QR CODE TOOLS
  // ═══════════════════════════════════════════════════════════════
  "qr-code-generator": {
    headline: "Generating QR Codes for Products or Marketing?",
    subheadline: "Your QR code standards can be applied to every generation automatically.",
    benefits: [
      "Consistent branding and format across all codes",
      "Batch generation for product lines or campaigns",
      "Tracking and analytics integration",
    ],
    ctaText: "Automate QR Code Generation",
    smeRole: "marketing team",
  },
  "qr-code-reader": {
    headline: "Scanning QR Codes for Data Capture?",
    subheadline: "Your data validation rules can process scanned codes automatically.",
    benefits: [
      "Automatic data extraction and validation",
      "Integration with inventory or tracking systems",
      "Batch processing for receiving or audits",
    ],
    ctaText: "Automate QR Code Processing",
    smeRole: "operations team",
  },

  // ═══════════════════════════════════════════════════════════════
  // AI SEARCH & SUMMARIZATION TOOLS
  // ═══════════════════════════════════════════════════════════════
  // Alias for document-summarization toolContext
  "document-summarization": {
    headline: "Summarizing Documents for Decision Makers?",
    subheadline: "Your summarization criteria can be applied to every document automatically.",
    benefits: [
      "Executive summaries formatted to your standards",
      "Key points and action items extracted consistently",
      "Automatic distribution to relevant stakeholders",
    ],
    ctaText: "Automate Document Summarization",
    smeRole: "executive team",
  },
  "pdf-chat": {
    headline: "Answering Questions from Documents?",
    subheadline: "Your knowledge base can answer queries automatically with full citations.",
    benefits: [
      "Instant answers from your document library",
      "Every response cited back to source documents",
      "Your team's expertise captured and scaled",
    ],
    ctaText: "Build a Document Q&A Agent",
    smeRole: "knowledge team",
  },
  "file-search": {
    headline: "Searching Across Document Libraries?",
    subheadline: "Your search criteria and filters can be applied automatically.",
    benefits: [
      "Semantic search across all your documents",
      "Custom filters and categorization rules",
      "Results ranked by your relevance criteria",
    ],
    ctaText: "Automate Document Search",
    smeRole: "knowledge management team",
  },
  // Alias for document-comparison toolContext
  "document-comparison": {
    headline: "Comparing Document Versions Manually?",
    subheadline: "Your comparison criteria can highlight changes automatically.",
    benefits: [
      "Meaningful changes highlighted, noise filtered out",
      "Comparison rules defined by your team's needs",
      "Audit trail for document evolution",
    ],
    ctaText: "Automate Document Comparison",
    smeRole: "quality team",
  },

  // ═══════════════════════════════════════════════════════════════
  // GENERIC DOCUMENT EXTRACTION (used by bank-statement, resume)
  // ═══════════════════════════════════════════════════════════════
  "document-extraction": {
    headline: "Extracting Data from Documents at Scale?",
    subheadline: "Your extraction rules can process thousands of documents without manual work.",
    benefits: [
      "Define what fields to extract—the agent finds them",
      "Validation rules catch errors before they reach your systems",
      "Structured output ready for downstream processing",
    ],
    ctaText: "Automate Document Extraction",
    smeRole: "operations team",
  },
};

// Default fallback for tools not in the config
const DEFAULT_CTA_CONFIG: ToolCTAConfig = {
  headline: "Processing Documents Manually?",
  subheadline: "Your document workflows can run automatically with AI agents you build like spreadsheets.",
  benefits: [
    "85% reduction in document processing time",
    "Your rules and criteria applied consistently to every document",
    "Full audit trail for compliance and quality control",
  ],
  ctaText: "See How Teams Automate Document Work",
  smeRole: "team",
};

interface ToolCTAProps {
  toolContext: string;
  variant?: "default" | "compact";
}

export function ToolCTA({ toolContext, variant = "default" }: ToolCTAProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const config = TOOL_CTA_CONFIG[toolContext] || DEFAULT_CTA_CONFIG;

  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  if (variant === "compact") {
    return (
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5">
        <h4 className="font-semibold text-foreground mb-2">{config.headline}</h4>
        <p className="text-sm text-muted-foreground mb-4">{config.subheadline}</p>
        <Button onClick={handleBookDemo} size="sm" className="w-full">
          <Calendar className="size-4 mr-2" />
          {config.ctaText}
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <Card className="overflow-hidden border-2 border-primary/20 bg-gradient-to-b from-primary/5 via-background to-background">
        <CardContent className="p-0">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 md:p-8 border-b border-primary/10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-xl shrink-0">
                <Sparkles className="size-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {config.headline}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {config.subheadline}
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-4">
              {config.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 space-y-4">
              <Button
                onClick={handleBookDemo}
                size="lg"
                className="w-full md:w-auto text-base px-8"
              >
                <Calendar className="size-5 mr-2" />
                {config.ctaText}
              </Button>
              
              <p className="text-sm text-muted-foreground">
                No code required. Your {config.smeRole} builds it like a spreadsheet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Export config for potential use elsewhere
export { TOOL_CTA_CONFIG, DEFAULT_CTA_CONFIG };
export type { ToolCTAConfig };
