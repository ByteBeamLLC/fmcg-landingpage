import { Link } from "wouter";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldCheck,
  FileOutput,
  Star,
  CalendarClock,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  BOOK_DEMO_URL,
  getOtherSfdaTools,
  type SfdaTool,
} from "@/lib/sfda/tools";
import SfdaToolDemo from "./SfdaToolDemo";

interface SfdaToolPageProps {
  tool: SfdaTool;
}

function getIcon(name: string): LucideIcon {
  return (
    (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Wrench
  );
}

export default function SfdaToolPage({ tool }: SfdaToolPageProps) {
  const ToolIcon = getIcon(tool.icon);
  const otherTools = getOtherSfdaTools(tool.slug);
  const url = `https://bytebeam.co/sfda/${tool.slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: tool.name,
      description: tool.metaDescription,
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      provider: {
        "@type": "Organization",
        name: "ByteBeam",
        url: "https://bytebeam.co",
      },
    },
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
          item: "https://bytebeam.co/sfda",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tool.name,
          item: url,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use ${tool.name}`,
      description: tool.outcome,
      step: tool.steps.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: step.title,
        text: step.description,
      })),
    },
  ];

  return (
    <>
      <SEO
        title={`${tool.name} — SFDA Module 1.3 Labelling | ByteBeam`}
        description={tool.metaDescription}
        keywords={`${tool.headKeyword}, SFDA, Saudi Food and Drug Authority, ${tool.shortName.toLowerCase()}, pharmaceutical regulatory affairs, GCC labelling, Module 1.3, drug registration Saudi Arabia`}
        canonical={url}
        ogType="website"
        ogUrl={url}
        structuredData={structuredData}
      />

      <Navigation />

      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link
              href="/sfda"
              className="inline-flex items-center gap-2 hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-4" />
              SFDA Tools
            </Link>
            <ChevronRight className="size-3" />
            <span className="text-foreground font-medium">{tool.shortName}</span>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="gap-1.5">
                <ToolIcon className="size-3" />
                {tool.badgeLabel}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                <Sparkles className="size-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 tracking-tight leading-[1.1]">
              {tool.outcome}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-3">
              {tool.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-0.5 text-yellow-500">
                <Star className="size-3.5 fill-current" />
                <Star className="size-3.5 fill-current" />
                <Star className="size-3.5 fill-current" />
                <Star className="size-3.5 fill-current" />
                <Star className="size-3.5 fill-current" />
              </div>
              <span>Built for SFDA Module 1.3 submissions</span>
            </div>
          </motion.div>

          {/* Tool demo */}
          <motion.div
            id="tool"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl scroll-mt-24"
          >
            <SfdaToolDemo
              toolSlug={tool.slug}
              toolName={tool.name}
              ctaLabel={tool.ctaLabel}
              inputs={tool.inputs}
              outputLabel={tool.output.label}
              outputFormat={tool.output.format}
            />
            <p className="mt-4 text-xs text-muted-foreground text-center">
              One free run per tool · Audit trail retained · Walk through the
              output with our team to license for your full portfolio
            </p>
          </motion.div>

          {/* Why teams pick this */}
          <section className="mt-20 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              Why teams pick this over a manual draft
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tool.features.map((feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <Card key={feature.title}>
                    <CardContent className="p-6">
                      <div className="inline-flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary mb-4">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* How it works */}
          <section className="mt-20 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              How it works
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tool.steps.map((step, i) => {
                const Icon = getIcon(step.icon);
                return (
                  <Card key={step.title} className="relative">
                    <CardContent className="p-6">
                      <div className="absolute top-4 right-4 text-xs font-bold text-muted-foreground/30">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-4">
                        <Icon className="size-6" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Inputs / Outputs */}
          <section className="mt-20 sm:mt-24">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <ToolIcon className="size-5 text-primary" />
                    <h2 className="font-semibold text-lg">What goes in</h2>
                  </div>
                  <ul className="space-y-4">
                    {tool.inputs.map((input) => (
                      <li key={input.id} className="flex gap-3">
                        <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-sm flex items-center gap-2">
                            {input.label}
                            {!input.required && (
                              <span className="text-[10px] uppercase tracking-wide text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                Optional
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {input.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <FileOutput className="size-5 text-primary" />
                    <h2 className="font-semibold text-lg">What comes out</h2>
                  </div>
                  <p className="text-sm font-medium mb-1">
                    {tool.output.label}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Format: {tool.output.format}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-4">
                    <ShieldCheck className="size-3.5" />
                    Editable, audit-trailed
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Use cases + Out of scope */}
          <section className="mt-20 sm:mt-24">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-6">
                  When teams use this
                </h2>
                <ul className="space-y-3">
                  {tool.useCases.map((uc, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {uc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight mb-6">
                  What this tool does{" "}
                  <em className="text-muted-foreground">not</em> do
                </h2>
                <ul className="space-y-3">
                  {tool.outOfScope.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <XCircle className="size-4 text-muted-foreground mt-0.5 shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Personas */}
          <section className="mt-20 sm:mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              Built for
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tool.personas.map((persona) => {
                const Icon = getIcon(persona.icon);
                return (
                  <Card
                    key={persona.title}
                    className="hover:border-primary/30 transition-colors"
                  >
                    <CardContent className="p-5">
                      <Icon className="size-5 text-primary mb-3" />
                      <h3 className="font-semibold text-sm mb-1.5">
                        {persona.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {persona.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-20 sm:mt-24 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
              Frequently asked questions
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {tool.faqs.map((faq) => (
                <Card key={faq.q}>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-sm mb-2">{faq.q}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="mt-20 sm:mt-24">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-10 sm:p-14 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/15 text-primary mb-6">
                  <Sparkles className="size-7" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  License {tool.shortName} for your team
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                  Run one free preview to see the output on your own document.
                  To run it across your portfolio, integrate with your QMS, or
                  license for your team — walk through the output with us in a
                  30-min call.
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
                    <a href="#tool">Try it free first</a>
                  </Button>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Sales-led license · Per-team pricing discussed on the call ·
                  No self-serve checkout
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Related tools */}
          <section className="mt-20 sm:mt-24">
            <h2 className="text-lg font-semibold mb-6">Other SFDA tools</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {otherTools.map((other) => {
                const Icon = getIcon(other.icon);
                return (
                  <Link
                    key={other.slug}
                    href={`/sfda/${other.slug}`}
                    className="group block"
                  >
                    <Card className="hover:border-primary/40 transition-colors">
                      <CardContent className="p-5 flex gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                          <Icon className="size-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm mb-1 inline-flex items-center gap-1.5">
                            {other.shortName}
                            <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                            {other.outcome}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6">
              <Link
                href="/sfda"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                See all SFDA tools
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
