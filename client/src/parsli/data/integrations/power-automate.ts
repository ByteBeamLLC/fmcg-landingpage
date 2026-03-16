import {
  Plug,
  Settings,
  Zap,
  FileText,
  Workflow,
  Building2,
  Shield,
  GitBranch,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const powerAutomateData: IntegrationPageData = {
  slug: "power-automate",
  seo: {
    title: "Parsli + Power Automate Integration | Microsoft Flow Document Extraction",
    description:
      "Add AI document extraction to your Power Automate flows. Parsli\u2019s connector lets you parse invoices, forms, and documents within the Microsoft Power Platform.",
    keywords:
      "Power Automate integration, Microsoft Flow OCR, Power Automate document extraction, Parsli connector Power Platform, automate document parsing Microsoft, Power Automate invoice processing",
  },
  hero: {
    integrationName: "Power Automate",
    integrationLogo: "\u{1F50C}",
    headline: "Add Document Extraction to Your Power Automate Flows",
    subheadline:
      "Parsli\u2019s custom connector for Power Automate brings AI-powered document extraction into the Microsoft ecosystem\u2014parse invoices, receipts, and forms within your existing flows.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Import the Parsli Connector",
      description:
        "Install the Parsli custom connector from the Power Automate connector gallery or import it manually using the provided OpenAPI definition.",
      icon: Plug,
    },
    {
      step: "2",
      title: "Authenticate with API Key",
      description:
        "Enter your Parsli API key in the connector\u2019s connection settings. Power Automate encrypts and manages the credential securely.",
      icon: Shield,
    },
    {
      step: "3",
      title: "Add Parsli to Your Flow",
      description:
        "Insert the Parsli action into any flow. Pass a document from a trigger (email, SharePoint, Forms) and configure which fields to extract.",
      icon: Workflow,
    },
    {
      step: "4",
      title: "Map Outputs & Activate",
      description:
        "Map Parsli\u2019s extracted fields to downstream actions\u2014Dynamics 365, Excel, SharePoint lists\u2014then save and activate your flow.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: Building2,
      title: "Native Microsoft Ecosystem Fit",
      description:
        "Parsli\u2019s connector works seamlessly with SharePoint, Dynamics 365, Teams, Outlook, and every other Microsoft 365 service within Power Automate.",
      benefit: "No context-switching\u2014document extraction lives inside your Microsoft stack.",
    },
    {
      icon: GitBranch,
      title: "Conditional Flow Logic",
      description:
        "Use Power Automate\u2019s conditions, switches, and parallel branches to route extraction results based on document type, amounts, or confidence scores.",
      benefit: "Build sophisticated approval and routing workflows natively.",
    },
    {
      icon: FileText,
      title: "SharePoint & OneDrive Triggers",
      description:
        "Trigger extraction automatically when a new file is uploaded to a SharePoint document library or OneDrive folder.",
      benefit: "Zero-touch processing for documents saved to your company\u2019s file shares.",
    },
    {
      icon: Shield,
      title: "Enterprise Governance",
      description:
        "Parsli\u2019s connector respects Power Platform DLP policies, environment isolation, and Azure AD conditional access for enterprise compliance.",
      benefit: "Deploy with confidence in regulated environments.",
    },
    {
      icon: Workflow,
      title: "Approval Workflow Integration",
      description:
        "Combine extraction with Power Automate\u2019s built-in approval actions. Route parsed invoices for manager sign-off directly in Teams or Outlook.",
      benefit: "End-to-end document processing from intake to approval.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "SharePoint Invoice Processing",
      description:
        "Trigger a flow when invoices are uploaded to SharePoint, extract key data with Parsli, and create records in Dynamics 365 for AP processing.",
      slug: "invoice-parsing",
    },
    {
      title: "Email Attachment to Excel Automation",
      description:
        "Capture Outlook email attachments in a Power Automate flow, extract data with Parsli, and write results to an Excel workbook on SharePoint.",
      slug: "email-to-spreadsheet",
    },
    {
      title: "Order Document Processing",
      description:
        "Parse purchase orders from email or SharePoint, extract order details, and push them into Dynamics 365 or your ERP system automatically.",
      slug: "order-processing",
    },
  ],
  faq: [
    {
      question: "Is the Parsli connector a premium Power Automate connector?",
      answer:
        "Yes, the Parsli connector is classified as a premium custom connector. You will need a Power Automate plan that supports premium connectors (per-user or per-flow plan).",
    },
    {
      question: "Can I use Parsli with Power Automate Desktop (RPA)?",
      answer:
        "Yes. You can call the Parsli connector from cloud flows triggered by Power Automate Desktop, combining RPA desktop actions with AI document extraction.",
    },
    {
      question: "Does Parsli work with Power Apps as well?",
      answer:
        "Yes. Since the Parsli connector is available in the Power Platform, you can call it from Power Apps canvas apps and model-driven apps too.",
    },
    {
      question: "How does Parsli handle large files in Power Automate?",
      answer:
        "Power Automate\u2019s chunked transfer support allows files up to 25 MB to be passed to Parsli. For very large files, upload to SharePoint or OneDrive first and pass the file reference.",
    },
    {
      question: "Can I use Parsli in Power Automate solutions for ALM?",
      answer:
        "Yes. The Parsli connector and its connections can be included in Power Platform solutions for environment-to-environment deployment using ALM best practices.",
    },
  ],
};
