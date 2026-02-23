import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  FileText,
  Shield,
  ShieldCheck,
  Lock,
  Users,
  Upload,
  Settings,
  Search,
  Globe,
  RefreshCw,
  Cog,
  Eye,
  BookOpen,
  BarChart3,
  Mail,
  User,
} from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";

export default function PharmaIndustry() {
  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Platform for Pharmaceutical Regulatory Affairs | ByteBeam"
        description="Automate regulatory document workflows for pharma. Generate Nashra/Leaflets, SPCs, and CTDs in ~20 minutes with 95-99% accuracy. 5,000+ products approved via GCC regulators."
        ogTitle="AI Platform for Pharmaceutical Regulatory Affairs | ByteBeam"
        ogDescription="Automate regulatory document workflows. Ensure compliance. Scale your RA operations with confidence. Nashra/Leaflet + SPC generation in ~20 minutes."
        keywords="pharmaceutical regulatory affairs, Nashra generation, SPC generation, SFDA compliance, GCC pharma registration, regulatory document automation, dossier preparation, gap analysis, CTD generation, pharma AI"
        canonical="https://bytebeam.co/industries/pharma"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bytebeam.co" },
              { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://bytebeam.co/industries" },
              { "@type": "ListItem", "position": 3, "name": "Pharma", "item": "https://bytebeam.co/industries/pharma" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Platform for Pharmaceutical Regulatory Affairs",
            "description": "AI-powered regulatory document automation for pharma teams. Generate Nashra/Leaflets, SPCs, dossiers, and ensure SFDA/GCC compliance.",
            "provider": { "@type": "Organization", "name": "ByteBeam" },
            "areaServed": ["Global", "United Arab Emirates", "Saudi Arabia", "GCC"],
            "serviceType": "Pharmaceutical Regulatory Affairs Automation"
          }
        ]}
      />
      <Navigation />

      <HeroSection onBookDemo={handleBookDemo} />
      <ChallengeSection />
      <PlatformSection />
      <LiveCapabilitySection />
      <ExpandingCapabilitiesSection />
      <HowItWorksSection />
      <TrackRecordSection />
      <EnterpriseReadySection />
      <HowWeEngageSection />
      <ComplianceSection />
      <CTASection onBookDemo={handleBookDemo} />

      <Footer />
      <LiveChatWidget />
    </div>
  );
}

/* ─── 1. HERO ─────────────────────────────────────────────── */

