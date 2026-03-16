import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ParsliStep } from "../data/types";

interface ParsliHowItWorksProps {
  headline?: string;
  subheadline?: string;
  steps: ParsliStep[];
}

export default function ParsliHowItWorks({
  headline = "How It Works",
  subheadline = "Get from document to structured data in three simple steps.",
  steps,
}: ParsliHowItWorksProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-parsli-200 hidden md:block" />

            <div className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className="relative flex gap-6 md:gap-8"
                  >
                    {/* Step number */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl parsli-gradient flex items-center justify-center shadow-lg shadow-parsli-500/20">
                        {Icon ? (
                          <Icon className="w-7 h-7 text-white" />
                        ) : (
                          <span className="text-xl font-bold text-white">{step.step}</span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-2 pb-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-parsli-500 mb-1">
                        Step {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
