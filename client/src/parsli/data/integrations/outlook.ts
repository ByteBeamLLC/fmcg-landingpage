import {
  Mail,
  Settings,
  Zap,
  FileText,
  Filter,
  Clock,
  Shield,
  Building2,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const outlookData: IntegrationPageData = {
  slug: "outlook",
  seo: {
    title: "Parsli + Outlook Integration | Extract Data from Outlook Email Attachments",
    description:
      "Connect Parsli to Microsoft Outlook and automatically parse invoices, receipts, and documents from your inbox. Seamless Microsoft 365 integration.",
    keywords:
      "Outlook integration, Microsoft 365 document extraction, Outlook attachment parser, email OCR Outlook, Outlook automation, Office 365 inbox parsing",
  },
  hero: {
    integrationName: "Outlook",
    integrationLogo: "\u{1F4EC}",
    headline: "Parse Documents from Your Outlook Inbox Automatically",
    subheadline:
      "Parsli connects natively with Microsoft Outlook and Microsoft 365 to capture, extract, and structure data from every attachment that hits your inbox.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Authenticate with Microsoft 365",
      description:
        "Sign in with your Microsoft account and grant Parsli read-only access to your Outlook mailbox via Microsoft\u2019s secure OAuth flow.",
      icon: Shield,
    },
    {
      step: "2",
      title: "Define Mailbox Rules",
      description:
        "Specify which folders, senders, or subject patterns Parsli should monitor. Focus extraction on the emails that matter most.",
      icon: Filter,
    },
    {
      step: "3",
      title: "Select Document Templates",
      description:
        "Pick from pre-built extraction templates for invoices, receipts, POs, or create a custom schema for your unique document types.",
      icon: Settings,
    },
    {
      step: "4",
      title: "Go Live",
      description:
        "Enable the integration and Parsli begins processing attachments immediately, delivering structured data to your chosen destination.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: Building2,
      title: "Enterprise Microsoft 365 Support",
      description:
        "Works with personal Outlook.com accounts, Microsoft 365 Business, and Enterprise tenants with full admin-consent support.",
      benefit: "Deploy across your entire organization with a single admin approval.",
    },
    {
      icon: Clock,
      title: "Near-Instant Processing",
      description:
        "New attachments are detected and processed within seconds using Microsoft Graph API webhooks for push-based notifications.",
      benefit: "No polling delays\u2014data is extracted as fast as emails arrive.",
    },
    {
      icon: FileText,
      title: "Shared Mailbox Support",
      description:
        "Monitor shared and group mailboxes so your team can funnel all vendor invoices or customer documents to a single extraction pipeline.",
      benefit: "Centralize document intake without changing existing email workflows.",
    },
    {
      icon: Filter,
      title: "Folder & Category Targeting",
      description:
        "Limit extraction to specific Outlook folders or color categories. Combine with sender rules for precise document targeting.",
      benefit: "Only process the documents you need\u2014nothing more.",
    },
    {
      icon: Shield,
      title: "Compliance-Ready Security",
      description:
        "All data is encrypted in transit and at rest. Parsli supports Microsoft Conditional Access policies and never stores email content.",
      benefit: "Meet SOC 2 and GDPR requirements out of the box.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Automated Invoice Processing",
      description:
        "Extract vendor names, amounts, due dates, and line items from invoices arriving in your Outlook inbox for instant AP processing.",
      slug: "invoice-parsing",
    },
    {
      title: "Order Confirmation Parsing",
      description:
        "Capture order details from confirmation emails and attachments, feeding structured data into your ERP or order management system.",
      slug: "order-processing",
    },
    {
      title: "Email Data to Spreadsheet",
      description:
        "Push extracted attachment data directly into Excel Online or Google Sheets for consolidated reporting and dashboards.",
      slug: "email-to-spreadsheet",
    },
  ],
  faq: [
    {
      question: "Does Parsli work with Outlook on-premise (Exchange Server)?",
      answer:
        "Currently Parsli integrates with cloud-hosted Microsoft 365 / Outlook.com accounts via Microsoft Graph API. On-premise Exchange support is on our roadmap.",
    },
    {
      question: "Can I connect a shared mailbox instead of my personal account?",
      answer:
        "Yes. You can connect shared mailboxes and delegate mailboxes. An admin can authorize access for the entire organization via a single consent flow.",
    },
    {
      question: "What permissions does Parsli request?",
      answer:
        "Parsli requests Mail.Read and Mail.ReadBasic permissions. We never request send or delete permissions and never modify your emails.",
    },
    {
      question: "How does Parsli handle large attachments?",
      answer:
        "Parsli can process attachments up to 25 MB per file. For larger files, we recommend uploading them directly via the Parsli dashboard or API.",
    },
    {
      question: "Will this slow down my Outlook?",
      answer:
        "Not at all. Parsli operates server-side through Microsoft Graph API. It does not install any add-in or plugin in your Outlook client.",
    },
  ],
};
