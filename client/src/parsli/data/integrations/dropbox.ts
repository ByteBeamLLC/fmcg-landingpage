import {
  Package,
  Settings,
  Zap,
  FileText,
  Eye,
  FolderOpen,
  Clock,
  Users,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const dropboxData: IntegrationPageData = {
  slug: "dropbox",
  seo: {
    title: "Parsli + Dropbox Integration | Auto-Extract Data from Dropbox Files",
    description:
      "Connect Parsli to Dropbox and automatically extract structured data from documents saved to your folders. Invoices, receipts, contracts\u2014parsed on upload.",
    keywords:
      "Dropbox integration, extract data Dropbox, Dropbox OCR, Dropbox document automation, auto-parse Dropbox files, Dropbox to data pipeline, cloud storage extraction",
  },
  hero: {
    integrationName: "Dropbox",
    integrationLogo: "\u{1F4E6}",
    headline: "Turn Your Dropbox Into an Intelligent Document Parser",
    subheadline:
      "Parsli monitors your Dropbox folders and automatically extracts structured data from every new file\u2014transforming passive cloud storage into an active data pipeline.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Connect Dropbox",
      description:
        "Sign in with your Dropbox account and authorize Parsli via OAuth 2.0. We request only the folder-level permissions needed to read your documents.",
      icon: Package,
    },
    {
      step: "2",
      title: "Select Folders to Watch",
      description:
        "Choose the Dropbox folders Parsli should monitor. You can select multiple folders across personal and Dropbox Business namespaces.",
      icon: FolderOpen,
    },
    {
      step: "3",
      title: "Configure Extraction Settings",
      description:
        "Pick a document template (invoices, receipts, contracts) or define custom fields. Set file-type filters to target only PDFs, images, or both.",
      icon: Settings,
    },
    {
      step: "4",
      title: "Activate & Extract",
      description:
        "Turn on the integration. From now on, every qualifying file added to your watched folders is automatically extracted and the data delivered to your chosen destination.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: Eye,
      title: "Automatic Folder Monitoring",
      description:
        "Parsli watches your designated Dropbox folders via webhooks and triggers extraction the moment a new file is detected.",
      benefit: "No manual uploads\u2014just save files to Dropbox and data appears.",
    },
    {
      icon: Users,
      title: "Dropbox Business & Teams Support",
      description:
        "Works with Dropbox Personal, Business, and team folders. Admins can connect team-wide folders for centralized document processing.",
      benefit: "Scale extraction across your entire organization effortlessly.",
    },
    {
      icon: FileText,
      title: "Multi-Format Processing",
      description:
        "Extract data from PDFs, scanned images (PNG, JPG, TIFF), and even Word documents stored in Dropbox. Parsli handles them all.",
      benefit: "No need to convert files before saving them to Dropbox.",
    },
    {
      icon: Clock,
      title: "Real-Time Webhook Detection",
      description:
        "Dropbox sends Parsli a webhook notification within seconds of a new file upload, ensuring near-instant extraction initiation.",
      benefit: "Minimal latency between file save and data availability.",
    },
    {
      icon: FolderOpen,
      title: "Post-Processing File Management",
      description:
        "After extraction, Parsli can move processed files to a \u201Ccompleted\u201D folder, rename them with extracted data, or leave them in place.",
      benefit: "Keep your Dropbox organized with automated file housekeeping.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Receipt Scanning & Expense Tracking",
      description:
        "Snap photos of receipts and save them to a Dropbox folder. Parsli extracts amounts, vendors, and dates for automated expense reporting.",
      slug: "receipt-parsing",
    },
    {
      title: "Contract Data Extraction",
      description:
        "Upload signed contracts to Dropbox and automatically extract party names, effective dates, terms, and key clauses for contract management.",
      slug: "contract-extraction",
    },
    {
      title: "Logistics Document Processing",
      description:
        "Save shipping manifests and bills of lading to a shared Dropbox folder for automatic extraction of tracking numbers, weights, and destinations.",
      slug: "logistics-shipping",
    },
  ],
  faq: [
    {
      question: "Can Parsli access Dropbox folders shared with me by others?",
      answer:
        "Yes. As long as you have read access to a shared folder, Parsli can monitor it for new files. The folder owner does not need a Parsli account.",
    },
    {
      question: "What happens if I overwrite a file in a watched folder?",
      answer:
        "Parsli detects file modifications and can re-extract the updated document. You can configure whether overwrites trigger re-extraction or are ignored.",
    },
    {
      question: "Does Parsli work with Dropbox Paper or Dropbox Replay?",
      answer:
        "Currently Parsli processes standard file types (PDF, images, DOCX) stored in Dropbox. Dropbox Paper and Replay formats are not supported at this time.",
    },
    {
      question: "Can I process files already in Dropbox when I first connect?",
      answer:
        "Yes. Parsli offers a backfill option during setup that processes all existing files in your selected folders, not just newly added ones.",
    },
  ],
};
