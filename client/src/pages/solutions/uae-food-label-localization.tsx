import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Languages,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  Scale,
  MapPin,
  Calculator,
  Eye,
  Building2,
  Zap,
  Users,
  BadgeCheck
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
    "@type": "Service",
    "name": "UAE Food Label Localization & Compliance Services",
    "description": "AI-powered food label localization and compliance automation for UAE, Dubai, and GCC markets. Arabic translation, ESMA compliance, Dubai Municipality registration support.",
    "provider": {
      "@type": "Organization",
      "name": "ByteBeam",
      "url": "https://bytebeam.co"
    },
    "areaServed": [
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "Qatar" },
      { "@type": "Country", "name": "Bahrain" },
      { "@type": "Country", "name": "Oman" }
    ],
    "serviceType": "Food Label Compliance Automation",
    "offers": {
      "@type": "Offer",
      "description": "Free demo available"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bytebeam.co" },
      { "@type": "ListItem", "position": 2, "name": "Solutions", "item": "https://bytebeam.co/solutions" },
      { "@type": "ListItem", "position": 3, "name": "UAE Food Label Localization", "item": "https://bytebeam.co/solutions/uae-food-label-localization" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the food labeling requirements in the UAE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "UAE food labels must comply with ESMA standards (UAE S.9:2017) and GSO 9/2019. Labels must be in Arabic (mandatory) or bilingual Arabic/English. Required information includes: product name, ingredients list, net weight, manufacturing/expiry dates (day-month-year format), country of origin, storage conditions, allergen declarations, and nutrition facts. Arabic stickers must be approved by authorities before export."
        }
      },
      {
        "@type": "Question",
        "name": "How do I register food products with Dubai Municipality?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Food products are registered through Dubai Municipality's Montaji portal (formerly FIRS - Food Import and Re-Export System). The process involves submitting product labels for review, providing packaging details, and ensuring compliance with UAE labeling standards. ByteBeam automates label preparation to ensure your submission is compliant, typically reducing the approval process to 5-7 working days."
        }
      },
      {
        "@type": "Question",
        "name": "What is ESMA and why is it important for food labels?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ESMA (Emirates Authority for Standardization and Metrology) is the UAE federal authority responsible for standardization, conformity, and metrology. ESMA works with the GCC Standardization Organization (GSO) to develop food labeling standards. All food products sold in the UAE must comply with ESMA standards, and non-compliance can result in product rejection at customs or recalls."
        }
      },
      {
        "@type": "Question",
        "name": "How long does food product registration take in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "With compliant labels and complete documentation, Dubai Municipality food product registration typically takes 5-7 working days. However, if labels require corrections or translations need fixes, the process can take 4-8 weeks. ByteBeam's automated compliance checking ensures your labels are correct before submission, avoiding delays."
        }
      }
    ]
  }
];

