import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck, Settings, FileCheck } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Validation-First Accuracy",
    subtitle: "Accuracy",
    description:
      "Our validation-first approach ensures decisions are correct the first time—critical for regulated industries",
    details: [
      "Multi-layer validation checks against regulatory databases",
      "Expert-in-the-loop for edge cases and critical decisions",
      "99% accuracy on first submission—reducing costly revisions"
    ],
    stat: "99%",
    statLabel: "First-time accuracy"
  },
  {
    icon: Settings,
    title: "Configurable Compliance",
    subtitle: "Compliance",
    description:
      "Configurable for your regulatory obligations and company policies",
    details: [
      "Custom rule engines per market and region",
      "Real-time regulatory monitoring and updates",
      "Policy version control with complete audit history"
    ],
    stat: "100%",
    statLabel: "Regulatory coverage"
  },
  {
    icon: FileCheck,
    title: "Complete Traceability",
    subtitle: "Traceability",
    description:
      "ByteBeam's AI agents provide full record-keeping, so every output is source-linked and reviewable",
    details: [
      "Audit trails for every AI decision and action",
      "Source document linking for full transparency",
      "Reviewable decision history for compliance teams"
    ],
    stat: "100%",
    statLabel: "Audit trail coverage"
  },
];

export default function WhyByteBeam() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="why-bytebeam" className="section-padding bg-gradient-to-b from-background to-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built for Regulated Industries
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ByteBeam delivers continuous, production-ready AI agents that extract data, 
            check compliance, and generate audit trails from any volume or type of document
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              className="bg-card border-2 border-border rounded-xl p-8 hover:border-primary/50 transition-all group hover:shadow-xl"
              data-testid={`pillar-card-${index}`}
            >
              {/* Icon and Stat */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <pillar.icon className="text-primary" size={32} />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{pillar.stat}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{pillar.statLabel}</div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
              
              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {pillar.description}
              </p>

              {/* Details List */}
              <ul className="space-y-3">
                {pillar.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 p-8 bg-card border-2 border-primary/20 rounded-xl"
        >
          <h3 className="text-2xl font-bold mb-3">
            Handle thousands of files per hour, logging every AI action
          </h3>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            For security, compliance, and transparency—ByteBeam's AI agents are built 
            for enterprises that demand precision and measurable results
          </p>
        </motion.div>
      </div>
    </section>
  );
}
