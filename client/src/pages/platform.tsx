import Navigation from "@/components/navigation";
import PlatformHero from "@/components/platform/platform-hero";
import PlatformProblem from "@/components/platform/platform-problem";
import ScrollSimulation from "@/components/platform/scroll-simulation";
import PlatformUseCases from "@/components/platform/platform-use-cases";
import PlatformValue from "@/components/platform/platform-value";
import SocialProof from "@/components/social-proof";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";
import ProductHuntBanner from "@/components/product-hunt-banner";

// Homepage structured data schemas
const homepageStructuredData = [
  // FAQPage schema for no-code questions
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need coding skills to use ByteBeam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, ByteBeam is designed for business users with no coding experience. If you can use Excel or Google Sheets, you can build AI agents with ByteBeam. Our spreadsheet-like interface makes document automation accessible to everyone."
        }
      },
      {
        "@type": "Question",
        "name": "How is ByteBeam different from other document automation tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike competitors that require developers and API integration, ByteBeam offers a no-code, Excel-like interface designed for business users. Subject matter experts can build and modify AI agents themselves without IT support."
        }
      },
      {
        "@type": "Question",
        "name": "What types of documents can ByteBeam process?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ByteBeam can process any document type including invoices, contracts, claims forms, labels, financial statements, compliance documents, and more. We support PDFs, images, scanned documents, and various file formats."
        }
      },
      {
        "@type": "Question",
        "name": "How accurate is ByteBeam's document extraction?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ByteBeam achieves 99% accuracy on document extraction with built-in confidence scores. Our human-in-the-loop system flags low-confidence extractions for human review, ensuring quality at scale."
        }
      }
    ]
  },
  // Product schema
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ByteBeam No-Code AI Document Automation",
    "description": "Build AI agents as easily as building a spreadsheet. No-code document automation platform for business users.",
    "brand": {
      "@type": "Brand",
      "name": "ByteBeam"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free demo available",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "50",
      "bestRating": "5"
    }
  },
  // WebPage schema
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "No-Code AI Document Automation | ByteBeam",
    "description": "Build AI agents as easily as building a spreadsheet. No coding required. ByteBeam empowers business users to automate document workflows with 99% accuracy.",
    "url": "https://bytebeam.co",
    "isPartOf": {
      "@type": "WebSite",
      "name": "ByteBeam",
      "url": "https://bytebeam.co"
    },
    "about": {
      "@type": "SoftwareApplication",
      "name": "ByteBeam",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web"
    }
  }
];

export default function Platform() {
  return (
    <div className="min-h-screen">
      <ProductHuntBanner />
      <SEO
        title="10x Faster Document Processing | No-Code AI Agents | ByteBeam"
        description="10x faster document processing with 99% accuracy. Build AI agents without developers—if you can use Excel, you can automate complex document workflows."
        ogTitle="10x Faster Document Processing | ByteBeam"
        ogDescription="Build AI agents without developers. 10x faster document processing with 99% accuracy. Used by Carrefour and government agencies."
        ogImage="https://bytebeam.co/og/homepage.png"
        keywords="no-code document automation, AI agents for business users, Excel-like automation, spreadsheet AI interface, document workflow automation, document automation without coding"
        canonical="https://bytebeam.co"
        structuredData={homepageStructuredData}
      />
      <Navigation />
      <PlatformHero />
      <PlatformProblem />
      <ScrollSimulation />
      <PlatformUseCases />
      <PlatformValue />
      <SocialProof />
      <CTASection />
      <Footer />
      <LiveChatWidget />
    </div>
  );
}
