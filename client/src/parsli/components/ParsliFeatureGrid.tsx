import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ParsliFeature } from "../data/types";

interface ParsliFeatureGridProps {
  headline?: string;
  subheadline?: string;
  features: ParsliFeature[];
  columns?: 2 | 3 | 4;
}

export default function ParsliFeatureGrid({
  headline,
  subheadline,
  features,
  columns = 3,
}: ParsliFeatureGridProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const gridClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section ref={ref} className="section-padding parsli-section-alt">
      <div className="container-custom">
        {(headline || subheadline) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            {headline && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subheadline}
              </p>
            )}
          </motion.div>
        )}

        <div className={`grid grid-cols-1 ${gridClass} gap-6`}>
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-parsli-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-parsli-100 text-parsli-600 flex items-center justify-center mb-4 group-hover:bg-parsli-500 group-hover:text-white transition-colors duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {feature.description}
                </p>
                {feature.benefit && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-parsli-50 text-parsli-700 text-xs font-medium">
                    {feature.benefit}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
