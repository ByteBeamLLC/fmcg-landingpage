import {
  Home,
  Building2,
  Upload,
  Cpu,
  CheckCircle,
  DollarSign,
  Calendar,
  FileSearch,
  Scale,
  MapPin,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const realEstateDocsData: UseCasePageData = {
  slug: "real-estate-docs",
  seo: {
    title: "Real Estate Document Parsing | Lease & Listing Data Extraction | Parsli",
    description:
      "Extract key data from property listings, lease agreements, closing documents, and rental applications. Parsli automates real estate document processing for agents, property managers, and investors.",
    keywords:
      "real estate document parsing, lease extraction, property listing parser, rental agreement data extraction, real estate OCR, lease abstraction automation, closing document parsing",
  },
  hero: {
    badge: "Real Estate Documents",
    badgeIcon: Home,
    headline: "Extract Key Data from Every Real Estate Document",
    subheadline:
      "Property listings, lease agreements, closing disclosures, rental applications — Parsli reads them all and extracts addresses, terms, amounts, dates, and clauses into structured data your team can act on.",
    stats: [
      { value: "98.5%", label: "Accuracy on lease key terms" },
      { value: "< 8s", label: "Average extraction for a 10-page lease" },
      { value: "90%", label: "Less time spent on lease abstraction" },
    ],
    ctaText: "Parse Real Estate Docs Free",
  },
  painPoints: {
    headline: "Real Estate Paperwork Is Overwhelming",
    subheadline:
      "Agents, property managers, and investors spend hours buried in documents that could be processed in seconds.",
    items: [
      {
        value: "45 min",
        label: "Average time to manually abstract key terms from one lease",
      },
      {
        value: "23%",
        label: "Of lease data entry errors lead to financial discrepancies",
      },
      {
        value: "$3,200",
        label: "Average cost of a missed lease renewal or escalation clause",
      },
    ],
  },
  howItWorks: {
    headline: "Real Estate Documents to Structured Data",
    subheadline:
      "Upload your documents. Parsli extracts the critical details.",
    steps: [
      {
        step: "1",
        title: "Upload Documents",
        description:
          "Upload lease agreements, property listings, closing documents, or rental applications via the dashboard, email forwarding, or Google Drive integration.",
        icon: Upload,
      },
      {
        step: "2",
        title: "AI Extracts Key Data",
        description:
          "Parsli identifies document type and extracts relevant fields: property address, lease term, monthly rent, security deposit, renewal options, escalation clauses, tenant/landlord info, and more.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Review & Export",
        description:
          "Extracted data appears in a structured view for review. Export to your property management software, spreadsheet, or CRM with a single click.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: Scale,
      title: "Lease Abstraction",
      description:
        "Extracts critical lease terms: base rent, escalation schedule, renewal options, termination clauses, CAM charges, tenant improvement allowances, and co-tenancy provisions.",
      benefit: "Replace manual lease abstraction that takes 45+ minutes per lease.",
    },
    {
      icon: DollarSign,
      title: "Financial Term Extraction",
      description:
        "Captures all financial details: purchase price, down payment, mortgage terms, property taxes, HOA fees, security deposits, and rent escalation percentages.",
      benefit: "Build accurate financial models from document data in seconds.",
    },
    {
      icon: Calendar,
      title: "Critical Date Tracking",
      description:
        "Extracts lease start/end dates, option exercise deadlines, rent escalation dates, inspection periods, and closing dates. Outputs normalized dates ready for calendar integration.",
      benefit: "Never miss a lease renewal deadline or option exercise window.",
    },
    {
      icon: MapPin,
      title: "Property Address Normalization",
      description:
        "Standardizes property addresses across documents to a consistent format, handles unit numbers, and validates against postal databases.",
      benefit: "Match documents to properties reliably across your portfolio.",
    },
    {
      icon: FileSearch,
      title: "Clause Identification",
      description:
        "Identifies and extracts specific clauses: force majeure, assignment/subletting, maintenance obligations, insurance requirements, and exclusivity provisions.",
      benefit: "Quickly compare clause language across multiple leases.",
    },
    {
      icon: Building2,
      title: "Property Listing Parsing",
      description:
        "Extracts listing details: bedrooms, bathrooms, square footage, lot size, year built, listing price, MLS number, agent info, and property description from listing sheets and MLS exports.",
      benefit: "Build searchable property databases from listing documents.",
    },
  ],
  integrations: [
    {
      slug: "google-drive",
      relevance:
        "Watch a Google Drive folder for new real estate documents and process them automatically.",
    },
    {
      slug: "dropbox",
      relevance:
        "Connect Dropbox folders used by agents or property managers for document sharing.",
    },
    {
      slug: "google-sheets",
      relevance:
        "Export extracted lease terms and property data to Google Sheets for portfolio tracking.",
    },
    {
      slug: "zapier",
      relevance:
        "Push extracted data to property management tools like AppFolio, Buildium, or Yardi.",
    },
  ],
  faq: [
    {
      question: "What types of real estate documents can Parsli process?",
      answer:
        "Parsli handles residential and commercial leases, property listings (MLS sheets, broker one-sheets), closing disclosures (CD), HUD-1 settlement statements, rental applications, property inspection reports, and purchase agreements.",
    },
    {
      question: "Can Parsli handle multi-page commercial lease agreements?",
      answer:
        "Yes. Commercial leases of 50+ pages are fully supported. Parsli processes them page by page, extracts all key terms, and presents a consolidated summary with page references for each extracted clause.",
    },
    {
      question: "How does Parsli handle lease amendments and addenda?",
      answer:
        "Parsli identifies amendments and addenda as distinct document sections. It extracts modified terms and can cross-reference them against the original lease terms to highlight what changed.",
    },
    {
      question: "Can I extract data from handwritten lease forms?",
      answer:
        "Parsli's OCR handles printed handwriting on standard lease forms (like state association templates with handwritten fill-ins). Accuracy on fully handwritten documents varies; confidence scores flag uncertain fields.",
    },
    {
      question: "Does Parsli support commercial real estate-specific fields?",
      answer:
        "Yes. Beyond residential fields, Parsli extracts CAM reconciliation terms, tenant improvement allowances, percentage rent clauses, co-tenancy requirements, SNDA provisions, and operating expense caps.",
    },
    {
      question: "Can I process an entire property portfolio at once?",
      answer:
        "Absolutely. Upload all your leases in a batch and Parsli will produce a consolidated dataset — one row per lease — that you can export to a spreadsheet for portfolio-wide analysis.",
    },
  ],
  cta: {
    headline: "Digitize Your Real Estate Documents",
    subheadline:
      "Upload a lease or listing and see extracted data in seconds. Free to try.",
    ctaText: "Try Parsli Free",
  },
  relatedUseCases: [
    "contract-extraction",
    "invoice-parsing",
    "bank-statements",
  ],
};
