import { Receipt, Upload, Cpu, Download } from "lucide-react";
import type { DocumentTypePageData } from "../types";

export const receiptsData: DocumentTypePageData = {
  slug: "receipts",
  seo: {
    title: "Receipt Parsing & OCR Data Extraction | Parsli",
    description:
      "Extract merchant names, items, totals, tax, and payment methods from receipts. Parsli's AI handles scanned, photographed, and digital receipts with 99.5% accuracy.",
    keywords:
      "receipt parsing, receipt OCR, receipt data extraction, expense receipt scanning, automated receipt processing, extract data from receipts",
  },
  hero: {
    badge: "Receipt Parsing",
    badgeIcon: Receipt,
    headline: "Turn Any Receipt into Structured Data",
    subheadline:
      "Snap a photo, upload a scan, or forward an email receipt. Parsli's AI extracts merchant, items, totals, tax, and payment method instantly.",
    stats: [
      { value: "99.5%", label: "OCR accuracy" },
      { value: "<3s", label: "Per-receipt processing" },
      { value: "100+", label: "Languages supported" },
    ],
  },
  extractableFields: [
    {
      fieldName: "Merchant Name",
      description: "The store, restaurant, or vendor name printed on the receipt.",
      example: "Whole Foods Market",
    },
    {
      fieldName: "Merchant Address",
      description: "The full address of the merchant location.",
      example: "123 Main St, Austin, TX 78701",
    },
    {
      fieldName: "Transaction Date",
      description: "The date and time the purchase was made.",
      example: "2026-03-04 14:32",
    },
    {
      fieldName: "Line Items",
      description: "Individual purchased items with quantity and price.",
      example: "Organic Bananas x 2 @ $1.29 = $2.58",
    },
    {
      fieldName: "Subtotal",
      description: "The sum before tax.",
      example: "$47.82",
    },
    {
      fieldName: "Tax",
      description: "The tax amount applied to the purchase.",
      example: "$3.83",
    },
    {
      fieldName: "Total Amount",
      description: "The final amount charged.",
      example: "$51.65",
    },
    {
      fieldName: "Payment Method",
      description: "How the purchase was paid (card type, last 4 digits, cash).",
      example: "Visa ending in 4829",
    },
    {
      fieldName: "Currency",
      description: "The currency of the transaction.",
      example: "USD",
    },
  ],
  howItWorks: [
    {
      step: "1",
      title: "Capture Your Receipt",
      description:
        "Upload a photo or scan, forward an email receipt, or use the API to send receipt images. Parsli accepts JPG, PNG, PDF, and more.",
      icon: Upload,
    },
    {
      step: "2",
      title: "AI Reads & Extracts",
      description:
        "Advanced OCR and AI models detect the receipt layout, read every line, and extract merchant, items, totals, tax, and payment details.",
      icon: Cpu,
    },
    {
      step: "3",
      title: "Export to Your Tools",
      description:
        "Send structured receipt data to Google Sheets, Excel, expense tools, or accounting software via Zapier, Make, or the REST API.",
      icon: Download,
    },
  ],
  supportedFormats: ["JPEG", "PNG", "PDF", "TIFF", "HEIC", "BMP", "Email (EML/MSG)"],
  relatedUseCases: [
    "receipt-parsing",
    "invoice-parsing",
    "bank-statements",
    "order-processing",
  ],
  faq: [
    {
      question: "Can Parsli read blurry or crumpled receipt photos?",
      answer:
        "Yes. Parsli's OCR engine is trained on low-quality receipt images, including blurry photos, crumpled paper, and faded thermal prints. Image preprocessing enhances readability before extraction.",
    },
    {
      question: "Does Parsli extract individual line items from receipts?",
      answer:
        "Yes. Parsli identifies and extracts each line item, including product name, quantity, unit price, and line total. This works for both retail and restaurant receipts.",
    },
    {
      question: "Can I use Parsli for expense report automation?",
      answer:
        "Absolutely. Forward receipt emails or upload photos to Parsli, then export structured data to Google Sheets, Excel, or your expense management tool via integrations.",
    },
    {
      question: "What about receipts in languages other than English?",
      answer:
        "Parsli supports receipt OCR in 100+ languages. The AI model handles different currency formats, date formats, and character sets automatically.",
    },
    {
      question: "How fast is receipt processing?",
      answer:
        "Most receipts are processed in under 3 seconds. Batch uploads of hundreds of receipts are processed in parallel for maximum throughput.",
    },
    {
      question: "Does Parsli detect the currency automatically?",
      answer:
        "Yes. Parsli identifies the transaction currency from receipt symbols, text, and formatting. It outputs the ISO currency code alongside the extracted amounts.",
    },
  ],
};
