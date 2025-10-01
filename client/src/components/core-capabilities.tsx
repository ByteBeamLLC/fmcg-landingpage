import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Calculator,
  Award,
  FileText,
  Tag,
  Gavel,
  Languages,
  Search,
  ClipboardCheck,
} from "lucide-react";

const capabilities = [
  {
    icon: Calculator,
    title: "Automated Nutritional Calculations",
    description:
      "Instantly compute NRVs, daily values, and other required nutrition metrics—no manual spreadsheets needed.",
  },
  {
    icon: Award,
    title: "Certification Intelligence",
    description:
      "Automatically detect which products require certifications (Halal, organic, etc.) from ingredients and claims.",
  },
  {
    icon: FileText,
    title: "Automated Form Generation",
    description: "Create regulator-ready submission forms per SKU—saving hundreds of hours of manual data entry.",
  },
  {
    icon: Tag,
    title: "Smart Label Generation",
    description: "Market-compliant bilingual labels with intelligent placement that preserves brand visuals.",
  },
  {
    icon: Gavel,
    title: "Rules-Aware Validation",
    description:
      "Validates against local regulations, flagging restricted ingredients and compliance issues automatically.",
  },
  {
    icon: Languages,
    title: "Professional Translation",
    description: "Context-aware English-Arabic translation with industry-specific terminology and formatting.",
  },
  {
    icon: Search,
    title: "Intelligent Extraction",
    description:
      "OCR and AI-powered extraction of all product data from artwork—ingredients, nutrition, claims, and more.",
  },
  {
    icon: ClipboardCheck,
    title: "Ready-to-File Output",
    description:
      "Final deliverables are submission-ready with complete audit trails and compliance documentation.",
  },
];

export default function CoreCapabilities() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="capabilities" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Capabilities</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Enterprise-grade automation built for FMCG compliance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              data-testid={`capability-card-${index}`}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <capability.icon className="text-primary" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">{capability.title}</h3>
              <p className="text-muted-foreground">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
