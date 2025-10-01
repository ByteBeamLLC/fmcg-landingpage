import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, PlayCircle } from "lucide-react";

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
                className="bg-white text-primary hover:bg-gray-100 animate-pulse"
                size="lg"
                data-testid="button-request-demo-hero"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Request a Demo
              </Button>
              <Button
                onClick={() => scrollToSection("how-it-works")}
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-primary"
                size="lg"
                data-testid="button-see-how-it-works"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
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
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-muted-foreground">Product Label Preview</span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-bold">
                    COMPLIANT
                  </span>
                </div>
                <div className="border-2 border-border rounded-lg p-4 bg-muted/30">
                  <h3 className="text-xl font-bold text-foreground mb-2">Premium Almond Milk</h3>
                  <p className="text-sm text-muted-foreground mb-4" dir="rtl">
                    حليب اللوز الفاخر
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs font-semibold text-foreground">Product Category</div>
                      <div className="text-xs text-muted-foreground" dir="rtl">
                        فئة المنتج
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-foreground">Barcode</div>
                      <div className="text-xs text-muted-foreground">8012345678901</div>
                    </div>
                  </div>

                  <div className="bg-white rounded p-3 mb-4">
                    <div className="text-xs font-bold text-foreground mb-2">
                      Nutrition Facts - الحقائق التغذوية
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <div className="font-semibold">Calories</div>
                        <div className="text-muted-foreground" dir="rtl">
                          السعرات
                        </div>
                        <div className="font-bold text-primary">60</div>
                      </div>
                      <div>
                        <div className="font-semibold">Total Fat</div>
                        <div className="text-muted-foreground" dir="rtl">
                          الدهون
                        </div>
                        <div className="font-bold text-primary">3.5g</div>
                      </div>
                      <div>
                        <div className="font-semibold">Sodium</div>
                        <div className="text-muted-foreground" dir="rtl">
                          الصوديوم
                        </div>
                        <div className="font-bold text-primary">180mg</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">✓ Halal Certified</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">✓ NRV Calculated</span>
                    <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">✓ GCC Compliant</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <i className="fas fa-robot text-primary"></i>
                <span>Auto-generated by ByteBeam AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
