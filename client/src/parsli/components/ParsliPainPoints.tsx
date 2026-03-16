import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AlertTriangle } from "lucide-react";
import type { ParsliStat } from "../data/types";

interface ParsliPainPointsProps {
  headline: string;
  subheadline: string;
  items: ParsliStat[];
}

export default function ParsliPainPoints({
  headline,
  subheadline,
  items,
}: ParsliPainPointsProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            The Problem
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-red-50/50 border border-red-100"
            >
              <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                {item.value}
              </div>
              <div className="text-sm text-gray-600">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
