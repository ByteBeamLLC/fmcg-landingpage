import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Clock, Globe, Award } from "lucide-react";

const trustItems = [
  { icon: Shield, label: "SOC 2 Compliant", sublabel: "Enterprise security" },
  { icon: Clock, label: "99.9% Uptime", sublabel: "SLA guaranteed" },
  { icon: Globe, label: "GDPR Ready", sublabel: "EU data processing" },
  { icon: Award, label: "99.5% Accuracy", sublabel: "AI-powered extraction" },
];

export default function ParsliTrustBar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-12 bg-white border-y border-gray-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-parsli-50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-parsli-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{item.label}</div>
                <div className="text-xs text-gray-500">{item.sublabel}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
