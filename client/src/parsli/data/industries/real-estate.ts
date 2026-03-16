import {
  Building2,
  FileText,
  Clock,
  Home,
  Key,
  MapPin,
  ClipboardList,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Scale,
} from "lucide-react";
import type { IndustryPageData } from "../types";

export const realEstateData: IndustryPageData = {
  slug: "real-estate",
  seo: {
    title: "AI Document Extraction for Real Estate | Parsli",
    description:
      "Automate real estate document processing with Parsli. Extract data from leases, purchase agreements, property listings, title documents, and closing packages with AI-powered accuracy.",
    keywords:
      "real estate document extraction, lease abstraction, property document OCR, closing document processing, title document extraction, real estate AI, lease data extraction, mortgage document parsing",
  },
  hero: {
    badge: "Real Estate",
    badgeIcon: Building2,
    headline: "Extract Property Document Data at Scale",
    subheadline:
      "Parsli automates the extraction of key terms from leases, purchase agreements, title documents, and closing packages. Spend less time reading documents and more time closing deals.",
    stats: [
      { value: "90%", label: "Reduction in lease abstraction time" },
      { value: "98.7%", label: "Accuracy on property document fields" },
      { value: "500+", label: "Real estate document types supported" },
    ],
  },
  painPoints: {
    headline: "Real Estate Runs on Paper. That Is the Problem.",
    subheadline:
      "Property transactions generate mountains of documents. Manual review is slow, expensive, and error-prone.",
    items: [
      {
        value: "4-6 hrs",
        label: "Average time to manually abstract a commercial lease",
      },
      {
        value: "$150+",
        label: "Cost per lease abstraction when outsourced to a paralegal",
      },
      {
        value: "23%",
        label: "Of lease abstractions contain errors that lead to revenue leakage",
      },
    ],
  },
  useCases: {
    headline: "Built for Every Real Estate Document Workflow",
    subheadline:
      "Whether you manage a portfolio of 50 properties or 50,000, Parsli extracts the data you need from every document type in the real estate lifecycle.",
    items: [
      {
        icon: Key,
        title: "Lease Abstraction",
        description:
          "Extract rent amounts, escalation clauses, renewal options, CAM charges, lease dates, and tenant obligations from commercial and residential leases. Process hundreds of leases in hours, not weeks.",
        benefit: "Abstract leases 90% faster",
      },
      {
        icon: FileText,
        title: "Purchase Agreement Processing",
        description:
          "Pull purchase price, contingencies, closing dates, earnest money details, and special conditions from real estate purchase agreements automatically.",
        benefit: "Never miss a critical contract term",
      },
      {
        icon: Home,
        title: "Property Listing Data Extraction",
        description:
          "Extract property details, square footage, lot size, room counts, amenities, and pricing from MLS listings, brochures, and offering memorandums for portfolio analysis.",
        benefit: "Build property databases instantly",
      },
      {
        icon: ClipboardList,
        title: "Closing Package Review",
        description:
          "Parse title commitments, survey documents, inspection reports, and HUD-1 settlement statements. Flag discrepancies across documents in a single closing package.",
        benefit: "Review closing docs 5x faster",
      },
      {
        icon: Scale,
        title: "Title & Deed Extraction",
        description:
          "Extract grantor/grantee names, legal descriptions, parcel numbers, encumbrances, and recording details from title documents and deeds across all 50 states.",
        benefit: "Streamline title searches",
      },
      {
        icon: MapPin,
        title: "Property Tax Document Processing",
        description:
          "Pull assessed values, tax rates, exemptions, and payment due dates from property tax bills and assessments across multiple jurisdictions.",
        benefit: "Centralize tax data across your portfolio",
      },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Upload Property Documents",
      description:
        "Send leases, agreements, or closing packages via API, email forwarding, or bulk upload. Parsli handles PDFs, scanned documents, and even photographed paperwork.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Identifies & Extracts",
      description:
        "Our real-estate-trained models classify each document, locate key clauses and terms, and extract structured data with confidence scores for every field.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Review & Export",
      description:
        "Review flagged extractions in our dashboard, then export clean data to your property management system, CRM, or spreadsheet.",
      icon: CheckCircle,
    },
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: "Scale Your Portfolio Without Scaling Headcount",
      description:
        "Process thousands of leases and property documents without hiring additional analysts. Parsli grows with your portfolio.",
      benefit: "Handle 10x more documents with the same team",
    },
    {
      icon: ShieldCheck,
      title: "Eliminate Revenue Leakage",
      description:
        "Catch missed escalation clauses, overlooked renewal options, and incorrect CAM reconciliations that cost landlords millions annually.",
      benefit: "Recover an average of 2-3% in missed revenue",
    },
    {
      icon: Zap,
      title: "Accelerate Due Diligence",
      description:
        "Review entire property portfolios during acquisitions in days instead of weeks. Extract and compare key terms across hundreds of leases simultaneously.",
      benefit: "Complete due diligence 80% faster",
    },
    {
      icon: Clock,
      title: "Faster Closings",
      description:
        "Automate the review of closing packages, title documents, and settlement statements. Identify discrepancies before they delay your closing.",
      benefit: "Reduce closing delays by 60%",
    },
  ],
  faq: [
    {
      question: "What types of real estate documents can Parsli process?",
      answer:
        "Parsli processes virtually every document type in real estate transactions and property management, including commercial and residential leases, purchase agreements, title commitments, deeds, HUD-1 and ALTA settlement statements, property tax bills, inspection reports, appraisals, rent rolls, offering memorandums, and estoppel certificates.",
    },
    {
      question: "How accurate is Parsli for lease abstraction?",
      answer:
        "Parsli achieves 98.7% accuracy on standard lease fields such as rent amounts, lease dates, and tenant names. For complex clauses like escalation terms and renewal options, accuracy exceeds 96%. Every extraction includes confidence scores, and our human-in-the-loop review feature lets you verify flagged items quickly.",
    },
    {
      question: "Can Parsli handle multi-page commercial leases with amendments?",
      answer:
        "Yes. Parsli processes leases of any length and automatically identifies and extracts data from amendments, addendums, and riders. Our models understand the relationship between the original lease and subsequent modifications, presenting a consolidated view of current terms.",
    },
    {
      question: "Does Parsli integrate with property management software?",
      answer:
        "Parsli integrates with leading property management platforms including Yardi, MRI Software, AppFolio, Buildium, and RealPage. Extracted lease data can be pushed directly into your property management system to create or update tenant records, lease records, and charge schedules.",
    },
    {
      question: "How does Parsli handle different lease formats from various landlords?",
      answer:
        "Parsli uses AI models trained on millions of real estate documents across thousands of formats. Whether the lease is a standard form, a custom agreement drafted by counsel, or a scanned copy of a decades-old document, Parsli identifies and extracts the relevant terms without requiring templates or pre-configuration.",
    },
  ],
  cta: {
    headline: "Modernize Your Real Estate Document Workflows",
    subheadline:
      "From lease abstraction to closing package review, Parsli automates the document-heavy work that slows down your real estate operations. See it in action today.",
    ctaText: "Start Free Trial",
  },
  relatedIndustries: ["finance", "legal", "insurance"],
};