function HeroSection({ onBookDemo }: { onBookDemo: () => void }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 gradient-overlay text-white">
      {/* Geometric accent shapes */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-20">
        <div className="absolute top-8 right-8 w-48 h-48 bg-primary rotate-12 rounded-lg" />
        <div className="absolute top-24 right-24 w-36 h-36 bg-primary/60 -rotate-6 rounded-lg" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-white font-bold text-lg mb-4 tracking-wide">
              Bytebeam
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
              AI Platform for<br />
              Pharmaceutical<br />
              Regulatory Affairs
            </h1>

            <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl leading-relaxed">
              Automate regulatory document workflows. Ensure compliance.<br />
              Scale your RA operations with confidence.
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-2xl">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">~20 min</div>
                <div className="text-sm text-white/60">Nashra/Leaflet + SPC<br />Generation</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">5,000+</div>
                <div className="text-sm text-white/60">Products Approved<br />via GCC Regulators</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">95-99%</div>
                <div className="text-sm text-white/60">Accuracy Across<br />All Outputs</div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                onClick={onBookDemo}
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 rounded-full"
                size="lg"
              >
                Book a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. THE CHALLENGE ────────────────────────────────────── */

function ChallengeSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const challenges = [
    {
      icon: Clock,
      title: "Endless Revision Cycles",
      description: "Service center deliverables rarely match your internal standards on the first pass. Your RA experts end up spending hours editing documents they paid someone else to produce."
    },
    {
      icon: Users,
      title: "Inconsistent Outputs",
      description: "Quality depends on whichever consultant is assigned. Different experts interpret the same guidelines differently — creating compliance risk and slowing down your registration pipeline."
    },
    {
      icon: ShieldCheck,
      title: "No Control Over the Process",
      description: "You're dependent on an external team's availability and timelines. When SFDA requirements change or you need urgent revisions, you're waiting — not acting."
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
          className="mb-12"
        >
          <div className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
            The Challenge
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Your RA Team Deserves Better<br />Than Rework Cycles
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
            Pharmaceutical companies across the GCC face the same frustrations with regulatory document preparation — whether handled in-house or outsourced to service centers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {challenges.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 border border-border shadow-sm"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-5">
                <item.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground italic"
        >
          The result: senior RA professionals spend their time on corrections instead of strategic regulatory work.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── 3. PLATFORM ─────────────────────────────────────────── */

function PlatformSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const steps = [
    { num: "01", icon: Upload, title: "Ingest", description: "Upload originator drug documents" },
    { num: "02", icon: Cog, title: "Analyze", description: "AI cross-references regulatory guidelines" },
    { num: "03", icon: CheckCircle2, title: "Generate", description: "Produce compliant Nashra/Leaflets, SPCs, CTDs" },
    { num: "04", icon: Shield, title: "Validate", description: "Human review with full audit trail" },
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
            Platform
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            AI Agents for Regulatory<br />Document Workflows
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
            Bytebeam maps complex RA processes into AI agents that reason through regulatory requirements, cross-reference source documents, and generate compliant outputs — with full traceability.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border shadow-sm text-center relative"
            >
              <div className="text-sm text-muted-foreground mb-4">{step.num}</div>
              <div className="bg-primary/10 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <step.icon className="size-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-muted-foreground size-5 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 4. LIVE CAPABILITY ──────────────────────────────────── */

function LiveCapabilitySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const agentFeatures = [
    "Reads the originator drug documentation end-to-end",
    "Cross-references against SFDA requirements and your internal guidelines",
    "Generates Nashra/Leaflet and SPC in your required format and structure",
    "Outputs with source citations so your RA team can verify every claim",
    "Produces consistent results every time — no variance between runs",
  ];

  const benefits = [
    {
      icon: Clock,
      title: "~20 Minutes Per Document Pair",
      description: "What takes a senior RA expert 2 dedicated hours, the agent completes in approximately 20 minutes"
    },
    {
      icon: CheckCircle2,
      title: "First-Pass Quality",
      description: "Outputs aligned to your standards from the start — eliminating the revision cycles you experience with service centers"
    },
    {
      icon: Lock,
      title: "Internal & On-Demand",
      description: "Runs within your organization. No waiting on external timelines or sharing sensitive documents externally"
    },
    {
      icon: Shield,
      title: "Full Traceability",
      description: "Every output comes with audit trail and source citations for regulatory review and submission confidence"
    }
  ];

  return (
    <section className="section-padding gradient-overlay text-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Live Capability
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Nashra (Leaflet) & SPC<br />Generation Agent
          </h2>
          <p className="text-lg text-white/80 max-w-4xl leading-relaxed">
            Generate both Patient Information Leaflet (Nashra) and Summary of Product Characteristics from originator drug documentation — aligned with your internal business requirements and SFDA regulatory standards.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: What the Agent Does */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">What the Agent Does</h3>
            <ul className="space-y-4">
              {agentFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <benefit.icon className="size-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. EXPANDING CAPABILITIES ───────────────────────────── */

function ExpandingCapabilitiesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const capabilities = [
    {
      icon: FileText,
      title: "Dossier Preparation",
      description: "eCTD and CTD document generation with automated structure and formatting"
    },
    {
      icon: Search,
      title: "Gap Analysis",
      description: "AI-powered dossier review that identifies missing or non-compliant sections"
    },
    {
      icon: CheckCircle2,
      title: "Regulatory Compliance",
      description: "Cross-reference outputs against SFDA, GHC, and GCC authority guidelines"
    },
    {
      icon: RefreshCw,
      title: "Variation Management",
      description: "Post-approval change documentation and variation submission preparation"
    },
    {
      icon: Globe,
      title: "Multi-Market Alignment",
      description: "Adapt dossiers across GCC regulatory bodies from a single source"
    },
    {
      icon: Settings,
      title: "Process Automation",
      description: "Map any document-intensive RA workflow into a repeatable, auditable agent"
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
          className="mb-12"
        >
          <div className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
            Expanding Capabilities
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Built for the Full RA Lifecycle
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
            Bytebeam's platform is designed to map any document-intensive RA process into AI agents. Our architecture supports the entire regulatory lifecycle — from initial dossier preparation to post-approval management.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="bg-card rounded-xl p-6 border border-border shadow-sm"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <cap.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{cap.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. HOW IT WORKS ─────────────────────────────────────── */

function HowItWorksSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const cards = [
    {
      label: "Document Understanding",
      title: "Reads Like Your Best Expert",
      description: "The system reads and understands full regulatory dossiers, SPCs, Nashra/Leaflets, and reference guidelines — not just keywords, but the meaning and structure of each section, just as your most experienced RA specialist would."
    },
    {
      label: "Mapped Processes",
      title: "Your RA Workflow, Not a Chatbot",
      description: "Each task follows a defined process with clear steps and checkpoints — the same way your team works today, but automated. You define the business rules, the system executes them consistently every time."
    },
    {
      label: "Regulatory Knowledge Base",
      title: "SFDA & GCC Guidelines Built In",
      description: "SFDA requirements, GHC centralized procedures, and your company's internal SOPs are loaded into the system. Every output is cross-referenced against these sources, with citations you can verify."
    },
    {
      label: "Structured Outputs",
      title: "Ready for Review and Submission",
      description: "Outputs are delivered in structured, submission-ready formats — not raw text that needs reformatting. Every document is organized, traceable, and ready for your RA team's final review before filing."
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
          className="mb-12"
        >
          <div className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
            How It Works
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Your Regulatory Knowledge,<br />Systematized
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 border border-border shadow-sm"
            >
              <div className="text-primary font-bold text-xs uppercase tracking-wider mb-3">
                {card.label}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. TRACK RECORD ─────────────────────────────────────── */

function TrackRecordSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
            Track Record
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Proven in High-Stakes<br />Regulatory Environments
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Case Study 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-xl p-8 border-l-4 border-l-primary border border-border shadow-sm"
          >
            <h3 className="text-xl font-bold text-foreground mb-1">Regulatory Product Compliance</h3>
            <div className="text-sm text-muted-foreground mb-4">Major FMCG Retailer — GCC Market</div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              AI agents reviewed and processed 5,000+ product registrations against GCC regulatory body requirements for market approval. Each product required compliance validation across labelling, ingredient, and documentation standards.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">5,000+</div>
                <div className="text-sm text-muted-foreground">Products Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">85%</div>
                <div className="text-sm text-muted-foreground">Time Reduction</div>
              </div>
            </div>
          </motion.div>

          {/* Case Study 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-xl p-8 border-l-4 border-l-primary border border-border shadow-sm"
          >
            <h3 className="text-xl font-bold text-foreground mb-1">Government Compliance Automation</h3>
            <div className="text-sm text-muted-foreground mb-4">Licensed Governmental Center — Takhlees</div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Transformed manual compliance workflows into automated AI-driven processes for a licensed governmental services center. Reduced processing time by 90% while maintaining full auditability and regulatory compliance.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">90%</div>
                <div className="text-sm text-muted-foreground">Processing Time Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">21x</div>
                <div className="text-sm text-muted-foreground">Faster Throughput</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl text-primary font-serif leading-none">"</div>
            <div>
              <p className="text-muted-foreground italic leading-relaxed mb-3">
                Their team helped us transform a time-consuming, manual process into a smart, efficient workflow — saving both time and costs while ensuring quality and compliance.
              </p>
              <p className="text-sm text-muted-foreground">
                — Chief Financial Officer, Takhlees Licensed Governmental Center
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 8. ENTERPRISE READY ─────────────────────────────────── */

function EnterpriseReadySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const securityFeatures = [
    { icon: Lock, title: "Data Encryption", description: "End-to-end encryption for all data in transit and at rest" },
    { icon: Shield, title: "Access Controls", description: "Role-based permissions and multi-factor authentication" },
    { icon: BookOpen, title: "Audit Trails", description: "Complete logging of all system activities and document generations" },
    { icon: CheckCircle2, title: "Data Isolation", description: "Tenant separation and strict data privacy controls" },
  ];

  const deploymentOptions = [
    { name: "Cloud", description: "Managed SaaS deployment" },
    { name: "VPC", description: "Dedicated virtual private cloud" },
    { name: "On-Premises", description: "Full control within your infrastructure" },
  ];

  return (
    <section className="section-padding gradient-overlay text-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Enterprise Ready
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Security & Compliance for<br />Regulated Industries
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Security Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-white/5 rounded-lg p-2 flex-shrink-0">
                  <feature.icon className="size-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">{feature.title}</h4>
                  <p className="text-sm text-white/60">{feature.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Deployment Options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-6">Deployment Options</h3>
            <div className="space-y-4">
              {deploymentOptions.map((option, index) => (
                <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="text-white font-bold text-lg mb-1">{option.name}</div>
                  <p className="text-white/60 text-sm">{option.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── 9. HOW WE ENGAGE ────────────────────────────────────── */

function HowWeEngageSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
            How We Engage
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Two Ways to Get Started
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl leading-relaxed">
            Every pharmaceutical company has unique internal standards, regulatory strategies, and business requirements. We tailor our approach to how your team operates.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Option 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
          >
            <div className="h-1.5 bg-primary" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <Users className="size-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">With Your Internal RA Team</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "We work alongside your RA experts to understand your internal processes and business rules",
                  "Map your specific workflows into the platform — your standards, your formats, your requirements",
                  "Your team validates and refines until the agent matches how your best expert works",
                  "Ongoing: your team owns the process and can generate documents on-demand"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Option 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
          >
            <div className="h-1.5 bg-primary" />
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center">
                  <Globe className="size-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Through Our RA Network</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "We engage experienced RA professionals who specialize in your target markets",
                  "These experts map your regulatory processes into the platform on your behalf",
                  "Coverage across SFDA, GHC, and other GCC/MENA regulatory authorities",
                  "Ideal when you need regional regulatory expertise beyond your current team's scope"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-muted-foreground italic max-w-4xl"
        >
          In both cases, the outcome is the same: your regulatory knowledge is embedded in the platform, producing consistent, auditable outputs aligned to your standards.
        </motion.p>
      </div>
    </section>
  );
}

/* ─── 10. COMPLIANCE COMMITMENT ───────────────────────────── */

function ComplianceSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const commitments = [
    { icon: Lock, title: "Data Boundaries", description: "Strict controls on what information enters and exits the system" },
    { icon: CheckCircle2, title: "Human Validation", description: "All outputs require RA expert review before submission" },
    { icon: Eye, title: "Audit Trail", description: "Complete traceability from source document to final output" },
  ];

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-primary font-bold text-sm uppercase tracking-wider mb-4">
            Compliance Commitment
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight text-foreground">
            Built for Regulated Environments
          </h2>

          <div className="max-w-4xl space-y-4 border-l-4 border-primary pl-6 mb-10">
            <p className="text-muted-foreground leading-relaxed">
              Bytebeam follows a rigorous compliance framework with ongoing support from our legal team to assess project-specific regulatory and data handling requirements, ensuring the secure and compliant use of our services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We maintain strict protocols around the classification, handling, and boundaries of information processed through our platform. Our emphasis on clearly defined constraints — including what data can be processed, how outputs are generated, and what validation steps are required — allows us to mitigate the risks of inadvertently processing restricted information or producing non-compliant outputs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              All AI-generated documents are designed for human review and approval before any regulatory submission. Bytebeam does not replace your regulatory judgment — it accelerates the work that leads to it.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {commitments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border shadow-sm"
            >
              <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <item.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 11. CTA ─────────────────────────────────────────────── */

function CTASection({ onBookDemo }: { onBookDemo: () => void }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative overflow-hidden py-24 gradient-overlay text-white">
      {/* Geometric accent shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-15">
        <div className="absolute top-4 right-4 w-40 h-40 bg-primary rotate-12 rounded-lg" />
        <div className="absolute top-16 right-20 w-28 h-28 bg-primary/60 -rotate-6 rounded-lg" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Transform<br />Your RA Operations?
          </h2>
          <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
            See how Bytebeam can automate your regulatory document workflows and reduce processing time by up to 6x.
          </p>

          <Button
            onClick={onBookDemo}
            className="bg-primary hover:bg-primary/90 text-white text-lg px-12 py-6 rounded-full"
            size="lg"
          >
            Book a Demo
          </Button>

          <div className="mt-8 space-y-2">
            <a href="mailto:talal@bytebeam.co" className="block text-white hover:underline">
              talal@bytebeam.co
            </a>
            <div className="text-white/60 text-sm">bytebeam.co</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
