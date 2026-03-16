import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PARSLI_PRICING_TIERS } from "../data/pricing";

interface ParsliPricingProps {
  headline?: string;
  subheadline?: string;
  compact?: boolean;
}

export default function ParsliPricing({
  headline = "Simple, Transparent Pricing",
  subheadline = "30% more pages than the competition at every tier. Start free, scale as you grow.",
  compact = false,
}: ParsliPricingProps) {
  const [annual, setAnnual] = useState(true);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const displayTiers = compact
    ? PARSLI_PRICING_TIERS.filter((t) => ["Free", "Growth", "Professional", "Enterprise"].includes(t.name))
    : PARSLI_PRICING_TIERS;

  return (
    <section ref={ref} className="section-padding bg-white">
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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {subheadline}
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                !annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                annual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Annual
              <span className="text-xs bg-parsli-100 text-parsli-700 px-1.5 py-0.5 rounded-full font-semibold">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className={`grid grid-cols-1 ${compact ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-4"} gap-6 max-w-6xl mx-auto`}>
          {displayTiers.map((tier, index) => {
            const price = tier.monthlyPrice === null
              ? null
              : annual && tier.yearlyPrice
              ? Math.round(tier.yearlyPrice / 12)
              : tier.monthlyPrice;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  tier.highlighted
                    ? "bg-parsli-900 text-white border-2 border-parsli-500 shadow-xl shadow-parsli-500/10 scale-[1.02]"
                    : "bg-white border border-gray-200 hover:border-parsli-200 hover:shadow-md"
                } transition-all duration-300`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-parsli-500 text-white text-xs font-semibold shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className={`text-lg font-bold ${tier.highlighted ? "text-white" : "text-gray-900"}`}>
                    {tier.name}
                  </h3>
                  <div className={`text-sm ${tier.highlighted ? "text-parsli-200" : "text-gray-500"}`}>
                    {tier.quotaLabel}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {price !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-bold ${tier.highlighted ? "text-white" : "text-gray-900"}`}>
                        ${price}
                      </span>
                      <span className={`text-sm ${tier.highlighted ? "text-parsli-200" : "text-gray-500"}`}>
                        /mo
                      </span>
                    </div>
                  ) : (
                    <div className={`text-2xl font-bold ${tier.highlighted ? "text-white" : "text-gray-900"}`}>
                      Custom
                    </div>
                  )}
                  {tier.quota && (
                    <div className={`text-sm mt-1 font-medium ${tier.highlighted ? "text-parsli-300" : "text-parsli-600"}`}>
                      {tier.quota.toLocaleString()} pages/month
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? "text-parsli-400" : "text-parsli-500"}`} />
                      <span className={`text-sm ${tier.highlighted ? "text-parsli-100" : "text-gray-600"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={tier.monthlyPrice === null ? "/parsli/pricing" : "/parsli/pricing"}>
                  <Button
                    className={`w-full rounded-xl h-11 ${
                      tier.highlighted
                        ? "bg-white text-parsli-700 hover:bg-parsli-50 font-semibold"
                        : "bg-parsli-500 text-white hover:bg-parsli-600"
                    }`}
                  >
                    {tier.ctaText}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {compact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-8"
          >
            <Link
              href="/parsli/pricing"
              className="text-parsli-600 hover:text-parsli-700 font-medium text-sm underline underline-offset-4"
            >
              View all pricing tiers
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
