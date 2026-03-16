import {
  Landmark,
  FileText,
  Clock,
  AlertTriangle,
  DollarSign,
  ShieldCheck,
  BarChart3,
  Receipt,
  CreditCard,
  Banknote,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  Lock,
  Zap,
} from "lucide-react";
import type { IndustryPageData } from "../types";

export const financeData: IndustryPageData = {
  slug: "finance",
  seo: {
    title: "AI Document Extraction for Finance & Banking | Parsli",
    description:
      "Automate financial document processing with Parsli. Extract data from invoices, bank statements, AP/AR documents, and tax forms with 99%+ accuracy. SOC 2 compliant.",
    keywords:
      "financial document extraction, invoice OCR, bank statement parsing, AP automation, AR automation, financial data extraction, accounting document processing, tax form extraction",
  },
  hero: {
    badge: "Finance & Banking",
    badgeIcon: Landmark,
    headline: "Extract Financial Data in Seconds, Not Hours",
    subheadline:
      "Parsli automates the extraction of data from invoices, bank statements, purchase orders, and AP/AR documents so your finance team can close the books faster and eliminate manual keying errors.",
    stats: [
      { value: "99.2%", label: "Field-level accuracy on financial documents" },
      { value: "85%", label: "Reduction in manual data entry time" },
      { value: "<5s", label: "Average extraction time per document" },
    ],
  },
  painPoints: {
    headline: "Financial Document Processing Is Broken",
    subheadline:
      "Finance teams spend too much time on manual data entry instead of strategic analysis. Here is the real cost.",
    items: [
      {
        value: "$12.90",
        label: "Average cost to manually process a single invoice",
      },
      {
        value: "62%",
        label: "Of finance teams cite data entry as their top bottleneck",
      },
      {
        value: "3.6%",
        label: "Manual keying error rate that leads to costly reconciliation issues",
      },
    ],
  },
  useCases: {
    headline: "Purpose-Built for Financial Document Workflows",
    subheadline:
      "From accounts payable to regulatory reporting, Parsli handles the full spectrum of financial documents your team processes every day.",
    items: [
      {
        icon: Receipt,
        title: "Invoice Processing & AP Automation",
        description:
          "Extract vendor name, line items, totals, tax amounts, PO numbers, and payment terms from invoices in any format. Route extracted data directly to your ERP or accounting system.",
        benefit: "Cut invoice processing time by 80%",
      },
      {
        icon: Banknote,
        title: "Bank Statement Reconciliation",
        description:
          "Parse transaction details, dates, amounts, and running balances from bank statements across hundreds of financial institutions. Automate monthly reconciliation workflows.",
        benefit: "Reconcile accounts 5x faster",
      },
      {
        icon: CreditCard,
        title: "Expense Report Extraction",
        description:
          "Capture merchant, amount, date, category, and tax details from receipts and expense reports. Enforce policy compliance automatically during extraction.",
        benefit: "Process expense reports in minutes, not days",
      },
      {
        icon: FileText,
        title: "Tax Document Processing",
        description:
          "Extract structured data from W-2s, 1099s, K-1s, and international tax forms. Support for multi-page returns and complex schedules with high accuracy.",
        benefit: "Accelerate tax season preparation by 70%",
      },
      {
        icon: BarChart3,
        title: "Financial Statement Analysis",
        description:
          "Pull key figures from balance sheets, income statements, and cash flow statements. Feed extracted data into financial models and reporting dashboards.",
        benefit: "Turn static reports into actionable data instantly",
      },
      {
        icon: DollarSign,
        title: "Purchase Order Matching",
        description:
          "Extract PO numbers, line items, quantities, and unit prices from purchase orders. Automate three-way matching between POs, invoices, and receiving documents.",
        benefit: "Achieve 95% straight-through processing",
      },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Upload Financial Documents",
      description:
        "Send invoices, statements, or tax forms via API, email forwarding, or direct upload. Parsli accepts PDFs, scanned images, and digital documents.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Extracts & Validates",
      description:
        "Our finance-trained models identify document type, extract all relevant fields, and cross-validate totals and line items for accuracy.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Export Structured Data",
      description:
        "Receive clean, structured JSON or CSV output. Push data directly to QuickBooks, NetSuite, SAP, or any ERP via our integrations.",
      icon: CheckCircle,
    },
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: "Faster Month-End Close",
      description:
        "Eliminate the data entry backlog that delays your close process. Finance teams using Parsli close their books 3 days faster on average.",
      benefit: "Close books 3 days faster",
    },
    {
      icon: ShieldCheck,
      title: "Audit-Ready Accuracy",
      description:
        "Every extraction includes a confidence score and full audit trail. Satisfy SOX compliance requirements with verifiable, traceable data processing.",
      benefit: "99.2% field-level accuracy",
    },
    {
      icon: Lock,
      title: "Bank-Grade Security",
      description:
        "SOC 2 Type II certified with AES-256 encryption at rest and TLS 1.3 in transit. Your financial data never leaves a secure environment.",
      benefit: "SOC 2 Type II compliant",
    },
    {
      icon: Zap,
      title: "Instant ROI",
      description:
        "Most finance teams see positive ROI within the first month. Reduce processing costs per invoice from $12.90 to under $2.00.",
      benefit: "Pay for itself in 30 days",
    },
  ],
  faq: [
    {
      question: "What types of financial documents can Parsli extract data from?",
      answer:
        "Parsli supports a wide range of financial documents including invoices, purchase orders, bank statements, expense receipts, tax forms (W-2, 1099, K-1), financial statements, credit memos, debit notes, payment remittance advices, and more. Our models are trained on millions of financial documents from thousands of vendors and institutions.",
    },
    {
      question: "How accurate is Parsli for invoice data extraction?",
      answer:
        "Parsli achieves 99.2% field-level accuracy on invoices out of the box. For fields like invoice number, total amount, and vendor name, accuracy exceeds 99.5%. Our confidence scoring system flags any extraction below your defined threshold for human review, ensuring you never process inaccurate data.",
    },
    {
      question: "Does Parsli integrate with accounting software like QuickBooks and NetSuite?",
      answer:
        "Yes. Parsli offers native integrations with QuickBooks Online, QuickBooks Desktop, NetSuite, Xero, SAP, Oracle Financials, and Sage. Extracted data maps directly to your chart of accounts and can create draft bills, journal entries, or payment records automatically.",
    },
    {
      question: "Is Parsli compliant with financial regulations like SOX and GDPR?",
      answer:
        "Parsli is SOC 2 Type II certified and supports SOX compliance with full audit trails, role-based access controls, and data retention policies. We are also GDPR compliant with data processing agreements, EU data residency options, and right-to-erasure support.",
    },
    {
      question: "How does Parsli handle multi-currency and international invoices?",
      answer:
        "Parsli automatically detects and extracts currency codes, exchange rates, and amounts in over 50 currencies. Our models support invoices in 30+ languages and can parse region-specific tax formats including VAT, GST, and sales tax across jurisdictions.",
    },
    {
      question: "Can Parsli automate three-way matching for accounts payable?",
      answer:
        "Yes. Parsli can extract data from purchase orders, invoices, and goods received notes, then automatically perform three-way matching. Discrepancies in quantities, prices, or totals are flagged for review, while matched documents flow through for approval without manual intervention.",
    },
  ],
  cta: {
    headline: "Stop Keying In Financial Data Manually",
    subheadline:
      "Join hundreds of finance teams that have automated their document processing with Parsli. Start extracting data from invoices, statements, and tax forms in minutes.",
    ctaText: "Start Free Trial",
  },
  relatedIndustries: ["insurance", "legal", "ecommerce"],
};
