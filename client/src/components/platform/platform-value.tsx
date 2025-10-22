import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Plug, Layers, Eye, Wrench } from "lucide-react";

const values = [
  {
    icon: Plug,
    title: "Integration-First Approach",
    description:
      "We don't replace your existing platforms. Our AI agents integrate with your internal systems - ingesting files, accessing databases, and pushing results back automatically.",
  },
  {
    icon: Layers,
    title: "Background Automation",
    description:
      "In many cases, you won't even open our platform. The agent works silently in the background, and results appear directly in your existing systems where your team needs them.",
  },
  {
    icon: Eye,
    title: "Expert-in-the-Loop",
    description:
      "For critical decisions, the agent flags cases for human review. Your experts focus on judgment calls and exceptions, not routine processing.",
  },
  {
    icon: Wrench,
    title: "Custom Built, Not Configured",
    description:
      "This isn't a self-serve tool with templates. We build a tailored AI agent specifically for your process, trained on your domain knowledge and integrated with your systems.",
  },
];

export default function PlatformValue() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="value" className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why This Approach Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We build AI that fits into your workflow, not the other way around
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-card border-2 border-border rounded-xl p-8 hover:shadow-lg transition-shadow"
              data-testid={`value-card-${index}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <value.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary/20 rounded-2xl p-10 text-center"
        >
          <h3 className="text-3xl font-bold mb-4">When Do You Need This?</h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-left">
              <div className="font-bold text-lg mb-2 text-primary">Complex Processes</div>
              <p className="text-muted-foreground">
                Multi-step workflows requiring analysis, reasoning, and domain expertise
              </p>
            </div>
            <div className="text-left">
              <div className="font-bold text-lg mb-2 text-primary">Document-Heavy</div>
              <p className="text-muted-foreground">
                Processes that involve reading, extracting, and analyzing information from files
              </p>
            </div>
            <div className="text-left">
              <div className="font-bold text-lg mb-2 text-primary">Repetitive at Scale</div>
              <p className="text-muted-foreground">
                Tasks that are too complex for RPA but too repetitive for skilled professionals
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
