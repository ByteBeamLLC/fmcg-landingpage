import { DollarSign, Zap, Settings, Brain } from "lucide-react";
import type { ComparisonPageData } from "../types";

export const vsRossum: ComparisonPageData = {
  slug: "rossum",
  competitorName: "Rossum",
  seo: {
    title:
      "Parsli vs Rossum: Intelligent Document Processing Comparison (2026) | Parsli",
    description:
      "Compare Parsli and Rossum for AI-powered document processing. See why growing teams choose Parsli for faster setup, transparent pricing, and broader document support.",
    keywords:
      "Parsli vs Rossum, Rossum alternative, intelligent document processing, AI document extraction, Rossum competitor",
  },
  hero: {
    headline: "Parsli vs Rossum: Enterprise Power, Startup Simplicity",
    subheadline:
      "Rossum targets large enterprises with complex procurement. Parsli delivers the same AI power with transparent pricing, faster onboarding, and no vendor lock-in.",
  },
  comparisonTable: {
    categories: [
      {
        name: "Core Features",
        features: [
          { name: "AI Document Extraction", parsli: true, competitor: true },
          {
            name: "Email Inbox Parsing",
            parsli: "Built-in forwarding inbox",
            competitor: "Email gateway add-on",
            highlight: true,
          },
          {
            name: "Human-in-the-Loop Validation",
            parsli: true,
            competitor: true,
          },
          {
            name: "Spreadsheet & CSV Parsing",
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
            name: "Pre-Trained Document Models",
            parsli: "10+ document types",
            competitor: "Primarily invoices & POs",
            highlight: true,
          },
          {
            name: "Auto-Learning",
            parsli: "Continuous from corrections",
            competitor: "Periodic model retraining",
            highlight: true,
          },
          {
            name: "Multi-Language OCR",
            parsli: "100+ languages",
            competitor: "40+ languages",
            highlight: true,
          },
          {
            name: "Extraction Accuracy",
            parsli: "99.5%",
            competitor: "~98%",
          },
        ],
      },
      {
        name: "Integrations",
        features: [
          {
            name: "No-Code Automation",
            parsli: "Zapier, Make, Power Automate",
            competitor: "Limited no-code options",
            highlight: true,
          },
          { name: "REST API", parsli: true, competitor: true },
          {
            name: "ERP Connectors",
            parsli: "Via Zapier/Make",
            competitor: "Native SAP, Oracle connectors",
          },
          {
            name: "Google Sheets / Excel Export",
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
            name: "Published Pricing",
            parsli: "Transparent tiers on website",
            competitor: "Contact sales only",
            highlight: true,
          },
          {
            name: "Free Tier",
            parsli: "26 pages/month forever",
            competitor: "Demo only",
            highlight: true,
          },
          {
            name: "Implementation Time",
            parsli: "Minutes to set up",
            competitor: "Weeks of onboarding",
            highlight: true,
          },
          {
            name: "Minimum Contract",
            parsli: "Month-to-month available",
            competitor: "Annual contracts required",
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
        competitorPrice: "Demo only",
        competitorQuota: "No free tier",
      },
      {
        name: "Starter",
        parsliPrice: "$49/mo",
        parsliQuota: "130 pages/month",
        competitorPrice: "Contact sales",
        competitorQuota: "~$500+/mo estimated",
      },
      {
        name: "Growth",
        parsliPrice: "$89/mo",
        parsliQuota: "390 pages/month",
        competitorPrice: "Contact sales",
        competitorQuota: "Custom volume",
      },
      {
        name: "Business",
        parsliPrice: "$129/mo",
        parsliQuota: "1,300 pages/month",
        competitorPrice: "Contact sales",
        competitorQuota: "Custom volume",
      },
      {
        name: "Scale",
        parsliPrice: "$499/mo",
        parsliQuota: "13,000 pages/month",
        competitorPrice: "Contact sales",
        competitorQuota: "Custom volume",
      },
    ],
  },
  advantages: [
    {
      icon: DollarSign,
      title: "10x More Affordable",
      description:
        "Rossum's enterprise pricing often starts at $500+/month with annual contracts. Parsli starts at $49/mo with no commitment, making it accessible to teams of all sizes.",
    },
    {
      icon: Zap,
      title: "Minutes, Not Weeks, to Deploy",
      description:
        "Parsli's no-code setup means you can create your first parser in 5 minutes. Rossum typically requires weeks of onboarding, integration work, and model training.",
    },
    {
      icon: Settings,
      title: "Broader Document Coverage",
      description:
        "While Rossum focuses primarily on invoices and purchase orders, Parsli handles emails, receipts, contracts, forms, bank statements, spreadsheets, and more.",
    },
    {
      icon: Brain,
      title: "No Vendor Lock-In",
      description:
        "Parsli offers month-to-month billing, easy data export, and standard API integrations. Rossum requires annual contracts and proprietary integrations that increase switching costs.",
    },
  ],
  faq: [
    {
      question: "Is Rossum better than Parsli for enterprise use?",
      answer:
        "Rossum has strong ERP connectors for SAP and Oracle, which may benefit large procurement teams. However, Parsli offers enterprise-grade security (SOC 2, GDPR), dedicated support, and custom plans at a fraction of the cost.",
    },
    {
      question: "How much does Rossum cost compared to Parsli?",
      answer:
        "Rossum does not publish pricing and requires annual contracts, typically starting above $500/month. Parsli offers transparent monthly pricing starting at $49/mo with a free tier for 26 pages.",
    },
    {
      question: "Can Parsli handle the same volume as Rossum?",
      answer:
        "Yes. Parsli's Scale plan handles 13,000 pages per month, and the Enterprise tier supports unlimited volume with custom pricing. For most businesses, Parsli's capacity is more than sufficient.",
    },
    {
      question: "Does Parsli offer the same AI quality as Rossum?",
      answer:
        "Parsli achieves 99.5% extraction accuracy with auto-learning. Rossum reports approximately 98% accuracy. Both platforms use AI, but Parsli's auto-learning approach means accuracy improves automatically from corrections.",
    },
    {
      question: "Is Parsli a good choice for small and mid-size businesses?",
      answer:
        "Absolutely. Parsli is designed for teams of all sizes, with a free tier, transparent pricing, and no minimum contracts. Rossum's enterprise-focused approach and pricing make it less accessible for smaller teams.",
    },
  ],
};
