import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import takhleesLogo from "@assets/takhlees_logo_1759326324559.webp";
import carrefourLogo from "@assets/carrefour_1759413703784.png";
import infoquestLogo from "@assets/infoquest-logo-black_1759405455898.png";
import dldLogo from "@assets/dld.png";
import AutomationDemo from "@/components/automation-demo";

export default function PlatformHero() {
  const [currentIndustry, setCurrentIndustry] = useState(0);

  const industries = [
    "FMCG",
    "Real Estate",
    "Pharma",
    "Healthcare",
    "Finance",
    "Banking",
    "Supply Chain",
    "Tax",
    "Legal",
    "Insurance"
  ];

  const trustedLogos = [
    { id: "carrefour", name: "Carrefour", logo: carrefourLogo, className: "max-w-[140px]" },
    { id: "takhlees", name: "Takhlees", logo: takhleesLogo, className: "max-w-[180px]" },
    { id: "infoquest", name: "InfoQuest", logo: infoquestLogo, className: "max-w-[170px]" },
    { id: "dld", name: "Dubai Land Department", logo: dldLogo, className: "max-w-[200px] contrast-125 brightness-90" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  // Rotate industries every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndustry((prev) => (prev + 1) % industries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding pt-32 pb-20 relative overflow-hidden bg-[#fafbfc] text-slate-900">
      <div className="container-custom relative z-10">
        <div className="relative max-w-5xl mx-auto">
          {/* Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6 uppercase tracking-wider">
              No Code Required
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Build AI Agents<br />
              Like Building a<br />
              <span className="text-primary drop-shadow-[0_0_12px_rgba(15,91,216,0.2)]">Spreadsheet</span>
            </h1>

            <p className="text-2xl text-slate-600 mb-4 font-light max-w-3xl mx-auto" data-testid="hero-description">
              No coding required. If you can use Excel, you can build AI agents that automate document work in minutes.
            </p>

            <div className="text-xl text-slate-500 mb-10">
              Perfect for{" "}
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndustry}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block text-primary font-medium"
                >
                  {industries[currentIndustry]}
                </motion.span>
              </AnimatePresence>
              {" "}teams
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button
                onClick={handleBookDemo}
                className="bg-primary text-white hover:bg-primary/90 text-lg px-8"
                size="lg"
                data-testid="button-book-demo"
              >
                Book a Demo
              </Button>
              <Button
                onClick={() => scrollToSection("use-cases")}
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-white/60 text-lg px-8 backdrop-blur-sm"
                size="lg"
                data-testid="button-see-how"
              >
                See How It Works
              </Button>
            </div>

            {/* Simple Stats */}
            <div className="flex justify-center gap-8 pt-6 border-t border-slate-200">
              <div data-testid="stat-faster">
                <div className="text-4xl font-bold mb-1">10x</div>
                <div className="text-sm text-slate-500">Faster</div>
              </div>
              <div data-testid="stat-accuracy">
                <div className="text-4xl font-bold mb-1">99%</div>
                <div className="text-sm text-slate-500">Accurate</div>
              </div>
              <div data-testid="stat-custom">
                <div className="text-4xl font-bold mb-1">Zero</div>
                <div className="text-sm text-slate-500">Coding Needed</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-14"
              data-testid="trusted-by"
            >
              <div className="text-xs md:text-sm uppercase tracking-[0.4em] text-slate-500 mb-8">
                Trusted by teams that move fast
              </div>
              <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-90">
                {trustedLogos.map((logo) => (
                  <div
                    key={logo.id}
                    className="flex h-16 md:h-20 w-36 md:w-44 items-center justify-center"
                  >
                    <img
                      src={logo.logo}
                      alt={`${logo.name} logo`}
                      className={`max-h-full max-w-full object-contain drop-shadow-[0_0_40px_rgba(15,91,216,0.25)] transition-opacity hover:opacity-100 opacity-80 ${logo.className ?? ""}`}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* V7-style Demo Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 relative"
          >
            {/* Demo Card */}
            <div className="relative max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.15)] overflow-hidden">
                <AutomationDemo
                  autoRotate={true}
                  rotateInterval={3000}
                  showSelector={false}
                />
              </div>

              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 to-transparent pointer-events-none rounded-b-2xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* V7-style soft gradient blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none bg-[radial-gradient(circle,rgba(39,130,255,0.12)_0%,transparent_70%)] -translate-x-1/4 -translate-y-1/4"></div>
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] pointer-events-none bg-[radial-gradient(circle,rgba(147,197,253,0.15)_0%,transparent_70%)] translate-x-1/4"></div>
      <div className="absolute bottom-0 left-1/3 w-[700px] h-[500px] pointer-events-none bg-[radial-gradient(ellipse,rgba(39,130,255,0.08)_0%,transparent_70%)] translate-y-1/4"></div>
    </section>
  );
}
