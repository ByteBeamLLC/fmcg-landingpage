import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ParsliFeature } from "../data/types";

interface ParsliBenefitsProps {
  headline?: string;
  subheadline?: string;
  benefits: ParsliFeature[];
}

export default function ParsliBenefits({
  headline = "Why Choose Parsli",
  subheadline = "Built for teams that need reliable, accurate document extraction at scale.",
  benefits,
}: ParsliBenefitsProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl parsli-gradient flex items-center justify-center mx-auto mb-4 shadow-lg shadow-parsli-500/15">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
                {benefit.benefit && (
                  <div className="mt-3 text-sm font-medium text-parsli-600">
                    {benefit.benefit}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
