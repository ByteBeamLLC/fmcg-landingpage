import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliPainPoints from "../components/ParsliPainPoints";
import ParsliHowItWorks from "../components/ParsliHowItWorks";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliIntegrationGrid from "../components/ParsliIntegrationGrid";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";
import type { UseCasePageData } from "../data/types";

interface Props {
  data: UseCasePageData;
}

export default function ParsliUseCasePage({ data }: Props) {
  return (
    <>
      <ParsliSEO
        title={data.seo.title}
        description={data.seo.description}
        path={`/use-case/${data.slug}`}
        keywords={data.seo.keywords}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: data.hero.headline,
            description: data.hero.subheadline,
            step: data.howItWorks.steps.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.description,
            })),
          },
        ]}
      />

      <ParsliNavigation />

      <ParsliHero
        variant="feature"
        badge={data.hero.badge}
        badgeIcon={data.hero.badgeIcon}
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
        stats={data.hero.stats}
        ctaText={data.hero.ctaText}
      />

      <ParsliPainPoints
        headline={data.painPoints.headline}
        subheadline={data.painPoints.subheadline}
        items={data.painPoints.items}
      />

      <ParsliHowItWorks
        headline={data.howItWorks.headline}
        subheadline={data.howItWorks.subheadline}
        steps={data.howItWorks.steps}
      />

      <ParsliFeatureGrid
        headline="Key Features"
        subheadline={`Everything you need for ${data.hero.badge.toLowerCase()}.`}
        features={data.features}
        columns={3}
      />

      <ParsliIntegrationGrid
        headline="Works With Your Stack"
        subheadline="Send extracted data to the tools your team already uses."
        filterSlugs={data.integrations.map((i) => i.slug)}
        compact
      />

      <ParsliFAQ items={data.faq} />

      {/* Related use cases */}
      {data.relatedUseCases.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Related Use Cases</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {data.relatedUseCases.map((slug) => (
                <Link
                  key={slug}
                  href={`/parsli/use-case/${slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-parsli-50 text-parsli-700 rounded-lg text-sm font-medium hover:bg-parsli-100 transition-colors"
                >
                  {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ParsliCTA
        headline={data.cta.headline}
        subheadline={data.cta.subheadline}
        ctaText={data.cta.ctaText}
      />

      <ParsliFooter />
    </>
  );
}
