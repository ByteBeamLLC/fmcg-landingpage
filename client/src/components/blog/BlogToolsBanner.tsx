/**
 * Top-of-article banner that introduces the SFDA toolkit before the reader
 * scrolls into the body. Optional but high-converting on dense regulatory
 * articles where the reader's pain is acute by paragraph 1.
 *
 * Used right after the lede paragraph; pair with one mid-article BlogToolPromo
 * and one bottom-of-article BlogRelatedTools.
 */

import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SFDA_TOOLS } from "@/lib/sfda/tools";

interface BlogToolsBannerProps {
  /** Hook line shown as the banner's headline */
  headline?: string;
  /** Supporting line under the headline */
  subline?: string;
  /** Button label for the primary CTA */
  ctaLabel?: string;
  /** Where the primary CTA points. Defaults to /sfda. */
  ctaHref?: string;
}

export default function BlogToolsBanner({
  headline = "Skip the manual draft. Try the SFDA labelling toolkit free.",
  subline = "Three AI agents that replace the mechanical 60–80% of SFDA Module 1.3 labelling work — SmPC + PIL generation, Arabic translation, and pre-submission gap analysis.",
  ctaLabel = "See the SFDA tools",
  ctaHref = "/sfda",
}: BlogToolsBannerProps) {
  return (
    <aside className="not-prose my-8" aria-label="SFDA tools toolkit">
      <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
        <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary shrink-0">
              <Sparkles className="size-5" />
            </div>
            <div className="sm:hidden">
              <span className="text-xs uppercase tracking-wider text-primary font-semibold">
                Bytebeam · SFDA toolkit
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="hidden sm:block text-xs uppercase tracking-wider text-primary font-semibold mb-1">
              Bytebeam · SFDA toolkit
            </p>
            <h3 className="font-semibold text-base sm:text-lg leading-snug mb-1">
              {headline}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {subline}{" "}
              <span className="text-foreground/80">
                ({SFDA_TOOLS.length} tools, one free run each.)
              </span>
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0 w-full sm:w-auto">
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="size-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
