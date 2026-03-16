import { Brain, FileText, Globe, Zap } from "lucide-react";
import type { ComparisonPageData } from "../types";

export const vsMailparser: ComparisonPageData = {
  slug: "mailparser",
  competitorName: "Mailparser",
  seo: {
    title: "Parsli vs Mailparser: Email Parsing Comparison (2026) | Parsli",
    description:
      "Compare Parsli and Mailparser for email data extraction. See why Parsli offers better AI accuracy, document parsing, and more flexible pricing.",
    keywords:
      "Parsli vs Mailparser, Mailparser alternative, email parsing comparison, email data extraction, Mailparser competitor",
  },
  hero: {
    headline: "Parsli vs Mailparser: Beyond Email Parsing",
    subheadline:
      "Mailparser focuses on email extraction. Parsli does emails and every other document type, with AI-powered accuracy and better pricing.",
  },
  comparisonTable: {
    categories: [
      {
        name: "Core Features",
        features: [
          { name: "Email Body Parsing", parsli: true, competitor: true },
          {
            name: "Email Attachment Parsing",
            parsli: true,
            competitor: true,
          },
          {
            name: "PDF Document Parsing",
            parsli: "Full AI + template parsing",
            competitor: "Basic attachment extraction",
            highlight: true,
          },
          {
            name: "Image / Scan OCR",
            parsli: true,
            competitor: false,
            highlight: true,
          },
          {
            name: "Spreadsheet Parsing",
            parsli: true,
            competitor: false,
            highlight: true,
          },
        ],
      },
      {
        name: "AI & Accuracy",
        features: [
          {
            name: "AI-Powered Extraction",
            parsli: "Advanced ML models",
            competitor: "Rule-based parsing",
            highlight: true,
          },
          {
            name: "Auto-Learning",
            parsli: true,
            competitor: false,
            highlight: true,
          },
          {
            name: "Custom Parsing Rules",
            parsli: true,
            competitor: true,
          },
          {
            name: "Multi-Language Support",
            parsli: "100+ languages",
            competitor: "English-focused",
            highlight: true,
          },
        ],
      },
      {
        name: "Integrations",
        features: [
          { name: "Zapier", parsli: true, competitor: true },
          { name: "Google Sheets", parsli: true, competitor: true },
          {
            name: "Make (Integromat)",
            parsli: true,
            competitor: true,
          },
          {
            name: "REST API with SDKs",
            parsli: "Full API + Python/Node SDKs",
            competitor: "Basic API",
            highlight: true,
          },
          {
            name: "Power Automate",
            parsli: true,
            competitor: false,
            highlight: true,
          },
        ],
      },
      {
        name: "Pricing & Support",
        features: [
          {
            name: "Free Tier",
            parsli: "26 pages/month",
            competitor: "30 emails/month",
          },
          {
            name: "Mid-Tier Plan",
            parsli: "$89/mo for 390 pages",
            competitor: "$84/mo for 500 emails",
          },
          {
            name: "Enterprise Features",
            parsli: "SOC 2, SSO, SLA",
            competitor: "Limited enterprise options",
            highlight: true,
          },
          {
            name: "Dedicated Support",
            parsli: "Professional tier and above",
            competitor: "Enterprise only",
            highlight: true,
          },
        ],
      },
    ],
  },
  pricingComparison: {
    tiers: [
      {
        name: "Free",
        parsliPrice: "$0/mo",
        parsliQuota: "26 pages/month",
        competitorPrice: "$0/mo",
        competitorQuota: "30 emails/month",
      },
      {
        name: "Starter",
        parsliPrice: "$49/mo",
        parsliQuota: "130 pages/month",
        competitorPrice: "$33/mo",
        competitorQuota: "100 emails/month",
      },
      {
        name: "Growth",
        parsliPrice: "$89/mo",
        parsliQuota: "390 pages/month",
        competitorPrice: "$84/mo",
        competitorQuota: "500 emails/month",
      },
      {
        name: "Business",
        parsliPrice: "$129/mo",
        parsliQuota: "1,300 pages/month",
        competitorPrice: "$166/mo",
        competitorQuota: "1,000 emails/month",
      },
      {
        name: "Professional",
        parsliPrice: "$269/mo",
        parsliQuota: "3,900 pages/month",
        competitorPrice: "$333/mo",
        competitorQuota: "2,500 emails/month",
      },
      {
        name: "Scale",
        parsliPrice: "$499/mo",
        parsliQuota: "13,000 pages/month",
        competitorPrice: "$833/mo",
        competitorQuota: "10,000 emails/month",
      },
    ],
  },
  advantages: [
    {
      icon: FileText,
      title: "Parse Any Document, Not Just Emails",
      description:
        "Mailparser only handles emails. Parsli extracts data from emails, PDFs, images, spreadsheets, scanned documents, and more -- all in one platform.",
    },
    {
      icon: Brain,
      title: "AI-Powered vs Rule-Based",
      description:
        "Parsli uses AI models to understand document context and extract fields intelligently. Mailparser relies on manual rule creation that breaks when email formats change.",
    },
    {
      icon: Globe,
      title: "Global Language Support",
      description:
        "Parsli supports 100+ languages with built-in OCR. Mailparser is primarily designed for English-language emails and has limited multilingual capabilities.",
    },
    {
      icon: Zap,
      title: "Lower Cost at Scale",
      description:
        "At 10,000 documents per month, Parsli costs $499 versus Mailparser's $833. The savings grow as your volume increases.",
    },
  ],
  faq: [
    {
      question: "Can Parsli replace Mailparser for email parsing?",
      answer:
        "Yes. Parsli includes full email parsing capabilities -- forward emails to your Parsli inbox and extract structured data from both the email body and attachments. You get everything Mailparser offers plus PDF, image, and spreadsheet parsing.",
    },
    {
      question: "Is Mailparser cheaper than Parsli for email-only use?",
      answer:
        "At lower volumes, Mailparser's email-only pricing may be slightly lower. However, Parsli becomes more cost-effective at 1,000+ documents per month and offers significantly more functionality per dollar.",
    },
    {
      question: "Does Parsli support the same email providers as Mailparser?",
      answer:
        "Yes. Parsli works with Gmail, Outlook, Yahoo, and any email provider that supports forwarding. You can also connect via IMAP or directly through the Zapier and Make integrations.",
    },
    {
      question: "How does extraction accuracy compare?",
      answer:
        "Parsli achieves 99.5% extraction accuracy using AI models that understand document context. Mailparser uses rule-based extraction that requires manual configuration and can break when email formats change.",
    },
    {
      question:
        "Can Parsli handle attachments the same way Mailparser does?",
      answer:
        "Parsli goes further than Mailparser with attachments. It can parse PDF invoices, scanned receipts, images, and spreadsheets attached to emails using AI and OCR, not just extract attachment metadata.",
    },
    {
      question: "What if I only need email parsing -- is Parsli overkill?",
      answer:
        "Not at all. Many customers use Parsli exclusively for email parsing. The AI-powered extraction actually makes email parsing easier since you do not need to write complex rules. You only pay for what you use.",
    },
  ],
};
