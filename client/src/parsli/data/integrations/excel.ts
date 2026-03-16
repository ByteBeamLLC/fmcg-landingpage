import {
  Table,
  Settings,
  Zap,
  FileText,
  RefreshCw,
  BarChart3,
  Shield,
  Cloud,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const excelData: IntegrationPageData = {
  slug: "excel",
  seo: {
    title: "Parsli + Excel / Microsoft 365 Integration | Extract Document Data to Excel",
    description:
      "Automatically populate Excel spreadsheets with data extracted from invoices, receipts, and forms. Works with Excel Online and desktop via Microsoft 365.",
    keywords:
      "Excel integration, Microsoft 365 Excel, document to Excel, OCR to Excel, extract data Excel spreadsheet, invoice to Excel automation, Excel Online parsing",
  },
  hero: {
    integrationName: "Excel / Microsoft 365",
    integrationLogo: "\u{1F4C8}",
    headline: "Send Extracted Document Data Straight to Excel",
    subheadline:
      "Parsli integrates with Excel Online through Microsoft 365 to automatically populate workbooks with structured data from any document\u2014invoices, POs, receipts, and more.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Sign In with Microsoft 365",
      description:
        "Authenticate with your Microsoft account to grant Parsli access to Excel Online workbooks stored in OneDrive or SharePoint.",
      icon: Shield,
    },
    {
      step: "2",
      title: "Select a Workbook & Worksheet",
      description:
        "Choose the Excel workbook and specific worksheet where extracted data should be written. Parsli respects your existing table structures.",
      icon: Table,
    },
    {
      step: "3",
      title: "Map Extraction Fields to Columns",
      description:
        "Assign each extracted field (vendor, total, date, line items) to a column in your worksheet. Parsli auto-suggests mappings based on header names.",
      icon: Settings,
    },
    {
      step: "4",
      title: "Activate the Pipeline",
      description:
        "Turn on the integration. Every document Parsli processes will add a new row to your Excel workbook in real time.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: Cloud,
      title: "Excel Online & SharePoint Support",
      description:
        "Write directly to Excel workbooks stored in OneDrive, OneDrive for Business, or SharePoint document libraries via Microsoft Graph API.",
      benefit: "No file downloads\u2014data appears in the cloud-hosted workbook instantly.",
    },
    {
      icon: Table,
      title: "Structured Table Output",
      description:
        "Parsli writes data into formatted Excel tables with proper headers, data types, and cell formatting for immediate use in pivot tables.",
      benefit: "Extracted data is analysis-ready from the moment it lands.",
    },
    {
      icon: BarChart3,
      title: "Chart & Pivot Table Compatible",
      description:
        "Because Parsli outputs structured table data, your existing Excel charts and pivot tables automatically update as new rows are appended.",
      benefit: "Live dashboards powered by document extraction\u2014zero manual refresh.",
    },
    {
      icon: RefreshCw,
      title: "Incremental Append & Upsert",
      description:
        "Choose to append every extraction as a new row, or update existing rows based on a key field like invoice number or order ID.",
      benefit: "Prevent duplicates while keeping your workbook current.",
    },
    {
      icon: FileText,
      title: "Multi-Sheet Routing",
      description:
        "Route invoices, receipts, and purchase orders to separate worksheets within the same workbook for clean, categorized data management.",
      benefit: "Organize extracted data without manual sorting or filtering.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Invoice Data to Excel Tracker",
      description:
        "Automatically populate an Excel workbook with invoice details\u2014vendor, amount, due date\u2014for accounts payable tracking and reporting.",
      slug: "invoice-parsing",
    },
    {
      title: "Email Attachments to Excel",
      description:
        "Combine Parsli\u2019s email monitoring with Excel output to capture every emailed document in a structured, cloud-hosted spreadsheet.",
      slug: "email-to-spreadsheet",
    },
    {
      title: "Bank Statement Analysis in Excel",
      description:
        "Parse bank statements and write transaction data into Excel for reconciliation, trend analysis, and financial reporting.",
      slug: "bank-statements",
    },
  ],
  faq: [
    {
      question: "Does Parsli work with the Excel desktop app?",
      answer:
        "Parsli writes to Excel Online workbooks via Microsoft Graph API. Desktop Excel can open and sync these workbooks automatically through OneDrive, so your desktop app always reflects the latest data.",
    },
    {
      question: "Can I write to a workbook stored on SharePoint?",
      answer:
        "Yes. Parsli supports Excel workbooks stored in SharePoint document libraries, OneDrive, and OneDrive for Business.",
    },
    {
      question: "What happens when a workbook reaches its row limit?",
      answer:
        "Excel Online supports over 1 million rows per worksheet. Parsli can also be configured to auto-create a new worksheet when a row threshold is reached.",
    },
    {
      question: "Can I apply Excel formulas to Parsli-extracted data?",
      answer:
        "Absolutely. Add formulas, conditional formatting, and data validation to your worksheet. Parsli writes raw data into your defined columns, and Excel processes formulas automatically.",
    },
  ],
};
