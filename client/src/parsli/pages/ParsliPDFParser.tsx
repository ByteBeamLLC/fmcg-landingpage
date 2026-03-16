import { FileText, ScanLine, Table2, Image, Layers, Zap, Globe, Eye } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliHowItWorks from "../components/ParsliHowItWorks";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";

const pdfFeatures = [
  { icon: FileText, title: "Native PDF Parsing", description: "Extract text directly from digital/native PDFs with perfect accuracy. No OCR needed for machine-readable documents.", benefit: "Pixel-perfect extraction" },
  { icon: ScanLine, title: "Scanned Document OCR", description: "Advanced OCR engine handles scanned PDFs, photos, and faxes. Supports handwriting recognition.", benefit: "Any scan quality" },
  { icon: Table2, title: "Table Extraction", description: "Intelligent table detection extracts rows, columns, and cell data from even the most complex PDF tables.", benefit: "Complex tables supported" },
  { icon: Image, title: "Image-Based PDFs", description: "PDFs containing embedded images are automatically processed. Our engine detects and extracts text from images within PDFs.", benefit: "Works on image PDFs" },
  { icon: Layers, title: "Multi-Page Processing", description: "Handle multi-page PDFs as a single document. Parsli intelligently groups related content across pages.", benefit: "No page limits" },
  { icon: Globe, title: "100+ Languages", description: "OCR supports 100+ languages including Arabic, Chinese, Japanese, Korean, and all Latin-script languages.", benefit: "Multi-language OCR" },
];

const pdfSteps = [
  { step: "1", title: "Upload Your PDF", description: "Drag-and-drop to the dashboard, send via API, forward as email attachment, or connect cloud storage (Google Drive, Dropbox).", icon: FileText },
  { step: "2", title: "AI Analyzes & Extracts", description: "Parsli detects whether the PDF is native or scanned, applies the right engine, identifies the layout, and extracts all data fields.", icon: Eye },
  { step: "3", title: "Get Structured Output", description: "Receive clean JSON, CSV, or direct pushes to Google Sheets, databases, and 5,000+ apps via integrations.", icon: Zap },
];

const pdfFAQ = [
  { question: "Can Parsli handle scanned PDFs?", answer: "Yes. Parsli includes a built-in OCR engine that handles scanned PDFs, photographs of documents, and even handwritten content. It automatically detects whether a PDF is native or scanned." },
  { question: "Does it extract data from PDF tables?", answer: "Yes. Parsli's table detection engine identifies rows, columns, and cell boundaries in PDF tables — even complex multi-header tables. Data is extracted in a structured row/column format." },
  { question: "What about multi-page PDFs?", answer: "Multi-page PDFs are fully supported. A 10-page PDF counts as 10 pages against your quota. Parsli processes all pages and groups related data intelligently." },
  { question: "Which PDF types are supported?", answer: "All types: native/digital PDFs, scanned PDFs, image-based PDFs, fillable form PDFs, and password-protected PDFs (you provide the password). Encrypted PDFs without a password cannot be processed." },
  { question: "How accurate is PDF extraction?", answer: "Native PDFs: 99.9% accuracy. Scanned PDFs: 95-99% depending on scan quality. You can improve accuracy by creating templates for recurring document formats." },
];

export default function ParsliPDFParser() {
  return (
    <>
      <ParsliSEO
        title="PDF Parser - Extract Data From Any PDF Document"
        description="Parse native and scanned PDFs into structured data. Table extraction, OCR, 100+ languages. Extract invoices, contracts, forms, and more."
        path="/pdf-parser"
        keywords="PDF parser, extract data from PDF, PDF OCR, PDF table extraction, parse PDF online, PDF data extraction tool"
      />

      <ParsliNavigation />

      <ParsliHero
        variant="feature"
        badge="PDF Parser"
        badgeIcon={FileText}
        headline="Extract Data From Any PDF"
        highlightWord="Any PDF"
        subheadline="Native, scanned, or image-based — Parsli's dual engine handles every PDF type with table extraction, OCR, and 100+ language support."
        stats={[
          { value: "99.9%", label: "Native PDF Accuracy" },
          { value: "100+", label: "Languages Supported" },
          { value: "< 3s", label: "Per Page" },
        ]}
      />

      <ParsliHowItWorks
        headline="PDF Parsing Made Simple"
        subheadline="Upload → extract → deliver. That's it."
        steps={pdfSteps}
      />

      <ParsliFeatureGrid
        headline="PDF Parsing Capabilities"
        subheadline="Every feature you need for comprehensive PDF data extraction."
        features={pdfFeatures}
        columns={3}
      />

      <ParsliFAQ items={pdfFAQ} />

      <ParsliCTA
        headline="Parse Your First PDF Free"
        subheadline="Upload a PDF and see results in seconds. 26 free pages/month."
      />

      <ParsliFooter />
    </>
  );
}
