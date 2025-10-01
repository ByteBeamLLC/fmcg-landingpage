import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import PainPoints from "@/components/pain-points";
import IndustrySolutions from "@/components/industry-solutions";
import HowItWorks from "@/components/how-it-works";
import CoreCapabilities from "@/components/core-capabilities";
import VisualDemo from "@/components/visual-demo";
import SocialProof from "@/components/social-proof";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <PainPoints />
      <IndustrySolutions />
      <HowItWorks />
      <CoreCapabilities />
      <VisualDemo />
      <SocialProof />
      <CTASection />
      <Footer />
    </div>
  );
}
