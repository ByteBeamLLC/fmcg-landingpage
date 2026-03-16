import {
  FolderOpen,
  Settings,
  Zap,
  FileText,
  Eye,
  Upload,
  Clock,
  Search,
} from "lucide-react";
import type { IntegrationPageData } from "../types";

export const googleDriveData: IntegrationPageData = {
  slug: "google-drive",
  seo: {
    title: "Parsli + Google Drive Integration | Extract Data from Drive Documents Automatically",
    description:
      "Connect Parsli to Google Drive and automatically extract data from documents uploaded to your folders. PDFs, scanned images, and more\u2014parsed on arrival.",
    keywords:
      "Google Drive integration, extract data Google Drive, Google Drive OCR, auto-parse Drive documents, cloud storage document extraction, Google Drive automation",
  },
  hero: {
    integrationName: "Google Drive",
    integrationLogo: "\u{1F4C1}",
    headline: "Extract Data from Documents the Moment They Hit Google Drive",
    subheadline:
      "Parsli watches your Google Drive folders and automatically extracts structured data from every new document\u2014turning your cloud storage into an intelligent document processing hub.",
  },
  setupSteps: [
    {
      step: "1",
      title: "Connect Google Drive",
      description:
        "Authorize Parsli with your Google account. We use OAuth 2.0 and request only the permissions needed to read files from your selected folders.",
      icon: FolderOpen,
    },
    {
      step: "2",
      title: "Choose Watch Folders",
      description:
        "Select one or more Google Drive folders to monitor. Parsli can watch personal folders, shared drives, or team drives.",
      icon: Eye,
    },
    {
      step: "3",
      title: "Set Extraction Rules",
      description:
        "Define which file types to process and select or customize the extraction template. Filter by file name patterns if needed.",
      icon: Settings,
    },
    {
      step: "4",
      title: "Enable Auto-Processing",
      description:
        "Activate the integration. Every new file added to the watched folder is automatically picked up, extracted, and delivered to your chosen output.",
      icon: Zap,
    },
  ],
  features: [
    {
      icon: Eye,
      title: "Folder Watch Automation",
      description:
        "Parsli monitors your designated Google Drive folders and triggers extraction automatically when new files are uploaded or modified.",
      benefit: "Hands-free processing\u2014just drop files into the folder.",
    },
    {
      icon: Upload,
      title: "Shared Drive & Team Drive Support",
      description:
        "Works with personal drives, shared drives, and Google Workspace team drives so your entire organization can use a single extraction pipeline.",
      benefit: "Centralize document processing across departments.",
    },
    {
      icon: FileText,
      title: "Broad Format Support",
      description:
        "Process PDFs, PNGs, JPGs, TIFFs, and even Google Docs stored in Drive. Parsli handles scanned and native digital documents equally well.",
      benefit: "No file conversion needed before extraction.",
    },
    {
      icon: Clock,
      title: "Near-Instant Detection",
      description:
        "New files are detected within seconds of upload using Google Drive\u2019s push notification API, ensuring minimal latency between upload and extraction.",
      benefit: "Get structured data moments after the document is saved.",
    },
    {
      icon: Search,
      title: "Subfolder Recursive Monitoring",
      description:
        "Optionally monitor all subfolders within a watched directory, so documents organized in nested folder structures are still captured.",
      benefit: "No need to flatten your folder hierarchy for Parsli to work.",
    },
  ],
  useCasesWithIntegration: [
    {
      title: "Invoice Processing Pipeline",
      description:
        "Drop vendor invoices into a Google Drive folder and let Parsli extract amounts, dates, and line items automatically for AP workflows.",
      slug: "invoice-parsing",
    },
    {
      title: "Real Estate Document Parsing",
      description:
        "Upload lease agreements, property listings, or closing documents to Drive and extract key terms, dates, and financial data.",
      slug: "real-estate-docs",
    },
    {
      title: "Logistics & Shipping Docs",
      description:
        "Save bills of lading, packing lists, and shipping manifests to a shared Drive folder for automatic extraction and tracking.",
      slug: "logistics-shipping",
    },
  ],
  faq: [
    {
      question: "Can Parsli watch shared drives I don\u2019t own?",
      answer:
        "Yes, as long as you have read access to the shared drive or folder, Parsli can monitor it for new documents.",
    },
    {
      question: "What happens to the original file after extraction?",
      answer:
        "The original file stays untouched in Google Drive. Optionally, Parsli can move processed files to a \u201CCompleted\u201D folder or add a label to track status.",
    },
    {
      question: "Can I process existing files already in a folder?",
      answer:
        "Yes. When you first connect a folder, Parsli offers a backfill option to process all existing files, not just new uploads.",
    },
    {
      question: "Does Parsli support Google Workspace for Education or Nonprofits?",
      answer:
        "Yes. Parsli works with all Google Workspace editions including Business, Enterprise, Education, and Nonprofits.",
    },
    {
      question: "Is there a file size limit for Google Drive extraction?",
      answer:
        "Parsli can process files up to 25 MB per document. For larger files, we recommend splitting them into smaller sections before uploading.",
    },
  ],
};
