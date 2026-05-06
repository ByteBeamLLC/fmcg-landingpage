import { Link } from "wouter";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  FileCheck2,
  Sparkles,
  CalendarClock,
} from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BOOK_DEMO_URL, SFDA_TOOLS } from "@/lib/sfda/tools";

const PAGE_URL = "https://bytebeam.co/sfda";

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "SFDA-aligned by design",
    description:
      "Outputs follow Module 1.3 structure and the QRD-derived layout adopted across GCC.",
  },
  {
    icon: Clock,
    title: "Hours, not weeks",
    description:
      "Replace the 60–80% of labelling work that's mechanical. Keep the regulatory judgment with your team.",
  },
  {
    icon: FileCheck2,
    title: "Editable, audit-ready",
    description:
      "DOCX out for QPPV review. Audit trail retained for inspection-ready records.",
  },
];

export default function SfdaHubPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://bytebeam.co",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "SFDA Tools",
          item: PAGE_URL,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "ByteBeam SFDA Regulatory Tools",
      description:
        "Three AI agents for SFDA labelling work — SmPC and PIL generation, Arabic translation, and dossier gap analysis.",
      url: PAGE_URL,
      hasPart: SFDA_TOOLS.map((tool) => ({
        "@type": "SoftwareApplication",
        name: tool.name,
        url: `${PAGE_URL}/${tool.slug}`,
        applicationCategory: "BusinessApplication",
      })),
    },
  ];

  return (
    <>
      <SEO
        title="SFDA Regulatory Tools — SmPC, PIL, Gap Analysis | ByteBeam"
        description="Three AI agents for SFDA Module 1.3 labelling work. Generate SmPC and PIL drafts, translate to Arabic, and run dossier gap analysis — built for KSA submissions."
        keywords="SFDA, SFDA tools, Saudi Food and Drug Authority, SmPC generator, PIL Arabic translation, dossier gap analysis, Module 1.3, GCC labelling, drug registration Saudi Arabia, regulatory affairs pharma"
        canonical={PAGE_URL}
        ogUrl={PAGE_URL}
        structuredData={structuredData}
      />

      <Navigation />

      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative text-center max-w-3xl mx-auto pt-8 pb-12"
          >
            <Badge variant="secondary" className="gap-1.5 mb-6">
              <Sparkles className="size-3 text-primary" />
              SFDA Regulatory Tools
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
              The SFDA labelling toolkit, built into one workflow
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              Three tools that replace the mechanical 60–80% of SFDA Module 1.3
              labelling work. Built around how Saudi RA teams actually submit.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href={`/sfda/${SFDA_TOOLS[0].slug}`}>
                  Try a tool free
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href={BOOK_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CalendarClock className="size-4 mr-2" />
                  Book a 30-min demo
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              One free run per tool · License sold via 30-min walkthrough
            </p>
          </motion.section>

          {/* Tool cards */}
          <section className="max-w-5xl mx-auto pb-16">
            <div className="grid gap-5 md:grid-cols-3">
              {SFDA_TOOLS.map((tool, index) => {
                const Icon =
                  (Icons as unknown as Record<string, LucideIcon>)[tool.icon] ??
                  Icons.Wrench;
                return (
                  <Link
                    key={tool.slug}
                    href={`/sfda/${tool.slug}`}
                    className="group block"
                  >
                    <Card className="h-full hover:border-primary/40 hover:shadow-md transition-all">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Icon className="size-5" />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground/60">
                            0{index + 1}
                          </span>
                        </div>
                        <h2 className="text-lg font-semibold mb-2 inline-flex items-center gap-1.5 group-hover:text-primary transition-colors">
                          {tool.shortName}
                          <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                          {tool.outcome}
                        </p>
                        <div className="mt-5 pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <FileCheck2 className="size-3.5" />
                            {tool.output.format}
                          </span>
                          <span className="font-medium text-foreground">
                            Try it →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Trust strip */}
          <section className="max-w-5xl mx-auto py-12 border-t">
            <div className="grid gap-6 md:grid-cols-3">
              {trustPoints.map((point) => (
                <Card key={point.title}>
                  <CardContent className="p-6">
                    <div className="inline-flex items-center justify-center size-11 rounded-lg bg-primary/10 text-primary mb-4">
                      <point.icon className="size-5" />
                    </div>
                    <h3 className="font-semibold text-base mb-1.5">
                      {point.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="max-w-3xl mx-auto py-16 text-center">
            <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10 text-primary mb-6">
              <Sparkles className="size-7" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Built for the labelling work that doesn't scale by hiring.
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Variation cycles, Arabic re-translation, pre-submission QC — the
              mechanical work that eats senior RA time. ByteBeam ships the
              agents; your QPPV signs off. Walk through the output with us, then
              license it for your team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <a
                  href={BOOK_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CalendarClock className="size-4 mr-2" />
                  Book a 30-min demo
                  <ArrowRight className="size-4 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={`/sfda/${SFDA_TOOLS[0].slug}`}>
                  Try a tool free first
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Sales-led license · Per-team pricing discussed on the call
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
