import {
  Truck,
  FileText,
  Ship,
  Package,
  ClipboardCheck,
  Globe,
  Upload,
  Cpu,
  CheckCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
  Clock,
  MapPin,
} from "lucide-react";
import type { IndustryPageData } from "../types";

export const logisticsData: IndustryPageData = {
  slug: "logistics",
  seo: {
    title: "AI Document Extraction for Logistics & Supply Chain | Parsli",
    description:
      "Automate logistics document processing with Parsli. Extract data from bills of lading, shipping manifests, customs forms, and delivery receipts with AI-powered accuracy.",
    keywords:
      "logistics document extraction, bill of lading OCR, shipping document processing, customs document extraction, freight document AI, supply chain document automation, BOL extraction, packing list parsing",
  },
  hero: {
    badge: "Logistics & Supply Chain",
    badgeIcon: Truck,
    headline: "Extract Shipping Document Data Without the Bottleneck",
    subheadline:
      "Parsli automates the extraction of data from bills of lading, customs declarations, packing lists, and freight invoices so your logistics team can move goods faster and reduce costly errors.",
    stats: [
      { value: "95%", label: "Reduction in document processing time" },
      { value: "99.1%", label: "Accuracy on shipment data extraction" },
      { value: "30+", label: "Logistics document types supported" },
    ],
  },
  painPoints: {
    headline: "Paperwork Should Not Be Your Biggest Shipping Delay",
    subheadline:
      "Global supply chains generate massive volumes of documents. Manual processing creates bottlenecks that delay shipments and increase costs.",
    items: [
      {
        value: "$1,500",
        label: "Average cost of a single delayed shipment due to documentation errors",
      },
      {
        value: "40%",
        label: "Of logistics professionals say paperwork is their biggest operational pain point",
      },
      {
        value: "15-20 min",
        label: "Average time to manually key data from a single bill of lading",
      },
    ],
  },
  useCases: {
    headline: "Automate Every Logistics Document in Your Supply Chain",
    subheadline:
      "From port to warehouse, Parsli processes the documents that keep your supply chain moving.",
    items: [
      {
        icon: Ship,
        title: "Bill of Lading Extraction",
        description:
          "Extract shipper, consignee, vessel name, port of loading, port of discharge, container numbers, cargo descriptions, and weights from ocean and inland bills of lading automatically.",
        benefit: "Process BOLs in seconds, not minutes",
      },
      {
        icon: Globe,
        title: "Customs Declaration Processing",
        description:
          "Parse HS codes, declared values, country of origin, commodity descriptions, and duty calculations from customs forms and commercial invoices for faster border clearance.",
        benefit: "Reduce customs clearance delays by 70%",
      },
      {
        icon: Package,
        title: "Packing List & Manifest Extraction",
        description:
          "Extract item descriptions, quantities, weights, dimensions, and carton numbers from packing lists and shipping manifests. Cross-reference against purchase orders for discrepancy detection.",
        benefit: "Automate shipment verification",
      },
      {
        icon: FileText,
        title: "Freight Invoice Processing",
        description:
          "Pull carrier name, lane details, weight, accessorial charges, fuel surcharges, and total amounts from freight invoices. Automate freight audit and payment workflows.",
        benefit: "Audit 100% of freight invoices automatically",
      },
      {
        icon: ClipboardCheck,
        title: "Proof of Delivery Extraction",
        description:
          "Capture delivery date, time, recipient name, signature status, and exception notes from POD documents. Update your TMS in real time with confirmed delivery data.",
        benefit: "Close delivery loops instantly",
      },
      {
        icon: MapPin,
        title: "Warehouse Receipt Processing",
        description:
          "Extract commodity type, quantity, grade, storage location, and receipt dates from warehouse receipts and inventory documents for accurate stock management.",
        benefit: "Maintain real-time inventory accuracy",
      },
    ],
  },
  howItWorks: [
    {
      step: "1",
      title: "Upload Shipping Documents",
      description:
        "Send bills of lading, customs forms, or freight invoices via API, email forwarding, or EDI integration. Parsli supports PDFs, scanned images, and even faxed documents.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Classifies & Extracts",
      description:
        "Our logistics-trained models automatically identify the document type, extract all relevant shipping data, and validate fields against known formats and reference data.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Feed Your Systems",
      description:
        "Push structured data directly to your TMS, WMS, ERP, or customs broker platform. Trigger automated workflows for freight audit, inventory updates, or compliance checks.",
      icon: CheckCircle,
    },
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: "Eliminate Shipping Delays",
      description:
        "Process documentation in real time so paperwork never holds up a shipment. Logistics teams using Parsli report 60% fewer documentation-related delays.",
      benefit: "60% fewer documentation delays",
    },
    {
      icon: ShieldCheck,
      title: "Reduce Compliance Risk",
      description:
        "Automatically validate customs declarations, HS codes, and trade compliance documents against regulatory databases. Flag issues before they reach the border.",
      benefit: "Catch compliance issues before they cost you",
    },
    {
      icon: Zap,
      title: "Automate Freight Audit",
      description:
        "Extract and compare freight invoice data against contracted rates automatically. Identify overcharges, duplicate invoices, and billing errors at scale.",
      benefit: "Recover 2-5% of annual freight spend",
    },
    {
      icon: Clock,
      title: "Real-Time Supply Chain Visibility",
      description:
        "Turn unstructured shipping documents into structured data feeds. Power real-time dashboards, tracking systems, and exception management workflows.",
      benefit: "Full visibility across your supply chain",
    },
  ],
  faq: [
    {
      question: "What logistics documents can Parsli extract data from?",
      answer:
        "Parsli supports all major logistics document types including ocean and inland bills of lading, air waybills, packing lists, shipping manifests, commercial invoices, customs declarations, freight invoices, proof of delivery documents, warehouse receipts, letters of credit, certificates of origin, and dangerous goods declarations.",
    },
    {
      question: "How does Parsli handle bills of lading from different carriers?",
      answer:
        "Parsli is trained on millions of BOL formats from carriers worldwide. Whether it is a Maersk, MSC, CMA CGM, or regional carrier BOL, Parsli identifies and extracts all standard fields without requiring carrier-specific templates. Our models adapt to layout variations automatically.",
    },
    {
      question: "Can Parsli extract HS codes from customs documents?",
      answer:
        "Yes. Parsli extracts HS codes, commodity descriptions, declared values, country of origin, and all other fields from customs declarations, commercial invoices, and certificates of origin. We can also validate extracted HS codes against the Harmonized System database to flag potential classification errors.",
    },
    {
      question: "Does Parsli integrate with TMS and WMS platforms?",
      answer:
        "Parsli integrates with leading logistics platforms including SAP TM, Oracle TMS, BluJay, Descartes, Manhattan Associates WMS, and Highjump. We also offer a REST API and webhook-based integration for custom TMS and WMS connections.",
    },
    {
      question: "How does Parsli handle multi-language shipping documents?",
      answer:
        "Global logistics documents often contain multiple languages on a single page. Parsli supports 40+ languages and can extract data from documents that mix languages, such as a Chinese bill of lading with English field headers. No language configuration is required.",
    },
    {
      question: "Can Parsli process documents received via EDI or email?",
      answer:
        "Yes. Parsli supports multiple ingestion methods including REST API, email forwarding (documents sent as attachments are automatically processed), SFTP upload, and EDI integration. For logistics teams that receive documents across multiple channels, Parsli consolidates everything into a single processing pipeline.",
    },
  ],
  cta: {
    headline: "Move Goods Faster by Moving Data Faster",
    subheadline:
      "Eliminate the document processing bottleneck that slows your supply chain. Parsli extracts shipping data in seconds so your team can focus on logistics, not paperwork.",
    ctaText: "Start Free Trial",
  },
  relatedIndustries: ["ecommerce", "finance", "insurance"],
};
