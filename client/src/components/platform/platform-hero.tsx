import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import AIWorkflowVisualization from "./ai-workflow-visualization";

export default function PlatformHero() {
  const [currentIndustry, setCurrentIndustry] = useState(0);

  const industries = [
    "Healthcare",
    "Insurance", 
    "FMCG",
    "Finance"
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
    <section className="gradient-overlay text-white section-padding pt-32 pb-20 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
          {/* Left: Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
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
                  className="text-green-400 inline-block"
                >
                  {industries[currentIndustry]}
                </motion.span>
              </AnimatePresence>
              <br />
              experts hours
            </h1>
            
            <p className="text-2xl text-white/90 mb-10 font-light" data-testid="hero-description">
              Upload documents. AI processes them. Results in your systems.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button
                onClick={handleBookDemo}
                className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 text-lg px-8"
                size="lg"
                data-testid="button-book-demo"
              >
                Book a Demo
              </Button>
              <Button
                onClick={() => scrollToSection("use-cases")}
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 text-lg px-8 backdrop-blur-sm"
                size="lg"
                data-testid="button-see-how"
              >
                See How It Works
              </Button>
            </div>

            {/* Simple Stats */}
            <div className="flex gap-8 pt-6 border-t border-white/20">
              <div data-testid="stat-faster">
                <div className="text-4xl font-bold mb-1">10x</div>
                <div className="text-sm text-white/70">Faster</div>
              </div>
              <div data-testid="stat-accuracy">
                <div className="text-4xl font-bold mb-1">99%</div>
                <div className="text-sm text-white/70">Accurate</div>
              </div>
              <div data-testid="stat-custom">
                <div className="text-4xl font-bold mb-1">Custom</div>
                <div className="text-sm text-white/70">Built for You</div>
              </div>
            </div>
          </motion.div>

          {/* Right: AI Workflow Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AIWorkflowVisualization />
          </motion.div>
        </div>
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.2),transparent_50%)]"></div>
    </section>
  );
}
