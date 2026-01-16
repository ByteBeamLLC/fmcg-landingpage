import { LucideIcon, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: string;
  isAIPowered?: boolean;
  isNew?: boolean;
  className?: string;
}

export default function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  category,
  isAIPowered = false,
  isNew = false,
  className,
}: ToolCardProps) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Card
          className={cn(
            "group relative overflow-hidden cursor-pointer h-full",
            "hover:shadow-lg hover:border-primary/30 transition-all duration-300",
            className
          )}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <CardContent className="p-5 relative">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="shrink-0">
                <div
                  className={cn(
                    "p-3 rounded-xl transition-colors",
                    isAIPowered
                      ? "bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200"
                      : "bg-primary/10 group-hover:bg-primary/20"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-5",
                      isAIPowered
                        ? "text-purple-600"
                        : "text-primary"
                    )}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                    {title}
                  </h3>
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {description}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                  {isAIPowered && (
                    <Badge className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      <Sparkles className="size-3 mr-1" />
                      AI
                    </Badge>
                  )}
                  {isNew && (
                    <Badge className="text-xs bg-green-500 text-white border-0">
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
