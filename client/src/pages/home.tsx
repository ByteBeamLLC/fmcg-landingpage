import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import PainPoints from "@/components/pain-points";
import HowItWorks from "@/components/how-it-works";
import CoreCapabilities from "@/components/core-capabilities";
import SocialProof from "@/components/social-proof";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";

export default function Home() {
  return (
    <div className="min-h-screen">
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
