import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import PainPoints from "@/components/pain-points";
import HowItWorks from "@/components/how-it-works";
import CoreCapabilities from "@/components/core-capabilities";
import SocialProof from "@/components/social-proof";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SEO
        title="FMCG Label Compliance & Localization | AI Automation for GCC Markets | ByteBeam"
        description="Accelerate GCC product approvals in days, not months. ByteBeam's AI agent automates FMCG label compliance, translation, and localization for imported products across all categories."
        ogTitle="AI-Powered FMCG Label Compliance & Localization for GCC Markets"
        ogDescription="Automate regional approvals for FMCG products. Extract, translate, and validate against local regulations—bringing hundreds of new SKUs to market faster."
        keywords="FMCG label compliance, GCC product approval, label localization, Arabic translation, halal certification, nutrition labeling, regulatory compliance, food label automation"
      />
      <Navigation />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <CoreCapabilities />
      <SocialProof />
      <CTASection />
      <Footer />
      <LiveChatWidget />
    </div>
  );
}
