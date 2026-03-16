import { DollarSign, FileText, Zap, Globe } from "lucide-react";
import type { ComparisonPageData } from "../types";

export const vsVeryfi: ComparisonPageData = {
  slug: "veryfi",
  competitorName: "Veryfi",
  seo: {
    title: "Parsli vs Veryfi: OCR & Data Extraction Compared (2026) | Parsli",
    description:
      "Compare Parsli and Veryfi for receipt and document OCR. Learn how Parsli offers broader document support, better no-code tools, and more flexible pricing.",
    keywords:
      "Parsli vs Veryfi, Veryfi alternative, receipt OCR comparison, document extraction API, Veryfi competitor",
  },
  hero: {
    headline: "Parsli vs Veryfi: Complete Parsing, Not Just OCR",
    subheadline:
      "Veryfi excels at receipt and expense OCR. Parsli covers receipts plus emails, invoices, contracts, forms, and more -- with no-code tools and flexible pricing.",
  },
  comparisonTable: {
    categories: [
      {
        name: "Core Features",
        features: [
          { name: "Receipt OCR", parsli: true, competitor: true },
          { name: "Invoice Parsing", parsli: true, competitor: true },
          {
            name: "Email Parsing",
            parsli: "Built-in email inbox",
            competitor: false,
            highlight: true,
          },
          {
            name: "Contract Parsing",
            parsli: true,
            competitor: false,
            highlight: true,
          },
          {
            name: "No-Code Visual Editor",
            parsli: true,
            competitor: "API-only for most features",
            highlight: true,
          },
        ],
      },
      {
        name: "AI & Accuracy",
        features: [
          {
            name: "Receipt Extraction Accuracy",
            parsli: "99.5%",
            competitor: "~96%",
            highlight: true,
          },
          {
            name: "Line-Item Extraction",
            parsli: true,
            competitor: true,
          },
          {
            name: "Auto-Learning",
            parsli: "Learns from corrections",
            competitor: false,
            highlight: true,
          },
          {
            name: "Multi-Language OCR",
            parsli: "100+ languages",
            competitor: "30+ languages",
            highlight: true,
          },
        ],
      },
      {
        name: "Integrations",
        features: [
          {
            name: "No-Code Automation (Zapier/Make)",
            parsli: true,
            competitor: false,
            highlight: true,
          },
          { name: "REST API", parsli: true, competitor: true },
          {
            name: "Mobile SDK",
            parsli: false,
            competitor: true,
          },
          {
            name: "Google Sheets Export",
            parsli: true,
            competitor: false,
            highlight: true,
          },
          { name: "Webhooks", parsli: true, competitor: true },
        ],
      },
      {
        name: "Pricing & Support",
        features: [
          {
            name: "Free Tier",
            parsli: "26 pages/month forever",
            competitor: "Limited free trial",
            highlight: true,
          },
          {
            name: "Pricing Model",
            parsli: "Flat monthly tiers",
            competitor: "Per-document charges",
            highlight: true,
          },
          {
            name: "Non-Developer Friendly",
            parsli: "Full no-code platform",
            competitor: "Developer-focused API",
            highlight: true,
          },
          {
            name: "SOC 2 Compliance",
            parsli: true,
            competitor: true,
          },
        ],
      },
    ],
  },
  pricingComparison: {
    tiers: [
      {
        name: "Free / Trial",
        parsliPrice: "$0/mo",
        parsliQuota: "26 pages/month",
        competitorPrice: "$0",
        competitorQuota: "Limited trial",
      },
      {
        name: "Starter",
        parsliPrice: "$49/mo",
        parsliQuota: "130 pages/month",
        competitorPrice: "~$50/mo",
        competitorQuota: "~200 documents/month",
      },
      {
        name: "Growth",
        parsliPrice: "$89/mo",
        parsliQuota: "390 pages/month",
        competitorPrice: "~$150/mo",
        competitorQuota: "~500 documents/month",
      },
      {
        name: "Business",
        parsliPrice: "$129/mo",
        parsliQuota: "1,300 pages/month",
        competitorPrice: "~$350/mo",
        competitorQuota: "~1,000 documents/month",
      },
      {
        name: "Professional",
        parsliPrice: "$269/mo",
        parsliQuota: "3,900 pages/month",
        competitorPrice: "Custom",
        competitorQuota: "Custom volume",
      },
      {
        name: "Scale",
        parsliPrice: "$499/mo",
        parsliQuota: "13,000 pages/month",
        competitorPrice: "Custom",
        competitorQuota: "Custom volume",
      },
    ],
  },
  advantages: [
    {
      icon: FileText,
      title: "Beyond Receipts and Expenses",
      description:
        "Veryfi specializes in receipt and expense OCR. Parsli handles receipts plus emails, invoices, contracts, forms, bank statements, and spreadsheets in a single platform.",
    },
    {
      icon: Zap,
      title: "No-Code for Everyone",
      description:
        "Parsli offers a full visual editor, email inbox, and no-code integrations. Veryfi is primarily an API product that requires developer resources to implement.",
    },
    {
      icon: DollarSign,
      title: "Predictable Flat-Rate Pricing",
      description:
        "Parsli charges a flat monthly fee with included pages. Veryfi's per-document pricing can be unpredictable and expensive for growing teams.",
    },
    {
      icon: Globe,
      title: "Broader Language & Format Coverage",
      description:
        "Parsli supports 100+ languages and 50+ document formats. Veryfi supports approximately 30 languages and focuses primarily on receipt and invoice formats.",
    },
  ],
  faq: [
    {
      question: "Is Parsli better than Veryfi for receipt scanning?",
      answer:
        "Parsli achieves 99.5% accuracy on receipt extraction with AI-powered line-item recognition. While Veryfi has strong receipt OCR, Parsli matches its accuracy and adds email parsing, no-code tools, and broader document support.",
    },
    {
      question: "Does Veryfi have a mobile SDK that Parsli lacks?",
      answer:
        "Yes, Veryfi offers a mobile SDK for in-app receipt capture. Parsli focuses on server-side processing via email forwarding, file upload, and API. For mobile capture, you can use Parsli's API to upload photos from any mobile app.",
    },
    {
      question: "Which is more cost-effective for growing teams?",
      answer:
        "Parsli is more cost-effective at scale. Its flat monthly pricing means no per-document surprises. At 1,000 documents per month, Parsli costs $129 versus Veryfi's estimated $350.",
    },
    {
      question: "Can non-developers use Parsli?",
      answer:
        "Absolutely. Parsli is designed for non-technical users with a visual template editor, drag-and-drop integrations, and an email inbox for automated parsing. Veryfi is primarily developer-focused with an API-first approach.",
    },
    {
      question: "Does Parsli support expense management workflows?",
      answer:
        "Yes. Parsli can parse receipts and export structured expense data to Google Sheets, Excel, accounting software via Zapier, or your own systems via the API and webhooks.",
    },
    {
      question: "How do the security standards compare?",
      answer:
        "Both Parsli and Veryfi are SOC 2 compliant. Parsli additionally offers GDPR compliance, end-to-end encryption, and configurable data retention policies on all plans.",
    },
  ],
};
