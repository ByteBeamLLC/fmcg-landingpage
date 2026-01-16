import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Zap,
  FileStack,
  Languages,
  ShieldCheck,
  Clock,
  Bot,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ToolContext =
  | "image-to-text"
  | "pdf-to-text"
  | "pdf-merger"
  | "pdf-splitter"
  | "pdf-compressor"
  | "image-to-pdf"
  | "image-compressor";

interface ContextualUpsellProps {
  toolContext: ToolContext;
  trigger?: "after-use" | "sidebar" | "inline";
}

interface UpsellConfig {
  icon: LucideIcon;
  headline: string;
  painPoint: string;
  solution: string;
  features: string[];
  cta: string;
  ctaLink: string;
}

const UPSELL_CONFIG: Record<ToolContext, UpsellConfig> = {
  "image-to-text": {
    icon: Languages,
    headline: "Processing Product Labels for UAE Market?",
    painPoint: "Manually extracting and translating text from product images is time-consuming and error-prone.",
    solution: "ByteBeam's UAE Food Label Agent automatically extracts, translates to Arabic, and validates labels against UAE regulations.",
    features: [
      "Batch process hundreds of labels",
      "Automatic Arabic translation",
      "UAE regulation compliance check",
      "Export-ready label files",
    ],
    cta: "See UAE Label Automation",
    ctaLink: "/solutions/uae-food-label-localization",
  },
  "pdf-to-text": {
    icon: FileStack,
    headline: "Extracting Data from Complex Documents?",
    painPoint: "Manual data extraction from PDFs is tedious, especially for regulatory documents with specific formats.",
    solution: "ByteBeam AI agents automatically extract structured data from pharmaceutical, financial, and legal documents.",
    features: [
      "Structured data extraction",
      "Multi-language support including Arabic",
      "Regulatory field mapping",
      "API integration available",
    ],
    cta: "Explore Document Automation",
    ctaLink: "/",
  },
  "pdf-merger": {
    icon: FileStack,
    headline: "Managing Document Compliance Packages?",
    painPoint: "Regulatory submissions require precise document assembly with specific ordering and formatting.",
    solution: "ByteBeam automates compliance document assembly for SFDA, UAE MOH, and other GCC regulatory bodies.",
    features: [
      "Automated document assembly",
      "Compliance checklist validation",
      "Version control & audit trail",
      "Regulatory format templates",
    ],
    cta: "See Compliance Automation",
    ctaLink: "/solutions/saudi-pharma-gap-analysis",
  },
  "pdf-splitter": {
    icon: ShieldCheck,
    headline: "Splitting Documents for Regulatory Review?",
    painPoint: "Regulatory submissions often require specific document sections to be reviewed separately.",
    solution: "ByteBeam's gap analysis agent automatically identifies and extracts relevant sections for SFDA compliance review.",
    features: [
      "Intelligent section detection",
      "Regulatory requirement mapping",
      "Automatic gap identification",
      "Review workflow integration",
    ],
    cta: "Try Gap Analysis Agent",
    ctaLink: "/solutions/saudi-pharma-gap-analysis",
  },
  "pdf-compressor": {
    icon: Clock,
    headline: "Preparing Documents for Submission Portals?",
    painPoint: "Regulatory portals have strict file size limits. Manual compression and format checking is tedious.",
    solution: "ByteBeam automatically optimizes documents for regulatory submission while ensuring format compliance.",
    features: [
      "Portal-specific optimization",
      "Format validation",
      "Batch processing",
      "Submission-ready output",
    ],
    cta: "Automate Document Prep",
    ctaLink: "/",
  },
  "image-to-pdf": {
    icon: FileStack,
    headline: "Creating Compliance Documentation?",
    painPoint: "Converting product images to regulatory-compliant PDF documentation requires specific formatting.",
    solution: "ByteBeam creates compliant documentation packages from product images with proper formatting and metadata.",
    features: [
      "Regulatory-compliant layouts",
      "Automatic metadata extraction",
      "Multi-product batch processing",
      "Export to submission formats",
    ],
    cta: "See Documentation Automation",
    ctaLink: "/",
  },
  "image-compressor": {
    icon: Zap,
    headline: "Processing Product Images at Scale?",
    painPoint: "E-commerce and regulatory submissions require consistent image formats and sizes.",
    solution: "ByteBeam processes product images at scale with consistent quality, format, and compliance checking.",
    features: [
      "Batch image processing",
      "Format standardization",
      "Quality assurance checks",
      "E-commerce integration",
    ],
    cta: "Explore Image Processing",
    ctaLink: "/",
  },
};

export function ContextualUpsell({ toolContext, trigger = "after-use" }: ContextualUpsellProps) {
  const config = UPSELL_CONFIG[toolContext];
  const Icon = config.icon;

  if (trigger === "sidebar") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-5 border border-primary/20"
      >
        <div className="flex items-center gap-2 mb-3">
          <Bot className="size-4 text-primary" />
          <span className="text-xs font-medium text-primary">ByteBeam Platform</span>
        </div>
        <h4 className="font-semibold text-foreground text-sm mb-2">
          {config.headline}
        </h4>
        <p className="text-xs text-muted-foreground mb-3">
          {config.solution}
        </p>
        <Link href={config.ctaLink}>
          <Button size="sm" variant="outline" className="w-full text-xs">
            {config.cta}
            <ArrowRight className="ml-1 size-3" />
          </Button>
        </Link>
      </motion.div>
    );
  }

  if (trigger === "inline") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10"
      >
        <Icon className="size-5 text-primary flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground">
            <span className="font-medium">Need more power?</span>{" "}
            <span className="text-muted-foreground">{config.solution.split(".")[0]}.</span>
          </p>
        </div>
        <Link href={config.ctaLink}>
          <Button size="sm" variant="ghost" className="text-primary text-xs whitespace-nowrap">
            Learn more
          </Button>
        </Link>
      </motion.div>
    );
  }

  // Default: after-use trigger (full card)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden"
    >
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Icon className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {config.headline}
            </h3>
            <p className="text-sm text-muted-foreground">
              {config.painPoint}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-foreground">
          {config.solution}
        </p>

        <ul className="space-y-2">
          {config.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="size-1.5 bg-primary rounded-full" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 pt-2">
          <Link href={config.ctaLink}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              {config.cta}
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank")}
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Small banner that can appear after successful tool use
export function SuccessUpsellBanner({ toolContext }: { toolContext: ToolContext }) {
  const config = UPSELL_CONFIG[toolContext];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Zap className="size-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-800">
              Processing complete!
            </p>
            <p className="text-xs text-green-600">
              Need to process more? ByteBeam handles thousands of documents automatically.
            </p>
          </div>
        </div>
        <Link href={config.ctaLink}>
          <Button size="sm" variant="outline" className="text-green-700 border-green-300 hover:bg-green-100">
            Learn more
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
