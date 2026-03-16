import {
  Mail,
  Table,
  Upload,
  Cpu,
  CheckCircle,
  Filter,
  RefreshCw,
  Columns,
  Zap,
  ShieldCheck,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const emailToSpreadsheetData: UseCasePageData = {
  slug: "email-to-spreadsheet",
  seo: {
    title: "Email to Spreadsheet Automation | Extract Email Data to Sheets | Parsli",
    description:
      "Automatically extract structured data from emails and push it into Google Sheets or Excel. Parsli parses email bodies and attachments — no coding, no copy-paste.",
    keywords:
      "email to spreadsheet, email data extraction, email to Google Sheets, parse email to Excel, automated email data capture, email parser",
  },
  hero: {
    badge: "Email to Spreadsheet",
    badgeIcon: Mail,
    headline: "Every Email, Automatically in Your Spreadsheet",
    subheadline:
      "Stop copying and pasting data from emails into spreadsheets. Parsli reads incoming emails, extracts the fields you care about, and appends clean rows to Google Sheets or Excel — on autopilot.",
    stats: [
      { value: "5 min", label: "Setup time to start extracting" },
      { value: "100%", label: "Hands-free after initial configuration" },
      { value: "50+", label: "Email formats parsed without templates" },
    ],
    ctaText: "Connect Your Inbox Now",
  },
  painPoints: {
    headline: "Manual Email-to-Sheet Workflows Don't Scale",
    subheadline:
      "When critical business data arrives by email, manual processing creates delays, errors, and frustration.",
    items: [
      {
        value: "45 min/day",
        label: "Average time ops teams spend copying email data into sheets",
      },
      {
        value: "8%",
        label: "Of manually transferred data points contain transcription errors",
      },
      {
        value: "3-6 hrs",
        label: "Delay between email arrival and data availability in reports",
      },
    ],
  },
  howItWorks: {
    headline: "From Inbox to Spreadsheet in Three Steps",
    subheadline:
      "Connect once. Parsli handles every email that matches your criteria.",
    steps: [
      {
        step: "1",
        title: "Connect Your Email",
        description:
          "Link your Gmail or Outlook account, or forward specific emails to a dedicated Parsli address. Set filters so only relevant emails are processed.",
        icon: Upload,
      },
      {
        step: "2",
        title: "Define Your Fields",
        description:
          "Tell Parsli which data points to extract — order numbers, customer names, amounts, dates, or any custom field. Or let Parsli auto-detect the schema from a few sample emails.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Data Flows to Your Sheet",
        description:
          "Each parsed email becomes a new row in your Google Sheet or Excel file. Columns map to extracted fields. New emails are processed in real time.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: Filter,
      title: "Smart Email Filtering",
      description:
        "Set rules based on sender, subject line keywords, or labels. Only emails matching your criteria get processed — everything else is ignored.",
      benefit: "No noise in your spreadsheet. Only the data you need.",
    },
    {
      icon: Columns,
      title: "Custom Column Mapping",
      description:
        "Map extracted fields to specific spreadsheet columns. Rename, reorder, or transform values (date formatting, currency conversion) before they land in the sheet.",
      benefit: "Data arrives in exactly the format your downstream process expects.",
    },
    {
      icon: RefreshCw,
      title: "Real-Time Sync",
      description:
        "New emails are parsed and appended within seconds of arrival. Your spreadsheet is always up to date without manual refreshes.",
      benefit: "Dashboards built on your sheet update automatically.",
    },
    {
      icon: Table,
      title: "Attachment Parsing",
      description:
        "Parsli doesn't just read email bodies — it also extracts data from PDF, CSV, and image attachments and merges the results into the same row.",
      benefit: "Capture the full picture even when data spans body + attachment.",
    },
    {
      icon: Zap,
      title: "Error Alerts & Retry",
      description:
        "If an email can't be parsed (e.g., new format), Parsli alerts you via Slack or email and queues the message for retry after you update the schema.",
      benefit: "Never silently lose data from an unparseable email.",
    },
    {
      icon: ShieldCheck,
      title: "Deduplication",
      description:
        "Detects and skips duplicate emails (re-forwards, reply chains) so your spreadsheet stays clean without manual dedup work.",
      benefit: "Avoid double-counted data in reports and dashboards.",
    },
  ],
  integrations: [
    {
      slug: "gmail",
      relevance:
        "Connect Gmail to Parsli for automatic ingestion of incoming emails.",
    },
    {
      slug: "outlook",
      relevance:
        "Link Outlook 365 mailboxes for enterprise email-to-sheet workflows.",
    },
    {
      slug: "google-sheets",
      relevance:
        "Primary destination — extracted email data is appended as rows to your chosen sheet.",
    },
    {
      slug: "excel",
      relevance:
        "Export parsed data to Excel files in OneDrive or SharePoint for teams on Microsoft 365.",
    },
  ],
  faq: [
    {
      question: "Do I need to create templates for each email type?",
      answer:
        "No. Parsli's AI model understands email structure automatically. You define the fields you want (or let Parsli auto-detect them from samples), and the model adapts to varying layouts, senders, and formats.",
    },
    {
      question: "Can I extract data from email attachments too?",
      answer:
        "Yes. Parsli processes PDF, CSV, image, and Word attachments alongside the email body. Data from all sources is merged into a single spreadsheet row per email.",
    },
    {
      question: "What if the email format changes?",
      answer:
        "Parsli's extraction model is resilient to layout changes. If a sender redesigns their email template, Parsli typically adapts automatically. For significant changes, the confidence-score system flags affected emails for review.",
    },
    {
      question: "How many emails can Parsli process per day?",
      answer:
        "There's no daily cap on the number of emails processed — your plan's monthly page quota applies. A typical email counts as one page. Batch imports of thousands of emails are fully supported.",
    },
    {
      question: "Can I use this with shared mailboxes or distribution lists?",
      answer:
        "Yes. You can connect shared Gmail or Outlook mailboxes, or set up a forwarding rule from a distribution list to your Parsli ingestion address. Multiple team members can access the same output sheet.",
    },
  ],
  cta: {
    headline: "Stop Copy-Pasting. Start Automating.",
    subheadline:
      "Connect your email and spreadsheet in 5 minutes. See data flow instantly.",
    ctaText: "Get Started Free",
  },
  relatedUseCases: [
    "lead-capture",
    "order-processing",
    "invoice-parsing",
    "receipt-parsing",
  ],
};
