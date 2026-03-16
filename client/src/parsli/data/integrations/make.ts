import {
  RefreshCw,
  Settings,
  GitBranch,
  FileText,
  Layers,
  Clock,
  Workflow,
  Eye,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const makeData: IntegrationPageData = {
  slug: "make",
  seo: {
    title: "Parsli + Make (Integromat) Integration | Visual Document Extraction Workflows",
    description:
      "Build visual automation scenarios in Make that extract data from documents with Parsli. Connect to hundreds of apps with drag-and-drop simplicity.",
    keywords:
      "Make integration, Integromat document extraction, Make automation OCR, visual workflow document parsing, Make scenario Parsli, no-code extraction Make",
  },
  hero: {
    integrationName: "Make (Integromat)",
    integrationLogo: "\u{1F504}",
    headline: "Build Visual Document Extraction Workflows with Make",
    subheadline:
      "Combine Parsli\u2019s AI-powered extraction with Make\u2019s visual scenario builder to create sophisticated, multi-step document processing pipelines\u2014no coding required.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Add the Parsli Module",
      description:
        "Open Make\u2019s scenario editor and search for the Parsli module. Drag it onto your canvas to start building your extraction workflow.",
      icon: Workflow,
    },
    {
      step: "2",
      title: "Connect Your Parsli Account",
      description:
        "Paste your Parsli API key into the connection dialog. Make encrypts and stores it securely for all future scenarios.",
      icon: Settings,
    },
    {
      step: "3",
      title: "Design Your Scenario",
      description:
        "Wire Parsli between a trigger (e.g., new file in Google Drive) and an action (e.g., add row in Airtable). Use Make\u2019s routers and filters for conditional logic.",
      icon: GitBranch,
    },
    {
      step: "4",
      title: "Schedule & Activate",
      description:
        "Set your scenario to run on a schedule or in real time, then activate it. Make handles retries and error notifications automatically.",
      icon: Clock,
    },
  ],
  features: [
    {
      icon: Eye,
      title: "Visual Scenario Builder",
      description:
        "Make\u2019s drag-and-drop canvas lets you see your entire document workflow at a glance\u2014from file ingestion through extraction to data delivery.",
      benefit: "Understand and modify complex pipelines without reading code.",
    },
    {
      icon: GitBranch,
      title: "Conditional Routing",
      description:
        "Use Make\u2019s routers to send extraction results down different paths based on document type, extracted values, or confidence scores.",
      benefit: "Handle invoices, receipts, and POs in a single scenario with branching logic.",
    },
    {
      icon: Layers,
      title: "Hundreds of App Modules",
      description:
        "Connect Parsli output to Make\u2019s extensive module library: Google Workspace, Slack, Airtable, Shopify, Stripe, and many more.",
      benefit: "Build end-to-end workflows without leaving Make\u2019s visual editor.",
    },
    {
      icon: RefreshCw,
      title: "Built-In Error Handling",
      description:
        "Make provides automatic retries, error routes, and break/resume modules so your extraction pipeline recovers gracefully from transient failures.",
      benefit: "Production-grade reliability without custom retry logic.",
    },
    {
      icon: FileText,
      title: "Data Mapping & Transformation",
      description:
        "Use Make\u2019s built-in functions to format, calculate, and transform Parsli\u2019s extracted fields before sending them downstream.",
      benefit: "Clean and normalize data within the same workflow.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Invoice Extraction Pipeline",
      description:
        "Trigger on new invoices arriving in email or cloud storage, extract line items and totals with Parsli, and push results into your ERP or accounting tool.",
      slug: "invoice-parsing",
    },
    {
      title: "Resume Screening Automation",
      description:
        "Parse resumes uploaded to a shared folder, extract candidate details, and create records in your ATS or HR platform automatically.",
      slug: "resume-parsing",
    },
    {
      title: "Order Processing Workflow",
      description:
        "Extract purchase order data from emailed documents and route it into your order management system with Make\u2019s conditional logic.",
      slug: "order-processing",
    },
  ],
  faq: [
    {
      question: "What is the difference between Make and Zapier for Parsli?",
      answer:
        "Both connect Parsli to thousands of apps. Make excels at complex, multi-branch scenarios with visual debugging, while Zapier is simpler for linear, two-step automations. Choose based on your workflow complexity.",
    },
    {
      question: "Does Parsli support Make\u2019s instant triggers?",
      answer:
        "Yes. Parsli can send webhook notifications to Make immediately after extraction completes, enabling true instant-trigger scenarios.",
    },
    {
      question: "Can I process batches of documents in a single Make scenario?",
      answer:
        "Absolutely. Use Make\u2019s iterator module to loop through multiple files and pass each one to Parsli for extraction within the same scenario execution.",
    },
    {
      question: "Is the Parsli Make module included in my Parsli plan?",
      answer:
        "Yes, the Make module is available on all Parsli plans at no extra cost. You only need a Make plan that covers your desired operations quota.",
    },
  ],
};
