import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileText,
  Languages,
  Pill,
  CheckCircle2,
  Zap,
  Clock,
  Shield
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
    "name": "AI Agent Solutions - Document Automation",
    "description": "Pre-built AI agents for document automation. UAE food label localization, Saudi pharma gap analysis, and custom compliance workflows.",
    "url": "https://bytebeam.co/solutions",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "UAE Food Label Localization",
          "url": "https://bytebeam.co/solutions/uae-food-label-localization"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Saudi Pharma Gap Analysis",
          "url": "https://bytebeam.co/solutions/saudi-pharma-gap-analysis"
        }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bytebeam.co" },
      { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://bytebeam.co/solutions" }
    ]
  }
];

const solutions = [
  {
    title: "UAE Food Label Localization",
    description: "Automate Arabic translation and compliance checking for food labels entering UAE and GCC markets. Ensure ESMA compliance and Dubai Municipality registration readiness.",
    icon: Languages,
    href: "/solutions/uae-food-label-localization",
    features: [
      "Arabic translation with regulatory accuracy",
      "ESMA & GSO compliance validation",
      "Dubai Municipality (Montaji) preparation",
      "Allergen & ingredient localization"
    ],
    stats: { value: "85%", label: "Time saved on label prep" }
  },
  {
    title: "Saudi Pharma Gap Analysis",
    description: "Automated dossier gap analysis for SFDA drug registration. Compare your CTD against Saudi requirements and identify missing documents instantly.",
    icon: Pill,
    href: "/solutions/saudi-pharma-gap-analysis",
    features: [
      "CTD module completeness check",
      "SFDA-specific requirement mapping",
      "Missing document identification",
      "Regulatory timeline optimization"
    ],
    stats: { value: "70%", label: "Faster gap identification" }
  }
];

export default function SolutionsIndex() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [solutionsRef, solutionsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  return (
    <>
      <SEO
        title="AI Agent Solutions | Document Automation | ByteBeam"
        description="Pre-built AI agents for document automation. UAE food label localization, Saudi pharma gap analysis, and custom compliance workflows. No coding required."
        keywords="AI agents, document automation, UAE food labels, SFDA registration, compliance automation, regulatory automation"
        canonical="https://bytebeam.co/solutions"
        structuredData={structuredData}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
              Pre-Built AI Agents
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              AI Agents for <span className="text-primary">Document Automation</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Deploy pre-built AI agents for regulatory compliance, document localization, and workflow automation. 
              No coding required — just upload your documents.
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
                <Link href="/tools">
                  Try Free Tools
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.div
            ref={solutionsRef}
            initial={{ opacity: 0 }}
            animate={solutionsInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Production-Ready AI Agents
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose from our library of pre-built agents designed for specific regulatory and compliance workflows.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={solutionsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={solution.href}>
                    <div className="group h-full bg-white border border-border rounded-2xl p-8 hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <solution.icon className="w-7 h-7 text-primary" />
                        </div>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {solution.stats.value} {solution.stats.label}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {solution.title}
                      </h3>

                      <p className="text-muted-foreground mb-6">
                        {solution.description}
                      </p>

                      <ul className="space-y-3 mb-6">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center text-primary font-medium group-hover:gap-3 transition-all">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why ByteBeam Section */}
      <section className="py-20 bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose ByteBeam AI Agents?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI agents are built specifically for document-heavy compliance workflows.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hours to Minutes</h3>
              <p className="text-muted-foreground">
                Reduce document processing time from hours to minutes with automated extraction and validation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">99% Accuracy</h3>
              <p className="text-muted-foreground">
                Human-in-the-loop review ensures regulatory-grade accuracy for compliance-critical workflows.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Code Required</h3>
              <p className="text-muted-foreground">
                Deploy and customize agents using our spreadsheet-like interface. No developers needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Automate Your Document Workflows?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Book a demo to see how our AI agents can transform your compliance processes.
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
