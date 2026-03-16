import {
  Truck,
  Package,
  Upload,
  Cpu,
  CheckCircle,
  MapPin,
  Clock,
  Weight,
  BarChart3,
  AlertCircle,
} from "lucide-react";
import type { UseCasePageData } from "../types";

export const logisticsShippingData: UseCasePageData = {
  slug: "logistics-shipping",
  seo: {
    title: "Shipping & Logistics Document Parsing | BOL, AWB, POD Extraction | Parsli",
    description:
      "Extract tracking numbers, shipment details, weights, addresses, and delivery statuses from bills of lading, air waybills, packing lists, and proof-of-delivery documents automatically.",
    keywords:
      "logistics document parsing, shipping document extraction, bill of lading parser, AWB data extraction, BOL OCR, packing list automation, freight document processing",
  },
  hero: {
    badge: "Logistics & Shipping",
    badgeIcon: Truck,
    headline: "Parse Shipping Documents at Freight Speed",
    subheadline:
      "Bills of lading, air waybills, packing lists, customs declarations, and proof-of-delivery documents — Parsli extracts tracking numbers, addresses, weights, item descriptions, and shipment statuses from all of them.",
    stats: [
      { value: "99.0%", label: "Tracking number extraction accuracy" },
      { value: "< 5s", label: "Average document parse time" },
      { value: "70%", label: "Reduction in manual shipment data entry" },
    ],
    ctaText: "Parse Shipping Docs Free",
  },
  painPoints: {
    headline: "Manual Document Handling Slows the Supply Chain",
    subheadline:
      "Logistics teams process hundreds of shipping documents daily. Manual entry creates bottlenecks at every handoff.",
    items: [
      {
        value: "15 min",
        label: "Average time to manually key one bill of lading into a TMS",
      },
      {
        value: "10%",
        label: "Of shipping data entry errors cause delivery exceptions",
      },
      {
        value: "$300+",
        label: "Average cost of a single shipping document error (reroutes, delays, penalties)",
      },
    ],
  },
  howItWorks: {
    headline: "Shipping Docs to Structured Data in Three Steps",
    subheadline:
      "Digitize your logistics paperwork without changing your workflow.",
    steps: [
      {
        step: "1",
        title: "Ingest Documents",
        description:
          "Upload BOLs, AWBs, packing lists, or PODs via the dashboard, email forwarding, or a watched folder. Parsli handles PDF, scanned images, and even photos of paper documents.",
        icon: Upload,
      },
      {
        step: "2",
        title: "AI Extracts Shipment Data",
        description:
          "Parsli identifies document type and extracts: tracking/reference numbers, shipper and consignee info, origin/destination addresses, item descriptions, weights, piece counts, and delivery status.",
        icon: Cpu,
      },
      {
        step: "3",
        title: "Feed Your TMS or Warehouse System",
        description:
          "Structured shipment data is pushed to your TMS, WMS, or spreadsheet via API or integration. Auto-match shipments to orders for end-to-end visibility.",
        icon: CheckCircle,
      },
    ],
  },
  features: [
    {
      icon: Package,
      title: "Multi-Document Type Support",
      description:
        "Handles bills of lading (BOL), air waybills (AWB), ocean waybills, packing lists, commercial invoices, customs declarations, and proof-of-delivery documents.",
      benefit: "One tool for every document type in your logistics workflow.",
    },
    {
      icon: MapPin,
      title: "Origin/Destination Extraction",
      description:
        "Extracts and normalizes shipper and consignee addresses, port of loading, port of discharge, and final delivery address — handling international address formats.",
      benefit: "Clean address data for routing and delivery confirmation.",
    },
    {
      icon: Weight,
      title: "Weight & Dimensions Parsing",
      description:
        "Captures gross weight, net weight, tare weight, and package dimensions (L x W x H) with unit normalization (kg/lbs, cm/in).",
      benefit: "Automated freight rate calculations with accurate weight data.",
    },
    {
      icon: Clock,
      title: "Delivery Status Extraction",
      description:
        "Reads POD documents to extract delivery date/time, recipient name, signature status, and any exception notes (damaged, partial, refused).",
      benefit: "Close the loop on shipment tracking without manual status updates.",
    },
    {
      icon: BarChart3,
      title: "Shipment Matching",
      description:
        "Cross-references extracted tracking numbers and PO references across documents to link BOLs, packing lists, and PODs to the same shipment.",
      benefit: "Complete shipment files assembled automatically.",
    },
    {
      icon: AlertCircle,
      title: "Exception & Discrepancy Detection",
      description:
        "Compares quantities and weights across BOL, packing list, and POD. Flags discrepancies like short shipments, overages, or weight mismatches.",
      benefit: "Catch shipping discrepancies before they become costly claims.",
    },
  ],
  integrations: [
    {
      slug: "gmail",
      relevance:
        "Auto-ingest shipping documents received via email from carriers and freight forwarders.",
    },
    {
      slug: "google-drive",
      relevance:
        "Watch a shared Google Drive folder for new shipping documents uploaded by warehouse staff.",
    },
    {
      slug: "rest-api",
      relevance:
        "Integrate directly with your TMS or WMS for real-time shipping document parsing.",
    },
    {
      slug: "webhooks",
      relevance:
        "Receive real-time notifications when new shipping documents are parsed, with extracted data in the payload.",
    },
  ],
  faq: [
    {
      question: "What shipping document types does Parsli support?",
      answer:
        "Parsli handles bills of lading (ocean and truck), air waybills, packing lists, commercial invoices, customs declarations (CN22, CN23), proof-of-delivery documents, freight invoices, and container manifests.",
    },
    {
      question: "Can Parsli read carrier-specific BOL formats?",
      answer:
        "Yes. Parsli's AI model is trained on BOL formats from major carriers (UPS, FedEx, DHL, Maersk, CMA CGM, etc.) and adapts to custom formats without templates. New carrier formats are handled automatically.",
    },
    {
      question: "How does Parsli handle multi-container shipments?",
      answer:
        "For shipments spanning multiple containers, Parsli extracts data per container (container number, seal number, weight, piece count) and groups them under the parent BOL or booking reference.",
    },
    {
      question: "Can I match BOL data to purchase orders?",
      answer:
        "Yes. Parsli extracts PO references from shipping documents. Using the API or Zapier, you can automatically match shipment data to your purchase orders for three-way matching (PO, BOL, POD).",
    },
    {
      question: "Does Parsli support international shipping documents in multiple languages?",
      answer:
        "Yes. Parsli handles shipping documents in 30+ languages and correctly interprets international address formats, Incoterms, HS codes, and customs-specific fields.",
    },
  ],
  cta: {
    headline: "Digitize Your Logistics Paperwork",
    subheadline:
      "Upload a BOL, AWB, or packing list and see structured data in seconds.",
    ctaText: "Try Parsli Free",
  },
  relatedUseCases: [
    "order-processing",
    "invoice-parsing",
    "contract-extraction",
  ],
};
