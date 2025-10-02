import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function PlatformHero() {
  const [currentIndustry, setCurrentIndustry] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const industries = [
    "Healthcare",
    "Insurance", 
    "FMCG",
    "Finance"
  ];

  const workflowSteps = [
    {
      files: ["Patient_Records.pdf", "Discharge_Summary.pdf", "Lab_Results.pdf"],
      industry: "Healthcare"
    },
    {
      files: ["Claim_Form.pdf", "Policy_Document.pdf", "Supporting_Evidence.pdf"],
      industry: "Insurance"
    },
    {
      files: ["Product_Label.jpg", "Nutrition_Facts.pdf", "Ingredients_List.pdf"],
      industry: "FMCG"
    },
    {
      files: ["Financial_Statement.pdf", "Invoice_2024.pdf", "Contract_Agreement.pdf"],
      industry: "Finance"
    }
  ];

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

  // Animate workflow steps
  useEffect(() => {
    const stepTimer = setTimeout(() => {
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
      }
    }, 1500);
    
    return () => clearTimeout(stepTimer);
  }, [currentStep, currentIndustry]);

  // Reset steps when industry changes
  useEffect(() => {
    setCurrentStep(0);
  }, [currentIndustry]);

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
              Automate work that takes{" "}
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
                onClick={handleBookDemo}
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

          {/* Right: Visual Workflow Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
              {/* Step 1: Upload Documents */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentStep >= 0 ? 'bg-green-500' : 'bg-white/20'
                  }`}>
                    {currentStep >= 1 ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">1</span>
                    )}
                  </div>
                  <span className="text-white/90 font-medium">Upload Documents</span>
                </div>
                
                <div className="space-y-2 ml-10">
                  <AnimatePresence>
                    {workflowSteps[currentIndustry].files.map((file, idx) => (
                      <motion.div
                        key={`${currentIndustry}-${file}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-white/5"
                        data-testid={`file-${idx}`}
                      >
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-white/90 font-mono">{file}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Step 2: AI Processing */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentStep >= 1 ? 'bg-green-500' : 'bg-white/20'
                  }`}>
                    {currentStep >= 2 ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : currentStep === 1 ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <span className="text-white text-sm font-bold">2</span>
                    )}
                  </div>
                  <span className="text-white/90 font-medium">AI Agent Processes</span>
                </div>
                
                {currentStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="ml-10 bg-purple-500/20 border border-purple-400/30 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 text-purple-200">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                      <span className="text-sm">Analyzing documents...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Step 3: Results */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    currentStep >= 2 ? 'bg-green-500' : 'bg-white/20'
                  }`}>
                    {currentStep >= 2 ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">3</span>
                    )}
                  </div>
                  <span className="text-white/90 font-medium">Results Ready</span>
                </div>
                
                {currentStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ml-10 space-y-2"
                  >
                    <div className="flex items-center gap-3 bg-green-500/20 border border-green-400/30 rounded-lg p-3">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-white/90">Report generated</span>
                    </div>
                    <div className="flex items-center gap-3 bg-green-500/20 border border-green-400/30 rounded-lg p-3">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-white/90">Database updated</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-4 text-center text-white/60 text-sm"
            >
              Works with your existing systems
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.2),transparent_50%)]"></div>
    </section>
  );
}
