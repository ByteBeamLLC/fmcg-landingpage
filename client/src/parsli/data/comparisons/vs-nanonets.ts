import { DollarSign, Clock, Users, Shield } from "lucide-react";
import type { ComparisonPageData } from "../types";

export const vsNanonets: ComparisonPageData = {
  slug: "nanonets",
  competitorName: "Nanonets",
  seo: {
    title: "Parsli vs Nanonets: AI Document Parsing Compared (2026) | Parsli",
    description:
      "Compare Parsli and Nanonets for intelligent document processing. Learn how Parsli delivers better pricing, faster setup, and enterprise-ready security.",
    keywords:
      "Parsli vs Nanonets, Nanonets alternative, AI document processing, intelligent document parsing, Nanonets competitor",
  },
  hero: {
    headline: "Parsli vs Nanonets: Smarter IDP, Better Pricing",
    subheadline:
      "Both platforms use AI for document extraction, but Parsli offers transparent pricing, faster time-to-value, and no hidden per-page fees.",
  },
  comparisonTable: {
    categories: [
      {
        name: "Core Features",
        features: [
          { name: "AI Document Extraction", parsli: true, competitor: true },
          {
            name: "Email Parsing",
            parsli: "Built-in email inbox",
            competitor: "Requires API integration",
            highlight: true,
          },
          { name: "OCR for Scanned Documents", parsli: true, competitor: true },
          {
            name: "No-Code Setup",
            parsli: "Full no-code with visual editor",
            competitor: "Requires some technical setup",
            highlight: true,
          },
          {
            name: "Multi-Page Handling",
            parsli: "Automatic page grouping",
            competitor: "Manual configuration needed",
            highlight: true,
          },
        ],
      },
      {
        name: "AI & Accuracy",
        features: [
          {
            name: "Pre-Trained Models",
            parsli: "Invoices, receipts, forms, contracts",
            competitor: "Invoices, receipts, ID cards",
          },
          {
            name: "Custom Model Training",
            parsli: "Auto-learning from corrections",
            competitor: "Manual training pipeline",
            highlight: true,
          },
          {
            name: "Extraction Accuracy",
            parsli: "99.5%",
            competitor: "~95-98%",
            highlight: true,
          },
          {
            name: "Human-in-the-Loop Review",
            parsli: true,
            competitor: true,
          },
        ],
      },
      {
        name: "Integrations",
        features: [
          {
            name: "Zapier / Make / Power Automate",
            parsli: "All three supported",
            competitor: "Zapier only",
            highlight: true,
          },
          { name: "REST API", parsli: true, competitor: true },
          {
            name: "Google Sheets Direct Export",
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
            name: "Transparent Pricing",
            parsli: "Published pricing tiers",
            competitor: "Contact sales for most plans",
            highlight: true,
          },
          {
            name: "Free Tier",
            parsli: "26 pages/month forever",
            competitor: "500 pages trial only",
            highlight: true,
          },
          {
            name: "Per-Page Overage Fees",
            parsli: "Predictable tier pricing",
            competitor: "Variable per-page charges",
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
        parsliQuota: "26 pages/month (permanent)",
        competitorPrice: "$0",
        competitorQuota: "500 pages trial",
      },
      {
        name: "Starter",
        parsliPrice: "$49/mo",
        parsliQuota: "130 pages/month",
        competitorPrice: "~$100/mo",
        competitorQuota: "500 pages/month",
      },
      {
        name: "Growth",
        parsliPrice: "$89/mo",
        parsliQuota: "390 pages/month",
        competitorPrice: "~$300/mo",
        competitorQuota: "1,500 pages/month",
      },
      {
        name: "Business",
        parsliPrice: "$129/mo",
        parsliQuota: "1,300 pages/month",
        competitorPrice: "~$500/mo",
        competitorQuota: "5,000 pages/month",
      },
      {
        name: "Professional",
        parsliPrice: "$269/mo",
        parsliQuota: "3,900 pages/month",
        competitorPrice: "Custom",
        competitorQuota: "Custom",
      },
      {
        name: "Scale",
        parsliPrice: "$499/mo",
        parsliQuota: "13,000 pages/month",
        competitorPrice: "Custom",
        competitorQuota: "Custom",
      },
    ],
  },
  advantages: [
    {
      icon: DollarSign,
      title: "Transparent, Predictable Pricing",
      description:
        "Parsli publishes clear pricing tiers with no hidden fees. Nanonets requires contacting sales for most plans and charges variable per-page fees that can spike unexpectedly.",
    },
    {
      icon: Clock,
      title: "Faster Time to Value",
      description:
        "Set up your first parser in under 5 minutes with Parsli's no-code visual editor. Nanonets often requires technical setup and model training before you can start extracting.",
    },
    {
      icon: Users,
      title: "Built-In Email Parsing",
      description:
        "Parsli includes a dedicated email inbox for forwarding-based parsing. With Nanonets, email parsing requires custom API integration or third-party automation.",
    },
    {
      icon: Shield,
      title: "Enterprise Ready from Day One",
      description:
        "SOC 2 compliance, GDPR readiness, and end-to-end encryption are included on all Parsli plans. No need to upgrade to an enterprise tier for basic security features.",
    },
  ],
  faq: [
    {
      question: "How does Parsli compare to Nanonets for AI accuracy?",
      answer:
        "Both platforms use AI for document extraction. Parsli achieves 99.5% accuracy with auto-learning that improves from your corrections. Nanonets reports 95-98% accuracy and requires manual retraining of models.",
    },
    {
      question: "Is Nanonets more expensive than Parsli?",
      answer:
        "For most use cases, yes. Nanonets uses opaque per-page pricing that can be difficult to predict. Parsli offers clear monthly tiers starting at $49/mo, making budgeting straightforward.",
    },
    {
      question: "Does Parsli support custom AI model training like Nanonets?",
      answer:
        "Parsli uses auto-learning instead of manual model training. When you correct an extraction, Parsli automatically improves future accuracy. This approach is faster and requires no ML expertise.",
    },
    {
      question: "Which tool is better for invoice processing?",
      answer:
        "Parsli offers pre-trained invoice models that work out of the box with 99.5% accuracy. Nanonets also has invoice models, but Parsli adds email inbox parsing, more integrations, and better per-page pricing.",
    },
    {
      question: "Can I use Parsli without technical knowledge?",
      answer:
        "Absolutely. Parsli offers a full no-code experience with a visual template editor and pre-built integrations. Nanonets often requires API integration knowledge for advanced use cases.",
    },
    {
      question: "Does Parsli offer a free plan like Nanonets?",
      answer:
        "Parsli offers a permanent free tier with 26 pages per month. Nanonets provides a 500-page trial that expires, after which you must move to a paid plan.",
    },
  ],
};
