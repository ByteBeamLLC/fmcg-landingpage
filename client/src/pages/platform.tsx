import Navigation from "@/components/navigation";
import PlatformHero from "@/components/platform/platform-hero";
import PlatformProblem from "@/components/platform/platform-problem";
import PlatformApproach from "@/components/platform/platform-approach";
import PlatformUseCases from "@/components/platform/platform-use-cases";
import PlatformValue from "@/components/platform/platform-value";
import SocialProof from "@/components/social-proof";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";

export default function Platform() {
  return (
    <div className="min-h-screen">
      <SEO
        title="ByteBeam | AI Agent Platform for Document-Heavy Workflows"
        description="Transform complex, repetitive knowledge work with AI agents. ByteBeam automates document processing, analysis, and compliance workflows to free experts for higher-value tasks."
        ogTitle="ByteBeam | AI Agent Platform for Document-Heavy Workflows"
        ogDescription="Automate document-heavy, analysis-intensive processes with intelligent AI agents. From compliance to data extraction—built for experts who need reliable automation."
        keywords="AI agents, document automation, knowledge work automation, compliance automation, AI workflow platform, intelligent document processing"
      />
      <Navigation />
      <PlatformHero />
      <PlatformProblem />
      <PlatformApproach />
      <PlatformUseCases />
      <PlatformValue />
      <SocialProof />
      <CTASection />
      <Footer />
      <LiveChatWidget />
    </div>
  );
}
