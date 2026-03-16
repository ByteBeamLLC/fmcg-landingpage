import { Upload, Zap, Brain, BarChart3, Clock, Shield, DollarSign, Users } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliTrustBar from "../components/ParsliTrustBar";
import ParsliPainPoints from "../components/ParsliPainPoints";
import ParsliDocumentDemo from "../components/ParsliDocumentDemo";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliHowItWorks from "../components/ParsliHowItWorks";
import ParsliIntegrationGrid from "../components/ParsliIntegrationGrid";
import ParsliPricing from "../components/ParsliPricing";
import ParsliTestimonials from "../components/ParsliTestimonials";
import ParsliCTA from "../components/ParsliCTA";
import { CORE_FEATURES } from "../data/features";

export default function ParsliLanding() {
  return (
    <>
      <ParsliSEO
        title="AI Document Extraction Made Simple"
        description="Parse emails, PDFs, and documents into structured data automatically. 99.5% accuracy, 50+ formats, 5000+ integrations. Free 26 pages/month."
        path=""
        keywords="document parser, email parser, PDF parser, data extraction, invoice parser, OCR, document automation, Parseur alternative"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Parsli",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: "AI-powered document extraction platform",
            url: "https://parser.bytebeam.co",
            offers: {
              "@type": "AggregateOffer",
              lowPrice: "0",
              highPrice: "499",
              priceCurrency: "USD",
              offerCount: 7,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "127",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Parsli",
            url: "https://parser.bytebeam.co",
          },
        ]}
      />

      <ParsliNavigation />

      <ParsliHero
        variant="landing"
        headline="Turn Any Document Into Structured Data"
        highlightWord="Structured Data"
        subheadline="Parsli uses AI to extract data from emails, PDFs, invoices, and documents — then sends it anywhere you need. No coding required."
        stats={[
          { value: "99.5%", label: "Extraction Accuracy" },
          { value: "< 5s", label: "Average Parse Time" },
          { value: "50+", label: "Document Formats" },
          { value: "5,000+", label: "App Integrations" },
        ]}
        ctaText="Start Free — 26 Pages/Month"
        ctaHref="/parsli/pricing"
        secondaryCta="See How It Works"
        secondaryHref="/parsli/how-it-works"
      />

      <ParsliTrustBar />

      <ParsliPainPoints
        headline="Manual Data Entry is Killing Productivity"
        subheadline="Your team spends hours copying data from documents into spreadsheets and systems."
        items={[
          { value: "$15", label: "Average cost to process one document manually" },
          { value: "15 min", label: "Time per document with copy-paste workflows" },
          { value: "4%", label: "Error rate in manual data entry" },
        ]}
      />

      <ParsliDocumentDemo />

      <ParsliHowItWorks
        headline="Three Steps to Automated Extraction"
        subheadline="Set up your parser once, then let Parsli handle the rest — automatically."
        steps={[
          {
            step: "1",
            title: "Connect Your Source",
            description: "Forward emails to your Parsli inbox, upload documents via API, or connect cloud storage like Google Drive and Dropbox. Parsli accepts PDFs, images, spreadsheets, and 50+ other formats.",
            icon: Upload,
          },
          {
            step: "2",
            title: "AI Extracts Your Data",
            description: "Parsli's AI automatically detects document layouts and extracts the fields you need — vendor names, amounts, dates, line items, and more. No template setup required for most documents.",
            icon: Brain,
          },
          {
            step: "3",
            title: "Data Goes Where You Need It",
            description: "Extracted data is instantly delivered to Google Sheets, your database, Zapier workflows, Slack channels, or any webhook endpoint. Structured, clean, and ready to use.",
            icon: Zap,
          },
        ]}
      />

      <ParsliFeatureGrid
        headline="Everything You Need to Automate Document Processing"
        subheadline="Powerful AI extraction with the integrations and flexibility your team demands."
        features={CORE_FEATURES.slice(0, 9)}
        columns={3}
      />

      <ParsliIntegrationGrid />

      <ParsliPricing compact />

      <ParsliTestimonials />

      <ParsliCTA
        headline="Start Extracting Data in Minutes"
        subheadline="Free forever with 26 pages/month. No credit card required. Setup takes under 2 minutes."
        ctaText="Start Free"
        ctaHref="/parsli/pricing"
        secondaryCta="View Pricing"
        secondaryHref="/parsli/pricing"
      />

      <ParsliFooter />
    </>
  );
}
