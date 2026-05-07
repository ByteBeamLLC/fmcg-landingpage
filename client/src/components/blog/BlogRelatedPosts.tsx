/**
 * Visual "Related posts" card grid for cross-blog internal linking.
 * Replaces the text-bullet "Related Resources" pattern that hides the
 * link signal. Per the parsli framework: every blog post must point at
 * 2-3 sibling blog posts via card-grid (not inline text bullets) to
 * carry the internal-link velocity that feeds commercial leaves.
 *
 * Pulls from the post registry (lib/blog/posts.ts) so titles, categories,
 * and read times stay in sync with the blog index.
 */

import { Link } from "wouter";
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getPostsBySlugs } from "@/lib/blog/posts";

interface BlogRelatedPostsProps {
  /** Slugs to surface (in order). Hidden posts are skipped automatically. */
  slugs: string[];
  heading?: string;
  subtitle?: string;
}

function getCategoryColor(category: string) {
  switch (category) {
    case "Compliance":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200";
    case "Regulatory":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200";
    case "Automation":
      return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200";
    case "Industry":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
  }
}

export default function BlogRelatedPosts({
  slugs,
  heading = "Related reading",
  subtitle,
}: BlogRelatedPostsProps) {
  const posts = getPostsBySlugs(slugs);
  if (posts.length === 0) return null;

  return (
    <aside
      className="not-prose mt-16 mb-8 border-t border-border pt-10"
      aria-label="Related reading"
    >
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="size-5 text-primary" />
        <h2 className="text-2xl font-bold">{heading}</h2>
      </div>
      {subtitle && (
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
          {subtitle}
        </p>
      )}
      <div
        className={`grid gap-4 ${
          posts.length === 1
            ? "grid-cols-1 max-w-2xl"
            : posts.length === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <Card className="h-full hover:border-primary/40 hover:shadow-md transition-all">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </span>
                  <span className="text-[11px] text-muted-foreground inline-flex items-center gap-1">
                    <Tag className="size-2.5" />
                    {post.industry}
                  </span>
                </div>
                <h3 className="font-semibold text-base mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                  {post.shortTitle ?? post.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {post.description}
                </p>
                <div className="mt-4 pt-3 border-t flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-medium text-foreground group-hover:text-primary transition-colors">
                    <Clock className="size-3" />
                    {post.readTime}
                    <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </aside>
  );
}
