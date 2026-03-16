import {
  ShoppingCart,
  FileText,
  Package,
  Receipt,
  RotateCcw,
  BarChart3,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  Tags,
} from "lucide-react";
import type { IndustryPageData } from "../types";

export const ecommerceData: IndustryPageData = {
  slug: "ecommerce",
  seo: {
    title: "AI Document Extraction for E-Commerce | Parsli",
    description:
      "Automate e-commerce document processing with Parsli. Extract data from purchase orders, supplier invoices, return forms, and shipping labels with AI-powered speed and accuracy.",
    keywords:
      "ecommerce document extraction, purchase order OCR, supplier invoice processing, return document extraction, ecommerce automation, order processing AI, packing slip extraction, product catalog data extraction",
  },
  hero: {
    badge: "E-Commerce",
    badgeIcon: ShoppingCart,
    headline: "Process E-Commerce Documents at the Speed of Online Retail",
    subheadline:
      "Parsli automates the extraction of data from purchase orders, supplier invoices, return authorizations, and product documents so your operations team can scale without adding headcount.",
    stats: [
      { value: "88%", label: "Faster order document processing" },
      { value: "99.0%", label: "Accuracy on invoice line item extraction" },
      { value: "50K+", label: "Documents processed per hour at peak" },
    ],
  },
  painPoints: {
    headline: "Scaling E-Commerce Means Scaling Document Chaos",
    subheadline:
      "As order volumes grow, so does the mountain of documents your team must process. Manual handling simply cannot keep up.",
    items: [
      {
        value: "72%",
        label: "Of e-commerce operators say document processing limits their growth",
      },
      {
        value: "$8.50",
        label: "Average cost to manually process a single supplier invoice",
      },
      {
        value: "5-7 days",
        label: "Average delay in processing returns due to document backlogs",
      },
    ],
  },
  useCases: {
    headline: "Automate Document Processing Across Your E-Commerce Operations",
    subheadline:
      "From supplier management to customer returns, Parsli extracts data from every document in your e-commerce workflow.",
    items: [
      {
        icon: Receipt,
        title: "Supplier Invoice Processing",
        description:
          "Extract vendor details, SKUs, quantities, unit prices, totals, payment terms, and tax amounts from supplier invoices in any format. Match against POs automatically for three-way reconciliation.",
        benefit: "Process supplier invoices 85% faster",
      },
      {
        icon: Package,
        title: "Purchase Order Extraction",
        description:
          "Parse order numbers, line items, quantities, delivery dates, and shipping instructions from purchase orders. Feed extracted data directly into your inventory and procurement systems.",
        benefit: "Eliminate PO data entry entirely",
      },
      {
        icon: RotateCcw,
        title: "Return & Refund Document Processing",
        description:
          "Extract RMA numbers, product details, return reasons, refund amounts, and customer information from return authorizations and refund requests to accelerate returns processing.",
        benefit: "Process returns 5x faster",
      },
      {
        icon: Tags,
        title: "Product Catalog & Spec Sheet Extraction",
        description:
          "Pull product names, descriptions, specifications, dimensions, weights, and pricing from supplier catalogs and spec sheets. Build and update product databases automatically.",
        benefit: "Onboard new product lines in hours",
      },
      {
        icon: FileText,
        title: "Packing Slip & Shipping Label Extraction",
        description:
          "Capture tracking numbers, carrier details, recipient addresses, item lists, and weights from packing slips and shipping labels for automated shipment tracking and verification.",
        benefit: "Automate shipment verification at receiving",
      },
      {
        icon: BarChart3,
        title: "Marketplace Document Processing",
        description:
          "Extract settlement details, fee breakdowns, commission rates, and payout summaries from Amazon, Shopify, eBay, and other marketplace reports and statements.",
        benefit: "Reconcile marketplace payouts automatically",
      },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Upload E-Commerce Documents",
      description:
        "Send invoices, POs, or return forms via API, email forwarding, or direct integration with your e-commerce platform. Process documents individually or in bulk.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Extracts & Matches",
      description:
        "Our e-commerce-trained models extract all relevant fields, match line items against your product catalog, and flag discrepancies for review.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Update Your Systems",
      description:
        "Push structured data to your ERP, inventory system, or accounting platform. Trigger automated workflows for approval, payment, or restocking.",
      icon: CheckCircle,
    },
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: "Scale Operations Without Scaling Costs",
      description:
        "Handle 10x the document volume during peak seasons without hiring temporary staff. Parsli scales elastically with your business.",
      benefit: "Handle peak season volumes effortlessly",
    },
    {
      icon: ShieldCheck,
      title: "Reduce Invoice Discrepancies",
      description:
        "Automatically match supplier invoices against purchase orders and receiving documents. Catch pricing errors, quantity mismatches, and duplicate invoices before payment.",
        benefit: "Catch 98% of invoice discrepancies automatically",
    },
    {
      icon: Zap,
      title: "Accelerate Returns Processing",
      description:
        "Process return authorizations and refund requests in minutes instead of days. Happier customers and faster inventory recovery.",
      benefit: "Improve customer satisfaction scores by 25%",
    },
    {
      icon: Clock,
      title: "Real-Time Inventory Accuracy",
      description:
        "Extract data from receiving documents and packing slips in real time to keep your inventory counts accurate and avoid stockouts or overselling.",
      benefit: "Maintain 99.5%+ inventory accuracy",
    },
  ],
  faq: [
    {
      question: "What e-commerce documents can Parsli process?",
      answer:
        "Parsli handles the full spectrum of e-commerce documents including supplier invoices, purchase orders, packing slips, shipping labels, return authorizations, refund requests, product spec sheets, supplier catalogs, marketplace settlement reports, customs declarations for cross-border orders, and certificates of conformity.",
    },
    {
      question: "How does Parsli handle high-volume periods like Black Friday?",
      answer:
        "Parsli is built for elastic scale. Our infrastructure automatically scales to handle peak volumes, processing over 50,000 documents per hour without degradation. E-commerce businesses can process their entire Black Friday and holiday season document volume without delays or backlogs.",
    },
    {
      question: "Does Parsli integrate with Shopify, Amazon, and other e-commerce platforms?",
      answer:
        "Yes. Parsli offers integrations with Shopify, Amazon Seller Central, WooCommerce, BigCommerce, Magento, and eBay. We also integrate with ERP systems like NetSuite and QuickBooks, and inventory management platforms like TradeGecko and Cin7.",
    },
    {
      question: "Can Parsli match supplier invoices to purchase orders automatically?",
      answer:
        "Yes. Parsli performs automated two-way and three-way matching between purchase orders, supplier invoices, and goods received notes. The system extracts line-item details from each document, compares quantities, unit prices, and totals, and flags any discrepancies for human review while auto-approving matched invoices.",
    },
    {
      question: "How does Parsli handle supplier invoices in different formats and languages?",
      answer:
        "Parsli processes supplier invoices regardless of format or layout. Whether your suppliers send PDF invoices, scanned paper invoices, or invoices in Excel format, Parsli extracts the data accurately. We support 30+ languages, which is essential for e-commerce businesses working with international suppliers.",
    },
  ],
  cta: {
    headline: "Automate the Paperwork Behind Every Order",
    subheadline:
      "From supplier invoices to customer returns, Parsli extracts the data your e-commerce operations need to scale. Stop letting document processing be your bottleneck.",
    ctaText: "Start Free Trial",
  },
  relatedIndustries: ["logistics", "finance", "hr"],
};
