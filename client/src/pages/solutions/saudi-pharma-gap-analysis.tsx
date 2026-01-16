import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Pill,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  Scale,
  MapPin,
  FileSearch,
  Building2,
  Zap,
  Users,
  BadgeCheck,
  AlertTriangle,
  ClipboardList,
  FileCheck
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
    "name": "SFDA Dossier Gap Analysis & Pharmaceutical Registration Services",
    "description": "AI-powered CTD/eCTD dossier gap analysis for SFDA pharmaceutical registration in Saudi Arabia. Identify compliance gaps, prepare remediation plans, and accelerate drug approval.",
    "provider": {
      "@type": "Organization",
      "name": "ByteBeam",
      "url": "https://bytebeam.co"
    },
    "areaServed": [
      { "@type": "Country", "name": "Saudi Arabia" },
      { "@type": "Country", "name": "United Arab Emirates" },
      { "@type": "Country", "name": "Kuwait" },
      { "@type": "Country", "name": "Qatar" },
      { "@type": "Country", "name": "Bahrain" },
      { "@type": "Country", "name": "Oman" }
    ],
    "serviceType": "Pharmaceutical Regulatory Gap Analysis",
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
      { "@type": "ListItem", "position": 2, "name": "AI Agents", "item": "https://bytebeam.co/solutions" },
      { "@type": "ListItem", "position": 3, "name": "Saudi Pharma Gap Analysis", "item": "https://bytebeam.co/solutions/saudi-pharma-gap-analysis" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a pharmaceutical dossier gap analysis for SFDA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A dossier gap analysis is a systematic review of your drug registration documentation (CTD/eCTD format) against SFDA requirements. It identifies missing documents, incomplete data, formatting issues, and compliance gaps before submission—preventing rejection and reducing approval timelines."
        }
      },
      {
        "@type": "Question",
        "name": "What are the SFDA drug registration requirements?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SFDA requires submissions in eCTD format with all five CTD modules: Module 1 (Administrative), Module 2 (Summaries), Module 3 (Quality/CMC), Module 4 (Nonclinical), and Module 5 (Clinical). Additional requirements include a Certificate of Pharmaceutical Product (CPP), GMP compliance, stability studies, bioequivalence data, and a local authorized representative."
        }
      },
      {
        "@type": "Question",
        "name": "How long does SFDA drug registration take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SFDA drug registration typically takes 6-12 months for standard applications. However, incomplete dossiers or non-compliant submissions can extend this to 2+ years due to multiple RFI (Request for Information) cycles. A thorough gap analysis before submission significantly reduces delays."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a local agent for SFDA registration?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, international pharmaceutical companies must have either a local authorized representative, a scientific office in Saudi Arabia, or work through a local distributor to submit applications to the SFDA. The SFDA now allows direct submissions through company-owned SFDA accounts while maintaining commercial relationships with distributors."
        }
      }
    ]
  }
];

