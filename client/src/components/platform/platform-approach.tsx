import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, Map, Rocket, RefreshCw } from "lucide-react";

const phases = [
  {
    number: 1,
    title: "Discovery Phase",
    description:
      "We work closely with your team to understand your process deeply - the inputs, the decisions, the edge cases, and the outputs. We map the entire workflow and identify automation opportunities.",
    icon: Search,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    features: [
      "Process mapping and documentation",
      "Stakeholder interviews with your experts",
      "Edge case identification",
      "Integration points assessment",
    ],
  },
  {
    number: 2,
    title: "Build & Test Roadmap",
    description:
      "We create a phased roadmap for developing your custom AI agent. This includes milestones for testing, validation, and iterative improvements based on real data and feedback from your team.",
    icon: Map,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    features: [
      "Development milestones and timelines",
      "Test cases based on real scenarios",
      "Expert validation checkpoints",
      "Performance benchmarks and success criteria",
    ],
  },
  {
    number: 3,
    title: "Production Deployment",
    description:
      "Once tested and validated, the AI agent goes live - integrating with your systems, processing documents, and delivering outputs. It runs continuously in the background, learning and improving over time.",
    icon: Rocket,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
    features: [
      "Seamless integration with existing systems",
      "Background processing - no manual triggers needed",
      "Real-time monitoring and alerts",
      "Audit trails and compliance logging",
    ],
  },
  {
    number: 4,
    title: "Continuous Improvement",
    description:
      "Your business evolves, and so does the agent. We monitor performance, handle edge cases, and update the agent as your processes change or regulations shift.",
    icon: RefreshCw,
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-500",
    features: [
      "Performance monitoring and optimization",
      "Regular model updates and improvements",
      "New feature additions as needs evolve",
      "Regulatory updates and compliance maintenance",
    ],
  },
];

export default function PlatformApproach() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="how-we-work" className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How We Work With You</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From understanding your process to building a production-ready AI agent that runs continuously.
          </p>
        </motion.div>

        <div className="space-y-12">
          {phases.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-card border-2 border-border rounded-2xl p-8 md:p-10"
              data-testid={`phase-card-${index}`}
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 ${phase.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                    <phase.icon className={`${phase.iconColor} w-10 h-10`} />
                  </div>
                  <div className="text-4xl font-bold text-primary">{phase.number}</div>
                </div>

                <div className="flex-grow">
                  <h3 className="text-3xl font-bold mb-4">{phase.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {phase.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-3">
                    {phase.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-start gap-2"
                        data-testid={`feature-${index}-${fIndex}`}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">Not a product off the shelf.</span> Each AI agent is custom-built for your specific workflow.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
