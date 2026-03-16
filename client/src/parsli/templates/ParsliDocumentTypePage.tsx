import { Link } from "wouter";
import { ArrowRight, FileCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliHowItWorks from "../components/ParsliHowItWorks";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";
import type { DocumentTypePageData } from "../data/types";

interface Props {
  data: DocumentTypePageData;
}

export default function ParsliDocumentTypePage({ data }: Props) {
  const [fieldsRef, fieldsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formatsRef, formatsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <ParsliSEO
        title={data.seo.title}
        description={data.seo.description}
        path={`/document/${data.slug}`}
        keywords={data.seo.keywords}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: data.hero.headline,
            description: data.hero.subheadline,
            step: data.howItWorks.map((s, i) => ({
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
      />

      {/* Extractable fields */}
      <section ref={fieldsRef} className="section-padding parsli-section-alt">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={fieldsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fields We Extract
            </h2>
            <p className="text-lg text-gray-600">
              Parsli automatically identifies and extracts these data points.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {data.extractableFields.map((field, index) => (
              <motion.div
                key={field.fieldName}
                initial={{ opacity: 0, y: 15 }}
                animate={fieldsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white p-5 rounded-xl border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="w-4 h-4 text-parsli-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">{field.fieldName}</h3>
                </div>
                <p className="text-xs text-gray-500 mb-2">{field.description}</p>
                <code className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded">
                  e.g. {field.example}
                </code>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ParsliHowItWorks steps={data.howItWorks} />

      {/* Supported formats */}
      <section ref={formatsRef} className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Supported Formats</h3>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {data.supportedFormats.map((format) => (
              <span
                key={format}
                className="px-3 py-1.5 bg-parsli-50 text-parsli-700 rounded-lg text-sm font-medium"
              >
                {format}
              </span>
            ))}
          </div>
        </div>
      </section>

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

      <ParsliCTA />

      <ParsliFooter />
    </>
  );
}
