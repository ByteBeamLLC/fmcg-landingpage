import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Package,
  Languages,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  Scale,
  MapPin,
  RefreshCw,
  Calculator,
  Eye
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";
import { Link } from "wouter";

export default function FMCGIndustry() {
  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="No-Code FMCG Label Compliance | GCC Markets | ByteBeam"
        description="Automate FMCG label compliance, translation, and localization for GCC markets without coding. Process hundreds of SKUs with 99% accuracy. No developers needed."
        ogTitle="No-Code FMCG Label Compliance | ByteBeam"
        ogDescription="Turn imported product labels into GCC-compliant labels in minutes. AI extracts, translates, validates, and generates compliant labels. No coding required."
        keywords="FMCG label compliance automation GCC, no-code label automation, GCC product approval, document automation UAE, AI automation Saudi Arabia, Arabic translation, halal certification"
        canonical="https://bytebeam.co/industries/fmcg"
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
                "name": "FMCG",
                "item": "https://bytebeam.co/industries/fmcg"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "No-Code FMCG Label Compliance Automation",
            "description": "AI-powered label compliance automation for FMCG teams. Automate label extraction, translation, validation, and generation for GCC markets without coding.",
            "provider": {
              "@type": "Organization",
              "name": "ByteBeam"
            },
            "areaServed": ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "GCC"],
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
              <Package className="size-4" />
              FMCG Teams
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              AI Document Automation<br />for FMCG
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-10 font-normal max-w-3xl mx-auto leading-relaxed">
              Turn imported product labels into GCC-compliant labels in minutes. AI extracts data, translates to Arabic, validates regulations, and creates compliant labels automatically.
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
                <Link href="/industries/pharma">
                  See Other Industries
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-bold mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">SKUs Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">70%</div>
                <div className="text-sm text-muted-foreground">Faster Processing</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Data Accuracy</div>
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
      stat: "Weeks",
      unit: "to months",
      description: "Manual label compliance process delays product launches and ties up regulatory teams"
    },
    {
      stat: "100s",
      unit: "of SKUs",
      description: "Processing large product catalogs manually leads to inconsistent formats and compliance gaps"
    },
    {
      stat: "Multiple",
      unit: "stakeholders",
      description: "Coordination between translators, compliance teams, and designers creates bottlenecks"
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
            FMCG Teams Struggle with Label Compliance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Manual label localization slows time-to-market and increases compliance risk. AI can fix that.
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
      title: "Label Data Extraction",
      description: "Automatically extract product names, ingredients, nutrition facts, allergens, and certifications from any packaging format—images, PDFs, or design files.",
      benefit: "Extract all label data in seconds"
    },
    {
      icon: Languages,
      title: "Arabic Translation",
      description: "Translate English labels to Arabic with local terminology and proper formatting. Ensure right-to-left text layout and cultural appropriateness.",
      benefit: "Accurate Arabic localization"
    },
    {
      icon: Calculator,
      title: "Nutrition Calculations",
      description: "Automatically calculate nutrition reference values, serving sizes, and daily value percentages according to GCC regulatory requirements.",
      benefit: "Compliant nutrition panels"
    },
    {
      icon: Eye,
      title: "Certification Detection",
      description: "Identify halal certifications, organic labels, and other compliance marks. Validate against local requirements and flag missing certifications.",
      benefit: "Never miss required certifications"
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
            What FMCG Teams Automate with ByteBeam
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From extraction to submission-ready labels, automate the entire compliance workflow.
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
      title: "Upload Product Artwork",
      description: "Drop in packaging files for any number of products—from one to one thousand. Support for images, PDFs, and design files."
    },
    {
      step: "02",
      title: "AI Processes Everything",
      description: "Our AI agent extracts data, translates to Arabic, calculates nutrition values, and validates against GCC regulatory requirements automatically."
    },
    {
      step: "03",
      title: "Review & Submit",
      description: "Get pre-filled regulatory forms and market-ready labels. Your compliance team reviews, approves, and submits to authorities."
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
            How ByteBeam Works for FMCG
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From artwork to regulator-ready submission in three simple steps.
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
      title: "Consistent Quality at Scale",
      description: "Process hundreds of SKUs with uniform quality across all labels."
    },
    {
      icon: MapPin,
      title: "Smart Label Placement",
      description: "AI positions localized labels without disrupting brand visual hierarchy."
    },
    {
      icon: RefreshCw,
      title: "Real-Time Updates",
      description: "Handle reformulations and regulatory changes as they occur."
    },
    {
      icon: Shield,
      title: "Compliance Monitoring",
      description: "Stay ahead of regulatory changes with automatic compliance tracking."
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
            Why FMCG Teams Choose ByteBeam
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
            Ready to Automate FMCG Label Compliance?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            See how ByteBeam can accelerate your product launches and reduce compliance risk.
          </p>
          <Button
            onClick={onBookDemo}
            variant="secondary"
            className="bg-background text-primary hover:bg-background/90 text-lg px-8"
            size="lg"
          >
            Book a Demo for FMCG Teams
          </Button>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link href="/industries/pharma" className="hover:opacity-100 transition-opacity">
              Pharma Teams →
            </Link>
            <Link href="/industries/finance" className="hover:opacity-100 transition-opacity">
              Finance Teams →
            </Link>
            <Link href="/industries/legal" className="hover:opacity-100 transition-opacity">
              Legal Teams →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
