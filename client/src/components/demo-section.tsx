import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AutomationDemo from "./automation-demo";

export default function DemoSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="demo" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
            See It In Action
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Intelligent Document Processing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how our AI agents automatically extract, validate, and process documents across different industries
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <AutomationDemo
            autoRotate={true}
            rotateInterval={3000}
            showSelector={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
