/**
 * Top-of-article "Key takeaways" callout. The framework lists this as a
 * required entity in the blog archetype: a styled callout with 3-5
 * scannable bullets immediately after the lede, before the deep dive.
 *
 * Improves dwell time + scannability for readers who would otherwise
 * skim and leave.
 */

import { Lightbulb } from "lucide-react";

interface BlogKeyTakeawaysProps {
  /** Bullet points — 3-5 ideal. Each one short, action-oriented. */
  points: (string | React.ReactNode)[];
  /** Override the section heading. */
  heading?: string;
}

export default function BlogKeyTakeaways({
  points,
  heading = "Key takeaways",
}: BlogKeyTakeawaysProps) {
  if (!points || points.length === 0) return null;

  return (
    <aside
      className="not-prose my-8 rounded-xl border-2 border-primary/20 bg-primary/5 p-5 sm:p-6"
      aria-label={heading}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Lightbulb className="size-4" />
        </div>
        <h3 className="font-semibold text-base">{heading}</h3>
      </div>
      <ul className="space-y-2.5 text-sm">
        {points.map((point, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-primary font-bold mt-0.5 shrink-0">·</span>
            <span className="text-foreground/85 leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
