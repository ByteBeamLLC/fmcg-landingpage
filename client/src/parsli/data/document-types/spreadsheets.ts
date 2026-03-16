import { Table, Upload, Cpu, Download } from "lucide-react";
import type { DocumentTypePageData } from "../types";

export const spreadsheetsData: DocumentTypePageData = {
  slug: "spreadsheets",
  seo: {
    title: "Spreadsheet Parsing & Data Extraction | Parsli",
    description:
      "Automatically extract and transform data from Excel, CSV, and Google Sheets files. Parsli normalizes messy spreadsheet data into clean, structured output.",
    keywords:
      "spreadsheet parsing, Excel data extraction, CSV parsing, Google Sheets extraction, spreadsheet automation, parse Excel files",
  },
  hero: {
    badge: "Spreadsheet Parsing",
    badgeIcon: Table,
    headline: "Parse & Normalize Any Spreadsheet",
    subheadline:
      "Upload messy Excel files, CSVs, or Google Sheets exports. Parsli maps columns, normalizes data formats, and outputs clean structured data.",
    stats: [
      { value: "99%", label: "Column mapping accuracy" },
      { value: "1M+", label: "Rows processed per day" },
      { value: "10+", label: "Spreadsheet formats" },
    ],
  },
  extractableFields: [
    {
      fieldName: "Column Headers",
      description: "Automatic detection of header rows, even when not in the first row.",
      example: "Name, Email, Phone, Company",
    },
    {
      fieldName: "Row Data",
      description: "Structured row-by-row data extraction with type detection.",
      example: "{ name: 'Jane Doe', email: 'jane@co.com', phone: '555-1234' }",
    },
    {
      fieldName: "Named Ranges",
      description: "Data from Excel named ranges and defined table regions.",
      example: "SalesData range: A1:F250",
    },
    {
      fieldName: "Multi-Sheet Data",
      description: "Extract and combine data from multiple sheets or tabs in a workbook.",
      example: "Sheet1: Customers, Sheet2: Orders, Sheet3: Products",
    },
    {
      fieldName: "Formulas & Computed Values",
      description: "Extract the computed values from formula cells.",
      example: "=SUM(B2:B100) -> $45,230.00",
    },
    {
      fieldName: "Date & Number Formats",
      description: "Normalize dates, currencies, and numbers to consistent formats.",
      example: "03/04/26 -> 2026-03-04",
    },
  ],
  howItWorks: [
    {
      step: "1",
      title: "Upload Your Spreadsheet",
      description:
        "Drag and drop Excel, CSV, TSV, or ODS files into Parsli. You can also forward spreadsheet email attachments or connect Google Drive.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Maps & Normalizes",
      description:
        "Parsli detects headers, data types, and structure. It maps columns to your desired schema and normalizes dates, currencies, and formats automatically.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Export Clean Data",
      description:
        "Get normalized data as JSON, CSV, or push directly to databases, Google Sheets, CRMs, or any app via integrations.",
      icon: Download,
    },
  ],
  supportedFormats: [
    "XLSX (Excel)",
    "XLS (Legacy Excel)",
    "CSV",
    "TSV",
    "ODS (OpenDocument)",
    "Google Sheets Export",
    "Numbers (Apple)",
    "PDF Tables",
  ],
  relatedUseCases: [
    "email-to-spreadsheet",
    "lead-capture",
    "order-processing",
    "invoice-parsing",
  ],
  faq: [
    {
      question: "Can Parsli handle messy spreadsheets with inconsistent formatting?",
      answer:
        "Yes. Parsli's AI detects header rows even when they are not in row one, handles merged cells, skips blank rows, and normalizes inconsistent data formats across the spreadsheet.",
    },
    {
      question: "Does Parsli support multi-sheet Excel workbooks?",
      answer:
        "Yes. Parsli can extract data from all sheets in a workbook, combine related data across sheets, or process each sheet independently based on your configuration.",
    },
    {
      question: "Can Parsli convert spreadsheets to JSON?",
      answer:
        "Absolutely. Each row becomes a JSON object with column headers as keys. Parsli handles type conversion, so numbers, dates, and booleans are properly typed in the output.",
    },
    {
      question: "How does Parsli handle CSV files with different delimiters?",
      answer:
        "Parsli auto-detects the delimiter (comma, semicolon, tab, pipe) and encoding (UTF-8, Latin-1, etc.) of CSV files. No manual configuration is needed.",
    },
    {
      question: "Can I map spreadsheet columns to a custom schema?",
      answer:
        "Yes. Define your target schema in Parsli, and the AI will map incoming spreadsheet columns to your fields. It handles column name variations and reordering automatically.",
    },
  ],
};
