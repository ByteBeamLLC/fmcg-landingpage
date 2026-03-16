import { FileText, Upload, Cpu, Download } from "lucide-react";
import type { DocumentTypePageData } from "../types";

export const invoicesData: DocumentTypePageData = {
  slug: "invoices",
  seo: {
    title: "Invoice Parsing & Data Extraction | Parsli",
    description:
      "Automatically extract vendor names, line items, totals, and tax from invoices. Parsli's AI parses PDF, scanned, and emailed invoices with 99.5% accuracy.",
    keywords:
      "invoice parsing, invoice data extraction, invoice OCR, automated invoice processing, extract data from invoices, invoice automation",
  },
  hero: {
    badge: "Invoice Parsing",
    badgeIcon: FileText,
    headline: "Extract Data from Any Invoice in Seconds",
    subheadline:
      "Parsli's AI reads invoices like a human -- pulling vendor details, line items, totals, taxes, and payment terms from any format. No templates needed for most invoices.",
    stats: [
      { value: "99.5%", label: "Extraction accuracy" },
      { value: "<5s", label: "Average processing time" },
      { value: "50+", label: "Invoice formats supported" },
    ],
  },
  extractableFields: [
    {
      fieldName: "Vendor / Supplier Name",
      description: "The name of the company or individual that issued the invoice.",
      example: "Acme Corp International",
    },
    {
      fieldName: "Invoice Number",
      description: "The unique identifier assigned to the invoice by the vendor.",
      example: "INV-2026-00482",
    },
    {
      fieldName: "Invoice Date",
      description: "The date the invoice was issued.",
      example: "2026-03-01",
    },
    {
      fieldName: "Due Date",
      description: "The payment deadline specified on the invoice.",
      example: "2026-03-31",
    },
    {
      fieldName: "Line Items",
      description:
        "Individual products or services listed, including description, quantity, unit price, and amount.",
      example: "Widget Pro x 50 @ $12.00 = $600.00",
    },
    {
      fieldName: "Subtotal",
      description: "The sum of all line items before tax and discounts.",
      example: "$2,450.00",
    },
    {
      fieldName: "Tax Amount",
      description: "Total tax applied to the invoice (VAT, GST, sales tax).",
      example: "$196.00 (8% VAT)",
    },
    {
      fieldName: "Total Amount Due",
      description: "The final amount to be paid, including all taxes and discounts.",
      example: "$2,646.00",
    },
    {
      fieldName: "Payment Terms",
      description: "The payment conditions specified by the vendor.",
      example: "Net 30",
    },
    {
      fieldName: "PO Number",
      description: "The purchase order number referenced on the invoice, if present.",
      example: "PO-2026-1194",
    },
  ],
  howItWorks: [
    {
      step: "1",
      title: "Upload or Forward Your Invoice",
      description:
        "Upload invoices via the dashboard, API, or simply forward them to your Parsli email inbox. Supports PDF, image, and email formats.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Extracts Every Field",
      description:
        "Parsli's AI automatically detects and extracts vendor details, line items, totals, tax, and payment terms -- no manual template setup required.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Export Structured Data",
      description:
        "Get clean, structured data in JSON, CSV, or Excel. Push it directly to Google Sheets, your ERP, or any app via Zapier, Make, or webhooks.",
      icon: Download,
    },
  ],
  supportedFormats: ["PDF", "JPEG", "PNG", "TIFF", "DOCX", "Email (EML/MSG)", "HTML"],
  relatedUseCases: [
    "invoice-parsing",
    "order-processing",
    "bank-statements",
    "receipt-parsing",
  ],
  faq: [
    {
      question: "What types of invoices can Parsli parse?",
      answer:
        "Parsli handles all invoice formats including PDF invoices, scanned paper invoices, emailed invoices (body and attachments), and digital invoices. It works with any layout or vendor without pre-configuration.",
    },
    {
      question: "Can Parsli extract line items from invoices?",
      answer:
        "Yes. Parsli's AI-powered table extraction identifies and parses line items including description, quantity, unit price, and line total. It handles single-page and multi-page invoice tables.",
    },
    {
      question: "How accurate is Parsli for invoice parsing?",
      answer:
        "Parsli achieves 99.5% accuracy on invoice extraction. The auto-learning feature means accuracy improves further as you correct any rare errors.",
    },
    {
      question: "Can I automate invoice processing end-to-end?",
      answer:
        "Absolutely. Forward invoices to your Parsli inbox, let AI extract the data, and push structured results to your accounting software, ERP, or spreadsheet automatically via integrations.",
    },
    {
      question: "Does Parsli handle invoices in multiple languages?",
      answer:
        "Yes. Parsli supports invoice extraction in 100+ languages, including right-to-left languages like Arabic and character-based languages like Chinese and Japanese.",
    },
    {
      question: "How does Parsli handle multi-page invoices?",
      answer:
        "Parsli automatically detects and groups pages from the same invoice. It extracts line items across pages and consolidates the data into a single structured output.",
    },
  ],
};
