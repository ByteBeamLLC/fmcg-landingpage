import { Scale, Upload, Cpu, Download } from "lucide-react";
import type { DocumentTypePageData } from "../types";

export const contractsData: DocumentTypePageData = {
  slug: "contracts",
  seo: {
    title: "Contract Parsing & Key Clause Extraction | Parsli",
    description:
      "Automatically extract parties, dates, terms, clauses, and obligations from legal contracts. Parsli's AI parses NDAs, MSAs, leases, and service agreements.",
    keywords:
      "contract parsing, contract data extraction, legal document parsing, extract contract clauses, NDA parsing, contract automation, contract analysis",
  },
  hero: {
    badge: "Contract Parsing",
    badgeIcon: Scale,
    headline: "Extract Key Data from Contracts Instantly",
    subheadline:
      "Upload NDAs, MSAs, leases, or service agreements. Parsli's AI extracts parties, dates, terms, obligations, and key clauses in seconds.",
    stats: [
      { value: "98%", label: "Clause detection accuracy" },
      { value: "10+", label: "Contract types supported" },
      { value: "80%", label: "Review time saved" },
    ],
  },
  extractableFields: [
    {
      fieldName: "Contracting Parties",
      description: "The names and roles of all parties involved in the contract.",
      example: "Acme Corp (Client) & Beta Services LLC (Provider)",
    },
    {
      fieldName: "Effective Date",
      description: "The date the contract takes effect.",
      example: "March 1, 2026",
    },
    {
      fieldName: "Expiration / Termination Date",
      description: "When the contract ends or comes up for renewal.",
      example: "February 28, 2027",
    },
    {
      fieldName: "Contract Value",
      description: "The total monetary value or payment terms specified.",
      example: "$120,000/year, paid quarterly",
    },
    {
      fieldName: "Key Clauses",
      description:
        "Important clauses such as confidentiality, non-compete, indemnification, and liability.",
      example: "Section 7: Indemnification - Provider shall indemnify...",
    },
    {
      fieldName: "Renewal Terms",
      description: "Auto-renewal conditions and notice periods.",
      example: "Auto-renews annually with 60-day notice to cancel",
    },
    {
      fieldName: "Governing Law",
      description: "The jurisdiction and legal framework governing the contract.",
      example: "State of Delaware, United States",
    },
    {
      fieldName: "Signatures",
      description: "Detection of signature blocks, signatories, and signing dates.",
      example: "Signed by John Doe, CEO - March 1, 2026",
    },
    {
      fieldName: "Obligations & Deliverables",
      description: "Key responsibilities and deliverables for each party.",
      example: "Provider shall deliver monthly reports by the 5th of each month",
    },
    {
      fieldName: "Termination Conditions",
      description: "Conditions under which the contract can be terminated early.",
      example: "Either party may terminate with 30 days written notice for cause",
    },
  ],
  howItWorks: [
    {
      step: "1",
      title: "Upload Your Contract",
      description:
        "Upload PDF, Word, or scanned contracts via the dashboard, email, or API. Parsli handles signed, unsigned, and redlined versions.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Identifies Key Provisions",
      description:
        "Parsli's AI reads the full contract, identifies parties, dates, financial terms, key clauses, and obligations without manual configuration.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Export Structured Contract Data",
      description:
        "Get extracted contract data as JSON or push to your CLM, spreadsheet, or project management tools via integrations.",
      icon: Download,
    },
  ],
  supportedFormats: ["PDF", "DOCX", "DOC", "Scanned PDF", "TIFF", "RTF"],
  relatedUseCases: [
    "contract-extraction",
    "real-estate-docs",
    "invoice-parsing",
    "order-processing",
  ],
  faq: [
    {
      question: "What types of contracts can Parsli parse?",
      answer:
        "Parsli handles NDAs, MSAs, SOWs, employment agreements, lease agreements, vendor contracts, service agreements, and more. The AI adapts to any contract format without pre-configuration.",
    },
    {
      question: "Can Parsli detect specific legal clauses?",
      answer:
        "Yes. Parsli identifies common clause types including confidentiality, indemnification, limitation of liability, non-compete, force majeure, and termination provisions.",
    },
    {
      question: "How accurate is contract extraction?",
      answer:
        "Parsli achieves 98% accuracy on key clause detection and entity extraction. For standardized contract types like NDAs and leases, accuracy is even higher.",
    },
    {
      question: "Can Parsli help with contract review?",
      answer:
        "Parsli extracts and highlights key data points for faster review. While it does not replace legal counsel, it dramatically reduces the time spent manually reading contracts by surfacing critical terms.",
    },
    {
      question: "Does Parsli handle scanned or signed contracts?",
      answer:
        "Yes. Parsli's OCR processes scanned contracts, including those with handwritten signatures, stamps, and annotations. Signature blocks are detected and flagged in the output.",
    },
    {
      question: "Can I track contract renewal dates with Parsli?",
      answer:
        "Parsli extracts renewal dates and terms. You can export this data to your CLM or set up automated notifications via Zapier or Make when renewal deadlines approach.",
    },
  ],
};
