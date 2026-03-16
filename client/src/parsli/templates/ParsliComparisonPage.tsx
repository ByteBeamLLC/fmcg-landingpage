import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliComparisonTable from "../components/ParsliComparisonTable";
import ParsliBenefits from "../components/ParsliBenefits";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";
import type { ComparisonPageData } from "../data/types";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
  data: ComparisonPageData;
}

export default function ParsliComparisonPage({ data }: Props) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <ParsliSEO
        title={data.seo.title}
        description={data.seo.description}
        path={`/compare/${data.slug}`}
        keywords={data.seo.keywords}
      />

      <ParsliNavigation />

      <ParsliHero
        variant="comparison"
        competitorName={data.competitorName}
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
      />

      <ParsliComparisonTable
        competitorName={data.competitorName}
        categories={data.comparisonTable.categories}
      />

      {/* Pricing comparison */}
      <section ref={ref} className="section-padding parsli-section-alt">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pricing Comparison
            </h2>
            <p className="text-lg text-gray-600">
              30% more pages at every price point.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto overflow-x-auto"
          >
            <table className="w-full text-sm rounded-2xl overflow-hidden border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-gray-500 font-medium">Tier</th>
                  <th className="py-3 px-4 text-center text-parsli-600 font-bold">Parsli</th>
                  <th className="py-3 px-4 text-center text-gray-400 font-medium">{data.competitorName}</th>
                </tr>
              </thead>
              <tbody>
                {data.pricingComparison.tiers.map((tier) => (
                  <tr key={tier.name} className="border-t border-gray-100">
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-900">{tier.name}</div>
                      <div className="text-xs text-gray-500">{tier.parsliPrice}/mo</div>
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-parsli-600">{tier.parsliQuota}</td>
                    <td className="py-3 px-4 text-center text-gray-400 line-through">{tier.competitorQuota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <ParsliBenefits
        headline={`Why Teams Switch from ${data.competitorName} to Parsli`}
        benefits={data.advantages}
      />

      <ParsliFAQ items={data.faq} />

      <ParsliCTA
        headline={`Ready to Switch from ${data.competitorName}?`}
        subheadline="Try Parsli free with 26 pages/month. Migration takes minutes, not days."
      />

      <ParsliFooter />
    </>
  );
}
