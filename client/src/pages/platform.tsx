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

export default function Platform() {
  return (
    <div className="min-h-screen">
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
