import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Users, Target } from "lucide-react";
import { Link } from "wouter";
import bytebeamLogo from "@assets/bytebeam_logo_1759326269799.png";
import SEO from "@/components/SEO";

// Structured data for About page
const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ByteBeam",
    "description": "Learn how ByteBeam transforms document-heavy, analysis-intensive processes through intelligent automation.",
    "url": "https://bytebeam.co/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "ByteBeam",
      "url": "https://bytebeam.co",
      "logo": "https://bytebeam.co/assets/bytebeam-logo.png",
      "description": "AI agents built by Subject Matter Experts, not engineers. No code required.",
      "foundingDate": "2024",
      "areaServed": [
        { "@type": "Country", "name": "United Arab Emirates" },
        { "@type": "Country", "name": "Saudi Arabia" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Lebanon" }
      ],
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "20 Wenlock Road",
          "addressLocality": "London",
          "addressCountry": "United Kingdom",
          "postalCode": "N1 7GU"
        }
      ],
      "sameAs": []
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://bytebeam.co" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://bytebeam.co/about" }
    ]
  }
];

export default function About() {
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [missionRef, missionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [valuesRef, valuesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleGetInTouch = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About ByteBeam | AI-Powered Automation for Knowledge Work"
        description="Learn how ByteBeam transforms document-heavy, analysis-intensive processes through intelligent automation. Discover our mission, values, and commitment to empowering experts with AI agents."
        ogTitle="About ByteBeam | Transforming Knowledge Work with AI"
        ogDescription="We build AI agents that automate complex, repetitive knowledge work—freeing experts to focus on what truly matters. Discover our mission and approach."
        keywords="ByteBeam, AI automation company, knowledge work automation, document processing AI, compliance automation experts, AI agent platform"
        canonical="https://bytebeam.co/about"
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
            className="max-w-4xl mx-auto text-center"
          >
            <img
              src={bytebeamLogo}
              alt="ByteBeam Logo"
              className="h-16 mx-auto mb-8 brightness-0 invert"
              data-testid="about-logo"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About ByteBeam</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We build AI agents that automate complex, repetitive knowledge work - freeing experts to focus on what truly matters.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, y: 30 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Our Mission</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-6">
                ByteBeam is on a mission to transform knowledge work through intelligent automation. We focus on document-heavy, 
                analysis-intensive processes that require subject matter expertise - the kind of work that's too complex for simple 
                automation but too repetitive to be fulfilling for skilled professionals.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Our AI agents don't just process information - they understand context, apply regulatory knowledge, and make 
                informed decisions. This allows businesses to accelerate their operations while maintaining the accuracy and 
                expertise their customers depend on.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe AI should augment human capability, not replace it. By automating the repetitive aspects of knowledge 
                work, we enable experts to focus on strategy, innovation, and complex problem-solving.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <motion.div
            ref={valuesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">What Drives Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border-2 border-border rounded-xl p-8 text-center"
                data-testid="value-card-impact"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Real Impact</h3>
                <p className="text-muted-foreground">
                  Beyond the buzz. We focus on delivering measurable results that transform how businesses operate.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border-2 border-border rounded-xl p-8 text-center"
                data-testid="value-card-expertise"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Domain Expertise</h3>
                <p className="text-muted-foreground">
                  We build deep understanding of the industries we serve, ensuring our solutions address real-world challenges.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border-2 border-border rounded-xl p-8 text-center"
                data-testid="value-card-partnership"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Partnership</h3>
                <p className="text-muted-foreground">
                  We work closely with our clients to understand their unique needs and tailor solutions accordingly.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-overlay text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
            <p className="text-xl mb-8 text-white/90">
              Let's discuss how ByteBeam can help automate your knowledge work processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetInTouch}
                className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 text-lg"
                size="lg"
                data-testid="button-get-in-touch"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/">
                <Button
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg w-full sm:w-auto"
                  size="lg"
                  data-testid="button-back-home"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
