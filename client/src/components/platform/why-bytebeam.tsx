import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Workflow, Shield, TrendingUp } from "lucide-react";

const differentiators = [
  {
    icon: Workflow,
    title: "Unmatched Accuracy & Auditability",
    description:
      "Automate complex workflows with unmatched accuracy and full auditability.",
  },
  {
    icon: Shield,
    title: "Privacy & Compliance",
    description:
      "Meet regulatory requirements effortlessly—data stays private and compliant.",
  },
  {
    icon: TrendingUp,
    title: "Quantifiable Gains",
    description:
      "Quantifiable gains: Faster, safer, more reliable document processing—100% traceable results.",
  },
];

export default function WhyByteBeam() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="why-bytebeam" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why ByteBeam?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for enterprises that demand precision, compliance, and measurable results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              className="bg-card border-2 border-border rounded-xl p-8 hover:border-primary/50 transition-all"
              data-testid={`differentiator-card-${index}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
