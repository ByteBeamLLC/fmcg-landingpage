import {
  Table,
  Settings,
  Zap,
  FileText,
  RefreshCw,
  BarChart3,
  Link,
  CheckCircle,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const googleSheetsData: IntegrationPageData = {
  slug: "google-sheets",
  seo: {
    title: "Parsli + Google Sheets Integration | Auto-Populate Spreadsheets from Documents",
    description:
      "Extract data from invoices, receipts, and forms with Parsli and send it straight to Google Sheets. Automate spreadsheet data entry and reporting.",
    keywords:
      "Google Sheets integration, document to spreadsheet, auto-fill Google Sheets, OCR to spreadsheet, extract data Google Sheets, invoice to spreadsheet automation",
  },
  hero: {
    integrationName: "Google Sheets",
    integrationLogo: "\u{1F4CA}",
    headline: "Auto-Populate Google Sheets from Any Document",
    subheadline:
      "Parsli extracts structured data from your documents and writes it directly into Google Sheets\u2014building live, always-up-to-date spreadsheets without manual data entry.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Connect Google Sheets",
      description:
        "Authorize Parsli to access your Google Sheets account via OAuth. We request only the permissions needed to read and write to your selected spreadsheets.",
      icon: Link,
    },
    {
      step: "2",
      title: "Select or Create a Sheet",
      description:
        "Choose an existing spreadsheet or let Parsli create a new one. Define column headers that map to the fields you want to extract.",
      icon: Table,
    },
    {
      step: "3",
      title: "Configure Field Mapping",
      description:
        "Map Parsli\u2019s extraction fields (vendor, amount, date, etc.) to specific columns in your sheet. Use formulas or formatting rules as needed.",
      icon: Settings,
    },
    {
      step: "4",
      title: "Start Extracting",
      description:
        "Upload documents or connect an input source. Parsli extracts data and appends a new row to your sheet for every processed document.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: RefreshCw,
      title: "Auto-Append Rows",
      description:
        "Every extracted document automatically adds a new row to your Google Sheet with all mapped fields populated\u2014no copy-pasting required.",
      benefit: "Build a growing, structured dataset without touching the keyboard.",
    },
    {
      icon: BarChart3,
      title: "Live Dashboard Data",
      description:
        "Connect your Parsli-powered sheet to Google Charts, Looker Studio, or pivot tables for real-time visual dashboards.",
      benefit: "Turn extracted data into actionable insights instantly.",
    },
    {
      icon: FileText,
      title: "Multi-Sheet Routing",
      description:
        "Route different document types to different sheets or tabs within the same spreadsheet. Invoices go to one tab, receipts to another.",
      benefit: "Keep data organized by category without manual sorting.",
    },
    {
      icon: CheckCircle,
      title: "Duplicate Detection",
      description:
        "Parsli checks for duplicate entries before appending rows, preventing the same document from being recorded twice.",
      benefit: "Maintain clean, accurate data in your spreadsheets.",
    },
    {
      icon: Table,
      title: "Header Auto-Generation",
      description:
        "If you start with a blank sheet, Parsli automatically creates column headers based on the extraction template you selected.",
      benefit: "Zero manual setup\u2014start extracting immediately.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Email Attachments to Spreadsheet",
      description:
        "Combine Parsli\u2019s email integrations with Google Sheets to automatically log every invoice, receipt, or form from your inbox into a spreadsheet.",
      slug: "email-to-spreadsheet",
    },
    {
      title: "Invoice Tracking Dashboard",
      description:
        "Extract invoice data and build a live Google Sheets tracker with pivot tables, charts, and conditional formatting for AP visibility.",
      slug: "invoice-parsing",
    },
    {
      title: "Bank Statement Reconciliation",
      description:
        "Parse bank statements into Google Sheets and use formulas to automatically reconcile transactions against your internal records.",
      slug: "bank-statements",
    },
  ],
  faq: [
    {
      question: "Can Parsli update existing rows or only append new ones?",
      answer:
        "Parsli supports both modes. You can configure it to append new rows for each document or update existing rows based on a unique identifier like invoice number.",
    },
    {
      question: "Does it work with Google Sheets shared with my team?",
      answer:
        "Yes. Parsli writes to any Google Sheet you have edit access to, including shared team spreadsheets. All collaborators see new data in real time.",
    },
    {
      question: "Can I use Google Sheets formulas on extracted data?",
      answer:
        "Absolutely. Parsli populates raw data into your defined columns, and any formulas, conditional formatting, or data validation rules you have set up apply automatically.",
    },
    {
      question: "Is there a row limit for Parsli-connected sheets?",
      answer:
        "Parsli writes data within Google Sheets\u2019 standard limits (10 million cells per spreadsheet). For very high-volume use cases, we recommend creating new sheets periodically.",
    },
    {
      question: "Can I map extracted line items to multiple rows?",
      answer:
        "Yes. Parsli can expand line-item arrays so each item occupies its own row, with the parent document\u2019s fields repeated for context.",
    },
  ],
};
