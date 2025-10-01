import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Package } from "lucide-react";

export default function VisualDemo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">See the Transformation</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From raw artwork to compliant bilingual labels in minutes
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-4">
                <span className="inline-block px-4 py-2 bg-muted text-muted-foreground rounded-full font-semibold">
                  Before: Raw Artwork
                </span>
              </div>
              <div className="bg-card border-2 border-border rounded-2xl shadow-lg p-8">
                {/* Abstract Almond Milk Packaging */}
                <div className="relative bg-gradient-to-br from-muted via-muted/50 to-muted rounded-2xl p-8 min-h-[400px] flex items-center justify-center overflow-hidden">
                  {/* Abstract Package Shape */}
                  <div className="relative z-10">
                    <div className="w-32 h-48 bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-border shadow-xl mx-auto mb-6 flex flex-col items-center justify-center p-4">
                      <Package className="text-muted-foreground mb-2" size={48} />
                      <div className="text-xs text-center text-muted-foreground">
                        <div className="font-bold mb-1">Almond Milk</div>
                        <div className="text-[10px]">Original Packaging</div>
                      </div>
                    </div>
                    
                    {/* Issues/Gaps */}
                    <div className="space-y-2 text-sm">
                      <div className="bg-card/60 backdrop-blur-sm border border-destructive/30 p-3 rounded-lg">
                        <div className="text-destructive font-semibold text-xs">Missing Arabic Translation</div>
                      </div>
                      <div className="bg-card/60 backdrop-blur-sm border border-destructive/30 p-3 rounded-lg">
                        <div className="text-destructive font-semibold text-xs">Non-GCC Format</div>
                      </div>
                      <div className="bg-card/60 backdrop-blur-sm border border-destructive/30 p-3 rounded-lg">
                        <div className="text-destructive font-semibold text-xs">No NRV Calculations</div>
                      </div>
                    </div>
                  </div>

                  {/* Abstract Background Elements */}
                  <div className="absolute top-4 left-4 w-16 h-16 bg-destructive/10 rounded-full blur-xl" />
                  <div className="absolute bottom-4 right-4 w-24 h-24 bg-destructive/10 rounded-full blur-xl" />
                </div>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-4">
                <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full font-semibold">
                  After: ByteBeam Processing
                </span>
              </div>
              <div className="bg-card rounded-2xl shadow-lg p-8 border-2 border-accent">
                <div className="mb-4 pb-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-lg">Premium Almond Milk</h4>
                    <span className="px-3 py-1 bg-accent text-white rounded-full text-xs font-bold">
                      ✓ COMPLIANT
                    </span>
                  </div>
                  <div className="text-muted-foreground" dir="rtl">
                    حليب اللوز الفاخر
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-bold mb-2">Nutrition Facts - الحقائق التغذوية</div>
                  <div className="grid grid-cols-2 gap-3 text-xs bg-muted/30 p-3 rounded">
                    <div>
                      <div className="font-semibold">Serving Size / حجم الحصة</div>
                      <div className="text-primary font-bold">240ml</div>
                    </div>
                    <div>
                      <div className="font-semibold">Servings / الحصص</div>
                      <div className="text-primary font-bold">4</div>
                    </div>
                    <div>
                      <div className="font-semibold">Calories / السعرات</div>
                      <div className="text-primary font-bold">60 kcal</div>
                    </div>
                    <div>
                      <div className="font-semibold">Total Fat / الدهون</div>
                      <div className="text-primary font-bold">3.5g (5% NRV)</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-bold mb-2">Ingredients / المكونات</div>
                  <div className="text-xs text-muted-foreground">
                    Filtered Water, Almonds (2.5%), Calcium Carbonate, Sea Salt...
                  </div>
                  <div className="text-xs text-muted-foreground" dir="rtl">
                    ماء مفلتر، لوز (٢.٥٪)، كربونات الكالسيوم، ملح البحر...
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded font-semibold flex items-center gap-1">
                    <Check size={12} /> NRV Calculated
                  </span>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded font-semibold flex items-center gap-1">
                    <Check size={12} /> Bilingual
                  </span>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded font-semibold flex items-center gap-1">
                    <Check size={12} /> GCC Format
                  </span>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded font-semibold flex items-center gap-1">
                    <Check size={12} /> Ready to Submit
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
