import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Bot,
  FileCheck,
  Globe,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

interface ByteBeamValuePropProps {
  variant?: "compact" | "full";
  context?: "ocr" | "pdf" | "image" | "general";
}

const PLATFORM_FEATURES = [
  {
    icon: Bot,
    title: "Table-Based Agent Builder",
    description: "SMEs build AI agents using tables—columns for data, rows for documents, rules for logic. No code required.",
  },
  {
    icon: FileCheck,
    title: "Built for Document Work",
    description: "Automate KYC, compliance checks, risk assessment, and any document workflow that requires SME judgment.",
  },
  {
    icon: Globe,
    title: "Arabic-First Processing",
    description: "Native Arabic language support with bidirectional text handling and regional formats.",
  },
  {
    icon: Zap,
    title: "Scale Document Processing",
    description: "Scale from single documents to thousands with automated batch processing and custom workflows.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 compliant infrastructure with data residency options in the UAE.",
  },
];

const CONTEXT_MESSAGES: Record<string, { headline: string; subtext: string; cta: string }> = {
  ocr: {
    headline: "Need to Process Hundreds of Documents?",
    subtext: "ByteBeam Agent Builder lets SMEs build AI agents that extract and validate data from thousands of documents—using tables, not code.",
    cta: "See ByteBeam Agent Builder in Action",
  },
  pdf: {
    headline: "Managing Complex Document Workflows?",
    subtext: "ByteBeam Agent Builder turns document chaos into automated pipelines. SMEs define extraction rules, validation logic, and routing—all using tables.",
    cta: "Explore ByteBeam Agent Builder",
  },
  image: {
    headline: "Processing Product Images for Compliance?",
    subtext: "ByteBeam Agent Builder lets compliance teams build AI agents that extract, translate, and validate product labels against UAE and GCC regulations.",
    cta: "Learn About Label Compliance Agents",
  },
  general: {
    headline: "Ready to Build Your Own Document Agent?",
    subtext: "ByteBeam Agent Builder: A table-based AI agent builder for document work. SMEs build agents using tables—no code required.",
    cta: "Discover ByteBeam Agent Builder",
  },
};

const AI_AGENTS = [
  {
    name: "UAE Food Label Localization",
    description: "Automatically extract, translate, and validate food labels for UAE market entry",
    href: "/solutions/uae-food-label-localization",
    industry: "FMCG",
  },
  {
    name: "Saudi Pharma Gap Analysis",
    description: "Analyze pharmaceutical documentation against SFDA requirements",
    href: "/solutions/saudi-pharma-gap-analysis",
    industry: "Pharma",
  },
];

export function ByteBeamValueProp({ variant = "full", context = "general" }: ByteBeamValuePropProps) {
  const contextMessage = CONTEXT_MESSAGES[context];

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Bot className="size-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-1">
              {contextMessage.headline}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {contextMessage.subtext}
            </p>
            <Link href="/">
              <Button variant="link" className="p-0 h-auto text-primary">
                {contextMessage.cta}
                <ArrowRight className="ml-1 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 space-y-8"
    >
      {/* Main Value Proposition */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
          <Bot className="size-4" />
          Powered by ByteBeam Agent Builder
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {contextMessage.headline}
        </h2>
        <p className="text-lg text-muted-foreground">
          {contextMessage.subtext}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {PLATFORM_FEATURES.slice(0, 3).map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-border shadow-sm"
          >
            <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
              <feature.icon className="size-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Agents Showcase */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Meet Our AI Agents
            </h3>
            <p className="text-slate-300 mb-6">
              Pre-built AI agents designed by industry experts for specific regulatory and compliance workflows in the Middle East market.
            </p>
            <div className="space-y-4">
              {AI_AGENTS.map((agent) => (
                <Link key={agent.href} href={agent.href}>
                  <div className="group bg-white/10 hover:bg-white/15 rounded-lg p-4 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-primary-foreground/70 bg-primary/30 px-2 py-0.5 rounded">
                          {agent.industry}
                        </span>
                        <h4 className="font-semibold mt-2 group-hover:text-primary transition-colors">
                          {agent.name}
                        </h4>
                        <p className="text-sm text-slate-400 mt-1">
                          {agent.description}
                        </p>
                      </div>
                      <ArrowRight className="size-5 text-slate-400 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Why ByteBeam Agent Builder?</h4>
            <ul className="space-y-3">
              {[
                "Table-based interface—build agents like you build spreadsheets",
                "SMEs build agents themselves, no engineering required",
                "Native Arabic language processing",
                "UAE & Saudi regulatory compliance built-in",
                "Enterprise-grade security and data residency",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4">
              <Button
                onClick={() => window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank")}
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                Book a Demo
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Industries Served */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Trusted by enterprises in
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["FMCG", "Pharma", "Finance", "Legal", "Insurance", "Operations"].map((industry) => (
            <Link key={industry} href={`/industries/${industry.toLowerCase()}`}>
              <span className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium text-foreground transition-colors cursor-pointer">
                {industry}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
