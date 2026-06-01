import { useEffect, useState } from "react";

export type TocItem = { id: string; text: string };

export default function BlogToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track which sections intersect the top of the viewport; the topmost
    // visible one wins. Falls back to the nearest heading above the scroll
    // position when nothing is intersecting.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (visible.size > 0) {
          const topmost = items.find((i) => visible.has(i.id));
          if (topmost) setActiveId(topmost.id);
          return;
        }
        const offset = 120;
        let candidate: string | null = null;
        for (const el of elements) {
          if (el.getBoundingClientRect().top - offset <= 0) candidate = el.id;
          else break;
        }
        if (candidate) setActiveId(candidate);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        On this page
      </p>
      <ul className="border-l-2 border-border list-none pl-0 m-0 space-y-0">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="m-0 p-0">
              <a
                href={`#${item.id}`}
                onClick={() => setActiveId(item.id)}
                className={
                  "block py-1.5 pl-4 -ml-0.5 text-sm leading-snug border-l-2 no-underline transition-colors " +
                  (isActive
                    ? "text-primary font-medium border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground/50")
                }
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