export default function UAEFoodLabelLocalization() {
  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="UAE Food Label Localization & Compliance | Dubai Municipality | ESMA | ByteBeam"
        description="AI-powered food label localization for UAE & GCC markets. Arabic translation, ESMA compliance, Dubai Municipality registration. Process 10,000+ products with 85% time savings. No coding required."
        ogTitle="UAE Food Label Localization & Compliance Services | ByteBeam"
        ogDescription="Automate food label localization for Dubai, UAE & GCC. Arabic translation, ESMA compliance, nutrition calculations. 85% faster than manual processing."
        keywords="food label localization UAE, Dubai Municipality food registration, ESMA food labeling, Arabic food label translation, GCC food compliance, food product registration Dubai, FMCG label compliance UAE, halal certification UAE, GSO food standards, Montaji registration, food label Arabic translation Dubai, UAE food packaging requirements"
        canonical="https://bytebeam.co/solutions/uae-food-label-localization"
        structuredData={structuredData}
      />
      <Navigation />

      <HeroSection onBookDemo={handleBookDemo} />
      <TrustSignals />
      <RegulatorySection />
      <PainPointsSection />
      <SolutionSection />
      <ProcessSection />
      <ComparisonSection />
      <BenefitsSection />
      <FAQSection />
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
              <MapPin className="size-4" />
              UAE & GCC Markets
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              Food Label Localization<br />
              <span className="text-primary">for UAE & Dubai</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-normal max-w-3xl mx-auto leading-relaxed">
              AI-powered Arabic translation, ESMA compliance validation, and Dubai Municipality registration support. Process hundreds of products in the time it takes to do one manually.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-muted-foreground">
              <span className="bg-muted px-3 py-1 rounded-full">Dubai Municipality Compliant</span>
              <span className="bg-muted px-3 py-1 rounded-full">ESMA Standards</span>
              <span className="bg-muted px-3 py-1 rounded-full">GSO 9/2019</span>
              <span className="bg-muted px-3 py-1 rounded-full">Halal Ready</span>
            </div>

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
                <Link href="/case-study/carrefour">
                  See Carrefour Case Study
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-bold mb-1">10,000+</div>
                <div className="text-sm text-muted-foreground">Products Approved by Dubai Municipality</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">85%</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">Zero</div>
                <div className="text-sm text-muted-foreground">Translation Complaints</div>
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

function TrustSignals() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="py-8 bg-muted border-y border-border"
    >
      <div className="container-custom">
        <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-5 text-primary" />
            <span>Trusted by Carrefour GCC</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-5 text-primary" />
            <span>Dubai Municipality Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-5 text-primary" />
            <span>ESMA Compliant Output</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-5 text-primary" />
            <span>GSO Standards</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function RegulatorySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const regulations = [
    {
      authority: "Dubai Municipality",
      description: "Product registration through Montaji portal, label assessment, and food safety compliance",
      icon: Building2
    },
    {
      authority: "ESMA",
      description: "Emirates Authority for Standardization and Metrology - UAE S.9:2017 labeling standards",
      icon: Shield
    },
    {
      authority: "GSO Standards",
      description: "GCC Standardization Organization - GSO 9/2019 for pre-packaged foodstuff labeling",
      icon: Scale
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
            UAE Food Labeling Regulations We Handle
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Navigating UAE food compliance is complex. ByteBeam automates compliance with all major regulatory requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {regulations.map((reg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-muted rounded-xl p-6 border border-border"
            >
              <reg.icon className="size-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{reg.authority}</h3>
              <p className="text-muted-foreground">{reg.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PainPointsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const painPoints = [
    {
      stat: "20 min",
      unit: "per product",
      description: "Manual label localization requires extraction, translation, formatting, and compliance checks"
    },
    {
      stat: "$200-1200",
      unit: "per hour",
      description: "Typical regulatory consultancy rates for label compliance services in Dubai"
    },
    {
      stat: "4-8 weeks",
      unit: "delays",
      description: "Registration delays when labels have translation errors or compliance gaps"
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
            The Problem with Manual Label Localization
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Traditional consultants charge by the hour and process labels one at a time. That doesn't scale.
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
              <div className="text-5xl font-bold text-destructive mb-2">{point.stat}</div>
              <div className="text-lg text-muted-foreground mb-4">{point.unit}</div>
              <p className="text-muted-foreground">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: FileText,
      title: "Automated Label Data Extraction",
      description: "AI extracts product names, ingredients, nutrition facts, allergens, and certifications from any packaging format—images, PDFs, or design files.",
      benefit: "Extract all label data in seconds"
    },
    {
      icon: Languages,
      title: "Context-Aware Arabic Translation",
      description: "Industry-specific Arabic translation with proper terminology, right-to-left formatting, and cultural appropriateness for UAE market.",
      benefit: "Zero translation complaints"
    },
    {
      icon: Calculator,
      title: "NRV & Nutrition Calculations",
      description: "Automatic Nutrient Reference Value calculations, serving size conversions, and daily value percentages per UAE/GCC requirements.",
      benefit: "Compliant nutrition panels"
    },
    {
      icon: Eye,
      title: "Halal & Certification Detection",
      description: "Identify halal certifications, organic labels, allergen declarations, and other compliance marks. Flag missing required certifications.",
      benefit: "Never miss required marks"
    },
    {
      icon: Shield,
      title: "ESMA & GSO Compliance Validation",
      description: "Automated validation against UAE S.9:2017, GSO 9/2019, and Dubai Municipality requirements before submission.",
      benefit: "First-time approval"
    },
    {
      icon: Zap,
      title: "Batch Processing at Scale",
      description: "Process 1 to 1,000+ products simultaneously. The same workflow that handles one product handles thousands.",
      benefit: "Scale without adding staff"
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
            What ByteBeam Automates for UAE Labels
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A 27-step AI workflow that handles everything from extraction to submission-ready labels.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn(
                "bg-muted rounded-xl p-6 border border-border",
                "hover:border-primary/30 transition-colors"
              )}
            >
              <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
              <div className="flex items-center gap-2 text-primary font-medium text-sm">
                <CheckCircle2 className="size-4" />
                {feature.benefit}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    {
      step: "01",
      title: "Upload Product Artwork",
      description: "Drop in packaging files for any number of products—from one to one thousand. We handle images, PDFs, AI files, and more."
    },
    {
      step: "02",
      title: "AI Processes Everything",
      description: "Our 27-step workflow extracts data, translates to Arabic, calculates nutrition values, and validates against ESMA/Dubai Municipality requirements."
    },
    {
      step: "03",
      title: "Review & Submit to Authorities",
      description: "Get pre-validated labels ready for Dubai Municipality Montaji submission. Your team reviews, approves, and submits with confidence."
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
            From Artwork to Dubai Municipality in 3 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            What used to take 20 minutes per product now takes 3 minutes.
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

function ComparisonSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
            ByteBeam vs Traditional Consultants
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Why leading importers choose AI-powered localization over manual services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-4 text-center font-semibold">
            <div></div>
            <div className="bg-primary text-primary-foreground rounded-t-lg py-3">ByteBeam</div>
            <div className="bg-muted rounded-t-lg py-3">Traditional Consultants</div>
          </div>

          {[
            { label: "Time per product", bytebeam: "3 minutes", traditional: "20+ minutes" },
            { label: "Batch processing", bytebeam: "1,000+ products", traditional: "One at a time" },
            { label: "Pricing model", bytebeam: "Per product", traditional: "$200-1200/hour" },
            { label: "Scaling cost", bytebeam: "Linear", traditional: "Exponential" },
            { label: "Arabic translation", bytebeam: "AI + human review", traditional: "Manual only" },
            { label: "Compliance validation", bytebeam: "Automated checks", traditional: "Manual review" },
            { label: "Setup required", bytebeam: "No coding", traditional: "N/A" },
          ].map((row, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="grid grid-cols-3 gap-4 py-3 border-b border-border"
            >
              <div className="text-muted-foreground">{row.label}</div>
              <div className="text-center font-medium text-primary">{row.bytebeam}</div>
              <div className="text-center text-muted-foreground">{row.traditional}</div>
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
      title: "85% Time Reduction",
      description: "From 20 minutes to 3 minutes per product. Process entire catalogs in days, not months."
    },
    {
      icon: Users,
      title: "One Person, Team Output",
      description: "One compliance manager can now handle what used to require an entire team."
    },
    {
      icon: Shield,
      title: "First-Time Approvals",
      description: "Pre-validated labels mean fewer rejections and faster Dubai Municipality registration."
    },
    {
      icon: Scale,
      title: "Consistent Quality",
      description: "Every product gets the same thorough 27-step process. No variability, no shortcuts."
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
            Why Importers Choose ByteBeam
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

function FAQSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const faqs = [
    {
      question: "What are the mandatory food labeling requirements in UAE?",
      answer: "UAE food labels must include: product name in Arabic, complete ingredients list, net weight/volume, manufacturing and expiry dates (day-month-year format), country of origin, storage conditions, allergen declarations, nutrition facts panel, and local importer details. Labels must be in Arabic or bilingual Arabic/English per ESMA standards."
    },
    {
      question: "How do I register food products with Dubai Municipality?",
      answer: "Food products are registered through Dubai Municipality's Montaji portal. You need to submit product labels for assessment, provide packaging details, and ensure compliance with UAE labeling standards. ByteBeam prepares compliant labels that pass assessment, typically enabling approval in 5-7 working days."
    },
    {
      question: "Can Arabic stickers be applied after import?",
      answer: "No. UAE regulations require that Arabic stickers be applied before export and pre-approved by UAE authorities. Stickering cannot be completed upon entry to the UAE. ByteBeam ensures your labels are fully compliant before shipping."
    },
    {
      question: "What's the difference between ESMA and Dubai Municipality?",
      answer: "ESMA (Emirates Authority for Standardization and Metrology) sets the national standards for labeling (like UAE S.9:2017). Dubai Municipality enforces these standards locally and handles product registration through the Montaji system. Both must be satisfied for legal sale in Dubai."
    },
    {
      question: "How does ByteBeam handle halal certification requirements?",
      answer: "ByteBeam automatically detects halal certification marks on source labels and ensures they're properly displayed on localized labels. For products requiring halal certification, the system flags this requirement and validates that proper certification documentation is referenced."
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
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Common questions about UAE food labeling and compliance
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-muted rounded-xl p-6 border border-border"
            >
              <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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
            Ready to Automate UAE Food Label Compliance?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            See how ByteBeam helped Carrefour get 10,000+ products approved by Dubai Municipality with zero translation complaints.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={onBookDemo}
              variant="secondary"
              className="bg-background text-primary hover:bg-background/90 text-lg px-8"
              size="lg"
            >
              Book a Demo
            </Button>
            <Button
              variant="ghost"
              className="border-2 border-white/80 text-white hover:bg-white/20 hover:text-white text-lg px-8"
              size="lg"
              asChild
            >
              <Link href="/case-study/carrefour">
                View Carrefour Case Study
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link href="/industries/fmcg" className="hover:opacity-100 transition-opacity">
              FMCG Solutions →
            </Link>
            <Link href="/industries/pharma" className="hover:opacity-100 transition-opacity">
              Pharma Solutions →
            </Link>
            <Link href="/case-study/takhlees" className="hover:opacity-100 transition-opacity">
              Takhlees Case Study →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
