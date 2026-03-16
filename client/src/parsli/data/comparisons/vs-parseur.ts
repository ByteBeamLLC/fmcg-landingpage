import { Brain, Zap, Shield, TrendingUp } from "lucide-react";
import type { ComparisonPageData } from "../types";

export const vsParseur: ComparisonPageData = {
  slug: "parseur",
  competitorName: "Parseur",
  seo: {
    title: "Parsli vs Parseur: Side-by-Side Comparison (2026) | Parsli",
    description:
      "Compare Parsli and Parseur for document parsing. See how Parsli offers 30% more pages, AI-powered accuracy, and better value at every pricing tier.",
    keywords:
      "Parsli vs Parseur, Parseur alternative, document parsing comparison, email parser comparison, Parseur competitor",
  },
  hero: {
    headline: "Parsli vs Parseur: More Pages, Smarter Parsing",
    subheadline:
      "Both tools parse documents and emails, but Parsli gives you 30% more pages at every tier, AI-powered accuracy, and faster processing speeds.",
  },
  comparisonTable: {
    categories: [
      {
        name: "Core Features",
        features: [
          { name: "Email Parsing", parsli: true, competitor: true },
          { name: "PDF Parsing", parsli: true, competitor: true },
          {
            name: "Multi-Page Document Support",
            parsli: "Unlimited pages",
            competitor: "Limited on lower tiers",
            highlight: true,
          },
          {
            name: "Template-Based Parsing",
            parsli: true,
            competitor: true,
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
            parsli: "GPT-4 level accuracy",
            competitor: "Rule-based + basic ML",
            highlight: true,
          },
          {
            name: "Auto-Learning from Corrections",
            parsli: true,
            competitor: false,
            highlight: true,
          },
          {
            name: "Multi-Language OCR",
            parsli: "100+ languages",
            competitor: "30+ languages",
            highlight: true,
          },
          {
            name: "Handwriting Recognition",
            parsli: true,
            competitor: false,
            highlight: true,
          },
        ],
      },
      {
        name: "Integrations",
        features: [
          {
            name: "Zapier Integration",
            parsli: true,
            competitor: true,
          },
          {
            name: "Make (Integromat)",
            parsli: true,
            competitor: true,
          },
          {
            name: "REST API",
            parsli: "Full CRUD API with SDKs",
            competitor: "Basic API",
            highlight: true,
          },
          {
            name: "Webhook Support",
            parsli: true,
            competitor: true,
          },
          {
            name: "Direct Database Export",
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
            competitor: "20 pages/month",
            highlight: true,
          },
          {
            name: "Best Value Tier",
            parsli: "$89/mo for 390 pages",
            competitor: "$89/mo for 300 pages",
            highlight: true,
          },
          {
            name: "Priority Support",
            parsli: "Growth tier and above",
            competitor: "Business tier and above",
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
        name: "Free",
        parsliPrice: "$0/mo",
        parsliQuota: "26 pages/month",
        competitorPrice: "$0/mo",
        competitorQuota: "20 pages/month",
      },
      {
        name: "Starter",
        parsliPrice: "$49/mo",
        parsliQuota: "130 pages/month",
        competitorPrice: "$49/mo",
        competitorQuota: "100 pages/month",
      },
      {
        name: "Growth",
        parsliPrice: "$89/mo",
        parsliQuota: "390 pages/month",
        competitorPrice: "$89/mo",
        competitorQuota: "300 pages/month",
      },
      {
        name: "Business",
        parsliPrice: "$129/mo",
        parsliQuota: "1,300 pages/month",
        competitorPrice: "$129/mo",
        competitorQuota: "1,000 pages/month",
      },
      {
        name: "Professional",
        parsliPrice: "$269/mo",
        parsliQuota: "3,900 pages/month",
        competitorPrice: "$269/mo",
        competitorQuota: "3,000 pages/month",
      },
      {
        name: "Scale",
        parsliPrice: "$499/mo",
        parsliQuota: "13,000 pages/month",
        competitorPrice: "$499/mo",
        competitorQuota: "10,000 pages/month",
      },
    ],
  },
  advantages: [
    {
      icon: TrendingUp,
      title: "30% More Pages at Every Tier",
      description:
        "At the same price point, Parsli gives you 30% more document pages every month. That means lower per-page costs and more room to grow.",
    },
    {
      icon: Brain,
      title: "Superior AI Extraction",
      description:
        "Parsli uses next-generation AI models that understand document context, not just templates. Get 99.5% accuracy on invoices, receipts, and complex layouts.",
    },
    {
      icon: Zap,
      title: "Faster Processing Speed",
      description:
        "Documents are parsed in under 5 seconds on average. Parseur can take 30+ seconds for complex documents with multiple pages.",
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description:
        "SOC 2 Type II compliance, end-to-end encryption, and GDPR readiness come standard. Parseur lacks SOC 2 certification entirely.",
    },
  ],
  faq: [
    {
      question: "Is Parsli really cheaper than Parseur?",
      answer:
        "At every pricing tier, Parsli and Parseur charge the same monthly fee. However, Parsli includes 30% more pages per month. For example, the Growth plan is $89/mo for 390 pages with Parsli versus 300 pages with Parseur, making Parsli significantly more cost-effective.",
    },
    {
      question: "Can I migrate my Parseur templates to Parsli?",
      answer:
        "Yes. Parsli offers a one-click migration tool that imports your existing parsing rules and templates from Parseur. Most migrations complete in under 10 minutes with zero downtime.",
    },
    {
      question: "Does Parsli support the same integrations as Parseur?",
      answer:
        "Parsli supports all major integrations that Parseur offers, including Zapier, Make, Google Sheets, and webhooks. Additionally, Parsli provides direct database exports, Power Automate support, and a full REST API with SDKs.",
    },
    {
      question: "How does AI accuracy compare between Parsli and Parseur?",
      answer:
        "Parsli achieves 99.5% extraction accuracy using advanced AI models, while Parseur relies primarily on rule-based and basic machine learning approaches. Parsli also learns from your corrections to improve over time.",
    },
    {
      question: "Does Parsli offer a free trial?",
      answer:
        "Yes. Parsli offers a free tier with 26 pages per month (versus Parseur's 20 pages), plus free trials on all paid plans so you can test the full feature set before committing.",
    },
    {
      question: "Which tool is better for high-volume document processing?",
      answer:
        "Parsli is the better choice for high-volume use cases. The Scale plan offers 13,000 pages for $499/mo compared to Parseur's 10,000 pages at the same price. Parsli also provides dedicated account management and an Enterprise tier for unlimited volume.",
    },
  ],
};
