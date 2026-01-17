import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Scale,
  Shield,
  Pill,
  ShoppingCart,
  Cog,
  CheckCircle2,
  Zap
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";
import { Link } from "wouter";

// Structured data for SEO
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Industries - AI Document Automation Solutions",
    "description": "AI-powered document automation solutions for Finance, Legal, Insurance, Pharma, FMCG, and Operations teams.",
    "url": "https://bytebeam.co/industries",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Finance", "url": "https://bytebeam.co/industries/finance" },
        { "@type": "ListItem", "position": 2, "name": "Legal", "url": "https://bytebeam.co/industries/legal" },
        { "@type": "ListItem", "position": 3, "name": "Insurance", "url": "https://bytebeam.co/industries/insurance" },
        { "@type": "ListItem", "position": 4, "name": "Pharma", "url": "https://bytebeam.co/industries/pharma" },
        { "@type": "ListItem", "position": 5, "name": "FMCG", "url": "https://bytebeam.co/industries/fmcg" },
        { "@type": "ListItem", "position": 6, "name": "Operations", "url": "https://bytebeam.co/industries/operations" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bytebeam.co" },
      { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://bytebeam.co/industries" }
    ]
  }
];

const industries = [
  {
    title: "Finance",
    description: "Automate KYC document verification, bank statement analysis, and financial compliance workflows.",
    icon: Building2,
    href: "/industries/finance",
    useCases: ["KYC/AML document review", "Bank statement parsing", "Financial report extraction", "Audit preparation"]
  },
  {
    title: "Legal",
    description: "Streamline contract review, legal document analysis, and compliance verification processes.",
    icon: Scale,
    href: "/industries/legal",
    useCases: ["Contract clause extraction", "Due diligence automation", "Legal document summarization", "Policy comparison"]
  },
  {
    title: "Insurance",
    description: "Accelerate claims processing, policy analysis, and underwriting document workflows.",
    icon: Shield,
    href: "/industries/insurance",
    useCases: ["Claims document processing", "Policy extraction", "Risk assessment automation", "Coverage verification"]
  },
  {
    title: "Pharma",
    description: "Regulatory dossier preparation, gap analysis, and compliance documentation for drug registration.",
    icon: Pill,
    href: "/industries/pharma",
    useCases: ["CTD dossier preparation", "Regulatory gap analysis", "Label compliance checking", "Pharmacovigilance docs"]
  },
  {
    title: "FMCG",
    description: "Product label localization, ingredient compliance, and regulatory documentation for consumer goods.",
    icon: ShoppingCart,
    href: "/industries/fmcg",
    useCases: ["Food label localization", "Ingredient list translation", "Regulatory compliance", "Market entry documentation"]
  },
  {
    title: "Operations",
    description: "Process invoices, purchase orders, and operational documents at scale with AI automation.",
    icon: Cog,
    href: "/industries/operations",
    useCases: ["Invoice processing", "PO matching", "Vendor document verification", "Data extraction at scale"]
  }
];

export default function IndustriesIndex() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [industriesRef, industriesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  return (
    <>
      <SEO
        title="Industries | AI Document Automation Solutions | ByteBeam"
        description="AI-powered document automation for Finance, Legal, Insurance, Pharma, FMCG, and Operations. No-code solutions for document-heavy workflows."
        keywords="document automation, AI document processing, KYC automation, contract review, insurance claims processing, pharma regulatory, FMCG compliance"
        canonical="https://bytebeam.co/industries"
        structuredData={structuredData}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="container-custom">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Industry Solutions
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              AI Document Automation for <span className="text-primary">Every Industry</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Purpose-built AI agents for document-heavy workflows in finance, legal, insurance, pharma, FMCG, and operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleBookDemo}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
              >
                <Link href="/solutions">
                  View AI Agents
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            ref={industriesRef}
            initial={{ opacity: 0 }}
            animate={industriesInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Solutions by Industry
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore how ByteBeam helps teams automate document workflows in your industry.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={industriesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={industry.href}>
                    <div className="group h-full bg-white border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <industry.icon className="w-6 h-6 text-primary" />
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {industry.title}
                      </h3>

                      <p className="text-muted-foreground mb-4 text-sm">
                        {industry.description}
                      </p>

                      <ul className="space-y-2 mb-4">
                        {industry.useCases.slice(0, 3).map((useCase) => (
                          <li key={useCase} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-foreground/80">{useCase}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cross-Industry Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Benefits Across Industries
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common advantages our customers experience regardless of industry.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">85%</div>
              <p className="text-muted-foreground">Time saved on document processing</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <p className="text-muted-foreground">Extraction accuracy with human review</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">0</div>
              <p className="text-muted-foreground">Code required to build agents</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24hr</div>
              <p className="text-muted-foreground">Typical deployment time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Don't See Your Industry?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            ByteBeam works with any document-heavy workflow. Book a demo to discuss your specific use case.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={handleBookDemo}
            className="bg-white text-primary hover:bg-white/90"
          >
            Book a Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
      <LiveChatWidget />
    </>
  );
}
