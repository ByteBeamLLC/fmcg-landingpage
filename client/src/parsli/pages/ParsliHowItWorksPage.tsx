import { Upload, Brain, Zap, Settings, CheckCircle2, ArrowRight } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliHowItWorks from "../components/ParsliHowItWorks";
import ParsliDocumentDemo from "../components/ParsliDocumentDemo";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";

const detailedSteps = [
  {
    step: "1",
    title: "Connect Your Document Sources",
    description: "Forward emails to your unique Parsli inbox, upload files via the dashboard or API, or connect cloud storage like Google Drive and Dropbox. Parsli watches your sources and automatically picks up new documents as they arrive.",
    icon: Upload,
  },
  {
    step: "2",
    title: "Configure Your Parser (Optional)",
    description: "For most documents, Parsli's AI works out of the box — no setup needed. For recurring document formats, create a template by selecting fields with point-and-click. The AI learns your preferences and improves over time.",
    icon: Settings,
  },
  {
    step: "3",
    title: "AI Extracts Structured Data",
    description: "Parsli's dual-engine (AI + template) analyzes each document, detects the layout, and extracts every field you need — names, dates, amounts, line items, addresses, and more. Built-in OCR handles scanned docs and images.",
    icon: Brain,
  },
  {
    step: "4",
    title: "Review & Validate (If Needed)",
    description: "High-confidence extractions go straight through. Lower-confidence results are flagged for quick human review. Every correction teaches the AI, so accuracy improves with each document you process.",
    icon: CheckCircle2,
  },
  {
    step: "5",
    title: "Data Flows to Your Tools",
    description: "Extracted data is instantly delivered to Google Sheets, your database, CRM, ERP, or any of 5,000+ apps via Zapier, Make, Power Automate, webhooks, or our REST API. Clean, structured, and ready to use.",
    icon: Zap,
  },
];

const faqItems = [
  {
    question: "How long does it take to set up Parsli?",
    answer: "Most users are up and running in under 2 minutes. Just forward an email or upload a document, and Parsli starts extracting immediately. No coding or template setup required for AI mode.",
  },
  {
    question: "Do I need to create a template for every document type?",
    answer: "No. Parsli's AI mode works without templates — it automatically detects document layouts and extracts fields. Templates are optional, for when you want pixel-perfect control over recurring document formats.",
  },
  {
    question: "How does the AI learn from my corrections?",
    answer: "When you correct an extraction result, Parsli stores that feedback. Over time, the AI adapts to your specific document types and business terminology, improving accuracy from ~95% to 99%+ on recurring formats.",
  },
  {
    question: "Can Parsli handle handwritten documents?",
    answer: "Yes. Parsli includes OCR that can read handwritten text, printed text, and mixed documents. Accuracy varies by handwriting quality, but most clear handwriting achieves 90%+ accuracy.",
  },
  {
    question: "What happens if the AI can't extract a field?",
    answer: "Low-confidence fields are flagged for human review in your dashboard. You can set confidence thresholds — only fields below your threshold require review. Most well-formatted documents extract at 99%+ confidence.",
  },
];

export default function ParsliHowItWorksPage() {
  return (
    <>
      <ParsliSEO
        title="How It Works - From Document to Data in Seconds"
        description="See how Parsli extracts structured data from documents in 5 simple steps. AI-powered, no code required, instant results."
        path="/how-it-works"
        keywords="how document parser works, automated data extraction process, AI document processing steps"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Extract Data from Documents with Parsli",
            description: "Step-by-step guide to automating document data extraction",
            step: detailedSteps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.description,
            })),
          },
        ]}
      />

      <ParsliNavigation />

      <ParsliHero
        variant="feature"
        badge="How It Works"
        badgeIcon={ArrowRight}
        headline="From Document to Data in Seconds"
        highlightWord="Seconds"
        subheadline="Five simple steps to automate your entire document processing pipeline. No coding required."
      />

      <ParsliDocumentDemo />

      <ParsliHowItWorks
        headline="The Full Process, Step by Step"
        subheadline="Here's exactly what happens when a document enters Parsli."
        steps={detailedSteps}
      />

      <ParsliFAQ items={faqItems} />

      <ParsliCTA
        headline="Ready to Try It Yourself?"
        subheadline="Upload your first document and see results in seconds. Free 26 pages/month."
        ctaText="Start Free"
      />

      <ParsliFooter />
    </>
  );
}
