import { Link } from "wouter";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { INTEGRATION_CATEGORIES } from "../data/features";

interface ParsliIntegrationGridProps {
  headline?: string;
  subheadline?: string;
  compact?: boolean;
  filterSlugs?: string[];
}

export default function ParsliIntegrationGrid({
  headline = "Connects With Your Favorite Tools",
  subheadline = "Send parsed data to 5,000+ apps. Input from email, cloud storage, or API — output to spreadsheets, databases, or any workflow.",
  compact = false,
  filterSlugs,
}: ParsliIntegrationGridProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = filterSlugs
    ? INTEGRATION_CATEGORIES.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => filterSlugs.includes(item.slug)),
      })).filter((cat) => cat.items.length > 0)
    : INTEGRATION_CATEGORIES;

  return (
    <section ref={ref} className="section-padding parsli-section-alt">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subheadline}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {categories.map((category, catIdx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: catIdx * 0.1 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
                {category.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/parsli/integration/${item.slug}`}
                    className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-parsli-200 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-2xl">{item.logo}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-parsli-600 transition-colors truncate block">
                        {item.name}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-parsli-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {!compact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-10"
          >
            <p className="text-sm text-gray-500">
              Plus 5,000+ more via Zapier, Make, and Power Automate
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
