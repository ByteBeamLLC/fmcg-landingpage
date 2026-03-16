import {
  FileText,
  DollarSign,
  Clock,
  Upload,
  Cpu,
  CheckCircle,
  ShieldCheck,
  Layers,
  Globe,
  BarChart3,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const invoiceParsingData: UseCasePageData = {
  slug: "invoice-parsing",
  seo: {
    title: "Automated Invoice Parsing & Data Extraction | Parsli",
    description:
      "Extract vendor names, line items, totals, tax amounts, and payment terms from invoices automatically. Parsli processes PDF, scanned, and email invoices with 99%+ accuracy.",
    keywords:
      "invoice parsing, invoice data extraction, automated invoice processing, OCR invoice, extract invoice line items, AP automation, accounts payable extraction",
  },
  hero: {
    badge: "Invoice Parsing",
    badgeIcon: FileText,
    headline: "Stop Manually Keying Invoice Data",
    subheadline:
      "Parsli reads every invoice your AP team receives — PDF, scanned image, or email — and extracts vendor details, line items, amounts, tax, and payment terms in seconds. No templates. No rules. Just accurate, structured data.",
    stats: [
      { value: "99.2%", label: "Field-level accuracy on invoices" },
      { value: "< 4s", label: "Average extraction time per invoice" },
      { value: "80%", label: "Reduction in manual data entry" },
    ],
    ctaText: "Start Parsing Invoices Free",
  },
  painPoints: {
    headline: "Invoice Processing Is a Bottleneck",
    subheadline:
      "Finance teams lose hours every week to manual invoice data entry, and errors cost even more.",
    items: [
      {
        value: "3.6 hrs",
        label: "Average weekly time spent per AP clerk on manual invoice keying",
      },
      {
        value: "12.5%",
        label: "Of manually-entered invoices contain at least one data error",
      },
      {
        value: "$15",
        label: "Average cost to process a single invoice manually",
      },
    ],
  },
  howItWorks: {
    headline: "Three Steps to Structured Invoice Data",
    subheadline:
      "Connect your inbox or upload a folder. Parsli does the rest.",
    steps: [
      {
        step: "1",
        title: "Send or Upload Invoices",
        description:
          "Forward invoice emails to your Parsli address, upload PDFs via the dashboard, or connect Google Drive / Dropbox for automatic ingestion.",
        icon: Upload,
      },
      {
        step: "2",
        title: "AI Extracts Every Field",
        description:
          "Parsli's document-AI model identifies vendor name, invoice number, date, line items with quantities and unit prices, subtotal, tax, and total — regardless of layout.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Review & Export",
        description:
          "Extracted data appears in a clean table you can review, approve, and push to your accounting software, ERP, or spreadsheet with one click.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: Layers,
      title: "Line-Item Extraction",
      description:
        "Goes beyond header fields. Parsli captures every line item including description, quantity, unit price, and line total from multi-page invoices.",
      benefit: "Eliminate manual row-by-row entry for complex invoices.",
    },
    {
      icon: Globe,
      title: "Multi-Currency & Multi-Language",
      description:
        "Handles invoices in 40+ languages and automatically detects currency symbols, codes, and formatting conventions.",
      benefit: "Process international vendor invoices without extra configuration.",
    },
    {
      icon: ShieldCheck,
      title: "Duplicate Invoice Detection",
      description:
        "Flags invoices with matching vendor + invoice number + amount combinations to prevent double payments.",
      benefit: "Reduce duplicate payment risk by up to 95%.",
    },
    {
      icon: DollarSign,
      title: "Tax & Discount Parsing",
      description:
        "Identifies tax rates, tax amounts, early-payment discounts, and shipping charges separately from the line-item total.",
      benefit: "Accurate tax reporting without manual calculations.",
    },
    {
      icon: BarChart3,
      title: "Confidence Scores",
      description:
        "Every extracted field comes with a confidence score. Low-confidence values are highlighted for human review, so you only check what matters.",
      benefit: "Focus reviewer time on the 5% that needs attention.",
    },
    {
      icon: Clock,
      title: "Payment Term Detection",
      description:
        "Extracts due dates, Net-30/60/90 terms, and early-payment discount windows so your AP team never misses a deadline.",
      benefit: "Capture every early-payment discount automatically.",
    },
  ],
  integrations: [
    {
      slug: "gmail",
      relevance:
        "Forward vendor invoice emails from Gmail to Parsli for automatic extraction.",
    },
    {
      slug: "google-sheets",
      relevance:
        "Push extracted invoice data directly into a Google Sheets ledger or reconciliation template.",
    },
    {
      slug: "zapier",
      relevance:
        "Trigger downstream workflows — like PO matching or approval routing — when a new invoice is parsed.",
    },
    {
      slug: "rest-api",
      relevance:
        "Send invoices programmatically from your ERP or accounting system and receive structured JSON back.",
    },
  ],
  faq: [
    {
      question: "What invoice formats does Parsli support?",
      answer:
        "Parsli handles PDF invoices (native and scanned), image files (JPEG, PNG, TIFF), Word documents, and email-body invoices. Scanned documents go through our OCR pipeline first, then through the extraction model.",
    },
    {
      question: "Can Parsli extract line items from multi-page invoices?",
      answer:
        "Yes. Parsli automatically detects when a line-item table spans multiple pages and merges the rows into a single, continuous dataset. It also handles summary pages that repeat totals without duplicating amounts.",
    },
    {
      question: "How does Parsli handle invoices in different languages?",
      answer:
        "The extraction model supports 40+ languages out of the box, including right-to-left scripts. It auto-detects the invoice language and applies the appropriate parsing logic — no configuration required on your end.",
    },
    {
      question: "Is Parsli accurate enough to replace manual data entry?",
      answer:
        "On standard invoices, Parsli achieves 99%+ field-level accuracy. For edge-case layouts, confidence scores flag uncertain fields for human review. Most teams reduce manual keying by 80-90% from day one.",
    },
    {
      question: "Can I match parsed invoices to purchase orders automatically?",
      answer:
        "Parsli extracts PO reference numbers from invoices. Using our Zapier or REST API integration, you can trigger a two-way or three-way match against your PO and receiving data in your ERP.",
    },
    {
      question: "How long does it take to parse one invoice?",
      answer:
        "Average extraction time is under 4 seconds for a single-page invoice and under 10 seconds for multi-page documents. Batch uploads process in parallel, so throughput scales linearly.",
    },
  ],
  cta: {
    headline: "Automate Your Invoice Processing Today",
    subheadline:
      "Upload your first invoice and see structured data in seconds. No credit card required.",
    ctaText: "Try Parsli Free",
  },
  relatedUseCases: ["receipt-parsing", "order-processing", "bank-statements"],
};
