import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "wouter";
import {
  ArrowRight,
  Calendar,
  Clock,
  Tag,
  Sparkles,
  Wrench,
} from "lucide-react";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SFDA_TOOLS } from "@/lib/sfda/tools";
import {
  getVisiblePosts,
  type BlogCategory,
  type BlogPostMeta,
} from "@/lib/blog/posts";

const visiblePosts = getVisiblePosts();

/**
 * Section order is intentional: top-funnel commercial pillars first
 * (Regulatory → Compliance → Automation → Industry). Matches the
 * parsli framework's pillar hierarchy and surfaces the highest-intent
 * content nearest the page hero.
 */
const SECTIONS: { key: BlogCategory; title: string; subtitle: string }[] = [
  {
    key: "Regulatory",
    title: "Regulatory affairs",
    subtitle:
      "Pharma RA, drug registration, and labelling guidance for SFDA, GCC, and beyond.",
  },
  {
    key: "Compliance",
    title: "Compliance & labelling",
    subtitle:
      "Food, FMCG, and product compliance — labelling rules, market registration, and audit prep.",
  },
  {
    key: "Automation",
    title: "Automation & AI",
    subtitle:
      "Document AI, no-code workflow patterns, and the tooling stack behind modern compliance teams.",
  },
  {
    key: "Industry",
    title: "Industry deep-dives",
    subtitle: "How specific industries operationalise document automation.",
  },
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "ByteBeam Blog",
    description:
      "Expert insights on document automation, regulatory compliance, and AI-powered workflows for FMCG, pharma, finance, and legal industries.",
    url: "https://bytebeam.co/blog",
    publisher: {
      "@type": "Organization",
      name: "ByteBeam",
      url: "https://bytebeam.co",
      logo: "https://bytebeam.co/assets/bytebeam-logo.png",
    },
    blogPost: visiblePosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `https://bytebeam.co/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: {
        "@type": "Organization",
        name: "ByteBeam Editorial Team",
      },
    })),
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
        name: "Blog",
        item: "https://bytebeam.co/blog",
      },
    ],
  },
];

function getCategoryColor(category: string) {
  switch (category) {
    case "Compliance":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200";
    case "Regulatory":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200";
    case "Automation":
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200";
    case "Industry":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
}

function PostCard({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="bg-card border-2 border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video bg-muted relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/30">
              {post.industry}
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}
            >
              {post.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {post.industry}
            </span>
          </div>
          <h2 className="text-lg font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogIndex() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionsWithPosts = SECTIONS.map((section) => ({
    ...section,
    posts: visiblePosts.filter((p) => p.category === section.key),
  })).filter((s) => s.posts.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="ByteBeam Blog | Document Automation & Compliance Insights"
        description="Expert insights on document automation, regulatory compliance, and AI-powered workflows for FMCG, pharma, finance, and legal industries. Stay ahead with ByteBeam."
        ogTitle="ByteBeam Blog | Document Automation & Compliance Insights"
        ogDescription="Expert insights on AI-powered document automation, regulatory compliance, and workflow optimization for GCC markets and beyond."
        keywords="document automation blog, compliance automation, regulatory affairs, AI document processing, FMCG compliance, pharma registration, invoice automation, GCC compliance"
        canonical="https://bytebeam.co/blog"
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="section-padding gradient-overlay text-white">
        <div className="container-custom">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ByteBeam Blog
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Expert insights on document automation, regulatory compliance,
              and AI-powered workflows for industries that move the world.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {sectionsWithPosts.map((section) => (
                <a
                  key={section.key}
                  href={`#${section.key.toLowerCase()}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured cluster — SFDA toolkit */}
      <section className="py-12 lg:py-16 bg-background border-b border-border">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1 min-w-0">
                    <Badge variant="secondary" className="gap-1.5 mb-4">
                      <Sparkles className="size-3 text-primary" />
                      Featured · SFDA toolkit
                    </Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3 leading-tight">
                      Built for SFDA Module 1.3 labelling work
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-5">
                      Three AI agents that replace the mechanical 60–80% of
                      SFDA labelling work — SmPC + PIL generation, Arabic
                      translation with regulator-recognised phrasing, and
                      pre-submission gap analysis. Free first run on each
                      tool, license sold via 30-min walkthrough.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-3 mb-6">
                      {SFDA_TOOLS.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/sfda/${tool.slug}`}
                          className="group block p-3 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
                        >
                          <p className="font-semibold text-sm mb-1 inline-flex items-center gap-1.5 group-hover:text-primary transition-colors">
                            <Wrench className="size-3.5" />
                            {tool.shortName}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {tool.outcome}
                          </p>
                        </Link>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild>
                        <Link href="/sfda">
                          See the SFDA toolkit
                          <ArrowRight className="size-4 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/blog/sfda-drug-registration-guide-saudi-arabia">
                          Read the SFDA registration guide
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Category sections */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container-custom">
          <div className="space-y-16">
            {sectionsWithPosts.map((section) => (
              <div
                key={section.key}
                id={section.key.toLowerCase()}
                className="scroll-mt-24"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                        {section.title}
                      </h2>
                      <p className="text-muted-foreground max-w-3xl">
                        {section.subtitle}
                      </p>
                    </div>
                    <span className="text-sm text-muted-foreground shrink-0">
                      {section.posts.length}{" "}
                      {section.posts.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.posts.map((post, i) => (
                    <PostCard key={post.slug} post={post} index={i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to automate your document workflows?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See how ByteBeam can transform your compliance and document
              processing operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg">
                <Link href="/sfda">
                  Try the SFDA toolkit free
                  <ArrowRight className="size-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/">Explore the platform</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
