import { ClipboardList, Upload, Cpu, Download } from "lucide-react";
import type { DocumentTypePageData } from "../types";

export const formsData: DocumentTypePageData = {
  slug: "forms",
  seo: {
    title: "Form Parsing & Data Extraction | Parsli",
    description:
      "Automatically extract data from filled forms, surveys, applications, and questionnaires. Parsli parses PDF forms, scanned paper forms, and digital submissions.",
    keywords:
      "form parsing, form data extraction, form OCR, extract data from forms, PDF form parsing, paper form digitization, form automation",
  },
  hero: {
    badge: "Form Parsing",
    badgeIcon: ClipboardList,
    headline: "Digitize & Extract Data from Any Form",
    subheadline:
      "Paper forms, PDF forms, scanned applications -- Parsli reads them all. AI extracts field labels and values, checkboxes, signatures, and handwritten entries.",
    stats: [
      { value: "98%", label: "Field extraction accuracy" },
      { value: "< 10s", label: "Per-form processing" },
      { value: "50+", label: "Form layouts handled" },
    ],
  },
  extractableFields: [
    {
      fieldName: "Form Field Labels",
      description: "The labels or questions associated with each form field.",
      example: "Full Name, Date of Birth, Email Address",
    },
    {
      fieldName: "Text Field Values",
      description: "Typed or handwritten text entered in form fields.",
      example: "Jane Smith, 1990-05-15, jane@example.com",
    },
    {
      fieldName: "Checkboxes & Radio Buttons",
      description: "The selected or unselected state of checkboxes and radio options.",
      example: "Agree to Terms: [checked], Newsletter: [unchecked]",
    },
    {
      fieldName: "Dropdown / Select Values",
      description: "The selected option from dropdown menus in digital forms.",
      example: "Country: United States",
    },
    {
      fieldName: "Signatures",
      description: "Detection and location of handwritten or digital signatures.",
      example: "Signature detected in field 'Applicant Signature'",
    },
    {
      fieldName: "Date Fields",
      description: "Dates extracted and normalized from various date formats.",
      example: "03/04/2026 -> 2026-03-04",
    },
    {
      fieldName: "Numeric Fields",
      description: "Numbers, amounts, and quantities from form fields.",
      example: "Annual Income: $85,000",
    },
    {
      fieldName: "Multi-Line Text / Comments",
      description: "Longer text entries from comment boxes or description fields.",
      example: "Please describe your experience: 5 years in data engineering...",
    },
  ],
  howItWorks: [
    {
      step: "1",
      title: "Upload Filled Forms",
      description:
        "Upload scanned paper forms, PDF forms, or images via the dashboard, email, or API. Parsli handles any form layout without pre-configuration.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Reads Every Field",
      description:
        "Parsli's AI detects form structure, maps labels to values, reads handwriting, identifies checkboxes, and extracts all filled data points.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Export Structured Responses",
      description:
        "Get form responses as structured JSON, CSV, or push to Google Sheets, CRMs, databases, or any app via integrations.",
      icon: Download,
    },
  ],
  supportedFormats: [
    "PDF (Fillable)",
    "PDF (Scanned)",
    "JPEG",
    "PNG",
    "TIFF",
    "DOCX",
    "HTML Forms (printed)",
  ],
  relatedUseCases: [
    "lead-capture",
    "resume-parsing",
    "real-estate-docs",
    "order-processing",
  ],
  faq: [
    {
      question: "Can Parsli read handwritten form entries?",
      answer:
        "Yes. Parsli's OCR engine includes handwriting recognition (ICR) that reads printed and cursive handwriting in form fields. Accuracy improves with legibility, and auto-learning refines recognition over time.",
    },
    {
      question: "Does Parsli detect checkboxes and radio buttons on scanned forms?",
      answer:
        "Yes. Parsli's AI identifies checkbox and radio button fields on scanned forms and determines whether each is checked or unchecked with high accuracy.",
    },
    {
      question: "Can Parsli handle different form layouts automatically?",
      answer:
        "Yes. Parsli's AI adapts to any form layout without requiring a template. For recurring form types, you can create a template for even higher accuracy and consistency.",
    },
    {
      question: "What about fillable PDF forms (AcroForms)?",
      answer:
        "Parsli natively reads fillable PDF form fields, extracting both the field labels and entered values. This method is even faster and more accurate than OCR-based extraction.",
    },
    {
      question: "Can I process batches of forms at once?",
      answer:
        "Absolutely. Upload hundreds of forms via the dashboard or API, and Parsli processes them in parallel. Results are available individually or as a consolidated dataset.",
    },
    {
      question: "How does Parsli handle multi-page forms?",
      answer:
        "Parsli groups pages from the same form and extracts data across all pages into a single structured output. It handles stapled scans, split uploads, and multi-page PDFs.",
    },
  ],
};
