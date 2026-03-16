import { Brain, Mail, FileText, Eye, Layers, Zap, Code, Webhook, RefreshCw, Database, Shield, Globe } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliIntegrationGrid from "../components/ParsliIntegrationGrid";
import ParsliTrustBar from "../components/ParsliTrustBar";
import ParsliCTA from "../components/ParsliCTA";
import { CORE_FEATURES } from "../data/features";

export default function ParsliFeaturesPage() {
  return (
    <>
      <ParsliSEO
        title="Features - AI Document Extraction Platform"
        description="Explore Parsli's full feature set: AI extraction, template parsing, OCR, email parsing, API access, 5000+ integrations, and enterprise security."
        path="/features"
        keywords="document parser features, AI extraction, OCR, email parser, PDF parser, document automation features"
      />

      <ParsliNavigation />

      <ParsliHero
        variant="feature"
        badge="Features"
        badgeIcon={Brain}
        headline="Every Feature You Need to Automate Documents"
        highlightWord="Automate Documents"
        subheadline="From AI-powered extraction to 5,000+ integrations — Parsli handles your entire document processing pipeline."
        ctaText="Start Free"
        secondaryCta="View Pricing"
        secondaryHref="/parsli/pricing"
      />

      <ParsliTrustBar />

      <ParsliFeatureGrid
        headline="AI-Powered Extraction Engine"
        subheadline="Two powerful parsing engines work together — AI for new layouts, templates for consistent formats."
        features={CORE_FEATURES.slice(0, 6)}
        columns={3}
      />

      <ParsliFeatureGrid
        headline="Integrations & Developer Tools"
        subheadline="Connect Parsli to your existing workflow with zero code or full API access."
        features={CORE_FEATURES.slice(6)}
        columns={3}
      />

      <ParsliIntegrationGrid />

      <ParsliCTA
        headline="See These Features in Action"
        subheadline="Start with 26 free pages/month. No credit card required."
      />

      <ParsliFooter />
    </>
  );
}
