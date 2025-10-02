import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Scale, MapPin, RefreshCw, Users, Shield, Clock } from "lucide-react";
import chipsImg from "@assets/food_1759397164769.png";
import detergentImg from "@assets/cleaning-2_1759397164769.png";

const painPoints = [
  {
    icon: Scale,
    title: "Consistent Quality at Scale",
    description:
      "Processing hundreds of SKUs manually leads to inconsistent label formats, translation errors, and compliance gaps. Our AI ensures uniform quality across all products.",
    feature: "Automated validation",
  },
  {
    icon: MapPin,
    title: "Smart Label Placement",
    description:
      "Avoid covering key brand elements and product imagery. Our AI intelligently positions localized labels on packaging without disrupting visual hierarchy.",
    feature: "Brand-safe positioning",
  },
  {
    icon: RefreshCw,
    title: "Lifecycle Management",
    description:
      "Process changes and updates as they occur—no waiting for bulk operations. Handle reformulations, packaging updates, and regulatory changes in real-time.",
    feature: "On-demand processing",
  },
  {
    icon: Users,
    title: "Eliminate External Dependencies",
    description:
      "Stop relying on freelancers and agencies for routine compliance work. Keep critical processes in-house with our automated AI agent.",
    feature: "Full control & ownership",
  },
  {
    icon: Shield,
    title: "Continuous Compliance Radar",
    description:
      "Stay ahead of regulatory changes automatically. Our system monitors compliance requirements and flags affected products for review.",
    feature: "Always compliant",
  },
  {
    icon: Clock,
    title: "Time-to-Market Acceleration",
    description:
      "Launch products 70% faster by automating extraction, translation, validation, and form generation—from artwork to regulator-ready submission.",
    feature: "Days, not months",
  },
];

export default function PainPoints() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="solutions" className="section-padding bg-white relative overflow-hidden">
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
            Eliminate bottlenecks in your compliance and localization workflow
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border-2 border-border rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
              data-testid={`pain-point-card-${index}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <point.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{point.title}</h3>
              <p className="text-muted-foreground mb-6">{point.description}</p>
              <div className="flex items-center gap-2 text-accent font-semibold">
                <i className="fas fa-check-circle"></i>
                <span>{point.feature}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating 3D Product Objects */}
      <motion.img
        src={chipsImg}
        alt="Food Product"
        className="absolute top-24 left-12 w-28 md:w-36 opacity-60 pointer-events-none hidden lg:block floating-product-3d"
        animate={{
          y: [0, -18, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        data-testid="floating-product-chips"
      />
      <motion.img
        src={detergentImg}
        alt="Cleaning Product"
        className="absolute top-1/3 right-16 w-32 md:w-40 opacity-65 pointer-events-none hidden lg:block floating-product-3d"
        animate={{
          y: [0, 20, 0],
          rotate: [0, 8, 0],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        data-testid="floating-product-detergent"
      />
    </section>
  );
}
