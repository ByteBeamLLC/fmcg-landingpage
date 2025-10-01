import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, Check } from "lucide-react";

export default function VisualDemo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-white">
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
                <span className="inline-block px-4 py-2 bg-destructive/10 text-destructive rounded-full font-semibold">
                  Before: Original Artwork
                </span>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="border-2 border-dashed border-muted rounded-lg p-6 bg-muted/20">
                  <div className="text-center text-muted-foreground mb-4">
                    <i className="fas fa-image text-6xl mb-2"></i>
                    <div className="font-semibold">Raw Product Packaging</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded">Product Name (English only)</div>
                    <div className="bg-white p-2 rounded">Nutrition Panel (Imperial units)</div>
                    <div className="bg-white p-2 rounded">Ingredient list (No Arabic)</div>
                    <div className="bg-white p-2 rounded text-destructive flex items-center gap-2">
                      <X size={16} /> No NRV calculations
                    </div>
                    <div className="bg-white p-2 rounded text-destructive flex items-center gap-2">
                      <X size={16} /> No Halal certification info
                    </div>
                    <div className="bg-white p-2 rounded text-destructive flex items-center gap-2">
                      <X size={16} /> Not GCC compliant
                    </div>
                  </div>
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
              <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-accent">
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
