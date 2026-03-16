import {
  UserCheck,
  FileText,
  GraduationCap,
  ClipboardList,
  Briefcase,
  Award,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  Users,
} from "lucide-react";
import type { IndustryPageData } from "../types";

export const hrData: IndustryPageData = {
  slug: "hr",
  seo: {
    title: "AI Document Extraction for HR & Recruitment | Parsli",
    description:
      "Automate HR document processing with Parsli. Extract data from resumes, onboarding forms, employment contracts, and compliance documents with AI-powered accuracy.",
    keywords:
      "HR document extraction, resume parsing, onboarding automation, employee document processing, I-9 extraction, W-4 extraction, HR compliance documents, recruitment document AI",
  },
  hero: {
    badge: "Human Resources",
    badgeIcon: UserCheck,
    headline: "Extract Employee Document Data Without the Busywork",
    subheadline:
      "Parsli automates the extraction of data from resumes, onboarding packets, employment contracts, and compliance forms so your HR team can focus on people, not paperwork.",
    stats: [
      { value: "92%", label: "Faster onboarding document processing" },
      { value: "98.3%", label: "Accuracy on employee form extraction" },
      { value: "60%", label: "Reduction in HR administrative workload" },
    ],
  },
  painPoints: {
    headline: "HR Is Drowning in Employee Paperwork",
    subheadline:
      "From recruiting to offboarding, HR professionals spend far too much time on document processing instead of strategic people operations.",
    items: [
      {
        value: "14 hrs",
        label: "Average time to manually process a new hire onboarding packet",
      },
      {
        value: "$4,100",
        label: "Average cost to onboard a single new employee including admin time",
      },
      {
        value: "47%",
        label: "Of HR leaders say paperwork is the biggest barrier to strategic HR work",
      },
    ],
  },
  useCases: {
    headline: "Automate Document Processing Across the Employee Lifecycle",
    subheadline:
      "From the first resume to the final offboarding form, Parsli handles every document your HR team touches.",
    items: [
      {
        icon: FileText,
        title: "Resume & CV Parsing",
        description:
          "Extract candidate names, contact information, work history, education, skills, certifications, and languages from resumes and CVs in any format. Feed structured candidate data directly into your ATS.",
        benefit: "Screen candidates 10x faster",
      },
      {
        icon: ClipboardList,
        title: "Onboarding Form Processing",
        description:
          "Extract data from I-9 forms, W-4 forms, direct deposit authorizations, emergency contacts, and benefits enrollment forms. Populate HRIS records automatically during new hire onboarding.",
        benefit: "Complete onboarding paperwork in minutes",
      },
      {
        icon: Briefcase,
        title: "Employment Contract Extraction",
        description:
          "Parse job titles, compensation details, start dates, probation periods, non-compete clauses, and termination provisions from employment contracts and offer letters.",
        benefit: "Never miss a contract term or deadline",
      },
      {
        icon: GraduationCap,
        title: "Credential & Certification Verification",
        description:
          "Extract institution names, degree types, graduation dates, certification numbers, and expiration dates from diplomas, transcripts, professional licenses, and certification documents.",
        benefit: "Verify credentials in seconds",
      },
      {
        icon: Award,
        title: "Performance Review Processing",
        description:
          "Extract ratings, competency assessments, manager comments, goals, and development plans from performance review documents. Build structured performance databases for analytics.",
        benefit: "Digitize performance data at scale",
      },
      {
        icon: Users,
        title: "Benefits & Payroll Document Extraction",
        description:
          "Parse benefits election forms, life event change requests, payroll tax documents, and garnishment orders. Automate data flow between HR, benefits, and payroll systems.",
        benefit: "Eliminate benefits and payroll data entry errors",
      },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Upload HR Documents",
      description:
        "Send resumes, onboarding forms, or employee documents via API, email forwarding, or integration with your ATS or HRIS. Parsli processes any format including scanned paper forms.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Extracts Employee Data",
      description:
        "Our HR-trained models identify document types, extract all relevant fields, validate data formats, and ensure compliance-critical information is captured accurately.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Populate Your HR Systems",
      description:
        "Push structured data directly to your ATS, HRIS, payroll system, or benefits platform. No more double data entry across HR systems.",
      icon: CheckCircle,
    },
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: "Accelerate Time to Productivity",
      description:
        "Get new hires onboarded and productive faster by eliminating the paperwork bottleneck. Reduce onboarding document processing from days to hours.",
      benefit: "Onboard new hires 90% faster",
    },
    {
      icon: ShieldCheck,
      title: "Ensure Compliance",
      description:
        "Automatically verify that required forms are complete, signatures are present, and compliance-critical fields are filled correctly. Reduce audit risk across your workforce.",
      benefit: "Pass HR audits with confidence",
    },
    {
      icon: Zap,
      title: "Supercharge Recruiting",
      description:
        "Parse thousands of resumes in minutes instead of hours. Extract and structure candidate data so your recruiters can focus on engaging top talent, not reading documents.",
      benefit: "Review 10x more candidates in the same time",
    },
    {
      icon: Clock,
      title: "Reduce HR Admin Time",
      description:
        "Automate the repetitive document work that consumes your HR team's time. Teams using Parsli report saving 15+ hours per week on document processing tasks.",
      benefit: "Save 15+ hours per week",
    },
  ],
  faq: [
    {
      question: "What HR documents can Parsli extract data from?",
      answer:
        "Parsli processes the full spectrum of HR documents including resumes and CVs, offer letters, employment contracts, I-9 forms, W-4 forms, direct deposit authorizations, benefits enrollment forms, performance reviews, training certificates, professional licenses, background check reports, and offboarding documents.",
    },
    {
      question: "How accurate is Parsli for resume parsing?",
      answer:
        "Parsli achieves 98.3% accuracy on resume data extraction including contact information, work history, education, and skills. Our models handle creative resume formats, multi-column layouts, and resumes in 25+ languages. For structured fields like email and phone number, accuracy exceeds 99.5%.",
    },
    {
      question: "Does Parsli integrate with ATS platforms like Greenhouse and Workday?",
      answer:
        "Yes. Parsli integrates with leading ATS and HRIS platforms including Greenhouse, Lever, Workday, BambooHR, ADP Workforce Now, UKG, Paycom, and SAP SuccessFactors. Extracted candidate and employee data flows directly into your existing HR systems.",
    },
    {
      question: "How does Parsli handle sensitive employee data?",
      answer:
        "Parsli treats all employee data with the highest level of security. We are SOC 2 Type II certified, encrypt all data with AES-256 at rest and TLS 1.3 in transit, support role-based access controls, and maintain comprehensive audit logs. We also support data retention policies and right-to-erasure requests for GDPR compliance.",
    },
    {
      question: "Can Parsli extract data from handwritten employee forms?",
      answer:
        "Yes. Parsli includes handwriting recognition capabilities that work well on common HR forms like I-9s, W-4s, and benefits enrollment forms. While accuracy is highest on printed and typed documents, our models handle typical handwriting with strong accuracy. Confidence scores help flag low-confidence handwritten fields for human verification.",
    },
    {
      question: "How does Parsli help with I-9 and compliance form processing?",
      answer:
        "Parsli extracts all fields from I-9 forms including employee information, document details, and employer verification sections. Our models validate that required fields are completed, flag missing or inconsistent information, and check document expiration dates. This helps HR teams maintain I-9 compliance and prepare for audits.",
    },
  ],
  cta: {
    headline: "Free Your HR Team From Document Drudgery",
    subheadline:
      "From resume parsing to onboarding automation, Parsli handles the document work that keeps your HR team stuck in admin mode. Start automating today.",
    ctaText: "Start Free Trial",
  },
  relatedIndustries: ["healthcare", "legal", "finance"],
};
