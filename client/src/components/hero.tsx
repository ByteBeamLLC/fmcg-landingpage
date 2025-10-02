import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Package, FileText, Languages, Calculator, Eye, CheckCircle, Radio, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import beverageImg from "@assets/beverage_1759397164769.png";
import cleaningSprayImg from "@assets/cleaning-1_1759397164769.png";
import cosmeticImg from "@assets/cosmetic_1759397164769.png";
import chipsImg from "@assets/food_1759397164769.png";
import detergentImg from "@assets/cleaning-2_1759397164769.png";

export default function Hero() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

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

  // Main step rotation interval (3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
      setProgress(0); // Reset progress when step changes
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Progress bar animation (0 to 100 over 3 seconds)
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const duration = 3000;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 16); // ~60fps

    return () => clearInterval(progressInterval);
  }, [currentStep]);

  // Calculate position for each step in the carousel
  const getStepPosition = (index: number) => {
    const diff = index - currentStep;
    const position = diff >= 0 ? diff : steps.length + diff;
    
    // Normalize to -3 to +3 range for better visualization
    let normalizedPos = position;
    if (normalizedPos > steps.length / 2) {
      normalizedPos = normalizedPos - steps.length;
    }
    
    return normalizedPos;
  };

  const getStepStyle = (position: number) => {
    const absPos = Math.abs(position);
    
    if (position === 0) {
      // Active step - center, much larger
      return {
        scale: 1.3,
        opacity: 1,
        translateY: '0%',
        translateZ: 0,
        rotateX: 0,
        zIndex: 50,
        visible: true,
      };
    } else if (absPos === 1) {
      // Adjacent steps - medium size
      return {
        scale: 0.65,
        opacity: 0.6,
        translateY: position > 0 ? '110%' : '-110%',
        translateZ: -200,
        rotateX: position > 0 ? 20 : -20,
        zIndex: 40,
        visible: true,
      };
    } else if (absPos === 2) {
      // Far steps (2 away) - smaller
      return {
        scale: 0.4,
        opacity: 0.3,
        translateY: position > 0 ? '200%' : '-200%',
        translateZ: -350,
        rotateX: position > 0 ? 30 : -30,
        zIndex: 30,
        visible: true,
      };
    } else {
      // Beyond 2 steps - completely hidden
      return {
        scale: 0,
        opacity: 0,
        translateY: position > 0 ? '300%' : '-300%',
        translateZ: -500,
        rotateX: 0,
        zIndex: 0,
        visible: false,
      };
    }
  };

  return (
    <section className="gradient-overlay text-white section-padding pt-32 relative overflow-hidden">
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

          {/* 3D Vertical Carousel Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Floating 3D Product Objects around visualization */}
            <motion.img
              src={beverageImg}
              alt="Beverage Product"
              className="absolute -top-12 right-0 w-28 md:w-36 opacity-80 pointer-events-none z-10 floating-product-3d"
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              data-testid="floating-product-beverage"
            />
            <motion.img
              src={cleaningSprayImg}
              alt="Cleaning Product"
              className="absolute -bottom-16 left-8 w-32 md:w-40 opacity-75 pointer-events-none z-10 floating-product-3d"
              animate={{
                y: [0, 18, 0],
                rotate: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              data-testid="floating-product-cleaning-spray"
            />
            <motion.img
              src={cosmeticImg}
              alt="Cosmetic Product"
              className="absolute -top-8 left-4 w-24 md:w-28 opacity-70 pointer-events-none z-10 floating-product-3d"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              data-testid="floating-product-cosmetic"
            />
            <motion.img
              src={chipsImg}
              alt="Food Product"
              className="absolute -bottom-12 right-4 w-28 md:w-32 opacity-65 pointer-events-none z-10 floating-product-3d"
              animate={{
                y: [0, -18, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              data-testid="floating-product-chips"
            />
            <motion.img
              src={detergentImg}
              alt="Cleaning Product"
              className="absolute top-8 right-2 w-28 md:w-36 opacity-70 pointer-events-none z-10 floating-product-3d"
              animate={{
                y: [0, 20, 0],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
              data-testid="floating-product-detergent"
            />
            <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl backdrop-blur-3xl" />
              
              {/* 3D Carousel Container */}
              <div 
                className="relative w-full h-full flex items-center justify-center"
                style={{ perspective: '1200px' }}
              >
                {steps.map((step, index) => {
                  const position = getStepPosition(index);
                  const style = getStepStyle(position);
                  const StepIcon = step.icon;
                  const isActive = position === 0;
                  const isPast = position < 0;
                  
                  // Only render if visible (within 2 steps)
                  if (!style.visible) return null;
                  
                  return (
                    <motion.div
                      key={step.id}
                      initial={false}
                      animate={{
                        scale: style.scale,
                        opacity: style.opacity,
                        y: style.translateY,
                        z: style.translateZ,
                        rotateX: style.rotateX,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      style={{
                        position: 'absolute',
                        zIndex: style.zIndex,
                        transformStyle: 'preserve-3d',
                      }}
                      className="w-96"
                      data-testid={`step-${step.id}`}
                    >
                      <div className={`
                        flex items-center gap-4 px-6 py-5 rounded-2xl border-2 
                        ${isActive 
                          ? 'bg-white/20 border-transparent shadow-2xl backdrop-blur-xl' 
                          : 'bg-white/5 border-white/20 backdrop-blur-sm'
                        }
                        transition-all duration-700
                      `}>
                        {/* Icon */}
                        <div className={`
                          flex-shrink-0 rounded-xl flex items-center justify-center
                          bg-gradient-to-br ${step.color}
                          ${isActive ? 'w-24 h-24 shadow-2xl' : 'w-14 h-14'}
                          transition-all duration-700
                        `}>
                          <StepIcon className="text-white" size={isActive ? 48 : 28} />
                        </div>
                        
                        {/* Text */}
                        <div className="flex-1">
                          <div className={`
                            font-bold text-white mb-1
                            ${isActive ? 'text-2xl' : 'text-base'}
                            transition-all duration-700
                          `}>
                            {step.title}
                          </div>
                          <div className={`
                            text-white/80
                            ${isActive ? 'text-base' : 'text-xs'}
                            transition-all duration-700
                          `}>
                            {step.description}
                          </div>
                        </div>

                        {/* Checkmark for completed */}
                        {isPast && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex-shrink-0"
                            data-testid={`checkmark-step-${step.id}`}
                          >
                            <CheckCircle className="text-accent" size={24} />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Animated Progress Indicator Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-[60]" data-testid="progress-dots-container">
                {steps.map((step) => {
                  const isActive = currentStep === step.id;
                  const isPast = step.id < currentStep;
                  
                  return (
                    <div
                      key={step.id}
                      className="relative"
                      data-testid={`progress-dot-${step.id}`}
                    >
                      {/* Background track */}
                      <div className={`
                        h-2 rounded-full transition-all duration-500
                        ${isActive ? 'w-12 bg-white/30' : isPast ? 'w-2 bg-white' : 'w-2 bg-white/30'}
                      `} />
                      
                      {/* Animated fill for active dot */}
                      {isActive && (
                        <motion.div
                          className="absolute top-0 left-0 h-2 bg-white rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      )}
                    </div>
                  );
                })}
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
