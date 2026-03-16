import {
  Heart,
  FileText,
  ClipboardList,
  Stethoscope,
  ShieldCheck,
  Users,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  Zap,
  Clock,
  Activity,
  Lock,
} from "lucide-react";
import type { IndustryPageData } from "../types";

export const healthcareData: IndustryPageData = {
  slug: "healthcare",
  seo: {
    title: "AI Document Extraction for Healthcare | Parsli",
    description:
      "Automate healthcare document processing with Parsli. Extract data from patient intake forms, insurance claims, EOBs, medical records, and referral documents. HIPAA compliant.",
    keywords:
      "healthcare document extraction, medical document OCR, patient form extraction, insurance claim processing, EOB extraction, HIPAA compliant document processing, medical records extraction, healthcare data automation",
  },
  hero: {
    badge: "Healthcare",
    badgeIcon: Heart,
    headline: "Extract Patient & Claims Data Without the Manual Work",
    subheadline:
      "Parsli automates the extraction of data from patient intake forms, insurance claims, EOBs, and medical records. Free your clinical and administrative staff from tedious data entry while maintaining HIPAA compliance.",
    stats: [
      { value: "97.8%", label: "Accuracy on healthcare document extraction" },
      { value: "75%", label: "Reduction in claims processing time" },
      { value: "HIPAA", label: "Fully compliant infrastructure and processing" },
    ],
  },
  painPoints: {
    headline: "Healthcare Drowns in Paperwork",
    subheadline:
      "Administrative burden costs the US healthcare system billions annually. Most of that burden starts with manual document processing.",
    items: [
      {
        value: "$4.8B",
        label: "Spent annually on manual healthcare document processing in the US",
      },
      {
        value: "34%",
        label: "Of a physician's time is spent on paperwork instead of patient care",
      },
      {
        value: "18%",
        label: "Of insurance claims are denied due to data entry errors",
      },
    ],
  },
  useCases: {
    headline: "Automate Document Processing Across Your Healthcare Organization",
    subheadline:
      "From patient registration to claims adjudication, Parsli handles the documents that keep your healthcare operations running.",
    items: [
      {
        icon: ClipboardList,
        title: "Patient Intake Form Processing",
        description:
          "Extract patient demographics, insurance information, medical history, and consent details from intake forms. Populate your EHR automatically and eliminate manual registration data entry.",
        benefit: "Reduce patient wait times by 50%",
      },
      {
        icon: FileText,
        title: "Insurance Claim Extraction",
        description:
          "Parse CMS-1500 and UB-04 claim forms to extract procedure codes, diagnosis codes, provider information, patient data, and charge amounts. Automate claim submission workflows.",
        benefit: "Submit claims 75% faster with fewer denials",
      },
      {
        icon: Stethoscope,
        title: "Medical Records Processing",
        description:
          "Extract clinical data from lab reports, discharge summaries, progress notes, and pathology reports. Structure unstructured medical data for analytics and reporting.",
        benefit: "Unlock insights from unstructured clinical data",
      },
      {
        icon: ShieldCheck,
        title: "EOB & Remittance Extraction",
        description:
          "Pull payment amounts, adjustment codes, denial reasons, and patient responsibility from Explanation of Benefits and remittance advice documents for automated posting.",
        benefit: "Automate payment posting and reconciliation",
      },
      {
        icon: Users,
        title: "Referral & Authorization Processing",
        description:
          "Extract referring provider, authorization numbers, approved services, and validity dates from referral letters and prior authorization documents.",
        benefit: "Eliminate referral processing backlogs",
      },
      {
        icon: Activity,
        title: "Prescription & Formulary Extraction",
        description:
          "Parse medication names, dosages, frequencies, prescriber details, and refill information from prescriptions. Cross-reference against formulary databases automatically.",
        benefit: "Reduce prescription processing errors by 90%",
      },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Upload Healthcare Documents",
      description:
        "Send patient forms, claims, or medical records via our HIPAA-compliant API, secure upload portal, or fax-to-digital integration. All data is encrypted end-to-end.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Extracts Clinical & Admin Data",
      description:
        "Our healthcare-trained models identify document types, extract relevant fields, and validate data against medical coding standards and reference databases.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Deliver to Your Systems",
      description:
        "Push structured data to your EHR, practice management system, or claims clearinghouse via HL7 FHIR, custom API, or secure file transfer.",
      icon: CheckCircle,
    },
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: "Increase Revenue Cycle Efficiency",
      description:
        "Accelerate claims submission, reduce denial rates, and automate payment posting. Healthcare organizations using Parsli see a 30% improvement in revenue cycle KPIs.",
      benefit: "30% faster revenue cycle",
    },
    {
      icon: Lock,
      title: "HIPAA Compliant by Design",
      description:
        "Parsli processes all PHI in a HIPAA-compliant environment with BAA coverage, AES-256 encryption, access controls, and comprehensive audit logging.",
      benefit: "Full BAA and HIPAA compliance",
    },
    {
      icon: Zap,
      title: "Reduce Administrative Burden",
      description:
        "Free clinical and administrative staff from data entry so they can focus on patient care. Automate the repetitive document work that drives burnout.",
      benefit: "Give staff 10+ hours back per week",
    },
    {
      icon: Clock,
      title: "Faster Patient Onboarding",
      description:
        "Process intake forms, insurance cards, and ID documents in real time during patient check-in. Populate EHR fields automatically for a seamless registration experience.",
      benefit: "Check in patients 3x faster",
    },
  ],
  faq: [
    {
      question: "Is Parsli HIPAA compliant for processing healthcare documents?",
      answer:
        "Yes. Parsli is fully HIPAA compliant. We sign Business Associate Agreements (BAAs) with all healthcare customers, encrypt all PHI with AES-256 at rest and TLS 1.3 in transit, maintain comprehensive audit logs, and support role-based access controls. Our infrastructure undergoes annual third-party security audits.",
    },
    {
      question: "What types of healthcare documents can Parsli extract data from?",
      answer:
        "Parsli supports a comprehensive range of healthcare documents including patient intake forms, CMS-1500 and UB-04 claim forms, Explanation of Benefits (EOBs), remittance advices, lab reports, discharge summaries, prescriptions, referral letters, prior authorizations, insurance cards, medical certificates, and clinical notes.",
    },
    {
      question: "How does Parsli handle medical coding in extracted documents?",
      answer:
        "Parsli extracts ICD-10, CPT, HCPCS, and NDC codes from claims, encounter forms, and medical records. Our models validate extracted codes against current code sets and flag potential coding errors or mismatches, helping reduce claim denials caused by coding issues.",
    },
    {
      question: "Does Parsli integrate with EHR systems like Epic and Cerner?",
      answer:
        "Parsli supports integration with major EHR platforms including Epic, Cerner (Oracle Health), Allscripts, athenahealth, and eClinicalWorks. We connect via HL7 FHIR APIs, custom API endpoints, and secure file transfer protocols to push extracted data directly into patient records.",
    },
    {
      question: "Can Parsli process handwritten medical forms and prescriptions?",
      answer:
        "Yes. Parsli includes handwriting recognition capabilities optimized for medical documents. While accuracy is highest on printed forms (98%+), our models achieve strong results on handwritten patient intake forms and can process common handwritten prescription formats. Confidence scoring helps flag low-confidence handwriting extractions for human review.",
    },
  ],
  cta: {
    headline: "Automate Healthcare Document Processing Today",
    subheadline:
      "Reduce administrative burden, accelerate claims processing, and improve patient experience with HIPAA-compliant document extraction. See Parsli in action.",
    ctaText: "Start Free Trial",
  },
  relatedIndustries: ["insurance", "hr", "legal"],
};
