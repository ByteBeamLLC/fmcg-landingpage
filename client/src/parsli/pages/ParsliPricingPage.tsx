import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliPricing from "../components/ParsliPricing";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";

const pricingFAQ = [
  {
    question: "What counts as a 'page'?",
    answer: "One page equals one document page or one email. A 5-page PDF counts as 5 pages. An email with a 3-page attachment counts as 4 pages (1 email + 3 attachment pages).",
  },
  {
    question: "Can I change plans at any time?",
    answer: "Yes. Upgrade or downgrade anytime. When upgrading, you'll get immediate access to the higher quota. When downgrading, the change takes effect at your next billing cycle.",
  },
  {
    question: "What happens if I exceed my monthly quota?",
    answer: "You'll receive a notification when approaching your limit. Additional pages are billed at a per-page overage rate. You can also upgrade to a higher plan at any time.",
  },
  {
    question: "Is there a free trial for paid plans?",
    answer: "Yes, all paid plans include a 14-day free trial with full access to features. No credit card required to start. You can also use the free plan (26 pages/month) indefinitely.",
  },
  {
    question: "How does annual billing work?",
    answer: "Annual billing gives you a 20% discount compared to monthly pricing. You're billed once per year. If you need to cancel, we offer a prorated refund for unused months.",
  },
  {
    question: "Do you offer custom enterprise pricing?",
    answer: "Absolutely. For volumes above 13,000 pages/month or specific compliance/security requirements (on-premise, custom SLA, dedicated support), contact our sales team for a tailored quote.",
  },
  {
    question: "How does Parsli compare to Parseur on pricing?",
    answer: "At every tier, Parsli gives you 30% more pages for the same price. For example, our Growth plan ($89/mo) includes 390 pages vs Parseur's 300 pages at the same price point.",
  },
];

export default function ParsliPricingPage() {
  return (
    <>
      <ParsliSEO
        title="Pricing - 30% More Pages Than The Competition"
        description="Simple, transparent pricing for document extraction. Free 26 pages/month. 30% more quota than Parseur at every tier. No hidden fees."
        path="/pricing"
        keywords="document parser pricing, email parser pricing, PDF parser pricing, Parseur alternative pricing, document extraction cost"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Parsli",
            applicationCategory: "BusinessApplication",
            offers: [
              { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD", description: "26 pages/month" },
              { "@type": "Offer", name: "Starter", price: "49", priceCurrency: "USD", description: "130 pages/month" },
              { "@type": "Offer", name: "Growth", price: "89", priceCurrency: "USD", description: "390 pages/month" },
              { "@type": "Offer", name: "Business", price: "129", priceCurrency: "USD", description: "1,300 pages/month" },
              { "@type": "Offer", name: "Professional", price: "269", priceCurrency: "USD", description: "3,900 pages/month" },
              { "@type": "Offer", name: "Scale", price: "499", priceCurrency: "USD", description: "13,000 pages/month" },
            ],
          },
        ]}
      />

      <ParsliNavigation />

      <div className="pt-24">
        <ParsliPricing
          headline="Simple, Transparent Pricing"
          subheadline="30% more pages than the competition at every tier. Start free, scale as you grow."
        />
      </div>

      {/* Comparison strip */}
      <section className="py-12 parsli-section-alt">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">30% More Value at Every Tier</h3>
            <p className="text-gray-600">Same prices as competitors — significantly more pages.</p>
          </div>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-left text-gray-500 font-medium">Tier</th>
                  <th className="py-3 px-4 text-center text-gray-500 font-medium">Price</th>
                  <th className="py-3 px-4 text-center text-parsli-600 font-bold">Parsli Pages</th>
                  <th className="py-3 px-4 text-center text-gray-400 font-medium">Parseur Pages</th>
                  <th className="py-3 px-4 text-center text-parsli-600 font-medium">Extra</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tier: "Free", price: "$0", parsli: "26", competitor: "20", extra: "+30%" },
                  { tier: "Starter", price: "$49", parsli: "130", competitor: "100", extra: "+30%" },
                  { tier: "Growth", price: "$89", parsli: "390", competitor: "300", extra: "+30%" },
                  { tier: "Business", price: "$129", parsli: "1,300", competitor: "1,000", extra: "+30%" },
                  { tier: "Professional", price: "$269", parsli: "3,900", competitor: "3,000", extra: "+30%" },
                  { tier: "Scale", price: "$499", parsli: "13,000", competitor: "10,000", extra: "+30%" },
                ].map((row) => (
                  <tr key={row.tier} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.tier}</td>
                    <td className="py-3 px-4 text-center text-gray-700">{row.price}/mo</td>
                    <td className="py-3 px-4 text-center font-bold text-parsli-600">{row.parsli}</td>
                    <td className="py-3 px-4 text-center text-gray-400 line-through">{row.competitor}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-parsli-100 text-parsli-700 text-xs font-semibold">
                        {row.extra}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ParsliFAQ items={pricingFAQ} />

      <ParsliCTA
        headline="Ready to Automate Your Document Processing?"
        subheadline="Start with 26 free pages per month. No credit card required."
      />

      <ParsliFooter />
    </>
  );
}
