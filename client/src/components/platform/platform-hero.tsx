import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Brain, FileText, MessageSquare, Zap } from "lucide-react";

export default function PlatformHero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <section className="gradient-overlay text-white section-padding pt-32 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6" data-testid="hero-badge">
              <span className="text-sm font-semibold">Automate Knowledge Work</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
              Custom AI Agents for Complex Business Processes
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed" data-testid="hero-description">
              Transform document-heavy workflows that require expert analysis into automated processes. 
              We build tailored AI agents that integrate with your systems and work in the background.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                onClick={handleBookDemo}
                className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 text-lg"
                size="lg"
                data-testid="button-book-discovery"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Discovery Call
              </Button>
              <Button
                onClick={() => scrollToSection("use-cases")}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg"
                size="lg"
                data-testid="button-explore-use-cases"
              >
                Explore Use Cases
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div data-testid="stat-processing-time">
                <div className="text-3xl font-bold mb-1">60%</div>
                <div className="text-sm text-white/80">Faster Processing</div>
              </div>
              <div data-testid="stat-integration">
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm text-white/80">System Integration</div>
              </div>
              <div data-testid="stat-custom">
                <div className="text-3xl font-bold mb-1">Custom</div>
                <div className="text-sm text-white/80">Built for You</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-center">What We Automate</h3>
              
              <div className="space-y-4">
                {[
                  { icon: FileText, text: "Document Analysis & Processing", delay: 0.1 },
                  { icon: Brain, text: "Multi-Step Expert Reasoning", delay: 0.2 },
                  { icon: MessageSquare, text: "Content Generation & Reports", delay: 0.3 },
                  { icon: Zap, text: "System Integration & Updates", delay: 0.4 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    className="flex items-center gap-4 bg-white/5 rounded-lg p-4 border border-white/10"
                    data-testid={`capability-${index}`}
                  >
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-lg font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 text-center">
                <p className="text-white/80 text-sm">
                  Not a one-size-fits-all solution. <br />
                  <span className="font-semibold text-white">Built specifically for your process.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.2),transparent_50%)]"></div>
    </section>
  );
}
