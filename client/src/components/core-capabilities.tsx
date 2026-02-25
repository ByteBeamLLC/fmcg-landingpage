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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function CapabilityCard({ capability, index }: { capability: typeof capabilities[0]; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl p-8 border border-border/80 text-center group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
      data-testid={`capability-card-${index}`}
    >
      <motion.div
        className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors duration-300"
        whileHover={{ rotate: [0, -10, 10, -5, 0] }}
        transition={{ duration: 0.5 }}
      >
        <capability.icon className="text-primary group-hover:scale-110 transition-transform duration-300" size={40} />
      </motion.div>
      <h3 className="text-lg font-bold mb-3">{capability.title}</h3>
      <p className="text-muted-foreground text-sm">{capability.description}</p>
    </motion.div>
  );
}

export default function CoreCapabilities() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="capabilities" className="section-padding bg-white">
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

        {/* Data Processing Row */}
        <div className="mb-4">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4"
          >
            Data Processing
          </motion.h3>
        </div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {capabilities.slice(0, 4).map((capability, index) => (
            <CapabilityCard key={index} capability={capability} index={index} />
          ))}
        </motion.div>

        {/* Output & Compliance Row */}
        <div className="mb-4">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4"
          >
            Output & Compliance
          </motion.h3>
        </div>
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {capabilities.slice(4, 8).map((capability, index) => (
            <CapabilityCard key={index + 4} capability={capability} index={index + 4} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
