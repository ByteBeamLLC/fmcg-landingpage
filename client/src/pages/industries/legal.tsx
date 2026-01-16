import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Scale,
  FileSearch,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  BookOpen,
  Briefcase,
  ScrollText
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function LegalIndustry() {
  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="No-Code Legal Document Automation | Contract Review | ByteBeam"
        description="Automate contract review, due diligence, and legal document processing without coding. Extract key terms in minutes. No developers needed. Book a demo."
        ogTitle="No-Code Legal Document Automation | ByteBeam"
        ogDescription="Review contracts 10x faster with AI. Extract parties, terms, dates, and obligations automatically with 99% accuracy. No coding required."
        keywords="contract review automation for paralegals, no-code legal document automation, due diligence automation, lease abstraction, document automation UAE, AI automation Saudi Arabia"
        canonical="https://bytebeam.co/industries/legal"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://bytebeam.co"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Industries",
                "item": "https://bytebeam.co/industries"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Legal",
                "item": "https://bytebeam.co/industries/legal"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "No-Code Legal Document Automation",
            "description": "AI-powered document automation for legal teams. Automate contract review, due diligence, and legal document processing without coding.",
            "provider": {
              "@type": "Organization",
              "name": "ByteBeam"
            },
            "areaServed": ["Global", "United Arab Emirates", "Saudi Arabia", "GCC"],
            "serviceType": "Document Automation"
          }
        ]}
      />
      <Navigation />

      <HeroSection onBookDemo={handleBookDemo} />
      <PainPointsSection />
      <UseCasesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CTASection onBookDemo={handleBookDemo} />

      <Footer />
      <LiveChatWidget />
    </div>
  );
}

function HeroSection({ onBookDemo }: { onBookDemo: () => void }) {
  return (
    <section className="section-padding pt-32 pb-20 relative overflow-hidden dynamic-gradient text-foreground">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Scale className="size-4" />
              Legal Teams
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              AI Document Automation<br />for Legal
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-normal max-w-3xl mx-auto leading-relaxed">
              Review contracts in minutes instead of hours. Extract key terms, identify risks, and accelerate due diligence with AI-powered document automation.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button
                onClick={onBookDemo}
                className="text-lg px-8"
                size="lg"
              >
                Book a Demo
              </Button>
              <Button
                variant="outline"
                className="text-lg px-8"
                size="lg"
                asChild
              >
                <Link href="/industries/insurance">
                  See Other Industries
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-bold mb-1">10x</div>
                <div className="text-sm text-muted-foreground">Faster Review</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Extraction Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">1000s</div>
                <div className="text-sm text-muted-foreground">Docs Processed Daily</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.15),transparent_55%)]"></div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.12),transparent_55%)]"></div>
    </section>
  );
}

function PainPointsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const painPoints = [
    {
      stat: "2+",
      unit: "hours",
      description: "Average time to manually review a single contract agreement"
    },
    {
      stat: "1000s",
      unit: "of documents",
      description: "Due diligence requires reviewing massive document sets for M&A deals"
    },
    {
      stat: "15%",
      unit: "error rate",
      description: "Manual extraction of key terms leads to costly mistakes"
    }
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Legal Teams Spend Too Much Time on Document Review
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            High-value legal work gets delayed by manual document processing that AI can handle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background rounded-xl p-8 border border-border text-center shadow-sm"
            >
              <div className="text-5xl font-bold text-primary mb-2">{point.stat}</div>
              <div className="text-lg text-muted-foreground mb-4">{point.unit}</div>
              <p className="text-muted-foreground">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const useCases = [
    {
      icon: FileText,
      title: "Contract Review",
      description: "Extract parties, effective dates, terms, obligations, and termination clauses automatically. Flag non-standard terms for attorney review.",
      benefit: "Review contracts in minutes, not hours"
    },
    {
      icon: FileSearch,
      title: "Due Diligence",
      description: "Process thousands of documents for M&A transactions. Extract key data points, identify risks, and generate summary reports.",
      benefit: "Complete due diligence 10x faster"
    },
    {
      icon: BookOpen,
      title: "Lease Abstraction",
      description: "Pull rent amounts, renewal options, escalation clauses, and key dates from commercial leases. Build searchable lease databases.",
      benefit: "Abstract leases in seconds"
    },
    {
      icon: ScrollText,
      title: "NDA Processing",
      description: "Extract and compare confidentiality terms across agreements. Identify deviations from standard templates automatically.",
      benefit: "Process NDAs at scale"
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            What Legal Teams Automate with ByteBeam
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From contract review to due diligence, let AI handle the document-heavy work.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "bg-muted rounded-xl p-8 border border-border",
                "hover:border-primary/30 transition-colors"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <useCase.icon className="size-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <CheckCircle2 className="size-4" />
                    {useCase.benefit}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      step: "01",
      title: "Upload Your Contracts",
      description: "Drop in contracts, agreements, or any legal document. ByteBeam handles PDFs, Word docs, and scanned images."
    },
    {
      step: "02",
      title: "Define Extraction Fields",
      description: "Set up columns for what you need—parties, dates, terms, clauses. Build templates for recurring document types."
    },
    {
      step: "03",
      title: "Review & Export",
      description: "AI extracts data with 99% accuracy. Review flagged items, approve results, and export to your document management system."
    }
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            How ByteBeam Works for Legal
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A spreadsheet-like interface that any legal professional can use. No technical skills required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-7xl font-bold text-primary/10 absolute -top-2 left-0 select-none pointer-events-none">{item.step}</div>
              <div className="relative pt-12 pl-2">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const benefits = [
    {
      icon: Scale,
      title: "No-Code Setup",
      description: "Paralegals and attorneys can build extraction workflows without IT support."
    },
    {
      icon: Shield,
      title: "Confidentiality First",
      description: "Enterprise security with encryption at rest and in transit. Your documents stay protected."
    },
    {
      icon: Clock,
      title: "Human Review Built-In",
      description: "AI handles extraction, attorneys review exceptions. Maintain quality control at scale."
    },
    {
      icon: Briefcase,
      title: "Works With Your Tools",
      description: "Export to Excel, integrate with document management systems via API."
    }
  ];

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Why Legal Teams Choose ByteBeam
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onBookDemo }: { onBookDemo: () => void }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding gradient-overlay text-primary-foreground">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Ready to Automate Legal Document Work?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            See how ByteBeam can accelerate contract review and due diligence for your team.
          </p>
          <Button
            onClick={onBookDemo}
            variant="secondary"
            className="bg-background text-primary hover:bg-background/90 text-lg px-8"
            size="lg"
          >
            Book a Demo for Legal Teams
          </Button>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link href="/industries/finance" className="hover:opacity-100 transition-opacity">
              Finance Teams →
            </Link>
            <Link href="/industries/insurance" className="hover:opacity-100 transition-opacity">
              Insurance Teams →
            </Link>
            <Link href="/industries/operations" className="hover:opacity-100 transition-opacity">
              Operations Teams →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
