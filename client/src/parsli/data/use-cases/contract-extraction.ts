import {
  FileCheck,
  Scale,
  Upload,
  Cpu,
  CheckCircle,
  Calendar,
  DollarSign,
  Users,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const contractExtractionData: UseCasePageData = {
  slug: "contract-extraction",
  seo: {
    title: "Contract Data Extraction & Clause Parsing | Parsli",
    description:
      "Extract parties, dates, obligations, payment terms, and specific clauses from contracts automatically. Parsli turns lengthy legal documents into structured, searchable data for legal teams and contract managers.",
    keywords:
      "contract parsing, contract data extraction, clause extraction, contract analysis automation, legal document parsing, contract management AI, NDA parsing, MSA extraction",
  },
  hero: {
    badge: "Contract Extraction",
    badgeIcon: FileCheck,
    headline: "Extract Critical Data from Every Contract",
    subheadline:
      "NDAs, MSAs, SOWs, employment agreements, vendor contracts — Parsli reads them all and extracts parties, effective dates, termination clauses, payment terms, obligations, and any custom data points your legal or procurement team needs.",
    stats: [
      { value: "97.8%", label: "Accuracy on key contract fields" },
      { value: "< 12s", label: "Average extraction for a 20-page contract" },
      { value: "85%", label: "Reduction in manual contract review time" },
    ],
    ctaText: "Parse Contracts Free",
  },
  painPoints: {
    headline: "Contract Review Is a Manual, High-Stakes Bottleneck",
    subheadline:
      "Legal and procurement teams spend countless hours reading contracts line by line, and missed clauses create real financial risk.",
    items: [
      {
        value: "90 min",
        label: "Average time to manually review and abstract one contract",
      },
      {
        value: "71%",
        label: "Of companies cannot locate 10% or more of their contracts",
      },
      {
        value: "9.2%",
        label: "Of annual revenue lost due to poor contract management on average",
      },
    ],
  },
  howItWorks: {
    headline: "Contract to Structured Data in Three Steps",
    subheadline:
      "Upload your contracts. Parsli finds the needles in the haystack.",
    steps: [
      {
        step: "1",
        title: "Upload Contracts",
        description:
          "Upload PDFs, Word documents, or scanned contracts via the dashboard, email, or API. Parsli handles contracts of any length — from 2-page NDAs to 100-page master agreements.",
        icon: Upload,
      },
      {
        step: "2",
        title: "AI Extracts Key Data & Clauses",
        description:
          "Parsli identifies contract type and extracts: parties, effective date, termination date, auto-renewal terms, payment amounts, liability caps, indemnification clauses, governing law, and more.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Review & Export",
        description:
          "Extracted data appears in a structured summary with page references. Export to your CLM system, spreadsheet, or custom workflow via API or integrations.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: Calendar,
      title: "Date & Deadline Extraction",
      description:
        "Captures effective date, expiration date, renewal deadlines, notice periods, and milestone dates. Normalizes all dates to ISO format and calculates days-until-expiry.",
      benefit: "Never miss a contract renewal or termination deadline again.",
    },
    {
      icon: DollarSign,
      title: "Financial Term Parsing",
      description:
        "Extracts total contract value, payment schedule, rate cards, liability caps, penalty amounts, and pricing escalation formulas from complex financial clauses.",
      benefit: "Accurate financial exposure data without reading every clause.",
    },
    {
      icon: Scale,
      title: "Clause Identification & Classification",
      description:
        "Identifies and extracts 30+ standard clause types: indemnification, limitation of liability, force majeure, non-compete, confidentiality, IP assignment, governing law, and dispute resolution.",
      benefit: "Search and compare specific clauses across your entire contract portfolio.",
    },
    {
      icon: Users,
      title: "Party & Signatory Extraction",
      description:
        "Extracts all contracting parties, their addresses, signatory names, titles, and execution dates — even from multi-party agreements.",
      benefit: "Know exactly who signed what and when, at a glance.",
    },
    {
      icon: AlertTriangle,
      title: "Risk Flag Detection",
      description:
        "Flags high-risk provisions: unlimited liability, automatic renewal without notice, unilateral termination rights, broad IP assignment, and non-standard governing law.",
      benefit: "Prioritize legal review on contracts with the highest risk exposure.",
    },
    {
      icon: BookOpen,
      title: "Amendment & Exhibit Parsing",
      description:
        "Processes contract amendments, addenda, schedules, and exhibits as part of the parent agreement. Tracks which terms were modified and when.",
      benefit: "Complete contract picture including all modifications over time.",
    },
  ],
  integrations: [
    {
      slug: "google-drive",
      relevance:
        "Watch a Google Drive folder for new contracts and process them automatically as they arrive.",
    },
    {
      slug: "dropbox",
      relevance:
        "Connect Dropbox folders where legal teams store executed contracts.",
    },
    {
      slug: "make",
      relevance:
        "Build automated workflows that route extracted contract data to your CLM, CRM, or approval system.",
    },
    {
      slug: "rest-api",
      relevance:
        "Integrate contract parsing directly into your CLM platform or legal tech stack.",
    },
  ],
  faq: [
    {
      question: "What types of contracts can Parsli parse?",
      answer:
        "Parsli handles NDAs, MSAs, SOWs, employment agreements, vendor/supplier contracts, SaaS subscription agreements, real estate leases, partnership agreements, licensing agreements, and any other contract type. The AI model adapts to the contract structure automatically.",
    },
    {
      question: "Can Parsli extract custom clauses specific to my industry?",
      answer:
        "Yes. Beyond the 30+ standard clause types, you can define custom extraction targets — such as 'data processing terms' for GDPR, 'SLA uptime guarantees' for SaaS contracts, or 'environmental compliance' for manufacturing agreements.",
    },
    {
      question: "How does Parsli handle 100+ page contracts?",
      answer:
        "Parsli processes contracts of any length by analyzing them section by section. Extraction time scales linearly — a 100-page contract typically takes under 60 seconds. All extracted data includes page references for verification.",
    },
    {
      question: "Can I compare clauses across multiple contracts?",
      answer:
        "Yes. Once contracts are parsed, you can export clause data for all contracts in your portfolio and compare language, terms, and risk levels across vendors, time periods, or contract types.",
    },
    {
      question: "Does Parsli replace legal review?",
      answer:
        "No. Parsli accelerates contract review by extracting key data points and flagging risk areas, but it does not provide legal advice. Think of it as a power tool for your legal team — it does the heavy data lifting so lawyers can focus on judgment and negotiation.",
    },
    {
      question: "How accurate is clause identification?",
      answer:
        "Parsli achieves 97%+ accuracy on standard clause types (indemnification, limitation of liability, confidentiality, termination). For domain-specific clauses, accuracy improves as you provide sample contracts. Confidence scores flag uncertain extractions.",
    },
  ],
  cta: {
    headline: "Stop Reading Contracts Line by Line",
    subheadline:
      "Upload a contract and get structured data with clause-level extraction in seconds.",
    ctaText: "Try Parsli Free",
  },
  relatedUseCases: [
    "real-estate-docs",
    "invoice-parsing",
    "order-processing",
    "resume-parsing",
  ],
};
