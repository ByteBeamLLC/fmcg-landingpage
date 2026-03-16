import {
  Brain, Mail, FileText, Zap, Code, Shield, Globe, BarChart3,
  Layers, Eye, RefreshCw, Webhook, Database, Lock, Clock, Users
} from "lucide-react";
import type { ParsliFeature } from "./types";

export const CORE_FEATURES: ParsliFeature[] = [
  {
    icon: Brain,
    title: "AI-Powered Extraction",
    description: "Machine learning models automatically detect and extract data fields from any document layout — no templates needed.",
    benefit: "99.5% accuracy",
  },
  {
    icon: Mail,
    title: "Email Parsing",
    description: "Forward emails to your Parsli inbox and automatically extract structured data from the body and attachments.",
    benefit: "Hands-free automation",
  },
  {
    icon: FileText,
    title: "PDF & Document Parsing",
    description: "Parse native PDFs, scanned documents, images, and spreadsheets with built-in OCR and layout detection.",
    benefit: "50+ formats supported",
  },
  {
    icon: Eye,
    title: "Template-Based Parsing",
    description: "Create reusable parsing templates with point-and-click field selection for consistent document types.",
    benefit: "One-time setup",
  },
  {
    icon: Layers,
    title: "Multi-Page Documents",
    description: "Handle multi-page invoices, contracts, and reports. Parsli intelligently groups pages and extracts across them.",
    benefit: "No page limits",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Documents are parsed in seconds, not minutes. Get extracted data instantly via webhooks or integrations.",
    benefit: "< 5 second average",
  },
  {
    icon: Code,
    title: "REST API",
    description: "Full-featured API with SDKs for Python, Node.js, and cURL. Integrate parsing into any application or workflow.",
    benefit: "Developer-friendly",
  },
  {
    icon: Webhook,
    title: "Webhooks & Integrations",
    description: "Send extracted data to 5,000+ apps via Zapier, Make, Power Automate, or direct webhooks.",
    benefit: "5,000+ app connections",
  },
  {
    icon: RefreshCw,
    title: "Auto-Learning",
    description: "Parsli improves accuracy over time by learning from your corrections. Train once, parse forever.",
    benefit: "Gets smarter over time",
  },
  {
    icon: Database,
    title: "Structured Data Output",
    description: "Export parsed data as JSON, CSV, Excel, or push directly to databases and spreadsheets.",
    benefit: "Flexible output",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant, GDPR-ready, end-to-end encryption. Your documents never leave your control.",
    benefit: "Bank-grade security",
  },
  {
    icon: Globe,
    title: "Multi-Language OCR",
    description: "Extract text from documents in 100+ languages including Arabic, Chinese, Japanese, and Korean.",
    benefit: "100+ languages",
  },
];

export const INTEGRATION_CATEGORIES = [
  {
    category: "Email Input",
    items: [
      { name: "Gmail", slug: "gmail", logo: "📧" },
      { name: "Outlook", slug: "outlook", logo: "📬" },
    ],
  },
  {
    category: "Cloud Storage",
    items: [
      { name: "Google Drive", slug: "google-drive", logo: "📁" },
      { name: "Dropbox", slug: "dropbox", logo: "📦" },
    ],
  },
  {
    category: "Automation",
    items: [
      { name: "Zapier", slug: "zapier", logo: "⚡" },
      { name: "Make", slug: "make", logo: "🔄" },
      { name: "Power Automate", slug: "power-automate", logo: "🔌" },
    ],
  },
  {
    category: "Spreadsheets",
    items: [
      { name: "Google Sheets", slug: "google-sheets", logo: "📊" },
      { name: "Excel / Microsoft 365", slug: "excel", logo: "📈" },
    ],
  },
  {
    category: "Communication",
    items: [
      { name: "Slack", slug: "slack", logo: "💬" },
    ],
  },
  {
    category: "Developer",
    items: [
      { name: "REST API", slug: "rest-api", logo: "🔗" },
      { name: "Webhooks", slug: "webhooks", logo: "🪝" },
    ],
  },
];
