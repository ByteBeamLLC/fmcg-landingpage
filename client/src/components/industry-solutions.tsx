import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Utensils, Sparkles } from "lucide-react";

const industries = [
  {
    id: "food",
    icon: Utensils,
    title: "Food & Beverage",
    features: [
      "Automated nutritional fact calculations (NRV, per serving)",
      "Allergen flagging and bilingual labeling",
      "Halal certification detection for meat/animal-derived ingredients",
    ],
    solves: [
      "Automate NRV calculations without manual spreadsheets",
      "Ensure proper bilingual allergen disclosure",
      "Detect Halal certification requirements automatically",
    ],
    badge: "1K+ Food SKUs Processed",
  },
  {
    id: "cosmetics",
    icon: Sparkles,
    title: "Cosmetics & Personal Care",
    features: [
      "Ingredient list verification against restricted substances",
      "Safety warnings and usage instructions translation",
      "Cruelty-free and organic claim validation",
    ],
    solves: [
      "Verify ingredients against regional restricted substance lists",
      "Translate safety warnings to meet local regulatory standards",
      "Validate cruelty-free and organic claims with certification checks",
    ],
    badge: "Beauty & Personal Care Ready",
  },
];

export default function IndustrySolutions() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Where It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compliance automation across key FMCG categories
          </p>
        </motion.div>

        {/* Industry Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 border-2 border-border"
              data-testid={`industry-card-${industry.id}`}
            >
              {/* Header with icon and title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <industry.icon className="text-primary" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{industry.title}</h3>
                  <div className="text-sm text-primary font-semibold">{industry.badge}</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-muted-foreground uppercase mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {industry.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="fas fa-check text-primary mt-1 text-sm"></i>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solves */}
              <div>
                <h4 className="text-sm font-bold text-muted-foreground uppercase mb-3">What It Solves</h4>
                <ul className="space-y-2">
                  {industry.solves.map((solve, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-primary mt-1 text-sm"></i>
                      <span className="text-sm text-muted-foreground">{solve}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
