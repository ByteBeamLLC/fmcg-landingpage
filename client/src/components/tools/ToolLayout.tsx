import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Bot, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { ContextualUpsell } from "./ContextualUpsell";
import { ByteBeamValueProp } from "./ByteBeamValueProp";

type ToolContext =
  | "image-to-text"
  | "pdf-to-text"
  | "pdf-merger"
  | "pdf-splitter"
  | "pdf-compressor"
  | "image-to-pdf"
  | "image-compressor";

interface ToolLayoutProps {
  title: string;
  description: string;
  category: string;
  keywords?: string;
  children: ReactNode;
  isAIPowered?: boolean;
  toolContext?: ToolContext;
  showSidebarUpsell?: boolean;
  showBottomUpsell?: boolean;
}

export default function ToolLayout({
  title,
  description,
  category,
  keywords,
  children,
  isAIPowered = false,
  toolContext,
  showSidebarUpsell = false,
  showBottomUpsell = true,
}: ToolLayoutProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description: description,
    applicationCategory: "Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "ByteBeam",
      url: "https://bytebeam.co",
    },
  };

  // Determine context type for upsell messaging
  const getContextType = (): "ocr" | "pdf" | "image" | "general" => {
    if (!toolContext) return "general";
    if (toolContext.includes("text") || toolContext === "image-to-text") return "ocr";
    if (toolContext.includes("pdf")) return "pdf";
    if (toolContext.includes("image")) return "image";
    return "general";
  };

  return (
    <>
      <SEO
        title={`${title} - Free Online Tool | ByteBeam`}
        description={description}
        keywords={keywords || `${title.toLowerCase()}, free online tool, document processing, ${category.toLowerCase()}`}
        structuredData={structuredData}
      />
      <Navigation />

      <main className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-4" />
              Back to All Tools
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary">{category}</Badge>
              {isAIPowered && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  <Sparkles className="size-3 mr-1" />
                  AI Powered
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          </motion.div>

          {/* Tool Content with Optional Sidebar */}
          <div className={showSidebarUpsell && toolContext ? "grid lg:grid-cols-4 gap-8" : ""}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={showSidebarUpsell && toolContext ? "lg:col-span-3" : ""}
            >
              {children}
            </motion.div>

            {/* Sidebar Upsell */}
            {showSidebarUpsell && toolContext && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block space-y-6"
              >
                <ContextualUpsell toolContext={toolContext} trigger="sidebar" />

                {/* Powered by ByteBeam Badge */}
                <div className="text-center">
                  <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Bot className="size-3" />
                    Powered by ByteBeam
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Upsell Section */}
          {showBottomUpsell && (
            <div className="mt-12">
              <ByteBeamValueProp
                variant="compact"
                context={getContextType()}
              />
            </div>
          )}

          {/* Powered by ByteBeam - Mobile/Non-sidebar view */}
          {!showSidebarUpsell && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
              >
                <Bot className="size-4" />
                <span>Powered by <span className="font-medium text-foreground group-hover:text-primary">ByteBeam</span></span>
                <ArrowRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
