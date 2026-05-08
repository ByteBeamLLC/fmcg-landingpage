/**
 * Process-specific discovery-call CTA for pharma RA blog posts that don't
 * map to one of the 3 existing SFDA tools. Designed for in-house RA / PV
 * teams who own the process — not consultancies.
 *
 * The CTA framing is intentional and aligned with the platform pitch:
 *   "Walk us through your [process]. We'll show you what we'd automate."
 *
 * That framing:
 *   - Speaks to in-house RA teams (they own the process)
 *   - Promises a concrete value (custom automation scope)
 *   - Doesn't oversell — no upfront commitment beyond a 30-min call
 *   - Self-qualifies: consultancies skip this, in-house teams engage
 *
 * Each blog passes a `topic` like "PV", "variations", "DMF" so the
 * headline + framing match. Variants for A/B testing live in the
 * variant prop — change them in source for now; can be wired to an
 * analytics flag later.
 */

import { ArrowRight, CalendarClock, CheckCircle2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { SFDA_BOOKING_URL } from "@/lib/sfda/tools";

interface BlogDiscoveryCallCtaProps {
  /** Topic noun used to specialise the framing — e.g. "PV", "variations", "DMF". */
  topic: string;
  /** Optional eyebrow override (defaults to "Bytebeam · Discovery call"). */
  eyebrow?: string;
  /** Headline override. Falls back to a process-scoping framing built from `topic`. */
  headline?: string;
  /** Body copy override. Falls back to the standard "walk us through your process" line. */
  body?: string;
  /** "What to expect" bullets shown beneath the body. Three short lines is ideal. */
  expectations?: string[];
  /** CTA button label. Defaults to "Book a 30-min scoping call". */
  ctaLabel?: string;
  /**
   * "Proof of pattern" line linking to /sfda hub — anchors the offer in
   * the 3 existing tools so readers know we ship working agents, not
   * vapourware.
   */
  showProofOfPattern?: boolean;
  /** Visual variant. "inline" is a smaller mid-article block; "panel" is the bigger end-of-article version. */
  variant?: "inline" | "panel";
}

const DEFAULT_EXPECTATIONS = [
  "You walk us through how your team handles the work today",
  "We map the document touchpoints we'd automate first",
  "You leave with a written scoping summary — no commitment",
];

export default function BlogDiscoveryCallCta({
  topic,
  eyebrow = "Bytebeam · Discovery call",
  headline,
  body,
  expectations = DEFAULT_EXPECTATIONS,
  ctaLabel = "Book a 30-min scoping call",
  showProofOfPattern = true,
  variant = "panel",
}: BlogDiscoveryCallCtaProps) {
  const resolvedHeadline =
    headline ?? `Scope ${topic} automation with your team's process, not a generic template`;
  const resolvedBody =
    body ??
    `Walk us through how your team currently handles ${topic} work. In 30 minutes we'll map the document touchpoints we'd automate first, and share a written scoping summary you can take back to your QPPV / Head of RA. No commitment, no template demos — your process leads.`;

  if (variant === "inline") {
    return (
      <aside className="not-prose my-10" aria-label={`Book a ${topic} scoping call`}>
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary shrink-0">
                <CalendarClock className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <Badge variant="secondary" className="gap-1.5 mb-2">
                  <Sparkles className="size-3 text-primary" />
                  {eyebrow}
                </Badge>
                <h3 className="text-base sm:text-lg font-semibold leading-snug mb-1.5">
                  {resolvedHeadline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {resolvedBody}
                </p>
                <Button asChild>
                  <a
                    href={SFDA_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ctaLabel}
                    <ArrowRight className="size-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    );
  }

  return (
    <aside className="not-prose my-12" aria-label={`Book a ${topic} scoping call`}>
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
        <CardContent className="p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] items-start">
            <div className="flex-1 min-w-0">
              <Badge variant="secondary" className="gap-1.5 mb-4">
                <Sparkles className="size-3 text-primary" />
                {eyebrow}
              </Badge>
              <h3 className="text-xl sm:text-2xl font-bold leading-snug mb-3">
                {resolvedHeadline}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                {resolvedBody}
              </p>
              {expectations.length > 0 && (
                <ul className="space-y-2.5 mb-6">
                  {expectations.map((line, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-foreground/85">
                      <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <a
                    href={SFDA_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CalendarClock className="size-4 mr-2" />
                    {ctaLabel}
                    <ArrowRight className="size-4 ml-2" />
                  </a>
                </Button>
                {showProofOfPattern && (
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/sfda">See what we've already shipped</Link>
                  </Button>
                )}
              </div>
              {showProofOfPattern && (
                <p className="mt-4 text-xs text-muted-foreground">
                  Proof of pattern — three SFDA Module 1.3 agents already in production: SmPC + PIL Generator, Arabic Translator, Dossier Gap Analysis.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
