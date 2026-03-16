import { Landmark, Upload, Cpu, Download } from "lucide-react";
import type { DocumentTypePageData } from "../types";

export const bankStatementsData: DocumentTypePageData = {
  slug: "bank-statements",
  seo: {
    title: "Bank Statement Parsing & Data Extraction | Parsli",
    description:
      "Automatically extract transactions, balances, account details, and more from bank statements. Parsli parses PDF, scanned, and digital bank statements with AI.",
    keywords:
      "bank statement parsing, bank statement OCR, extract bank transactions, bank statement data extraction, parse bank documents, financial document parsing",
  },
  hero: {
    badge: "Bank Statement Parsing",
    badgeIcon: Landmark,
    headline: "Parse Bank Statements into Clean Transaction Data",
    subheadline:
      "Upload bank statements in any format and get structured transaction data, account balances, and financial summaries extracted automatically.",
    stats: [
      { value: "99%", label: "Transaction accuracy" },
      { value: "500+", label: "Bank formats recognized" },
      { value: "100+", label: "Currencies supported" },
    ],
  },
  extractableFields: [
    {
      fieldName: "Account Holder Name",
      description: "The name of the account owner as shown on the statement.",
      example: "Acme Corporation LLC",
    },
    {
      fieldName: "Account Number",
      description: "The bank account number (masked or full as shown).",
      example: "****4829",
    },
    {
      fieldName: "Statement Period",
      description: "The date range covered by the statement.",
      example: "Feb 1, 2026 - Feb 28, 2026",
    },
    {
      fieldName: "Opening Balance",
      description: "The account balance at the start of the statement period.",
      example: "$12,450.33",
    },
    {
      fieldName: "Closing Balance",
      description: "The account balance at the end of the statement period.",
      example: "$15,892.17",
    },
    {
      fieldName: "Transactions",
      description:
        "Individual transaction records with date, description, debit/credit, and running balance.",
      example: "03/04 - Amazon Web Services - Debit $249.00 - Bal $15,643.17",
    },
    {
      fieldName: "Total Deposits",
      description: "The sum of all credit transactions in the period.",
      example: "$8,200.00",
    },
    {
      fieldName: "Total Withdrawals",
      description: "The sum of all debit transactions in the period.",
      example: "$4,758.16",
    },
    {
      fieldName: "Bank Name & Branch",
      description: "The issuing bank name and branch identifier.",
      example: "Chase Bank - Downtown Austin Branch",
    },
  ],
  howItWorks: [
    {
      step: "1",
      title: "Upload Bank Statements",
      description:
        "Upload PDF or scanned bank statements via the dashboard, email forwarding, or API. Parsli accepts statements from any bank in any format.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Extracts Transactions",
      description:
        "Parsli's AI identifies the bank format, extracts every transaction, calculates summaries, and categorizes debits and credits automatically.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Export Financial Data",
      description:
        "Get structured transaction data as CSV, JSON, or Excel. Push directly to accounting software, Google Sheets, or financial systems.",
      icon: Download,
    },
  ],
  supportedFormats: ["PDF", "Scanned PDF", "JPEG", "PNG", "TIFF", "CSV (bank export)"],
  relatedUseCases: [
    "bank-statements",
    "invoice-parsing",
    "receipt-parsing",
    "contract-extraction",
  ],
  faq: [
    {
      question: "Which banks does Parsli support?",
      answer:
        "Parsli's AI-based approach works with statements from any bank worldwide. It does not rely on bank-specific templates, so it handles statements from over 500 recognized formats and adapts to new formats automatically.",
    },
    {
      question: "Can Parsli extract individual transactions from bank statements?",
      answer:
        "Yes. Parsli extracts every transaction with date, description, debit/credit amount, and running balance. It handles multi-page transaction tables and merges them into a single list.",
    },
    {
      question: "How does Parsli handle scanned bank statements?",
      answer:
        "Parsli's OCR engine processes scanned statements with high accuracy, even from low-quality scans or photos. It preprocesses images for clarity before applying AI extraction.",
    },
    {
      question: "Is bank statement data handled securely?",
      answer:
        "Absolutely. Parsli is SOC 2 compliant with end-to-end encryption. Bank statements are processed in secure environments and can be automatically deleted after extraction per your retention policy.",
    },
    {
      question: "Can Parsli categorize bank transactions?",
      answer:
        "Parsli extracts raw transaction descriptions. You can configure post-processing rules to categorize transactions by type (rent, utilities, payroll, etc.) or use integrations to route data to tools with built-in categorization.",
    },
    {
      question: "Does Parsli support multi-currency bank statements?",
      answer:
        "Yes. Parsli detects and extracts amounts in 100+ currencies. For statements with foreign currency transactions, both the original and converted amounts are captured when available.",
    },
  ],
};
