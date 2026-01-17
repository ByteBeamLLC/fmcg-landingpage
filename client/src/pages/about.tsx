import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Table2, Shield, Eye, FileCheck, Clock, Brain } from "lucide-react";
import { Link } from "wouter";
import bytebeamLogo from "@assets/bytebeam_logo_1759326269799.png";
import SEO from "@/components/SEO";

// Structured data for About page
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ByteBeam Agent Builder",
    "description": "ByteBeam Agent Builder is a table-based AI agent builder for document work. Non-technical SMEs build AI agents using an Excel-like interface to automate complex document workflows.",
    "url": "https://bytebeam.co/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "ByteBeam",
      "url": "https://bytebeam.co",
      "logo": "https://bytebeam.co/assets/bytebeam-logo.png",
      "description": "ByteBeam Agent Builder: Table-based AI agent builder for document work. SMEs build AI agents using an Excel-like interface. No code required.",
      "foundingDate": "2024",
      "areaServed": [
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Lebanon" }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "20 Wenlock Road",
          "addressLocality": "London",
          "addressCountry": "United Kingdom",
          "postalCode": "N1 7GU"
        }
      ],
      "sameAs": []
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bytebeam.co" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://bytebeam.co/about" }
    ]
  }
];

export default function About() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [challengeRef, challengeInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [solutionRef, solutionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [platformRef, platformInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleGetInTouch = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="ByteBeam Agent Builder | Table-Based AI Agents for Document Work"
        description="ByteBeam Agent Builder: A table-based AI agent builder for document work. SMEs build AI agents using an Excel-like interface. Automate KYC, compliance, risk assessment. No code required."
        ogTitle="ByteBeam Agent Builder | Table-Based AI Agent Builder"
        ogDescription="Build AI agents using tables, not code. ByteBeam Agent Builder lets SMEs automate complex document work—KYC, compliance, risk assessment—using an Excel-like interface."
        keywords="ByteBeam Agent Builder, table-based AI agent builder, document work automation, Excel AI builder, SME automation, no-code AI agents, document automation, KYC automation"
        canonical="https://bytebeam.co/about"
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
            <img
              src={bytebeamLogo}
              alt="ByteBeam Logo"
              className="h-16 mx-auto mb-8 brightness-0 invert"
              data-testid="about-logo"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">ByteBeam Agent Builder</h1>
            <p className="text-2xl text-white/95 max-w-3xl mx-auto mb-4 font-medium">
              Table-Based AI Agent Builder for Document Work
            </p>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-4">
              Build AI agents using an interface you already know — <span className="font-semibold">tables, columns, and rules</span>. No code required.
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Subject matter experts automate complex document work—KYC, compliance, risk assessment—without writing a single line of code.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-8 bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-white"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8" />
              <div>
                <span className="text-4xl md:text-5xl font-bold">85%</span>
                <span className="text-lg ml-2">reduction in processing time</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/30" />
            <div className="flex items-center gap-3">
              <FileCheck className="w-8 h-8" />
              <div>
                <span className="text-4xl md:text-5xl font-bold">10,000+</span>
                <span className="text-lg ml-2">documents processed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            ref={challengeRef}
            initial={{ opacity: 0, y: 30 }}
            animate={challengeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">The Challenge</h2>
            <div className="bg-muted/50 border-2 border-border rounded-2xl p-8 md:p-12">
              <p className="text-lg text-muted-foreground mb-6">
                Your most experienced people spend their days on document work that requires judgment — <span className="text-foreground font-medium">KYC verification, risk assessment, chargeback decisions, compliance reviews</span>.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                This work can't be automated with traditional tools because it requires the kind of reasoning only your SMEs possess.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive text-xl">💰</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Highly paid specialists buried in repetitive tasks</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive text-xl">⚖️</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Inconsistent decisions across teams</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive text-xl">🚪</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Institutional knowledge that walks out the door when people leave</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Bytebeam Does Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            ref={solutionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={solutionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">What ByteBeam Agent Builder Does</h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              A table-based AI agent builder that captures your SMEs' decision-making logic and scales it across your document workflows.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border-2 border-border rounded-xl p-8"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Table2 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Table-Based Interface</h3>
                <p className="text-muted-foreground">
                  Build agents using tables—<span className="text-foreground font-medium">columns for data, rows for documents, rules for logic</span>. SMEs define how documents should be read, cross-referenced, and evaluated without writing code.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={solutionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border-2 border-border rounded-xl p-8"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Full Audit Trails</h3>
                <p className="text-muted-foreground">
                  The platform executes your logic consistently, with <span className="text-foreground font-medium">full audit trails and citations back to source documents</span>. Every decision is traceable and explainable.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            ref={platformRef}
            initial={{ opacity: 0, y: 30 }}
            animate={platformInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Built for Enterprise Document Work</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                ByteBeam Agent Builder is the operational layer that makes AI work for document workflows. It handles the <span className="text-foreground font-medium">orchestration, governance, and auditability</span> that enterprises require — regardless of which foundation model powers the intelligence underneath.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're building your own LLM, using an existing provider, or planning to switch as better options emerge, ByteBeam Agent Builder provides the infrastructure for non-technical SMEs to <span className="text-foreground font-medium">create, deploy, monitor, and govern AI agents at scale</span>.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={platformInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-muted/50 border border-border rounded-xl p-6 text-center"
              >
                <Brain className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Model Agnostic</h4>
                <p className="text-sm text-muted-foreground">Works with any LLM provider or your own models</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={platformInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-muted/50 border border-border rounded-xl p-6 text-center"
              >
                <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Enterprise Governance</h4>
                <p className="text-sm text-muted-foreground">Built-in compliance and security controls</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={platformInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-muted/50 border border-border rounded-xl p-6 text-center"
              >
                <FileCheck className="w-8 h-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Scale Ready</h4>
                <p className="text-sm text-muted-foreground">Deploy and monitor agents across your operations</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-overlay text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Build Your First Agent?</h2>
            <p className="text-xl mb-8 text-white/90">
              Let your SMEs build AI agents using tables—no code, no engineering required. See ByteBeam Agent Builder in action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetInTouch}
                className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 text-lg"
                size="lg"
                data-testid="button-get-in-touch"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg w-full sm:w-auto"
                  size="lg"
                  data-testid="button-back-home"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
