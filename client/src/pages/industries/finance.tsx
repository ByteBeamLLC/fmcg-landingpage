import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FileText,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Receipt,
  FileSpreadsheet,
  ClipboardCheck
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function FinanceIndustry() {
  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="No-Code Finance Document Automation | Invoice Processing | ByteBeam"
        description="Automate invoice processing, financial spreading, and compliance docs without coding. Reduce finance document work by 80%. No developers needed. Book a free demo."
        ogTitle="No-Code Finance Document Automation | ByteBeam"
        ogDescription="Turn hours of manual document work into minutes. Process invoices, analyze financial statements, and automate compliance with 99% accuracy. No coding required."
        keywords="no-code invoice processing, AP automation without developers, financial document automation, accounts payable automation UAE, financial spreading, document automation Saudi Arabia, GCC enterprise automation"
        canonical="https://bytebeam.co/industries/finance"
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
                "name": "Finance",
                "item": "https://bytebeam.co/industries/finance"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "No-Code Finance Document Automation",
            "description": "AI-powered document automation for finance teams. Automate invoice processing, financial spreading, and compliance documentation without coding.",
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
              <TrendingUp className="size-4" />
              Finance Teams
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              AI Document Automation<br />for Finance
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-normal max-w-3xl mx-auto leading-relaxed">
              Stop spending hours on invoice processing and financial document review. Let AI handle the repetitive work while your team focuses on analysis and strategy.
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
                <Link href="/industries/legal">
                  See Other Industries
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-bold mb-1">80%</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">10x</div>
                <div className="text-sm text-muted-foreground">Faster Processing</div>
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
      stat: "15+",
      unit: "minutes",
      description: "Average time to manually process a single invoice with validation"
    },
    {
      stat: "82%",
      unit: "of work",
      description: "Finance document tasks require human reasoning, not just data entry"
    },
    {
      stat: "20+",
      unit: "hours/week",
      description: "Time finance experts spend on repetitive document processing"
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
            Finance Teams Waste Hours on Document Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your finance experts are spending valuable time on manual document processing instead of strategic analysis.
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
      icon: Receipt,
      title: "Invoice Processing",
      description: "Extract vendor details, line items, amounts, and PO numbers automatically. Match invoices to purchase orders and flag discrepancies.",
      benefit: "Process invoices in seconds, not minutes"
    },
    {
      icon: BarChart3,
      title: "Financial Statement Analysis",
      description: "Pull key metrics and ratios from bank statements, balance sheets, and income statements. Automate financial spreading workflows.",
      benefit: "Analyze statements 10x faster"
    },
    {
      icon: FileSpreadsheet,
      title: "Expense Report Processing",
      description: "Categorize expenses, validate receipts, and check against policies automatically. Route exceptions for human review.",
      benefit: "Cut expense processing time by 80%"
    },
    {
      icon: ClipboardCheck,
      title: "Audit Document Preparation",
      description: "Organize, validate, and compile compliance documents for audits. Ensure all required documentation is complete and accurate.",
      benefit: "Audit prep in hours, not weeks"
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
            What Finance Teams Automate with ByteBeam
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From accounts payable to financial analysis, automate the document work that slows your team down.
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
      title: "Upload Your Documents",
      description: "Drop in invoices, statements, or any financial document. ByteBeam handles PDFs, scanned images, and even handwritten notes."
    },
    {
      step: "02",
      title: "Define Your Columns",
      description: "Like building a spreadsheet, define what to extract in each column—vendor name, amount, date, line items. No coding required."
    },
    {
      step: "03",
      title: "Let AI Do the Work",
      description: "AI processes your documents with 99% accuracy. Review exceptions when needed, and export data to your existing systems."
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
            How ByteBeam Works for Finance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Build AI agents as easily as building a spreadsheet. No developers needed.
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
      icon: FileText,
      title: "No-Code Interface",
      description: "Build AI agents without developers. If you can use a spreadsheet, you can use ByteBeam."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance. Your financial data stays protected."
    },
    {
      icon: Clock,
      title: "Human-in-the-Loop",
      description: "AI handles routine work, humans review exceptions. Get 99% accuracy with confidence scores."
    },
    {
      icon: TrendingUp,
      title: "Seamless Integration",
      description: "Connect to your ERP, accounting software, and existing workflows via API."
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
            Why Finance Teams Choose ByteBeam
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
            Ready to Automate Finance Document Work?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            See how ByteBeam can save your finance team hours every week.
          </p>
          <Button
            onClick={onBookDemo}
            variant="secondary"
            className="bg-background text-primary hover:bg-background/90 text-lg px-8"
            size="lg"
          >
            Book a Demo for Finance Teams
          </Button>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link href="/industries/legal" className="hover:opacity-100 transition-opacity">
              Legal Teams →
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
