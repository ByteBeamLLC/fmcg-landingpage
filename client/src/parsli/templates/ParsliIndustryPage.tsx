import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliPainPoints from "../components/ParsliPainPoints";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliHowItWorks from "../components/ParsliHowItWorks";
import ParsliBenefits from "../components/ParsliBenefits";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";
import type { IndustryPageData } from "../data/types";

interface Props {
  data: IndustryPageData;
}

export default function ParsliIndustryPage({ data }: Props) {
  return (
    <>
      <ParsliSEO
        title={data.seo.title}
        description={data.seo.description}
        path={`/industry/${data.slug}`}
        keywords={data.seo.keywords}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Parsli for ${data.hero.badge}`,
            description: data.seo.description,
            provider: {
              "@type": "Organization",
              name: "Parsli by ByteBeam",
              url: "https://parser.bytebeam.co",
            },
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
      />

      <ParsliPainPoints
        headline={data.painPoints.headline}
        subheadline={data.painPoints.subheadline}
        items={data.painPoints.items}
      />

      <ParsliFeatureGrid
        headline={data.useCases.headline}
        subheadline={data.useCases.subheadline}
        features={data.useCases.items}
        columns={3}
      />

      <ParsliHowItWorks steps={data.howItWorks} />

      <ParsliBenefits benefits={data.benefits} />

      <ParsliFAQ items={data.faq} />

      {data.relatedIndustries.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Parsli for Other Industries</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {data.relatedIndustries.map((slug) => (
                <Link
                  key={slug}
                  href={`/parsli/industry/${slug}`}
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
