import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ParsliStat } from "../data/types";

interface ParsliHeroProps {
  variant?: "landing" | "feature" | "comparison";
  badge?: string;
  badgeIcon?: LucideIcon;
  headline: string;
  highlightWord?: string;
  subheadline: string;
  stats?: ParsliStat[];
  ctaText?: string;
  ctaHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  // Comparison variant
  competitorName?: string;
}

export default function ParsliHero({
  variant = "feature",
  badge,
  badgeIcon: BadgeIcon,
  headline,
  highlightWord,
  subheadline,
  stats,
  ctaText = "Start Free",
  ctaHref = "/parsli/pricing",
  secondaryCta,
  secondaryHref,
  competitorName,
}: ParsliHeroProps) {
  const renderHeadline = () => {
    if (!highlightWord) return headline;
    const parts = headline.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-parsli-500 to-parsli-accent bg-clip-text text-transparent">
          {highlightWord}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className={`relative overflow-hidden ${variant === "landing" ? "pt-28 pb-20 md:pt-36 md:pb-28" : "pt-28 pb-16 md:pt-32 md:pb-20"}`}>
      {/* Background */}
      <div className="absolute inset-0 parsli-gradient-subtle" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-parsli-200 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-parsli-100 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-parsli-100 text-parsli-700 text-sm font-medium mb-6"
            >
              {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
              {badge}
            </motion.div>
          )}

          {/* Comparison badge */}
          {variant === "comparison" && competitorName && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-sm border border-parsli-200 text-sm font-medium mb-6"
            >
              <span className="text-parsli-600 font-bold">Parsli</span>
              <span className="text-gray-400">vs</span>
              <span className="text-gray-600">{competitorName}</span>
            </motion.div>
          )}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`font-bold tracking-tight text-gray-900 mb-6 ${
              variant === "landing"
                ? "text-4xl md:text-5xl lg:text-6xl"
                : "text-3xl md:text-4xl lg:text-5xl"
            }`}
          >
            {renderHeadline()}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
          >
            <Link href={ctaHref}>
              <Button size="lg" className="bg-parsli-500 hover:bg-parsli-600 text-white text-base px-8 h-12 rounded-xl shadow-lg shadow-parsli-500/25 group">
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {secondaryCta && secondaryHref && (
              <Link href={secondaryHref}>
                <Button variant="outline" size="lg" className="text-base h-12 px-8 rounded-xl border-parsli-200 text-parsli-700 hover:bg-parsli-50">
                  {secondaryCta}
                </Button>
              </Link>
            )}
          </motion.div>

          {/* Trust strip */}
          {variant === "landing" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500"
            >
              {["No credit card required", "26 free pages/month", "Setup in 2 minutes"].map((text) => (
                <span key={text} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-parsli-500" />
                  {text}
                </span>
              ))}
            </motion.div>
          )}

          {/* Stats */}
          {stats && stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-10 pt-10 border-t border-parsli-200/50"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-parsli-600">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
