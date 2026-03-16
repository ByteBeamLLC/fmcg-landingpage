import {
  Scale,
  FileText,
  Gavel,
  BookOpen,
  Search,
  Users,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  Briefcase,
} from "lucide-react";
import type { IndustryPageData } from "../types";

export const legalData: IndustryPageData = {
  slug: "legal",
  seo: {
    title: "AI Document Extraction for Legal Teams | Parsli",
    description:
      "Automate legal document processing with Parsli. Extract data from contracts, court filings, legal agreements, and compliance documents with AI-powered precision.",
    keywords:
      "legal document extraction, contract data extraction, legal AI, court filing processing, contract abstraction, legal document OCR, compliance document extraction, agreement parsing",
  },
  hero: {
    badge: "Legal",
    badgeIcon: Scale,
    headline: "Extract Key Terms From Legal Documents in Seconds",
    subheadline:
      "Parsli automates the extraction of clauses, dates, parties, obligations, and key terms from contracts, court filings, and legal agreements. Let your attorneys focus on strategy, not document review.",
    stats: [
      { value: "98.5%", label: "Accuracy on contract term extraction" },
      { value: "80%", label: "Faster contract review cycles" },
      { value: "10,000+", label: "Legal document formats recognized" },
    ],
  },
  painPoints: {
    headline: "Legal Teams Are Buried in Documents",
    subheadline:
      "Lawyers spend the majority of their time reviewing documents instead of providing legal counsel. The cost is staggering.",
    items: [
      {
        value: "$60B+",
        label: "Spent annually on manual document review in the US legal industry",
      },
      {
        value: "60%",
        label: "Of a lawyer's billable time goes to document review tasks",
      },
      {
        value: "10%",
        label: "Of contract obligations are missed due to manual review errors",
      },
    ],
  },
  useCases: {
    headline: "Automate Document Extraction Across Legal Workflows",
    subheadline:
      "From contract management to litigation support, Parsli extracts the data your legal team needs from every document type they handle.",
    items: [
      {
        icon: FileText,
        title: "Contract Abstraction & Analysis",
        description:
          "Extract parties, effective dates, termination clauses, payment terms, indemnification provisions, governing law, and assignment restrictions from contracts of any length or complexity.",
        benefit: "Abstract contracts 80% faster",
      },
      {
        icon: Gavel,
        title: "Court Filing Processing",
        description:
          "Parse case numbers, parties, filing dates, court jurisdictions, motion types, and order details from court filings, motions, and judicial orders across state and federal courts.",
        benefit: "Automate case docketing and tracking",
      },
      {
        icon: BookOpen,
        title: "Due Diligence Document Review",
        description:
          "Process entire data rooms during M&A due diligence. Extract key terms, obligations, and risk factors from hundreds of contracts, corporate documents, and regulatory filings simultaneously.",
        benefit: "Complete due diligence reviews 5x faster",
      },
      {
        icon: Search,
        title: "Compliance Document Extraction",
        description:
          "Extract regulatory requirements, compliance obligations, reporting deadlines, and enforcement actions from compliance documents, consent decrees, and regulatory filings.",
        benefit: "Never miss a compliance deadline",
      },
      {
        icon: Users,
        title: "Corporate Governance Documents",
        description:
          "Parse board resolutions, shareholder agreements, articles of incorporation, and bylaws. Extract authorized signatories, ownership percentages, and governance provisions.",
        benefit: "Centralize corporate records data",
      },
      {
        icon: Briefcase,
        title: "Litigation Support & Discovery",
        description:
          "Process large document sets for litigation holds, privilege reviews, and discovery production. Extract metadata, key entities, dates, and document relationships at scale.",
        benefit: "Reduce discovery costs by 60%",
      },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Upload Legal Documents",
      description:
        "Send contracts, filings, or compliance documents via API, secure upload, or direct integration with your document management system. Parsli handles any format.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Extracts Key Terms & Clauses",
      description:
        "Our legal-trained models identify document type, locate relevant clauses and provisions, extract structured data, and flag potential issues or missing terms.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Review & Integrate",
      description:
        "Review extractions in our dashboard with clause-level highlighting. Export data to your CLM, DMS, or practice management system.",
      icon: CheckCircle,
    },
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: "Increase Legal Team Productivity",
      description:
        "Free attorneys from manual document review so they can focus on high-value legal work. Law firms using Parsli report a 40% increase in effective billable hours.",
      benefit: "40% more time for strategic legal work",
    },
    {
      icon: ShieldCheck,
      title: "Reduce Risk Exposure",
      description:
        "Catch overlooked obligations, expiring terms, and non-standard clauses that manual review misses. Parsli surfaces risks that humans overlook in large document sets.",
      benefit: "Identify 100% of key obligations",
    },
    {
      icon: Zap,
      title: "Accelerate Deal Execution",
      description:
        "Process entire contract suites in hours instead of weeks during M&A transactions, financings, and large commercial deals.",
      benefit: "Close deals faster",
    },
    {
      icon: Clock,
      title: "Consistent, Repeatable Extraction",
      description:
        "Eliminate the variability of manual review. Every contract gets the same thorough extraction, regardless of complexity or volume, every single time.",
      benefit: "Zero reviewer fatigue or inconsistency",
    },
  ],
  faq: [
    {
      question: "What types of legal documents can Parsli extract data from?",
      answer:
        "Parsli processes a comprehensive range of legal documents including commercial contracts (NDAs, MSAs, SOWs, license agreements), real estate agreements, employment contracts, court filings and motions, corporate governance documents (articles of incorporation, bylaws, board resolutions), regulatory filings, IP documents (patents, trademarks), and litigation discovery documents.",
    },
    {
      question: "How accurate is Parsli for contract clause extraction?",
      answer:
        "Parsli achieves 98.5% accuracy on standard contract fields such as party names, dates, and governing law. For complex clauses like indemnification, limitation of liability, and change of control provisions, accuracy exceeds 96%. Confidence scores on every extraction allow your team to prioritize review of lower-confidence items.",
    },
    {
      question: "Can Parsli handle large document sets for due diligence or discovery?",
      answer:
        "Yes. Parsli is built for enterprise-scale document processing. We routinely process data rooms with thousands of documents during M&A due diligence and litigation discovery. Our parallel processing architecture handles large volumes without degradation in speed or accuracy.",
    },
    {
      question: "Does Parsli integrate with contract lifecycle management (CLM) platforms?",
      answer:
        "Parsli integrates with leading CLM platforms including Ironclad, DocuSign CLM, Agiloft, ContractPodAi, and Icertis. We also connect with document management systems like iManage, NetDocuments, and SharePoint. Extracted data flows directly into your existing legal tech stack.",
    },
    {
      question: "How does Parsli maintain confidentiality of legal documents?",
      answer:
        "Parsli takes document confidentiality extremely seriously. All documents are encrypted with AES-256 at rest and TLS 1.3 in transit. We offer dedicated single-tenant deployment options for law firms and legal departments with strict data isolation requirements. Our SOC 2 Type II certification and optional on-premise deployment ensure your sensitive legal documents remain secure.",
    },
    {
      question: "Can Parsli identify non-standard or unusual contract clauses?",
      answer:
        "Yes. Parsli can compare extracted clauses against your standard playbook or template library and flag deviations. This includes unusual indemnification terms, non-standard termination provisions, missing clauses, and terms that deviate from your organization's preferred positions. This capability is particularly valuable during contract negotiation and review.",
    },
  ],
  cta: {
    headline: "Let AI Handle the Document Review",
    subheadline:
      "From contract abstraction to litigation support, Parsli extracts the data your legal team needs with unmatched accuracy. Start automating your legal document workflows today.",
    ctaText: "Start Free Trial",
  },
  relatedIndustries: ["finance", "real-estate", "insurance"],
};
