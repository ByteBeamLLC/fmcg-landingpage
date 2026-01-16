import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Settings,
  Truck,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  Package,
  ClipboardCheck,
  Users
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function OperationsIndustry() {
  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="No-Code Operations Document Automation | ByteBeam"
        description="Automate supply chain docs, compliance paperwork, and operational workflows without coding. Reduce manual document work by 80%. No developers needed."
        ogTitle="No-Code Operations Document Automation | ByteBeam"
        ogDescription="Streamline purchase orders, shipping documents, and vendor onboarding with AI. Process operational documents 10x faster. No coding required."
        keywords="no-code operations automation, supply chain document automation, document automation UAE, GCC enterprise automation, purchase order automation, vendor onboarding"
        canonical="https://bytebeam.co/industries/operations"
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
                "name": "Operations",
                "item": "https://bytebeam.co/industries/operations"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "No-Code Operations Document Automation",
            "description": "AI-powered document automation for operations teams. Automate supply chain docs, compliance paperwork, and operational workflows without coding.",
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
              <Settings className="size-4" />
              Operations Teams
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              AI Document Automation<br />for Operations
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-normal max-w-3xl mx-auto leading-relaxed">
              Eliminate manual data entry from supply chain documents, compliance paperwork, and vendor communications. Keep operations running smoothly with AI.
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
                <Link href="/industries/finance">
                  See Other Industries
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-bold mb-1">80%</div>
                <div className="text-sm text-muted-foreground">Less Manual Entry</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Data Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Document Processing</div>
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
      stat: "Hours",
      unit: "daily",
      description: "Supply chain documents like POs and BOLs require manual data entry into multiple systems"
    },
    {
      stat: "Scattered",
      unit: "data",
      description: "Compliance documentation is time-consuming to maintain and often spread across systems"
    },
    {
      stat: "Delays",
      unit: "everywhere",
      description: "Cross-department document handoffs create bottlenecks and slow operations"
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
            Operations Teams Drown in Paperwork
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Document processing bottlenecks slow down your entire operation. AI can fix that.
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
      title: "Purchase Order Processing",
      description: "Extract and validate PO details automatically—item descriptions, quantities, prices, delivery dates. Match against contracts and flag discrepancies.",
      benefit: "Process POs in seconds"
    },
    {
      icon: Truck,
      title: "Shipping Document Processing",
      description: "Handle bills of lading, customs forms, packing lists, and delivery receipts. Extract key data and update tracking systems automatically.",
      benefit: "Eliminate shipping data entry"
    },
    {
      icon: ClipboardCheck,
      title: "Compliance Documentation",
      description: "Generate and validate compliance reports, certifications, and audit documentation. Ensure all required documents are complete and current.",
      benefit: "Stay audit-ready always"
    },
    {
      icon: Users,
      title: "Vendor Onboarding",
      description: "Process vendor applications, W-9s, insurance certificates, and compliance documents. Validate information and route for approval automatically.",
      benefit: "Onboard vendors 5x faster"
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
            What Operations Teams Automate with ByteBeam
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From procurement to logistics, automate the document workflows that keep your operations running.
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
      title: "Connect Your Documents",
      description: "Upload POs, shipping docs, or any operational paperwork. Set up email forwarding to process documents automatically."
    },
    {
      step: "02",
      title: "Build Your Workflow",
      description: "Define extraction fields in a spreadsheet-like interface. No coding needed—operations managers can set it up themselves."
    },
    {
      step: "03",
      title: "Automate & Integrate",
      description: "AI processes documents 24/7 with 99% accuracy. Data flows directly to your ERP, WMS, or other systems via API."
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
            How ByteBeam Works for Operations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Set up document automation without IT. If you can use Excel, you can use ByteBeam.
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
      title: "24/7 Processing",
      description: "Documents get processed around the clock, not just during business hours."
    },
    {
      icon: Package,
      title: "Multi-Format Support",
      description: "Handle PDFs, images, emails, and scanned documents from any source."
    },
    {
      icon: Settings,
      title: "No-Code Setup",
      description: "Operations managers can build and modify workflows without IT help."
    },
    {
      icon: CheckCircle2,
      title: "ERP Integration",
      description: "Connect to SAP, Oracle, NetSuite, or custom systems via API."
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
            Why Operations Teams Choose ByteBeam
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
            Ready to Automate Operations Document Work?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            See how ByteBeam can eliminate manual data entry and streamline your operations.
          </p>
          <Button
            onClick={onBookDemo}
            variant="secondary"
            className="bg-background text-primary hover:bg-background/90 text-lg px-8"
            size="lg"
          >
            Book a Demo for Operations Teams
          </Button>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link href="/industries/finance" className="hover:opacity-100 transition-opacity">
              Finance Teams →
            </Link>
            <Link href="/industries/legal" className="hover:opacity-100 transition-opacity">
              Legal Teams →
            </Link>
            <Link href="/industries/insurance" className="hover:opacity-100 transition-opacity">
              Insurance Teams →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
