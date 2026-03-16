import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliHowItWorks from "../components/ParsliHowItWorks";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";
import type { IntegrationPageData } from "../data/types";

interface Props {
  data: IntegrationPageData;
}

export default function ParsliIntegrationPage({ data }: Props) {
  return (
    <>
      <ParsliSEO
        title={data.seo.title}
        description={data.seo.description}
        path={`/integration/${data.slug}`}
        keywords={data.seo.keywords}
      />

      <ParsliNavigation />

      <ParsliHero
        variant="feature"
        badge={`${data.hero.integrationName} Integration`}
        headline={data.hero.headline}
        subheadline={data.hero.subheadline}
      />

      <ParsliHowItWorks
        headline={`Connect Parsli with ${data.hero.integrationName}`}
        subheadline="Get started in minutes with our step-by-step setup."
        steps={data.setupSteps}
      />

      <ParsliFeatureGrid
        headline={`What You Can Do With ${data.hero.integrationName}`}
        features={data.features}
        columns={3}
      />

      {/* Use cases with this integration */}
      {data.useCasesWithIntegration.length > 0 && (
        <section className="section-padding parsli-section-alt">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Popular Use Cases with {data.hero.integrationName}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {data.useCasesWithIntegration.map((uc) => (
                <Link
                  key={uc.slug}
                  href={`/parsli/use-case/${uc.slug}`}
                  className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-parsli-200 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 group-hover:text-parsli-600 transition-colors mb-1.5 flex items-center gap-2">
                    {uc.title}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-gray-600">{uc.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ParsliFAQ items={data.faq} />

      <ParsliCTA
        headline={`Automate with ${data.hero.integrationName} + Parsli`}
        subheadline="Free 26 pages/month. Connect in under 2 minutes."
      />

      <ParsliFooter />
    </>
  );
}
