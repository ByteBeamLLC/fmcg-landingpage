/**
 * Bottom-of-article "Related tools" cross-link block. The "going further /
 * you may also like" pattern from the parsli SEO framework — every blog
 * post must point at 1-3 commercial leaves to feed the velocity engine.
 *
 * Pass `slugs` to pick a curated subset, or omit for all SFDA tools.
 */

import { Link } from "wouter";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SFDA_TOOLS, type SfdaTool } from "@/lib/sfda/tools";

interface BlogRelatedToolsProps {
  /** Tool slugs to surface in this block. Defaults to all 3 SFDA tools. */
  slugs?: string[];
  /** Section heading. Defaults to "Related SFDA tools". */
  heading?: string;
  /** Eyebrow text above the heading. */
  eyebrow?: string;
  /** Subtitle explaining the cross-link. */
  subtitle?: string;
}

function getIcon(name: string): LucideIcon {
  return (
    (Icons as unknown as Record<string, LucideIcon>)[name] ?? Icons.Wrench
  );
}

export default function BlogRelatedTools({
  slugs,
  heading = "Related SFDA tools",
  eyebrow,
  subtitle = "AI agents that automate the mechanical 60–80% of SFDA Module 1.3 labelling work. Free preview, license sold via 30-min walkthrough.",
}: BlogRelatedToolsProps) {
  const tools: SfdaTool[] = slugs
    ? (slugs
        .map((s) => SFDA_TOOLS.find((t) => t.slug === s))
        .filter(Boolean) as SfdaTool[])
    : SFDA_TOOLS;

  if (tools.length === 0) return null;

  return (
    <aside className="not-prose mt-16 mb-8" aria-label="Related tools">
      <div className="border-t-2 border-primary/20 pt-10">
        {eyebrow && (
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">
            {eyebrow}
          </p>
        )}
        <div className="flex items-center gap-2 mb-2">
          <Wrench className="size-5 text-primary" />
          <h2 className="text-2xl font-bold">{heading}</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
          {subtitle}
        </p>
        <div
          className={`grid gap-4 ${
            tools.length === 1
              ? "grid-cols-1"
              : tools.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {tools.map((tool) => {
            const Icon = getIcon(tool.icon);
            return (
              <Link
                key={tool.slug}
                href={`/sfda/${tool.slug}`}
                className="group block"
              >
                <Card className="h-full hover:border-primary/40 hover:shadow-md transition-all">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>
                      <h3 className="font-semibold text-base group-hover:text-primary transition-colors inline-flex items-center gap-1.5">
                        {tool.shortName}
                        <ArrowRight className="size-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {tool.outcome}
                    </p>
                    <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                      <span>{tool.output.format} · Free preview</span>
                      <span className="font-medium text-foreground">
                        Try it →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
