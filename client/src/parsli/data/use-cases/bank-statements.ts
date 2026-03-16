import {
  Landmark,
  ArrowDownUp,
  Upload,
  Cpu,
  CheckCircle,
  DollarSign,
  Calendar,
  TrendingUp,
  ShieldCheck,
  Search,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const bankStatementsData: UseCasePageData = {
  slug: "bank-statements",
  seo: {
    title: "Bank Statement Parsing & Transaction Extraction | Parsli",
    description:
      "Extract transactions, balances, dates, and account details from bank statements automatically. Parsli processes PDF, scanned, and digital bank statements with high accuracy for bookkeeping, lending, and reconciliation.",
    keywords:
      "bank statement parsing, transaction extraction, bank statement OCR, automated bank reconciliation, statement data extraction, financial document parsing, bank statement API",
  },
  hero: {
    badge: "Bank Statements",
    badgeIcon: Landmark,
    headline: "Extract Every Transaction from Any Bank Statement",
    subheadline:
      "PDF statements from 10,000+ banks worldwide. Parsli extracts account holder, account number, statement period, opening/closing balances, and every transaction — date, description, debit, credit, running balance — into structured, analysis-ready data.",
    stats: [
      { value: "99.3%", label: "Transaction extraction accuracy" },
      { value: "< 5s", label: "Average parse time per statement page" },
      { value: "10,000+", label: "Bank statement formats supported" },
    ],
    ctaText: "Parse Bank Statements Free",
  },
  painPoints: {
    headline: "Manual Statement Processing Is Unsustainable",
    subheadline:
      "Whether you're a bookkeeper, lender, or auditor, manually extracting bank data is the biggest time sink in your workflow.",
    items: [
      {
        value: "25 min",
        label: "Average time to manually key one bank statement into a spreadsheet",
      },
      {
        value: "5.2%",
        label: "Of manually entered transactions contain amount or date errors",
      },
      {
        value: "$40B",
        label: "Estimated annual cost of manual financial data processing in the US",
      },
    ],
  },
  howItWorks: {
    headline: "Bank Statement to Structured Data in Three Steps",
    subheadline:
      "Upload a statement. Get a clean transaction table back.",
    steps: [
      {
        step: "1",
        title: "Upload Statements",
        description:
          "Upload PDF bank statements via the dashboard, forward them by email, or send them through the API. Parsli handles native PDF, scanned/image-based, and password-protected statements.",
        icon: Upload,
      },
      {
        step: "2",
        title: "AI Extracts All Data",
        description:
          "Parsli identifies the bank, extracts account details and statement period, then parses every transaction row — date, description, reference number, debit/credit amount, and running balance.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Export & Reconcile",
        description:
          "Download extracted transactions as CSV, push to Google Sheets, or feed into your accounting software via API. Use the data for reconciliation, loan underwriting, or financial analysis.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: ArrowDownUp,
      title: "Full Transaction Table Extraction",
      description:
        "Captures every transaction row including date, value date, description/narration, reference/check number, debit amount, credit amount, and running balance — across multi-page statements.",
      benefit: "Complete transaction history in structured format, ready for reconciliation.",
    },
    {
      icon: DollarSign,
      title: "Balance Verification",
      description:
        "Extracts opening and closing balances and cross-checks them against the sum of extracted transactions. Discrepancies are flagged automatically.",
      benefit: "Built-in validation catches extraction errors before they reach your books.",
    },
    {
      icon: Calendar,
      title: "Multi-Period Consolidation",
      description:
        "Upload 12 months of statements and Parsli consolidates them into a single, chronological transaction dataset with no duplicates at period boundaries.",
      benefit: "Annual financial analysis from a single batch upload.",
    },
    {
      icon: TrendingUp,
      title: "Transaction Categorization",
      description:
        "Optionally categorize transactions by type (payroll, rent, utilities, subscriptions, transfers, etc.) using description-based classification rules.",
      benefit: "Ready-to-use data for cash flow analysis and financial modeling.",
    },
    {
      icon: ShieldCheck,
      title: "Password-Protected PDF Support",
      description:
        "Handles password-protected bank statement PDFs. Provide the password once per upload, and Parsli decrypts and processes the statement securely.",
      benefit: "No need to manually unlock PDFs before uploading.",
    },
    {
      icon: Search,
      title: "Bank Auto-Detection",
      description:
        "Automatically identifies the issuing bank from the statement layout and applies bank-specific parsing logic for maximum accuracy.",
      benefit: "No configuration needed — just upload and extract.",
    },
  ],
  integrations: [
    {
      slug: "google-sheets",
      relevance:
        "Push extracted transactions directly into a Google Sheets reconciliation template.",
    },
    {
      slug: "excel",
      relevance:
        "Export transactions to Excel workbooks for financial modeling and analysis.",
    },
    {
      slug: "rest-api",
      relevance:
        "Integrate with lending platforms, accounting software, or fintech applications for automated statement processing.",
    },
    {
      slug: "dropbox",
      relevance:
        "Watch a Dropbox folder for new bank statement uploads from clients or team members.",
    },
  ],
  faq: [
    {
      question: "Which banks' statement formats does Parsli support?",
      answer:
        "Parsli supports statements from 10,000+ banks worldwide. The AI model adapts to any bank's format automatically — including major banks (Chase, Bank of America, HSBC, Barclays) and smaller regional/community banks. No bank-specific configuration is needed.",
    },
    {
      question: "Can Parsli handle scanned or photographed bank statements?",
      answer:
        "Yes. Scanned statements go through Parsli's OCR pipeline first, then through the extraction model. Even low-quality scans are supported, though accuracy is highest with clean, high-resolution scans.",
    },
    {
      question: "How does Parsli handle multi-page statements?",
      answer:
        "Parsli automatically continues the transaction table across page breaks, handles page-level subtotals without double-counting, and merges all pages into a single continuous transaction dataset.",
    },
    {
      question: "Can I process multiple accounts' statements at once?",
      answer:
        "Yes. Upload statements from different accounts in a single batch. Parsli identifies each account separately and outputs distinct datasets, tagged with account number and bank name.",
    },
    {
      question: "Is bank statement data handled securely?",
      answer:
        "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). Parsli processes data in SOC 2 Type II-compliant infrastructure. We never share or sell your data, and you can configure automatic deletion after processing.",
    },
    {
      question: "Can I use this for loan underwriting or income verification?",
      answer:
        "Absolutely. Lenders use Parsli to extract and analyze 3-6 months of bank statements during loan underwriting. The structured output supports average balance calculations, income verification, and NSF/overdraft analysis.",
    },
  ],
  cta: {
    headline: "Turn Bank Statements Into Clean Data",
    subheadline:
      "Upload a bank statement and see extracted transactions in seconds. No credit card required.",
    ctaText: "Try Parsli Free",
  },
  relatedUseCases: [
    "invoice-parsing",
    "receipt-parsing",
    "contract-extraction",
  ],
};
