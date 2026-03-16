import { Link } from "wouter";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ParsliCTAProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export default function ParsliCTA({
  headline = "Start Parsing Documents in Minutes",
  subheadline = "Join thousands of businesses automating their document workflows. Free forever with 26 pages/month.",
  ctaText = "Start Free",
  ctaHref = "/parsli/pricing",
  secondaryCta = "View Pricing",
  secondaryHref = "/parsli/pricing",
}: ParsliCTAProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 parsli-gradient" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_70%)]" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {headline}
          </h2>
          <p className="text-lg text-white/80 mb-8 leading-relaxed">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <Link href={ctaHref}>
              <Button
                size="lg"
                className="bg-white text-parsli-700 hover:bg-parsli-50 text-base h-12 px-8 rounded-xl shadow-lg group font-semibold"
              >
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {secondaryCta && secondaryHref && (
              <Link href={secondaryHref}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base h-12 px-8 rounded-xl border-white/30 text-white hover:bg-white/10 bg-transparent"
                >
                  {secondaryCta}
                </Button>
              </Link>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
            {["No credit card", "Free 26 pages/month", "Cancel anytime"].map((text) => (
              <span key={text} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white/80" />
                {text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
