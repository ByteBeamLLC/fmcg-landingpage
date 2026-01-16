import { LucideIcon } from "lucide-react";
import ToolCard from "./ToolCard";

interface RelatedTool {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: string;
  isAIPowered?: boolean;
}

interface RelatedToolsProps {
  tools: RelatedTool[];
  title?: string;
}

export default function RelatedTools({
  tools,
  title = "Related Tools",
}: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <ToolCard
            key={index}
            title={tool.title}
            description={tool.description}
            href={tool.href}
            icon={tool.icon}
            category={tool.category}
            isAIPowered={tool.isAIPowered}
          />
        ))}
      </div>
    </section>
  );
}
