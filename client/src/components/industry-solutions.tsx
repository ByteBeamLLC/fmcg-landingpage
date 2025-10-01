import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Utensils, Sparkles, Package } from "lucide-react";

const industries = [
  {
    icon: Utensils,
    title: "Food & Beverage",
    gradient: "from-accent to-accent/70",
    features: [
      "Automated nutritional fact calculations (NRV, per serving)",
      "Halal certification detection for meat/animal-derived ingredients",
      "Allergen flagging and bilingual labeling",
      "Storage instruction validation",
    ],
    badge: "1K+ Food SKUs Processed",
  },
  {
    icon: Sparkles,
    title: "Cosmetics & Personal Care",
    gradient: "from-primary to-primary/70",
    features: [
      "Ingredient list verification against restricted substances",
      "Safety warnings and usage instructions translation",
      "Cruelty-free and organic claim validation",
      "Batch code and expiry date formatting",
    ],
    badge: "Beauty & Personal Care Ready",
  },
  {
    icon: Package,
    title: "General FMCG",
    gradient: "from-secondary to-secondary/70",
    features: [
      "Multi-category support (household, baby care, etc.)",
      "Safety data sheet generation",
      "Environmental and disposal instructions",
      "Regional-specific regulatory requirements",
    ],
    badge: "All Categories Supported",
  },
];

export default function IndustrySolutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Industry-Specific Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored compliance automation for every FMCG category
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              data-testid={`industry-card-${index}`}
            >
              <div className={`h-48 bg-gradient-to-br ${industry.gradient} flex items-center justify-center`}>
                <industry.icon className="text-white" size={80} />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{industry.title}</h3>
                <ul className="space-y-3 mb-6">
                  {industry.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <i className="fas fa-check text-accent mt-1"></i>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-sm font-semibold text-primary">{industry.badge}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
