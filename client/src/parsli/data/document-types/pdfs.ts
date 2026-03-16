import { FileText, Upload, Cpu, Download } from "lucide-react";
import type { DocumentTypePageData } from "../types";

export const pdfsData: DocumentTypePageData = {
  slug: "pdfs",
  seo: {
    title: "PDF Parsing & Data Extraction | Parsli",
    description:
      "Extract structured data from any PDF document. Parsli's AI handles native PDFs, scanned documents, forms, tables, and multi-page files with 99.5% accuracy.",
    keywords:
      "PDF parsing, PDF data extraction, PDF OCR, extract data from PDF, PDF automation, PDF to spreadsheet, parse PDF documents",
  },
  hero: {
    badge: "PDF Parsing",
    badgeIcon: FileText,
    headline: "Extract Data from Any PDF, Automatically",
    subheadline:
      "Native or scanned, single-page or multi-page -- Parsli's AI reads PDFs like a human and returns clean, structured data in seconds.",
    stats: [
      { value: "99.5%", label: "Extraction accuracy" },
      { value: "50+", label: "PDF layouts handled" },
      { value: "<5s", label: "Average parse time" },
    ],
  },
  extractableFields: [
    {
      fieldName: "Document Title",
      description: "The title or heading of the PDF document.",
      example: "Quarterly Financial Report Q1 2026",
    },
    {
      fieldName: "Text Content",
      description: "Full-text extraction from native and scanned PDFs.",
      example: "Total revenue increased by 23% year-over-year...",
    },
    {
      fieldName: "Tables",
      description: "Structured table data extracted with rows, columns, and headers preserved.",
      example: "| Product | Q1 Sales | Q2 Sales | ... |",
    },
    {
      fieldName: "Form Fields",
      description: "Data from fillable PDF form fields (AcroForms and XFA).",
      example: "Name: John Doe, Date: 2026-03-01",
    },
    {
      fieldName: "Key-Value Pairs",
      description: "Labeled data points detected by AI throughout the document.",
      example: "Account Number: 8849-2213-0047",
    },
    {
      fieldName: "Dates",
      description: "All dates found in the document, normalized to a standard format.",
      example: "2026-03-04",
    },
    {
      fieldName: "Monetary Values",
      description: "Currency amounts detected and extracted with currency codes.",
      example: "$12,450.00 USD",
    },
    {
      fieldName: "Signatures & Stamps",
      description: "Detection of signature fields, stamps, and approval marks.",
      example: "Signature detected on page 3",
    },
  ],
  howItWorks: [
    {
      step: "1",
      title: "Upload Your PDF",
      description:
        "Drag and drop PDFs to the dashboard, send via email, connect cloud storage (Google Drive, Dropbox), or use the REST API for programmatic uploads.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Analyzes & Extracts",
      description:
        "Parsli detects the document type, applies OCR if needed, identifies tables and fields, and extracts all structured data using AI models.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Get Structured Output",
      description:
        "Receive clean JSON, CSV, or Excel output. Route data to Google Sheets, databases, or any downstream application through integrations.",
      icon: Download,
    },
  ],
  supportedFormats: [
    "Native PDF",
    "Scanned PDF",
    "Fillable PDF (AcroForm)",
    "PDF/A (Archival)",
    "Password-Protected PDF",
    "Multi-Page PDF",
  ],
  relatedUseCases: [
    "invoice-parsing",
    "contract-extraction",
    "bank-statements",
    "real-estate-docs",
  ],
  faq: [
    {
      question: "Can Parsli handle scanned PDFs?",
      answer:
        "Yes. Parsli includes advanced OCR that converts scanned PDF pages into text before extraction. It handles low-quality scans, rotated pages, and multi-language documents.",
    },
    {
      question: "Does Parsli extract tables from PDFs?",
      answer:
        "Yes. Parsli's AI detects table structures in PDFs and extracts data with row, column, and header relationships preserved. This works for both native and scanned tables.",
    },
    {
      question: "Can Parsli process password-protected PDFs?",
      answer:
        "Yes. You can provide the password when uploading, and Parsli will decrypt and process the document. The password is never stored after processing.",
    },
    {
      question: "How does Parsli handle multi-page PDFs?",
      answer:
        "Parsli processes all pages and intelligently groups related content. Tables that span multiple pages are merged, and data is consolidated into a single structured output.",
    },
    {
      question: "What output formats are available for PDF extraction?",
      answer:
        "Extracted data can be output as JSON, CSV, Excel (XLSX), or pushed directly to Google Sheets, databases, and third-party apps via integrations.",
    },
    {
      question: "Does Parsli preserve the PDF layout during extraction?",
      answer:
        "Parsli focuses on extracting structured data rather than preserving visual layout. However, it maintains the logical reading order, table structure, and hierarchical relationships found in the document.",
    },
  ],
};
