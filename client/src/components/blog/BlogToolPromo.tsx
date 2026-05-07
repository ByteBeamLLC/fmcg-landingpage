/**
 * Mid-article inline tool promo card. The blog→tool velocity engine —
 * place after the section where the reader feels the pain the tool solves
 * (e.g. the SmPC/PIL section in the SFDA registration guide).
 *
 * Sales-led conversion: primary CTA goes to the tool page (free preview),
 * secondary "Book a demo" inherits from the tool's BOOK_DEMO_URL.
 */

import { Link } from "wouter";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Sparkles, CalendarClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSfdaTool, BOOK_DEMO_URL } from "@/lib/sfda/tools";

interface BlogToolPromoProps {
  toolSlug: string;
  /** Optional override for the in-article hook line. Defaults to tool.outcome */
  hook?: string;
  /** Optional pre-context line ("Stuck on the SmPC draft?") shown above the title */
  eyebrow?: string;
}

function getIcon(name: string): LucideIcon {
  return (
    (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Wrench
  );
}

export default function BlogToolPromo({
  toolSlug,
  hook,
  eyebrow,
}: BlogToolPromoProps) {
  const tool = getSfdaTool(toolSlug);
  if (!tool) return null;

  const Icon = getIcon(tool.icon);
  const headline = hook ?? tool.outcome;

  return (
    <aside
      className="not-prose my-10"
      aria-label={`Try the ${tool.shortName}`}
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="flex size-12 sm:size-14 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Icon className="size-6 sm:size-7" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {eyebrow ? (
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="size-3 text-primary" />
                    {eyebrow}
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="gap-1">
                    <Sparkles className="size-3 text-primary" />
                    {tool.badgeLabel}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  Free first run · DOCX out · No card required
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold leading-snug mb-2">
                {headline}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {tool.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild>
                  <Link href={`/sfda/${tool.slug}`}>
                    {tool.ctaLabel}
                    <ArrowRight className="size-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href={BOOK_DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarClock className="size-4 mr-2" />
                    Book a 30-min demo
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
