import {
  ShoppingCart,
  Package,
  Upload,
  Cpu,
  CheckCircle,
  ClipboardList,
  Repeat,
  AlertTriangle,
  Truck,
  Boxes,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const orderProcessingData: UseCasePageData = {
  slug: "order-processing",
  seo: {
    title: "Automated Purchase Order & Order Email Parsing | Parsli",
    description:
      "Extract order numbers, product details, quantities, prices, and shipping info from purchase orders and order confirmation emails. Parsli automates order data entry for operations teams.",
    keywords:
      "order parsing, purchase order extraction, PO parsing automation, order email processing, automated order entry, order data extraction, purchase order OCR",
  },
  hero: {
    badge: "Order Processing",
    badgeIcon: ShoppingCart,
    headline: "Parse Purchase Orders in Seconds, Not Hours",
    subheadline:
      "Customers send orders as PDFs, emails, and even faxes. Parsli extracts order number, line items, quantities, unit prices, delivery addresses, and requested ship dates — regardless of format — and pushes structured data into your OMS or ERP.",
    stats: [
      { value: "98.9%", label: "Field accuracy on purchase orders" },
      { value: "85%", label: "Reduction in order entry time" },
      { value: "< 6s", label: "Average PO processing time" },
    ],
    ctaText: "Automate Order Processing Free",
  },
  painPoints: {
    headline: "Manual Order Entry Creates Costly Errors",
    subheadline:
      "When orders are entered by hand, mistakes cascade through fulfillment, shipping, and billing.",
    items: [
      {
        value: "1 in 8",
        label: "Manually-entered orders contain a quantity or SKU error",
      },
      {
        value: "$62",
        label: "Average cost of a single order-entry error (returns + rework)",
      },
      {
        value: "4.5 hrs/day",
        label: "Time a typical order-desk operator spends on manual data entry",
      },
    ],
  },
  howItWorks: {
    headline: "Purchase Order to Structured Data in Three Steps",
    subheadline:
      "Feed Parsli your POs. Get clean, verified order data back.",
    steps: [
      {
        step: "1",
        title: "Ingest Orders",
        description:
          "Forward order emails, upload PDF purchase orders, or connect a shared drive. Parsli accepts POs in any format — structured PDFs, scanned images, and free-form emails.",
        icon: Upload,
      },
      {
        step: "2",
        title: "AI Extracts Order Details",
        description:
          "Parsli identifies PO number, order date, buyer and seller info, line items with SKU/description/quantity/price, shipping address, requested delivery date, and payment terms.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Push to Your System",
        description:
          "Extracted order data flows to your ERP, OMS, or spreadsheet via API, Zapier, or direct integration. Review and approve before final entry, or auto-approve high-confidence orders.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: ClipboardList,
      title: "Full Line-Item Parsing",
      description:
        "Captures every line item from multi-page POs including SKU, description, quantity, unit price, line total, and any special instructions or notes per item.",
      benefit: "Eliminate row-by-row manual entry for 50+ line-item POs.",
    },
    {
      icon: Repeat,
      title: "PO Change Order Detection",
      description:
        "When a revised PO arrives, Parsli compares it against the original and highlights changed quantities, added items, removed items, and price adjustments.",
      benefit: "Catch PO revisions instantly instead of discovering them at shipment.",
    },
    {
      icon: AlertTriangle,
      title: "Validation & Anomaly Flags",
      description:
        "Flags common issues: quantity mismatches vs. prior orders, discontinued SKUs, unusual unit prices, and missing required fields — before the order enters your system.",
      benefit: "Catch errors before they become shipping mistakes.",
    },
    {
      icon: Truck,
      title: "Shipping Address Normalization",
      description:
        "Standardizes delivery addresses to USPS/postal format, splits address components, and validates against known customer ship-to locations.",
      benefit: "Fewer misdeliveries from address typos or formatting issues.",
    },
    {
      icon: Boxes,
      title: "Multi-Format Ingestion",
      description:
        "Handles structured EDI-style POs, free-form email orders, PDF purchase orders, scanned faxes, and even orders embedded in Excel attachments.",
      benefit: "One system for every order format your customers use.",
    },
    {
      icon: Package,
      title: "Batch Order Processing",
      description:
        "Process hundreds of POs in a single batch upload. Parsli parallelizes extraction and delivers a consolidated output file or pushes each order individually to your ERP.",
      benefit: "Handle high-volume order periods without adding staff.",
    },
  ],
  integrations: [
    {
      slug: "gmail",
      relevance:
        "Auto-ingest purchase order emails from customers via Gmail integration.",
    },
    {
      slug: "google-drive",
      relevance:
        "Watch a Google Drive folder for new PO uploads from sales reps or customers.",
    },
    {
      slug: "zapier",
      relevance:
        "Push parsed order data to your ERP, OMS, or inventory management system via Zapier.",
    },
    {
      slug: "rest-api",
      relevance:
        "Integrate directly with your order management system for real-time PO parsing.",
    },
  ],
  faq: [
    {
      question: "Can Parsli handle purchase orders from different customers with different formats?",
      answer:
        "Yes. Parsli's AI model adapts to any PO layout without templates. Whether your customer sends a formal EDI-style PDF or a casual email listing items, Parsli extracts the same structured fields from both.",
    },
    {
      question: "How does Parsli handle PO revisions and change orders?",
      answer:
        "When a revised PO is detected (same PO number, different content), Parsli generates a diff showing added, removed, and changed line items. You can configure automatic alerts when revisions are detected.",
    },
    {
      question: "Can I validate extracted data against my product catalog?",
      answer:
        "Yes. Via the REST API or Zapier integration, you can set up validation rules that cross-reference extracted SKUs and descriptions against your product master to catch ordering errors before fulfillment.",
    },
    {
      question: "What if a PO contains items I don't sell?",
      answer:
        "Parsli extracts all line items as-is. Using the validation feature, unrecognized SKUs or descriptions are flagged for human review, allowing your order desk to contact the customer proactively.",
    },
    {
      question: "How does batch processing work for seasonal order spikes?",
      answer:
        "Upload hundreds of POs via the dashboard, API, or a watched folder. Parsli processes them in parallel — typical throughput is 500+ POs per hour. Your monthly page quota applies; line items on multi-page POs count per page.",
    },
  ],
  cta: {
    headline: "Process Orders at Machine Speed",
    subheadline:
      "Upload a purchase order and see structured data in seconds. No credit card required.",
    ctaText: "Try Parsli Free",
  },
  relatedUseCases: [
    "invoice-parsing",
    "logistics-shipping",
    "email-to-spreadsheet",
  ],
};
