import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, Users, Database, AlertTriangle } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Repetitive Yet Complex",
    description:
      "Your experts spend hours on tasks that follow a pattern but require deep knowledge - reviewing documents, extracting information, generating reports, and ensuring compliance.",
  },
  {
    icon: Users,
    title: "Not Built for Simple Automation",
    description:
      "These processes are too nuanced for basic RPA or simple scripts. They need multi-step reasoning, context awareness, and domain expertise to execute correctly.",
  },
  {
    icon: Database,
    title: "Siloed Systems & Manual Handoffs",
    description:
      "Information lives in multiple places - documents, databases, internal platforms. Moving data between systems requires manual work that's error-prone and time-consuming.",
  },
  {
    icon: AlertTriangle,
    title: "Scaling Means Hiring",
    description:
      "As your business grows, you need more specialists doing the same tasks. But hiring and training qualified experts is expensive, slow, and doesn't scale linearly.",
  },
];

export default function PlatformProblem() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="problem" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Knowledge Work Challenge</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your team has expertise. Your processes are proven. But scaling them manually is holding you back.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-card border-2 border-border rounded-xl p-8"
              data-testid={`problem-card-${index}`}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <problem.icon className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{problem.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center bg-primary/5 border-2 border-primary/20 rounded-xl p-8"
        >
          <p className="text-xl font-semibold text-foreground mb-2">
            This is where custom AI agents come in.
          </p>
          <p className="text-lg text-muted-foreground">
            We build AI that understands your specific process, integrates with your systems, and runs continuously in the background.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
