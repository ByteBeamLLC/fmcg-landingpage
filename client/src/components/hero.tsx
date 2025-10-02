import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Package, FileText, Languages, Calculator, Eye, CheckCircle, Radio, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentStep, setCurrentStep] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const steps = [
    {
      id: 0,
      icon: Package,
      title: "Product Label",
      description: "Upload packaging",
      color: "from-blue-500 to-blue-600",
      iconColor: "text-blue-400"
    },
    {
      id: 1,
      icon: FileText,
      title: "Extract Data",
      description: "AI reads all info",
      color: "from-purple-500 to-purple-600",
      iconColor: "text-purple-400"
    },
    {
      id: 2,
      icon: Languages,
      title: "Translate",
      description: "English → Arabic",
      color: "from-pink-500 to-pink-600",
      iconColor: "text-pink-400"
    },
    {
      id: 3,
      icon: Calculator,
      title: "Calculate",
      description: "Nutrition values",
      color: "from-orange-500 to-orange-600",
      iconColor: "text-orange-400"
    },
    {
      id: 4,
      icon: Eye,
      title: "Detect",
      description: "Halal & certifications",
      color: "from-green-500 to-green-600",
      iconColor: "text-green-400"
    },
    {
      id: 5,
      icon: CheckCircle,
      title: "Generate",
      description: "Compliant label",
      color: "from-teal-500 to-teal-600",
      iconColor: "text-teal-400"
    },
    {
      id: 6,
      icon: Radio,
      title: "Monitor",
      description: "Track rule changes",
      color: "from-indigo-500 to-indigo-600",
      iconColor: "text-indigo-400"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="gradient-overlay text-white section-padding pt-32">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Beyond Buzz. Real Impact.
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Turn Any Product Label Into GCC-Compliant Labels
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              AI extracts data, translates to Arabic, validates regulations, and creates compliant labels in minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 animate-pulse"
                size="lg"
                data-testid="button-request-demo-hero"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Request a Demo
              </Button>
              <Button
                onClick={() => scrollToSection("how-it-works")}
                className="bg-white/20 border-2 border-white text-white hover:bg-white hover:text-primary backdrop-blur-sm"
                size="lg"
                data-testid="button-see-how-it-works"
              >
                <Zap className="mr-2 h-5 w-5" />
                See How It Works
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-8">
              <div>
                <div className="text-4xl font-bold font-display" data-testid="stat-skus-processed">10K+</div>
                <div className="text-white/80">SKUs Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold font-display" data-testid="stat-faster-processing">70%</div>
                <div className="text-white/80">Faster Processing</div>
              </div>
              <div>
                <div className="text-4xl font-bold font-display" data-testid="stat-knowledge-work">60%</div>
                <div className="text-white/80">Work Accelerated</div>
              </div>
            </div>
          </motion.div>

          {/* Animated Process Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl backdrop-blur-3xl" />
              
              {/* Step Flow Container */}
              <div className="relative z-10 w-full max-w-md">
                {/* All Steps Display */}
                <div className="flex flex-col gap-4">
                  {steps.map((step, index) => {
                    const isActive = index === currentStep;
                    const isPast = index < currentStep;
                    const StepIcon = step.icon;
                    
                    return (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: isActive ? 1 : isPast ? 0.6 : 0.3,
                          x: 0,
                          scale: isActive ? 1.05 : 1
                        }}
                        transition={{ 
                          duration: 0.5,
                          delay: index * 0.05
                        }}
                        className="relative"
                        data-testid={`step-${step.id}`}
                      >
                        <div className={`
                          flex items-center gap-4 p-4 rounded-xl border-2 
                          ${isActive 
                            ? 'bg-white/20 border-white shadow-2xl backdrop-blur-xl' 
                            : 'bg-white/5 border-white/20 backdrop-blur-sm'
                          }
                          transition-all duration-500
                        `}>
                          {/* Icon */}
                          <div className={`
                            flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center
                            bg-gradient-to-br ${step.color}
                            ${isActive ? 'shadow-lg' : ''}
                            transition-all duration-500
                          `}>
                            <StepIcon className="text-white" size={28} />
                          </div>
                          
                          {/* Text */}
                          <div className="flex-1">
                            <div className="font-bold text-white text-lg">{step.title}</div>
                            <div className="text-white/80 text-sm">{step.description}</div>
                          </div>

                          {/* Active Indicator */}
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex-shrink-0 w-3 h-3 bg-white rounded-full"
                            />
                          )}

                          {/* Checkmark for completed */}
                          {isPast && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex-shrink-0"
                            >
                              <CheckCircle className="text-accent" size={20} />
                            </motion.div>
                          )}
                        </div>

                        {/* Connection Line */}
                        {index < steps.length - 1 && (
                          <div className="ml-10 w-0.5 h-4 bg-gradient-to-b from-white/40 to-white/20" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 flex justify-center gap-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`
                        h-1.5 rounded-full transition-all duration-500
                        ${currentStep === step.id ? 'w-8 bg-white' : 'w-1.5 bg-white/30'}
                      `}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Particles */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 w-4 h-4 bg-white rounded-full blur-sm"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-20 left-10 w-3 h-3 bg-accent rounded-full blur-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
