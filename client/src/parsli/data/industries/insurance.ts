import {
  Shield,
  FileText,
  ClipboardCheck,
  AlertTriangle,
  Search,
  BarChart3,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  FileSearch,
} from "lucide-react";
import type { IndustryPageData } from "../types";

export const insuranceData: IndustryPageData = {
  slug: "insurance",
  seo: {
    title: "AI Document Extraction for Insurance | Parsli",
    description:
      "Automate insurance document processing with Parsli. Extract data from claims, policies, underwriting submissions, ACORD forms, and loss runs with AI-powered accuracy.",
    keywords:
      "insurance document extraction, claims processing AI, policy extraction, ACORD form OCR, underwriting automation, loss run extraction, insurance document processing, claims data extraction",
  },
  hero: {
    badge: "Insurance",
    badgeIcon: Shield,
    headline: "Extract Insurance Document Data With AI Precision",
    subheadline:
      "Parsli automates the extraction of data from claims, policies, ACORD forms, underwriting submissions, and loss runs so your insurance team can process faster, price smarter, and pay claims sooner.",
    stats: [
      { value: "99.0%", label: "Accuracy on ACORD form field extraction" },
      { value: "70%", label: "Faster claims intake processing" },
      { value: "40%", label: "Reduction in underwriting data entry time" },
    ],
  },
  painPoints: {
    headline: "Insurance Still Runs on Manual Document Processing",
    subheadline:
      "Despite digital transformation efforts, most insurance workflows still depend on manually keying data from paper and PDF documents.",
    items: [
      {
        value: "$13B",
        label: "Annual cost of manual document processing in the US insurance industry",
      },
      {
        value: "30 days",
        label: "Average time to process a complex commercial insurance claim",
      },
      {
        value: "25%",
        label: "Of claims are delayed due to missing or incorrectly entered data",
      },
    ],
  },
  useCases: {
    headline: "Purpose-Built for Insurance Document Workflows",
    subheadline:
      "From first notice of loss to policy issuance, Parsli automates data extraction across the entire insurance document lifecycle.",
    items: [
      {
        icon: AlertTriangle,
        title: "Claims Intake & Processing",
        description:
          "Extract claimant information, loss descriptions, dates of loss, coverage details, and damage estimates from first notice of loss forms, claim reports, and supporting documentation automatically.",
        benefit: "Process claims intake 70% faster",
      },
      {
        icon: FileText,
        title: "Policy Document Extraction",
        description:
          "Parse policy numbers, coverage limits, deductibles, endorsements, exclusions, named insureds, and effective dates from declarations pages, policy forms, and endorsement schedules.",
        benefit: "Abstract policies in seconds, not hours",
      },
      {
        icon: ClipboardCheck,
        title: "ACORD Form Processing",
        description:
          "Extract all fields from ACORD 25, 28, 125, 126, 130, 140, and other standard forms. Map extracted data directly to your policy administration or agency management system.",
        benefit: "Eliminate ACORD form data entry entirely",
      },
      {
        icon: Search,
        title: "Underwriting Submission Processing",
        description:
          "Extract applicant details, loss history, exposure data, financial information, and risk characteristics from underwriting submissions and supplemental questionnaires.",
        benefit: "Triage and quote submissions 50% faster",
      },
      {
        icon: BarChart3,
        title: "Loss Run Extraction",
        description:
          "Parse claim dates, loss types, paid amounts, reserved amounts, and open/closed status from loss run reports across hundreds of carrier formats.",
        benefit: "Analyze loss history instantly",
      },
      {
        icon: FileSearch,
        title: "Medical Record & Adjuster Report Processing",
        description:
          "Extract treatment details, diagnosis codes, injury descriptions, prognosis information, and cost estimates from medical records and adjuster field reports for claims evaluation.",
        benefit: "Evaluate claims evidence 60% faster",
      },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Upload Insurance Documents",
      description:
        "Send claims, policies, ACORD forms, or underwriting submissions via API, email forwarding, or integration with your core system. Parsli processes any document format.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Extracts & Validates",
      description:
        "Our insurance-trained models identify document type, extract all relevant fields, validate against industry standards, and cross-reference data across related documents in a claim or policy file.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Feed Your Core Systems",
      description:
        "Push structured data directly to your policy administration system, claims management platform, or underwriting workbench via API or pre-built integrations.",
      icon: CheckCircle,
    },
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: "Accelerate Claims Resolution",
      description:
        "Process claims documentation faster so adjusters can make decisions sooner. Insurance carriers using Parsli resolve claims 40% faster on average.",
      benefit: "Resolve claims 40% faster",
    },
    {
      icon: ShieldCheck,
      title: "Improve Underwriting Accuracy",
      description:
        "Ensure every underwriting submission is processed completely and accurately. Reduce E&O risk from missed data and improve loss ratios with better risk data.",
      benefit: "Reduce E&O exposure significantly",
    },
    {
      icon: Zap,
      title: "Enhance Policyholder Experience",
      description:
        "Faster claims processing, quicker policy issuance, and fewer data requests mean happier policyholders and better retention rates.",
      benefit: "Improve NPS scores by 20+ points",
    },
    {
      icon: Clock,
      title: "Reduce Combined Ratio",
      description:
        "Lower operational costs through automation while improving loss ratios through better data. Parsli impacts both the expense and loss sides of your combined ratio.",
      benefit: "Measurable combined ratio improvement",
    },
  ],
  faq: [
    {
      question: "What types of insurance documents can Parsli extract data from?",
      answer:
        "Parsli processes the full range of insurance documents including ACORD forms (25, 28, 125, 126, 130, 140, and more), policy declarations pages, endorsements, first notice of loss forms, claims reports, underwriting submissions, loss run reports, medical records, adjuster reports, certificates of insurance, and reinsurance documents.",
    },
    {
      question: "How accurate is Parsli on ACORD form extraction?",
      answer:
        "Parsli achieves 99.0% field-level accuracy on standard ACORD forms. Our models are trained specifically on ACORD form layouts and understand the relationships between fields, check boxes, and supplemental sections. For critical fields like policy numbers, effective dates, and coverage limits, accuracy exceeds 99.5%.",
    },
    {
      question: "Does Parsli integrate with insurance core systems like Guidewire and Duck Creek?",
      answer:
        "Yes. Parsli integrates with major insurance platforms including Guidewire PolicyCenter and ClaimCenter, Duck Creek, Majesco, Insurity, and Applied Epic. We also integrate with agency management systems like AMS360, Sagitta, and HawkSoft. Extracted data maps directly to your system's data model.",
    },
    {
      question: "How does Parsli handle loss run reports from different carriers?",
      answer:
        "Loss runs are notoriously inconsistent across carriers. Parsli is trained on loss run formats from hundreds of insurance carriers and can extract claim data regardless of the carrier's report format. Our models identify claim records, parse paid and reserved amounts, loss types, and dates, and normalize the data into a consistent structure.",
    },
    {
      question: "Can Parsli help detect fraudulent claims documents?",
      answer:
        "While Parsli is primarily a data extraction tool, it can support fraud detection workflows by identifying document anomalies such as inconsistent dates, altered fields, duplicate claim submissions, and mismatched data across documents in a claim file. These flags can be routed to your SIU team for investigation.",
    },
    {
      question: "How does Parsli handle multi-document insurance files?",
      answer:
        "Insurance claims and policies often consist of dozens of related documents. Parsli can process entire claim files or policy packages, classify each document within the file, extract relevant data from each, and cross-reference information across documents. This gives you a unified, validated view of all data in a claim or policy file.",
    },
  ],
  cta: {
    headline: "Modernize Insurance Document Processing",
    subheadline:
      "From claims intake to underwriting, Parsli automates the document-heavy work that slows down your insurance operations. See the impact on your workflows today.",
    ctaText: "Start Free Trial",
  },
  relatedIndustries: ["healthcare", "finance", "legal"],
};
