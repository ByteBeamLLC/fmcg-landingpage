import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, FileText, Languages, ShieldCheck, Zap } from "lucide-react";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
              Accelerate GCC Product Approvals in Days, Not Months
            </h1>
            <p className="text-xl mb-8 text-white/90 leading-relaxed">
              ByteBeam's AI agent automates FMCG label compliance and localization for imported products. Extract, translate, and validate against local regulations—bringing hundreds of new SKUs to market faster.
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
                <div className="text-4xl font-bold font-display" data-testid="stat-skus-processed">1K+</div>
                <div className="text-white/80">SKUs Processed</div>
              </div>
              <div>
                <div className="text-4xl font-bold font-display" data-testid="stat-faster-processing">70%</div>
                <div className="text-white/80">Faster Processing</div>
              </div>
              <div>
                <div className="text-4xl font-bold font-display" data-testid="stat-knowledge-work">60%</div>
                <div className="text-white/80">Knowledge Work Accelerated</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract Platform Visualization */}
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Background Gradient Mesh */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl backdrop-blur-3xl" />
              
              {/* Animated Workflow Nodes */}
              <div className="relative z-10 flex flex-col gap-8 items-center">
                {/* Extract Node */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/30">
                    <FileText className="text-white" size={48} />
                  </div>
                  <div className="text-white">
                    <div className="font-bold text-lg">Extract</div>
                    <div className="text-white/70 text-sm">Product Data</div>
                  </div>
                </motion.div>

                {/* Connection Line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="w-1 h-12 bg-gradient-to-b from-white/50 to-white/20"
                />

                {/* Translate Node */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex items-center gap-4"
                >
                  <div className="text-white text-right">
                    <div className="font-bold text-lg">Translate</div>
                    <div className="text-white/70 text-sm">To Arabic</div>
                  </div>
                  <div className="bg-white/20 dark:bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/30">
                    <Languages className="text-white" size={48} />
                  </div>
                </motion.div>

                {/* Connection Line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="w-1 h-12 bg-gradient-to-b from-white/50 to-white/20"
                />

                {/* Validate Node */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex items-center gap-4"
                >
                  <div className="bg-gradient-to-br from-accent to-accent/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-accent/50">
                    <ShieldCheck className="text-white" size={48} />
                  </div>
                  <div className="text-white">
                    <div className="font-bold text-lg">Validate</div>
                    <div className="text-white/70 text-sm">GCC Compliance</div>
                  </div>
                </motion.div>
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
