import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Shield,
  FileCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  AlertTriangle,
  ClipboardList,
  UserCheck
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function InsuranceIndustry() {
  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="No-Code Insurance Claims Automation | ByteBeam"
        description="Automate claims processing, underwriting docs, and policy administration without coding. Process claims 10x faster. No developers needed."
        ogTitle="No-Code Insurance Document Automation | ByteBeam"
        ogDescription="Accelerate claims processing and underwriting with AI. Extract data from FNOL, medical records, and policy documents automatically. No coding required."
        keywords="claims processing automation no-code, insurance claims automation, AI underwriting, document automation UAE, GCC enterprise automation, policy administration automation"
        canonical="https://bytebeam.co/industries/insurance"
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
                "name": "Insurance",
                "item": "https://bytebeam.co/industries/insurance"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "No-Code Insurance Document Automation",
            "description": "AI-powered document automation for insurance teams. Automate claims processing, underwriting, and policy administration without coding.",
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
              <Shield className="size-4" />
              Insurance Teams
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              AI Document Automation<br />for Insurance
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-normal max-w-3xl mx-auto leading-relaxed">
              Process claims faster, underwrite smarter, and reduce manual data entry. AI-powered document automation built for insurance workflows.
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
                <Link href="/industries/operations">
                  See Other Industries
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-bold mb-1">10x</div>
                <div className="text-sm text-muted-foreground">Faster Claims</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Data Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">70%</div>
                <div className="text-sm text-muted-foreground">Less Manual Work</div>
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
      stat: "40%",
      unit: "of time",
      description: "Claims adjusters spend on manual data entry from forms and documents"
    },
    {
      stat: "Multiple",
      unit: "doc types",
      description: "Underwriting requires reviewing applications, medical records, and financial docs"
    },
    {
      stat: "Days",
      unit: "to weeks",
      description: "Policy changes and endorsements require manual document updates"
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
            Insurance Teams Struggle with Document Overload
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Claims, underwriting, and policy admin all require processing mountains of documents manually.
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
      title: "Claims Processing",
      description: "Extract claim details from FNOL forms, medical records, police reports, and photos automatically. Route to adjusters with all data pre-populated.",
      benefit: "Process claims 10x faster"
    },
    {
      icon: UserCheck,
      title: "Underwriting Document Review",
      description: "Analyze applications, financial statements, and medical records. Extract risk factors and flag items requiring manual review.",
      benefit: "Underwrite policies in hours, not days"
    },
    {
      icon: ClipboardList,
      title: "Policy Administration",
      description: "Process endorsements, renewals, and policy changes automatically. Extract data from supporting documents and update systems.",
      benefit: "Reduce policy admin by 70%"
    },
    {
      icon: AlertTriangle,
      title: "Fraud Detection",
      description: "Flag inconsistencies across claim documents automatically. Identify patterns and anomalies that warrant investigation.",
      benefit: "Catch fraud before payouts"
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
            What Insurance Teams Automate with ByteBeam
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From first notice of loss to policy renewal, automate document processing across the insurance lifecycle.
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
      title: "Upload Claim Documents",
      description: "Drop in FNOL forms, medical records, photos, or any supporting documents. ByteBeam handles all formats."
    },
    {
      step: "02",
      title: "Configure Extraction",
      description: "Define what to extract in a spreadsheet-like interface—claimant info, dates, amounts, damage descriptions."
    },
    {
      step: "03",
      title: "Process & Review",
      description: "AI extracts data with 99% accuracy. Adjusters review exceptions and approve. Data flows to your claims system."
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
            How ByteBeam Works for Insurance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build document automation workflows without coding. Claims processors and underwriters can set it up themselves.
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
      icon: Clock,
      title: "Faster Cycle Times",
      description: "Reduce claims processing from days to hours. Improve customer satisfaction."
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description: "Maintain audit trails and ensure consistent data handling across all documents."
    },
    {
      icon: FileCheck,
      title: "Accuracy at Scale",
      description: "99% extraction accuracy with confidence scores. Human review for edge cases."
    },
    {
      icon: CheckCircle2,
      title: "System Integration",
      description: "Connect to Guidewire, Duck Creek, or legacy systems via API."
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
            Why Insurance Teams Choose ByteBeam
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
            Ready to Automate Insurance Document Work?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            See how ByteBeam can accelerate claims processing and underwriting for your team.
          </p>
          <Button
            onClick={onBookDemo}
            variant="secondary"
            className="bg-background text-primary hover:bg-background/90 text-lg px-8"
            size="lg"
          >
            Book a Demo for Insurance Teams
          </Button>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link href="/industries/finance" className="hover:opacity-100 transition-opacity">
              Finance Teams →
            </Link>
            <Link href="/industries/legal" className="hover:opacity-100 transition-opacity">
              Legal Teams →
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
