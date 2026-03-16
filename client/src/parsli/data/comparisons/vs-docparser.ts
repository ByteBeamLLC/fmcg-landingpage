import { Brain, Zap, Settings, DollarSign } from "lucide-react";
import type { ComparisonPageData } from "../types";

export const vsDocparser: ComparisonPageData = {
  slug: "docparser",
  competitorName: "Docparser",
  seo: {
    title: "Parsli vs Docparser: Feature Comparison (2026) | Parsli",
    description:
      "Compare Parsli and Docparser for PDF and document parsing. Discover why teams switch to Parsli for AI-powered accuracy, flexible pricing, and modern integrations.",
    keywords:
      "Parsli vs Docparser, Docparser alternative, PDF parser comparison, document extraction tool, Docparser competitor",
  },
  hero: {
    headline: "Parsli vs Docparser: AI-First Document Parsing",
    subheadline:
      "Docparser pioneered zone-based PDF parsing, but Parsli takes it further with AI extraction, auto-learning, and 30% more pages per dollar.",
  },
  comparisonTable: {
    categories: [
      {
        name: "Core Features",
        features: [
          { name: "PDF Parsing", parsli: true, competitor: true },
          {
            name: "Email Parsing",
            parsli: "Full email + attachment parsing",
            competitor: "Attachment-only parsing",
            highlight: true,
          },
          {
            name: "Image / Scan Parsing",
            parsli: "Advanced OCR with AI",
            competitor: "Basic OCR",
            highlight: true,
          },
          {
            name: "Table Extraction",
            parsli: "AI-powered dynamic tables",
            competitor: "Zone-based static tables",
            highlight: true,
          },
        ],
      },
      {
        name: "AI & Accuracy",
        features: [
          {
            name: "AI-Powered Field Detection",
            parsli: true,
            competitor: false,
            highlight: true,
          },
          {
            name: "Template / Zone Parsing",
            parsli: true,
            competitor: true,
          },
          {
            name: "Auto-Learning",
            parsli: "Learns from corrections",
            competitor: "Manual rule updates only",
            highlight: true,
          },
          {
            name: "Extraction Accuracy",
            parsli: "99.5%",
            competitor: "~95% on structured PDFs",
            highlight: true,
          },
        ],
      },
      {
        name: "Integrations",
        features: [
          { name: "Zapier", parsli: true, competitor: true },
          {
            name: "Make (Integromat)",
            parsli: true,
            competitor: false,
            highlight: true,
          },
          {
            name: "Google Sheets Export",
            parsli: true,
            competitor: true,
          },
          {
            name: "REST API with SDKs",
            parsli: "Python, Node.js, cURL",
            competitor: "REST API only",
            highlight: true,
          },
          { name: "Webhooks", parsli: true, competitor: true },
        ],
      },
      {
        name: "Pricing & Support",
        features: [
          {
            name: "Free Tier Available",
            parsli: "26 pages/month free",
            competitor: "14-day trial only",
            highlight: true,
          },
          {
            name: "Starter Plan",
            parsli: "$49/mo for 130 pages",
            competitor: "$39/mo for 100 pages",
          },
          {
            name: "Dedicated Support",
            parsli: "Professional tier and above",
            competitor: "Enterprise only",
            highlight: true,
          },
          {
            name: "SOC 2 Compliance",
            parsli: true,
            competitor: false,
            highlight: true,
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
        competitorPrice: "Free trial",
        competitorQuota: "14 days only",
      },
      {
        name: "Starter",
        parsliPrice: "$49/mo",
        parsliQuota: "130 pages/month",
        competitorPrice: "$39/mo",
        competitorQuota: "100 pages/month",
      },
      {
        name: "Growth / Professional",
        parsliPrice: "$89/mo",
        parsliQuota: "390 pages/month",
        competitorPrice: "$79/mo",
        competitorQuota: "250 pages/month",
      },
      {
        name: "Business",
        parsliPrice: "$129/mo",
        parsliQuota: "1,300 pages/month",
        competitorPrice: "$149/mo",
        competitorQuota: "500 pages/month",
      },
      {
        name: "Professional / Premium",
        parsliPrice: "$269/mo",
        parsliQuota: "3,900 pages/month",
        competitorPrice: "$299/mo",
        competitorQuota: "1,500 pages/month",
      },
      {
        name: "Scale / Enterprise",
        parsliPrice: "$499/mo",
        parsliQuota: "13,000 pages/month",
        competitorPrice: "Custom",
        competitorQuota: "Custom",
      },
    ],
  },
  advantages: [
    {
      icon: Brain,
      title: "AI-First Extraction",
      description:
        "Unlike Docparser's rigid zone-based approach, Parsli uses AI to understand document layouts automatically. No manual zone drawing needed for most documents.",
    },
    {
      icon: Zap,
      title: "Better Value Per Page",
      description:
        "Parsli's Business plan delivers 1,300 pages for $129/mo, while Docparser charges $149/mo for only 500 pages. That is over 5x better page-per-dollar value.",
    },
    {
      icon: Settings,
      title: "Modern Integration Ecosystem",
      description:
        "Parsli supports Make, Power Automate, Slack, and direct database export in addition to Zapier. Docparser's integration options are more limited.",
    },
    {
      icon: DollarSign,
      title: "Permanent Free Tier",
      description:
        "Parsli offers a permanent free plan with 26 pages per month. Docparser only provides a 14-day free trial, then requires a paid subscription.",
    },
  ],
  faq: [
    {
      question: "How does Parsli differ from Docparser?",
      answer:
        "Docparser uses a zone-based approach where you manually define extraction areas on PDFs. Parsli combines AI-powered extraction with template parsing, so it can handle both structured and unstructured documents without manual zone setup.",
    },
    {
      question: "Is Parsli more expensive than Docparser?",
      answer:
        "Parsli offers significantly more pages per dollar. For example, the Business tier gives you 1,300 pages for $129/mo with Parsli versus 500 pages for $149/mo with Docparser. Parsli also includes a permanent free tier.",
    },
    {
      question: "Can Parsli handle the same document types as Docparser?",
      answer:
        "Yes. Parsli handles all document types that Docparser supports, including PDFs, invoices, purchase orders, and forms. Parsli also adds email body parsing, spreadsheet extraction, and scanned document OCR.",
    },
    {
      question: "Does Parsli support zone-based parsing like Docparser?",
      answer:
        "Yes. Parsli offers a visual template editor where you can define extraction zones, similar to Docparser. However, most users find the AI extraction mode faster and more accurate, eliminating the need for manual zones.",
    },
    {
      question: "How easy is it to switch from Docparser to Parsli?",
      answer:
        "Parsli provides migration assistance and a guided setup process. Most teams complete their migration within a day, and the Parsli support team is available to help transfer your parsing rules.",
    },
  ],
};
