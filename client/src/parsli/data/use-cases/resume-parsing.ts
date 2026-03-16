import {
  FileUser,
  Briefcase,
  Upload,
  Cpu,
  CheckCircle,
  GraduationCap,
  MapPin,
  Star,
  Languages,
  Filter,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const resumeParsingData: UseCasePageData = {
  slug: "resume-parsing",
  seo: {
    title: "Resume & CV Parsing API | Extract Candidate Data Automatically | Parsli",
    description:
      "Parse resumes and CVs to extract candidate name, contact info, work experience, education, skills, and certifications. Parsli structures applicant data for your ATS or recruiting workflow.",
    keywords:
      "resume parsing, CV parser, resume data extraction, ATS resume parser, candidate data extraction, automated resume screening, resume OCR API",
  },
  hero: {
    badge: "Resume Parsing",
    badgeIcon: FileUser,
    headline: "Parse Resumes Into Structured Candidate Profiles",
    subheadline:
      "Parsli reads resumes in any format — PDF, Word, image, even LinkedIn profile exports — and extracts name, contact details, work history, education, skills, and certifications into clean, structured data ready for your ATS.",
    stats: [
      { value: "99.1%", label: "Contact info extraction accuracy" },
      { value: "< 3s", label: "Average resume parse time" },
      { value: "75%", label: "Reduction in manual candidate data entry" },
    ],
    ctaText: "Start Parsing Resumes Free",
  },
  painPoints: {
    headline: "Recruiters Spend Too Much Time on Data Entry",
    subheadline:
      "Manually entering candidate data into your ATS is tedious, error-prone, and takes time away from actual recruiting.",
    items: [
      {
        value: "6 min",
        label: "Average time to manually enter one resume into an ATS",
      },
      {
        value: "250+",
        label: "Resumes received per corporate job posting on average",
      },
      {
        value: "35%",
        label: "Of recruiter time is spent on administrative data tasks",
      },
    ],
  },
  howItWorks: {
    headline: "Resume to Candidate Profile in Three Steps",
    subheadline:
      "Bulk-upload resumes or connect your recruiting email. Parsli does the parsing.",
    steps: [
      {
        step: "1",
        title: "Upload Resumes",
        description:
          "Drag and drop resume files into the dashboard, connect a recruiting email inbox, or send resumes via API. Parsli accepts PDF, DOCX, RTF, images, and plain text.",
        icon: Upload,
      },
      {
        step: "2",
        title: "AI Extracts Candidate Data",
        description:
          "Parsli identifies and structures: full name, email, phone, location, work experience (company, title, dates, responsibilities), education (degree, institution, year), skills, certifications, and languages.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Export to Your ATS",
        description:
          "Structured candidate profiles are pushed to your applicant tracking system, Google Sheets, or CRM via Zapier, Make, or the REST API.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: Briefcase,
      title: "Work Experience Parsing",
      description:
        "Extracts each position with company name, job title, start/end dates, location, and responsibility bullet points. Handles gaps, overlapping dates, and non-linear career paths.",
      benefit: "Complete employment history without manual timeline construction.",
    },
    {
      icon: GraduationCap,
      title: "Education Extraction",
      description:
        "Captures degree type, field of study, institution name, graduation year, GPA (when listed), and honors. Supports international degree naming conventions.",
      benefit: "Filter candidates by education credentials automatically.",
    },
    {
      icon: Star,
      title: "Skills & Certifications",
      description:
        "Identifies hard skills, soft skills, programming languages, tools, and professional certifications (PMP, CPA, AWS, etc.) — even when they're scattered across different resume sections.",
      benefit: "Build searchable skill profiles for faster candidate matching.",
    },
    {
      icon: Languages,
      title: "Multi-Language Resume Support",
      description:
        "Parses resumes written in 30+ languages including English, Spanish, French, German, Chinese, Arabic, and Hindi. Auto-detects resume language.",
      benefit: "Hire globally without language barriers in your parsing pipeline.",
    },
    {
      icon: MapPin,
      title: "Location Normalization",
      description:
        "Standardizes candidate locations to city/state/country format regardless of how they're written on the resume (abbreviations, zip codes, partial addresses).",
      benefit: "Enable location-based candidate search and filtering.",
    },
    {
      icon: Filter,
      title: "Batch Resume Screening",
      description:
        "Upload hundreds of resumes at once. Parsli processes them in parallel and outputs a structured dataset you can sort, filter, and rank by any extracted field.",
      benefit: "Screen 500 resumes in the time it takes to manually review 5.",
    },
  ],
  integrations: [
    {
      slug: "gmail",
      relevance:
        "Auto-parse resumes from applicant emails received in your recruiting Gmail inbox.",
    },
    {
      slug: "google-drive",
      relevance:
        "Watch a Google Drive folder for new resume uploads from hiring managers or agencies.",
    },
    {
      slug: "zapier",
      relevance:
        "Push parsed candidate profiles to Greenhouse, Lever, Workable, or any ATS via Zapier.",
    },
    {
      slug: "google-sheets",
      relevance:
        "Export parsed candidate data to a Google Sheets tracker for collaborative review.",
    },
  ],
  faq: [
    {
      question: "What resume formats does Parsli support?",
      answer:
        "Parsli parses PDF, DOCX, DOC, RTF, ODT, TXT, and image-based resumes (JPEG, PNG). For image formats, OCR is applied automatically before extraction. The model handles creative layouts, multi-column designs, and infographic resumes.",
    },
    {
      question: "Can Parsli handle resumes with non-standard layouts?",
      answer:
        "Yes. Unlike template-based parsers, Parsli's AI model understands resume semantics, not just positions on a page. It accurately parses creative resumes, two-column layouts, and designer portfolios.",
    },
    {
      question: "Does Parsli extract skills that aren't in a dedicated 'Skills' section?",
      answer:
        "Yes. Parsli scans the entire resume — including work experience bullet points, project descriptions, and summary sections — to identify skills and technologies, even when there's no explicit skills section.",
    },
    {
      question: "How does Parsli handle career gaps or non-linear timelines?",
      answer:
        "The parser extracts all date ranges as-is and flags gaps longer than 6 months in the structured output. It correctly handles freelance periods, overlapping roles, and education-work interleaving.",
    },
    {
      question: "Can I customize which fields are extracted?",
      answer:
        "Yes. You can enable or disable standard fields (like GPA or LinkedIn URL) and add custom extraction fields specific to your industry — such as 'security clearance level' or 'license number.'",
    },
    {
      question: "Is candidate data handled in compliance with GDPR?",
      answer:
        "Parsli processes data in SOC 2-compliant infrastructure with encryption at rest and in transit. You can configure automatic data deletion policies and honor candidate data-deletion requests through the API.",
    },
  ],
  cta: {
    headline: "Hire Faster. Parse Smarter.",
    subheadline:
      "Upload a batch of resumes and get structured candidate data in seconds.",
    ctaText: "Try Parsli Free",
  },
  relatedUseCases: [
    "lead-capture",
    "email-to-spreadsheet",
    "contract-extraction",
  ],
};
