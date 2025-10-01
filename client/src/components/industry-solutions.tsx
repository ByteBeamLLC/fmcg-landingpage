import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Utensils, Sparkles, Package } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const industries = [
  {
    id: "food",
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
    painPoints: [
      {
        title: "Nutritional Compliance",
        description: "Automate NRV calculations and ensure accuracy across all nutrition panels without manual spreadsheets."
      },
      {
        title: "Halal Certification",
        description: "Automatically detect products requiring Halal certification based on ingredient analysis."
      },
      {
        title: "Allergen Management",
        description: "Flag allergens and ensure proper bilingual disclosure on all food labels."
      }
    ]
  },
  {
    id: "cosmetics",
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
    painPoints: [
      {
        title: "Ingredient Compliance",
        description: "Verify all ingredients against regional restricted substance lists automatically."
      },
      {
        title: "Safety Labeling",
        description: "Translate safety warnings and usage instructions to meet local regulatory standards."
      },
      {
        title: "Claims Validation",
        description: "Validate cruelty-free, organic, and other marketing claims with proper certification checks."
      }
    ]
  },
  {
    id: "general",
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
    painPoints: [
      {
        title: "Multi-Category Coverage",
        description: "Handle household products, baby care, and other FMCG categories with category-specific rules."
      },
      {
        title: "Safety Documentation",
        description: "Generate safety data sheets automatically for chemical and hazardous products."
      },
      {
        title: "Environmental Compliance",
        description: "Include proper disposal and environmental instructions based on product type."
      }
    ]
  },
];

export default function IndustrySolutions() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredIndustries = selectedCategory === "all" 
    ? industries 
    : industries.filter(ind => ind.id === selectedCategory);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Industry-Specific Solutions</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tailored compliance automation for every FMCG category
          </p>
        </motion.div>

        {/* Category Filter */}
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory} className="mb-12">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-auto gap-2">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white" data-testid="filter-all">
              All Categories
            </TabsTrigger>
            <TabsTrigger value="food" className="data-[state=active]:bg-accent data-[state=active]:text-white" data-testid="filter-food">
              <Utensils className="w-4 h-4 mr-2" />
              Food & Beverage
            </TabsTrigger>
            <TabsTrigger value="cosmetics" className="data-[state=active]:bg-primary data-[state=active]:text-white" data-testid="filter-cosmetics">
              <Sparkles className="w-4 h-4 mr-2" />
              Cosmetics
            </TabsTrigger>
            <TabsTrigger value="general" className="data-[state=active]:bg-secondary data-[state=active]:text-white" data-testid="filter-general">
              <Package className="w-4 h-4 mr-2" />
              General FMCG
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Industry Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`grid ${filteredIndustries.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-3'} gap-8`}
          >
            {filteredIndustries.map((industry, index) => (
              <div key={industry.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  data-testid={`industry-card-${industry.id}`}
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

                {/* Category-Specific Pain Points */}
                {selectedCategory !== "all" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 bg-white rounded-xl p-8 shadow-lg"
                  >
                    <h4 className="text-xl font-bold mb-6">Key Challenges We Solve for {industry.title}</h4>
                    <div className="space-y-4">
                      {industry.painPoints.map((pain, idx) => (
                        <div key={idx} className="border-l-4 border-primary pl-4">
                          <h5 className="font-bold mb-1">{pain.title}</h5>
                          <p className="text-sm text-muted-foreground">{pain.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
