import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import takhleesLogo from "@assets/takhlees_logo_1759326324559.webp";
import carrefourLogo from "@assets/carrefour_1759413703784.png";
import infoquestLogo from "@assets/infoquest-logo-black_1759405455898.png";
import dldLogo from "@assets/dld.png";

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
    { id: "dld", name: "Dubai Land Department", logo: dldLogo, className: "max-w-[150px]" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  // Rotate industries every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndustry((prev) => (prev + 1) % industries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-padding pt-32 pb-20 relative overflow-hidden dynamic-gradient text-slate-900">
      <div className="container-custom relative z-10">
        <div className="relative max-w-5xl mx-auto">
          {/* Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Automate work<br />
              that takes<br />
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndustry}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block text-primary font-semibold drop-shadow-[0_0_12px_rgba(15,91,216,0.2)]"
                >
                  {industries[currentIndustry]}
                </motion.span>
              </AnimatePresence>
              <br />
              experts hours
            </h1>

            <p className="text-2xl text-slate-600 mb-10 font-light max-w-3xl mx-auto" data-testid="hero-description">
              Your experts spend hours on paperwork. Our AI finishes it in minutes.
            </p>

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
                <div className="text-4xl font-bold mb-1">Custom</div>
                <div className="text-sm text-slate-500">Built for You</div>
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
        </div>
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.15),transparent_55%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.12),transparent_55%)]"></div>
    </section>
  );
}
