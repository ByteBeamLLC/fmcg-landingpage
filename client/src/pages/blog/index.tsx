import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import SEO from "@/components/SEO";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  industry: string;
  readTime: string;
  date: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "uae-food-labeling-requirements-2026",
    title: "UAE Food Labeling Requirements 2026: Complete Compliance Guide",
    description: "Master UAE food label compliance in 2026. ESMA regulations, Arabic requirements, NutriMark system, and step-by-step guide for FMCG manufacturers.",
    category: "Compliance",
    industry: "FMCG",
    readTime: "12 min",
    date: "2026-01-16",
    image: "/images/blog/uae-food-labeling-compliance.jpg"
  },
  {
    slug: "sfda-drug-registration-guide-saudi-arabia",
    title: "SFDA Drug Registration Guide Saudi Arabia: Complete 2026 Process",
    description: "Navigate SFDA drug registration in Saudi Arabia. Complete guide covering CTD requirements, GMP certification, pricing approval, and timeline for 2026.",
    category: "Regulatory",
    industry: "Pharma",
    readTime: "14 min",
    date: "2026-01-16",
    image: "/images/blog/sfda-drug-registration-saudi.jpg"
  },
  {
    slug: "dubai-municipality-montaji-food-registration",
    title: "Dubai Municipality Montaji Portal: Food Product Registration Guide 2026",
    description: "Step-by-step Montaji portal guide for food product registration in Dubai. Document requirements, fees, timelines, and approval process for 2026.",
    category: "Compliance",
    industry: "FMCG",
    readTime: "10 min",
    date: "2026-01-16",
    image: "/images/blog/montaji-portal-dubai-municipality.jpg"
  },
  {
    slug: "gcc-document-compliance-automation-2026",
    title: "GCC Document Compliance Automation: Multi-Market Guide 2026",
    description: "Automate document compliance across UAE, Saudi Arabia, and GCC markets. AI-powered workflows, no-code solutions, and ROI analysis for 2026.",
    category: "Automation",
    industry: "Cross-Industry",
    readTime: "11 min",
    date: "2026-01-16",
    image: "/images/blog/gcc-document-compliance-automation.jpg"
  },
  {
    slug: "no-code-document-automation-regulatory-teams-2026",
    title: "No-Code Document Automation for Regulatory Teams: 2026 Guide",
    description: "Learn how regulatory teams use no-code document automation to build compliance workflows without IT. Citizen developer guide with tools and use cases for 2026.",
    category: "Automation",
    industry: "Cross-Industry",
    readTime: "10 min",
    date: "2026-01-16",
    image: "/images/blog/no-code-document-automation-regulatory-team.jpg"
  },
  {
    slug: "intelligent-document-processing-business-guide-2026",
    title: "Intelligent Document Processing Explained: A Business User's Guide for 2026",
    description: "IDP explained for 2026. Learn what intelligent document processing is, how it differs from OCR, and how your team can use it—no tech background needed.",
    category: "Automation",
    industry: "Cross-Industry",
    readTime: "9 min",
    date: "2026-01-16",
    image: "/images/blog/intelligent-document-processing-business-user.jpg"
  },
  {
    slug: "automating-invoice-processing-2026",
    title: "Automating Invoice Processing in 2026: The Complete Guide for Finance Teams",
    description: "Cut invoice processing costs by 80% in 2026. Learn how AI automation reduces manual AP work from $16 to $3 per invoice with step-by-step implementation.",
    category: "Automation",
    industry: "Finance",
    readTime: "11 min",
    date: "2026-01-16",
    image: "/images/blog/automating-invoice-processing-dashboard.jpg"
  }
];

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ByteBeam Blog",
    "description": "Expert insights on document automation, regulatory compliance, and AI-powered workflows for FMCG, pharma, finance, and legal industries.",
    "url": "https://bytebeam.co/blog",
    "publisher": {
      "@type": "Organization",
      "name": "ByteBeam",
      "url": "https://bytebeam.co",
      "logo": "https://bytebeam.co/assets/bytebeam-logo.png"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "url": `https://bytebeam.co/blog/${post.slug}`,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": "ByteBeam Team"
      }
    }))
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bytebeam.co" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://bytebeam.co/blog" }
    ]
  }
];

export default function BlogIndex() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [postsRef, postsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Compliance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Regulatory":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Automation":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">ByteBeam Blog</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Expert insights on document automation, regulatory compliance, and AI-powered workflows for industries that move the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            ref={postsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={postsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={postsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card border-2 border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
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
                          {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Automate Your Document Workflows?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              See how ByteBeam can transform your compliance and document processing operations.
            </p>
            <Link href="/">
              <a className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Explore Our Platform
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
