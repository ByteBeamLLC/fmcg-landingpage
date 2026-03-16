import {
  Mail,
  Settings,
  Zap,
  FileText,
  Filter,
  Clock,
  Shield,
  FolderOpen,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const gmailData: IntegrationPageData = {
  slug: "gmail",
  seo: {
    title: "Parsli + Gmail Integration | Auto-Extract Data from Email Attachments",
    description:
      "Connect Parsli to Gmail and automatically extract structured data from invoices, receipts, and documents arriving in your inbox. Zero manual data entry.",
    keywords:
      "Gmail integration, email document extraction, Gmail attachment parser, auto-extract email data, Gmail OCR, inbox automation, email to data pipeline",
  },
  hero: {
    integrationName: "Gmail",
    integrationLogo: "\u{1F4E7}",
    headline: "Extract Data from Gmail Attachments Automatically",
    subheadline:
      "Parsli monitors your Gmail inbox, detects document attachments, and extracts structured data in real time. Invoices, receipts, purchase orders\u2014parsed and delivered without lifting a finger.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Connect Your Gmail Account",
      description:
        "Authorize Parsli to securely access your Gmail account via OAuth 2.0. We only request read access to attachments\u2014your emails stay private.",
      icon: Mail,
    },
    {
      step: "2",
      title: "Configure Inbox Filters",
      description:
        "Set up rules to target specific senders, labels, or subject lines. Parsli will only process emails that match your criteria.",
      icon: Filter,
    },
    {
      step: "3",
      title: "Map Extraction Fields",
      description:
        "Choose a pre-built template or define custom fields to extract from incoming attachments\u2014vendor name, total, line items, dates, and more.",
      icon: Settings,
    },
    {
      step: "4",
      title: "Activate & Monitor",
      description:
        "Turn on the integration and watch extracted data flow into your dashboard, spreadsheet, or downstream system in real time.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: Clock,
      title: "Real-Time Inbox Monitoring",
      description:
        "Parsli continuously watches your Gmail inbox and processes new attachments within seconds of arrival.",
      benefit: "Eliminate manual download-and-upload workflows entirely.",
    },
    {
      icon: Filter,
      title: "Smart Email Filtering",
      description:
        "Target documents by sender domain, subject keywords, Gmail labels, or attachment type so only relevant files get processed.",
      benefit: "Reduce noise and focus on the documents that matter.",
    },
    {
      icon: FileText,
      title: "Multi-Format Attachment Support",
      description:
        "Extract data from PDF, PNG, JPG, and TIFF attachments. Parsli handles scanned documents and digital files alike.",
      benefit: "No need to convert file formats before extraction.",
    },
    {
      icon: Shield,
      title: "Secure OAuth 2.0 Connection",
      description:
        "Parsli never stores your Gmail password. We use Google\u2019s official OAuth flow with minimal permissions and encrypted data transit.",
      benefit: "Enterprise-grade security without complex setup.",
    },
    {
      icon: FolderOpen,
      title: "Automatic Label & Archive",
      description:
        "After extraction, Parsli can label processed emails and move them to a designated folder, keeping your inbox organized.",
      benefit: "Maintain a clean inbox while building a searchable data archive.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Invoice Processing from Email",
      description:
        "Automatically extract vendor details, line items, and totals from invoices emailed by suppliers\u2014no manual data entry required.",
      slug: "invoice-parsing",
    },
    {
      title: "Receipt Capture from Inbox",
      description:
        "Collect digital receipts from email confirmations and parse amounts, dates, and merchant info for expense tracking.",
      slug: "receipt-parsing",
    },
    {
      title: "Email Attachments to Spreadsheet",
      description:
        "Route extracted data from Gmail attachments directly into Google Sheets or Excel for instant reporting and analysis.",
      slug: "email-to-spreadsheet",
    },
  ],
  faq: [
    {
      question: "Does Parsli read my email body or just attachments?",
      answer:
        "Parsli only processes file attachments (PDFs, images). We do not read, store, or analyze the text content of your email messages.",
    },
    {
      question: "Can I connect multiple Gmail accounts?",
      answer:
        "Yes. You can connect as many Gmail accounts as you need and configure separate extraction rules for each one.",
    },
    {
      question: "What happens if an email has multiple attachments?",
      answer:
        "Parsli processes every qualifying attachment in the email individually and outputs a separate extraction result for each document.",
    },
    {
      question: "Is there a delay between receiving an email and extraction?",
      answer:
        "Typically under 30 seconds. Parsli polls your inbox at high frequency and begins extraction as soon as a matching email is detected.",
    },
    {
      question: "Can I filter emails by Gmail label?",
      answer:
        "Absolutely. You can target specific Gmail labels, sender addresses, subject-line keywords, or any combination of criteria.",
    },
  ],
};