export default function SaudiPharmaGapAnalysis() {
  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="SFDA Dossier Gap Analysis | Saudi Pharma Registration | ByteBeam"
        description="AI-powered CTD/eCTD gap analysis for SFDA drug registration in Saudi Arabia. Identify compliance gaps before submission. Reduce approval timelines from years to months. No coding required."
        ogTitle="SFDA Dossier Gap Analysis & Pharmaceutical Registration | ByteBeam"
        ogDescription="Automate pharmaceutical dossier review for Saudi Arabia market entry. AI identifies CTD gaps, missing documents, and compliance issues. Get SFDA-ready faster."
        keywords="SFDA dossier gap analysis, pharmaceutical registration Saudi Arabia, drug registration SFDA, CTD gap analysis Saudi, regulatory affairs Saudi Arabia, SFDA eCTD submission, pharmaceutical market entry Saudi Arabia, SFDA compliance, Saudi Arabia drug approval, SFDA market authorization, eCTD Module 1, GCC pharmaceutical registration"
        canonical="https://bytebeam.co/solutions/saudi-pharma-gap-analysis"
        structuredData={structuredData}
      />
      <Navigation />

      <HeroSection onBookDemo={handleBookDemo} />
      <TrustSignals />
      <RegulatorySection />
      <PainPointsSection />
      <SolutionSection />
      <ProcessSection />
      <CTDModulesSection />
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
              Saudi Arabia & GCC Markets
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
              SFDA Dossier Gap Analysis<br />
              <span className="text-primary">for Saudi Market Entry</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-normal max-w-3xl mx-auto leading-relaxed">
              AI-powered CTD/eCTD dossier review against SFDA requirements. Identify gaps before submission, reduce RFI cycles, and accelerate your drug registration in Saudi Arabia.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm text-muted-foreground">
              <span className="bg-muted px-3 py-1 rounded-full">SFDA Compliant</span>
              <span className="bg-muted px-3 py-1 rounded-full">ICH CTD Format</span>
              <span className="bg-muted px-3 py-1 rounded-full">eCTD Ready</span>
              <span className="bg-muted px-3 py-1 rounded-full">GMP Verified</span>
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
                <Link href="/industries/pharma">
                  See Pharma Solutions
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-8 pt-6 border-t border-border">
              <div>
                <div className="text-3xl font-bold mb-1">70%</div>
                <div className="text-sm text-muted-foreground">Faster Gap Identification</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">99%</div>
                <div className="text-sm text-muted-foreground">Compliance Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">50%</div>
                <div className="text-sm text-muted-foreground">Fewer RFI Cycles</div>
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
            <span>SFDA ICH Member</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-5 text-primary" />
            <span>WHO Maturity Level 4</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-5 text-primary" />
            <span>eCTD Compliant Output</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="size-5 text-primary" />
            <span>GCC Standards</span>
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
      authority: "SFDA",
      description: "Saudi Food and Drug Authority - The primary regulatory body for drug registration and market authorization in Saudi Arabia",
      icon: Building2
    },
    {
      authority: "ICH CTD Format",
      description: "International Council for Harmonisation Common Technical Document format required for all SFDA submissions",
      icon: FileText
    },
    {
      authority: "GCC Harmonization",
      description: "GCC Standardization Organization requirements for pharmaceutical products across Gulf countries",
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
            Saudi Pharmaceutical Regulatory Framework
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            SFDA has the most stringent pharmaceutical regulations in the Middle East. ByteBeam automates compliance verification.
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
      stat: "6-24",
      unit: "months",
      description: "Typical SFDA registration timeline—delays often caused by incomplete dossiers and multiple RFI cycles"
    },
    {
      stat: "500+",
      unit: "pages",
      description: "Average CTD dossier contains hundreds of pages across 5 modules requiring meticulous review"
    },
    {
      stat: "$50K+",
      unit: "per rejection",
      description: "Cost of dossier rework, resubmission fees, and delayed market entry for each major deficiency"
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
            The Challenge with Manual Dossier Review
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Traditional gap analysis is expensive, slow, and still misses critical deficiencies.
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
      icon: FileSearch,
      title: "Automated CTD Module Analysis",
      description: "AI reviews all five CTD modules against SFDA-specific requirements, identifying gaps in administrative, quality, nonclinical, and clinical documentation.",
      benefit: "Complete dossier coverage"
    },
    {
      icon: AlertTriangle,
      title: "Deficiency Detection",
      description: "Identify missing documents, incomplete data, formatting errors, and content inconsistencies before SFDA reviewers find them.",
      benefit: "Prevent rejections"
    },
    {
      icon: ClipboardList,
      title: "Gap Report & Remediation Plan",
      description: "Receive a detailed gap analysis report with prioritized findings and actionable remediation steps for each identified issue.",
      benefit: "Clear path to compliance"
    },
    {
      icon: FileCheck,
      title: "eCTD Validation",
      description: "Verify eCTD structure, file formats, naming conventions, and technical specifications match SFDA validation criteria.",
      benefit: "First-time technical acceptance"
    },
    {
      icon: Shield,
      title: "Cross-Module Consistency Check",
      description: "Detect inconsistencies between Module 2 summaries and supporting data in Modules 3, 4, and 5—a common cause of RFIs.",
      benefit: "Eliminate data conflicts"
    },
    {
      icon: Zap,
      title: "Batch Dossier Processing",
      description: "Review multiple product dossiers simultaneously. Scale your regulatory operations without adding headcount.",
      benefit: "Process portfolios faster"
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
            What ByteBeam Automates for SFDA Gap Analysis
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive AI-powered dossier review that catches what manual reviews miss.
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
      title: "Upload Your Dossier",
      description: "Upload your CTD/eCTD dossier files—we handle all formats including PDFs, XML, and compiled eCTD sequences."
    },
    {
      step: "02",
      title: "AI Analyzes Against SFDA Requirements",
      description: "Our AI reviews every module against current SFDA guidelines, checking for completeness, consistency, and compliance gaps."
    },
    {
      step: "03",
      title: "Receive Gap Report & Remediation Plan",
      description: "Get a comprehensive gap analysis report with prioritized findings, specific references to SFDA requirements, and remediation recommendations."
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
            From Dossier to Gap Report in 3 Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            What used to take weeks of manual review now takes days.
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

function CTDModulesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const modules = [
    {
      module: "Module 1",
      title: "Administrative Information",
      items: ["National Application Form", "Product Information (SPC, PIL)", "QPPV Details", "Local Representative Info", "GMP Certificates"]
    },
    {
      module: "Module 2",
      title: "Summaries & Overviews",
      items: ["Quality Overall Summary (QOS)", "Nonclinical Overview", "Clinical Overview", "Clinical Summary", "Written Summaries"]
    },
    {
      module: "Module 3",
      title: "Quality (CMC)",
      items: ["Drug Substance (3.2.S)", "Drug Product (3.2.P)", "Stability Studies", "Manufacturing Process", "Container Closure"]
    },
    {
      module: "Module 4",
      title: "Nonclinical Studies",
      items: ["Pharmacology Reports", "Pharmacokinetics", "Toxicology Studies", "Carcinogenicity", "Reproductive Toxicity"]
    },
    {
      module: "Module 5",
      title: "Clinical Studies",
      items: ["Clinical Study Reports", "Bioequivalence Data", "Efficacy Reports", "Safety Reports", "Literature References"]
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
            Complete CTD Module Coverage
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ByteBeam analyzes all five CTD modules against SFDA-specific requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {modules.map((mod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-muted rounded-xl p-5 border border-border"
            >
              <div className="text-primary font-bold text-sm mb-1">{mod.module}</div>
              <h3 className="font-semibold mb-3">{mod.title}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {mod.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="size-3 text-primary mt-1 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
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
      title: "70% Faster Review",
      description: "AI-powered analysis completes in days what manual review takes weeks to accomplish."
    },
    {
      icon: Users,
      title: "Scale Without Headcount",
      description: "Process multiple dossiers simultaneously without expanding your regulatory team."
    },
    {
      icon: Shield,
      title: "Reduce RFI Cycles",
      description: "Catch deficiencies before submission, cutting SFDA RFI cycles by 50% or more."
    },
    {
      icon: Scale,
      title: "Consistent Quality",
      description: "Every dossier receives the same thorough analysis—no variability, no oversights."
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
            Why Pharma Companies Choose ByteBeam
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
      question: "What is a pharmaceutical dossier gap analysis?",
      answer: "A dossier gap analysis is a systematic review of your drug registration documentation (CTD/eCTD format) against regulatory authority requirements—in this case, SFDA. It identifies missing documents, incomplete data, formatting issues, and compliance gaps before you submit, preventing costly rejections and reducing approval timelines."
    },
    {
      question: "What documents are required for SFDA drug registration?",
      answer: "SFDA requires a complete eCTD dossier with all five modules: Module 1 (Administrative—including the National Application Form, SPC, PIL, QPPV details), Module 2 (Summaries), Module 3 (Quality/CMC data), Module 4 (Nonclinical studies), and Module 5 (Clinical studies). Additional requirements include a Certificate of Pharmaceutical Product (CPP), GMP certificates, stability studies, and for generics, bioequivalence data."
    },
    {
      question: "How long does SFDA drug approval typically take?",
      answer: "Standard SFDA drug registration takes 6-12 months for complete, compliant submissions. However, dossiers with deficiencies can take 18-24 months or longer due to multiple Request for Information (RFI) cycles. A thorough gap analysis before submission can significantly reduce this timeline by ensuring first-time compliance."
    },
    {
      question: "What are common SFDA dossier deficiencies?",
      answer: "The most common deficiencies include: incomplete or outdated stability data, inconsistencies between Module 2 summaries and supporting modules, missing or incorrect QPPV information, incomplete API (3.2.S) documentation, inadequate bioequivalence studies for generics, non-compliant labeling (PIL/SPC), and eCTD technical validation errors."
    },
    {
      question: "Can ByteBeam handle dossiers for both new drugs and generics?",
      answer: "Yes. ByteBeam's gap analysis covers both new drug applications (NDAs) requiring all five CTD modules and generic drug applications which typically focus on bioequivalence and quality modules. The AI adapts its analysis based on the submission type and SFDA's specific requirements for each pathway."
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
            Common questions about SFDA pharmaceutical registration and gap analysis
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
            Ready to Accelerate Your SFDA Drug Registration?
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            See how ByteBeam can identify dossier gaps before submission and reduce your path to Saudi market authorization.
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
              <Link href="/industries/pharma">
                View Pharma Solutions
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm opacity-80">
            <Link href="/solutions/uae-food-label-localization" className="hover:opacity-100 transition-opacity">
              UAE Food Labels →
            </Link>
            <Link href="/industries/operations" className="hover:opacity-100 transition-opacity">
              Operations Solutions →
            </Link>
            <Link href="/industries/fmcg" className="hover:opacity-100 transition-opacity">
              FMCG Solutions →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
