import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, X, Minus } from "lucide-react";

interface ComparisonCategory {
  name: string;
  features: {
    name: string;
    parsli: string | boolean;
    competitor: string | boolean;
    highlight?: boolean;
  }[];
}

interface ParsliComparisonTableProps {
  competitorName: string;
  categories: ComparisonCategory[];
}

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-parsli-500" />;
  if (value === false) return <X className="w-5 h-5 text-red-400" />;
  if (value === "-") return <Minus className="w-5 h-5 text-gray-300" />;
  return <span className="text-sm">{value}</span>;
}

export default function ParsliComparisonTable({
  competitorName,
  categories,
}: ParsliComparisonTableProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full">
              {/* Header */}
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 w-1/2">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 w-1/4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-parsli-100">
                      <div className="w-5 h-5 rounded bg-parsli-500 flex items-center justify-center">
                        <span className="text-white text-[10px] font-bold">P</span>
                      </div>
                      <span className="text-sm font-bold text-parsli-700">Parsli</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-6 w-1/4">
                    <span className="text-sm font-medium text-gray-500">{competitorName}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, catIdx) => (
                  <>
                    <tr key={`cat-${catIdx}`} className="bg-gray-50/50">
                      <td colSpan={3} className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {category.name}
                      </td>
                    </tr>
                    {category.features.map((feature, featIdx) => (
                      <tr
                        key={`feat-${catIdx}-${featIdx}`}
                        className={`border-t border-gray-100 ${feature.highlight ? "bg-parsli-50/30" : ""}`}
                      >
                        <td className="py-3.5 px-6 text-sm text-gray-700">
                          {feature.name}
                          {feature.highlight && (
                            <span className="ml-2 text-[10px] font-semibold text-parsli-600 bg-parsli-100 px-1.5 py-0.5 rounded-full">
                              ADVANTAGE
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-6 text-center">
                          <div className="flex justify-center">
                            <CellValue value={feature.parsli} />
                          </div>
                        </td>
                        <td className="py-3.5 px-6 text-center">
                          <div className="flex justify-center">
                            <CellValue value={feature.competitor} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
