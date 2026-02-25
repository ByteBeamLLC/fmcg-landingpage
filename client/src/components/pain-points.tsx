import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Scale, MapPin, RefreshCw, Users, Shield, Clock, CheckCircle2 } from "lucide-react";

const accentColors: Record<string, { bg: string; text: string; border: string }> = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-t-blue-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-t-purple-500" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-t-orange-500" },
  pink:   { bg: "bg-pink-50",   text: "text-pink-600",   border: "border-t-pink-500" },
  green:  { bg: "bg-green-50",  text: "text-green-600",  border: "border-t-green-500" },
  teal:   { bg: "bg-teal-50",   text: "text-teal-600",   border: "border-t-teal-500" },
};

const painPoints = [
  {
    icon: Scale,
    title: "Consistent Quality at Scale",
    description:
      "Processing hundreds of SKUs manually leads to inconsistent label formats, translation errors, and compliance gaps. Our AI ensures uniform quality across all products.",
    feature: "Automated validation",
    accent: "blue",
  },
  {
    icon: MapPin,
    title: "Smart Label Placement",
    description:
      "Avoid covering key brand elements and product imagery. Our AI intelligently positions localized labels on packaging without disrupting visual hierarchy.",
    feature: "Brand-safe positioning",
    accent: "purple",
  },
  {
    icon: RefreshCw,
    title: "Lifecycle Management",
    description:
      "Process changes and updates as they occur—no waiting for bulk operations. Handle reformulations, packaging updates, and regulatory changes in real-time.",
    feature: "On-demand processing",
    accent: "orange",
  },
  {
    icon: Users,
    title: "Eliminate External Dependencies",
    description:
      "Stop relying on freelancers and agencies for routine compliance work. Keep critical processes in-house with our automated AI agent.",
    feature: "Full control & ownership",
    accent: "pink",
  },
  {
    icon: Shield,
    title: "Continuous Compliance Radar",
    description:
      "Stay ahead of regulatory changes automatically. Our system monitors compliance requirements and flags affected products for review.",
    feature: "Always compliant",
    accent: "green",
  },
  {
    icon: Clock,
    title: "Time-to-Market Acceleration",
    description:
      "Launch products 70% faster by automating extraction, translation, validation, and form generation—from artwork to regulator-ready submission.",
    feature: "Days, not months",
    accent: "teal",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PainPoints() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="solutions" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">FMCG Challenges We Solve</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Eliminate bottlenecks in your compliance and localization workflow across different categories
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {painPoints.map((point, index) => {
            const colors = accentColors[point.accent];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-t-4 ${colors.border}`}
                data-testid={`pain-point-card-${index}`}
              >
                <motion.div
                  className={`w-16 h-16 ${colors.bg} rounded-xl flex items-center justify-center mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <point.icon className={colors.text} size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
                <p className="text-muted-foreground mb-6">{point.description}</p>
                <div className="flex items-center gap-2 font-semibold text-green-600">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span>{point.feature}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
