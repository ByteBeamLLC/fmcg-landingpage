import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

interface BlogLayoutProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords: string;
  canonical: string;
  structuredData: object[];
  category: string;
  industry: string;
  readTime: string;
  date: string;
  author: string;
  children: React.ReactNode;
}

export default function BlogLayout({
  title,
  description,
  ogTitle,
  ogDescription,
  keywords,
  canonical,
  structuredData,
  category,
  industry,
  readTime,
  date,
  author,
  children,
}: BlogLayoutProps) {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Compliance":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Regulatory":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "Automation":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const handleShare = (platform: string) => {
    const url = encodeURIComponent(canonical);
    const text = encodeURIComponent(title);

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={title}
        description={description}
        ogTitle={ogTitle || title}
        ogDescription={ogDescription || description}
        ogType="article"
        keywords={keywords}
        canonical={canonical}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="section-padding gradient-overlay text-white">
        <div className="container-custom">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/blog">
              <a className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </a>
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category)}`}>
                {category}
              </span>
              <span className="text-white/70">|</span>
              <span className="text-white/80">{industry}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {readTime} read
              </span>
              <span>By {author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-muted-foreground
                prose-strong:text-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-primary prose-blockquote:bg-muted prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                prose-table:border-collapse prose-table:w-full
                prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:border prose-th:border-border
                prose-td:p-3 prose-td:border prose-td:border-border
                prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg"
            >
              {children}
            </motion.div>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">Share this article:</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Twitter
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Automate Your Document Workflows?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              See how ByteBeam can transform your compliance and document processing operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank")}
                size="lg"
                className="bg-primary text-primary-foreground"
              >
                Book a Demo
              </Button>
              <Link href="/blog">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  More Articles
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
