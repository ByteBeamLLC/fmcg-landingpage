import {
  Receipt,
  Camera,
  Upload,
  Cpu,
  CheckCircle,
  Tag,
  Calendar,
  Wallet,
  PieChart,
  FolderOpen,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const receiptParsingData: UseCasePageData = {
  slug: "receipt-parsing",
  seo: {
    title: "Receipt Scanning & Expense Data Extraction | Parsli",
    description:
      "Scan paper and digital receipts to extract merchant, date, items, tax, and total automatically. Parsli turns receipt chaos into clean expense data for reimbursement and bookkeeping.",
    keywords:
      "receipt parsing, receipt OCR, receipt scanner API, expense receipt extraction, automated expense reporting, receipt data capture",
  },
  hero: {
    badge: "Receipt Parsing",
    badgeIcon: Receipt,
    headline: "Turn Every Receipt Into Clean Expense Data",
    subheadline:
      "Snap a photo, forward an email receipt, or upload a PDF. Parsli extracts merchant name, date, items, tax, tip, and total — then pushes it straight into your expense workflow.",
    stats: [
      { value: "98.7%", label: "Accuracy on printed receipts" },
      { value: "< 2s", label: "Extraction time per receipt" },
      { value: "70%", label: "Faster expense report submission" },
    ],
    ctaText: "Start Scanning Receipts Free",
  },
  painPoints: {
    headline: "Receipt Management Is Broken",
    subheadline:
      "Employees hate filing expenses, and finance teams hate chasing them. Manual receipt handling is slow and error-prone.",
    items: [
      {
        value: "20 min",
        label: "Average time employees spend per expense report",
      },
      {
        value: "19%",
        label: "Of expense reports contain errors or missing receipts",
      },
      {
        value: "$58",
        label: "Average cost to process one expense report manually",
      },
    ],
  },
  howItWorks: {
    headline: "Receipts to Structured Data in Seconds",
    subheadline:
      "No more typing. No more lost receipts. Just fast, accurate extraction.",
    steps: [
      {
        step: "1",
        title: "Capture the Receipt",
        description:
          "Take a photo with your phone, forward a digital receipt email, or drag-and-drop a PDF into the Parsli dashboard. All formats welcome.",
        icon: Camera,
      },
      {
        step: "2",
        title: "AI Reads & Categorizes",
        description:
          "Parsli's model extracts merchant, date, line items, subtotal, tax, tip, and payment method. It auto-categorizes expenses (meals, travel, office supplies, etc.).",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Export to Your Workflow",
        description:
          "Cleaned data flows to Google Sheets, your expense management tool, or your accounting system via Zapier, Make, or our REST API.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: Tag,
      title: "Auto-Categorization",
      description:
        "Parsli classifies each receipt into expense categories like Meals & Entertainment, Travel, Office Supplies, or Software — based on merchant name and line items.",
      benefit: "Skip the manual category dropdown for 90% of receipts.",
    },
    {
      icon: Calendar,
      title: "Date & Time Normalization",
      description:
        "Receipts use dozens of date formats. Parsli normalizes every date to ISO format and extracts the transaction time when available.",
      benefit: "Clean, sortable date fields in every export.",
    },
    {
      icon: Wallet,
      title: "Tax & Tip Separation",
      description:
        "Accurately separates pre-tax subtotal, tax amount, tip, and grand total — critical for proper expense reporting and tax deduction tracking.",
      benefit: "Accurate tax deduction records without manual math.",
    },
    {
      icon: PieChart,
      title: "Spending Analytics",
      description:
        "Dashboard view aggregates extracted receipt data by category, merchant, employee, or time period so you can spot trends and outliers.",
      benefit: "Visibility into team spending patterns at a glance.",
    },
    {
      icon: FolderOpen,
      title: "Batch Processing",
      description:
        "Upload a zip file or connect a folder. Parsli processes hundreds of receipts in parallel and delivers a single, consolidated export.",
      benefit: "Process a month of receipts in under a minute.",
    },
  ],
  integrations: [
    {
      slug: "gmail",
      relevance:
        "Auto-forward digital receipts from Gmail to Parsli for hands-free expense capture.",
    },
    {
      slug: "google-sheets",
      relevance:
        "Append extracted receipt data as rows in a Google Sheets expense tracker.",
    },
    {
      slug: "google-drive",
      relevance:
        "Watch a Google Drive folder for new receipt uploads and process them automatically.",
    },
    {
      slug: "zapier",
      relevance:
        "Route parsed receipt data to expense management tools like Expensify, Ramp, or Brex.",
    },
  ],
  faq: [
    {
      question: "Can Parsli read crumpled or faded receipts?",
      answer:
        "Yes. Parsli's OCR engine is trained on real-world receipt images including creased, faded, and partially obscured receipts. Accuracy may be lower on severely damaged receipts, but confidence scores will flag uncertain fields for review.",
    },
    {
      question: "Does Parsli support receipts from any country?",
      answer:
        "Parsli supports receipts in 40+ languages and handles international date formats, currency symbols, and tax conventions. It auto-detects the locale from the receipt content.",
    },
    {
      question: "How does auto-categorization work?",
      answer:
        "Parsli uses a combination of merchant-name lookup and line-item analysis to assign an expense category. You can customize the category taxonomy to match your company's chart of accounts.",
    },
    {
      question: "Can I process digital receipts from email?",
      answer:
        "Absolutely. Forward receipt emails to your dedicated Parsli address or connect Gmail/Outlook to auto-ingest receipts. Parsli extracts data from both email body content and PDF/image attachments.",
    },
    {
      question: "What happens if a receipt has multiple items?",
      answer:
        "Parsli extracts every line item including description, quantity, and price. The full item list is available in the structured output alongside the summary totals.",
    },
    {
      question: "Is receipt data stored securely?",
      answer:
        "All receipt images and extracted data are encrypted at rest (AES-256) and in transit (TLS 1.3). Data is stored in SOC 2-compliant infrastructure, and you can configure automatic deletion policies.",
    },
  ],
  cta: {
    headline: "Ditch the Shoebox of Receipts",
    subheadline:
      "Upload a receipt and see structured expense data in 2 seconds. Free to try.",
    ctaText: "Try Parsli Free",
  },
  relatedUseCases: [
    "invoice-parsing",
    "bank-statements",
    "email-to-spreadsheet",
  ],
};
