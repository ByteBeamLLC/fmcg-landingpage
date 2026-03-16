import { Mail, Forward, Cpu, Download } from "lucide-react";
import type { DocumentTypePageData } from "../types";

export const emailsData: DocumentTypePageData = {
  slug: "emails",
  seo: {
    title: "Email Parsing & Data Extraction | Parsli",
    description:
      "Automatically extract structured data from emails. Parse sender info, order details, lead data, notifications, and attachments with Parsli's AI-powered email parser.",
    keywords:
      "email parsing, email data extraction, parse email content, email automation, extract data from emails, email to spreadsheet",
  },
  hero: {
    badge: "Email Parsing",
    badgeIcon: Mail,
    headline: "Extract Structured Data from Any Email",
    subheadline:
      "Forward emails to Parsli and automatically extract contacts, orders, notifications, and more. AI parses both the email body and attachments.",
    stats: [
      { value: "99%", label: "Email parsing accuracy" },
      { value: "5,000+", label: "App integrations" },
      { value: "24/7", label: "Automated processing" },
    ],
  },
  extractableFields: [
    {
      fieldName: "Sender Name",
      description: "The display name of the person or company that sent the email.",
      example: "Jane Smith",
    },
    {
      fieldName: "Sender Email",
      description: "The email address of the sender.",
      example: "jane.smith@company.com",
    },
    {
      fieldName: "Subject Line",
      description: "The email subject line content.",
      example: "Order Confirmation #38291",
    },
    {
      fieldName: "Date Received",
      description: "The timestamp when the email was received.",
      example: "2026-03-04T09:15:00Z",
    },
    {
      fieldName: "Body Text (Structured)",
      description:
        "Key-value pairs and structured data extracted from the email body content.",
      example: "Order Total: $149.99",
    },
    {
      fieldName: "Links & URLs",
      description: "Hyperlinks extracted from the email body.",
      example: "https://tracking.example.com/pkg/TRK-29481",
    },
    {
      fieldName: "Attachment Data",
      description:
        "Structured data extracted from PDF, image, or spreadsheet attachments.",
      example: "Invoice INV-001 attached (parsed automatically)",
    },
    {
      fieldName: "Contact Information",
      description: "Phone numbers, addresses, and other contact details found in the email.",
      example: "+1 (555) 123-4567",
    },
  ],
  howItWorks: [
    {
      step: "1",
      title: "Forward Emails to Parsli",
      description:
        "Set up auto-forwarding rules or manually forward emails to your unique Parsli inbox address. Works with Gmail, Outlook, and any email provider.",
      icon: Forward,
    },
    {
      step: "2",
      title: "AI Parses Body & Attachments",
      description:
        "Parsli's AI reads the email body, identifies structured data patterns, and simultaneously extracts data from any attached documents.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Route Data to Your Apps",
      description:
        "Send extracted email data to Google Sheets, CRMs, databases, or any app via Zapier, Make, Power Automate, webhooks, or the REST API.",
      icon: Download,
    },
  ],
  supportedFormats: ["Email (EML)", "Email (MSG)", "HTML Email", "Plain Text Email", "PDF Attachments", "Image Attachments"],
  relatedUseCases: [
    "email-to-spreadsheet",
    "lead-capture",
    "order-processing",
    "invoice-parsing",
  ],
  faq: [
    {
      question: "How does email forwarding work with Parsli?",
      answer:
        "Each Parsli parser gets a unique email address. Forward emails to that address (manually or via auto-forward rules), and Parsli automatically parses the content and triggers your configured actions.",
    },
    {
      question: "Can Parsli parse email attachments too?",
      answer:
        "Yes. Parsli extracts data from both the email body and any attachments, including PDFs, images, and spreadsheets. Attachment data is merged with email body data in the output.",
    },
    {
      question: "What types of emails work best with Parsli?",
      answer:
        "Parsli works with any structured email -- order confirmations, shipping notifications, lead form submissions, invoice emails, alert notifications, and more. The AI adapts to any email format.",
    },
    {
      question: "Can I use Parsli with Gmail and Outlook?",
      answer:
        "Absolutely. Set up auto-forwarding in Gmail or Outlook to send specific emails to your Parsli inbox. You can also connect directly via Zapier or Make for more control.",
    },
    {
      question: "How quickly are emails processed?",
      answer:
        "Emails are typically processed within seconds of being received. For emails with large attachments, processing may take slightly longer due to OCR and extraction.",
    },
    {
      question: "Can Parsli handle HTML emails with complex formatting?",
      answer:
        "Yes. Parsli's parser understands HTML email structure and extracts data from tables, formatted sections, and embedded content. It strips styling to find the structured data underneath.",
    },
  ],
};
