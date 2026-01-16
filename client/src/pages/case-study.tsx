import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Clock, FileCheck } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import takhleesLogo from "@assets/takhlees_logo_1759326324559.webp";
import carrefourLogo from "@assets/carrefour_1759413703784.png";
import infoquestLogo from "@assets/FinalLogoB-1024x141_1759326348970.png";
import SEO from "@/components/SEO";

const caseStudies = {
  takhlees: {
    id: "takhlees",
    company: "Takhlees",
    logo: takhleesLogo,
    industry: "Licensed Governmental Center",
    location: "GCC Region",
    tagline: "Transforming Manual Label Processing into an Automated Compliance Workflow",
    challenge: "Takhlees, a licensed governmental center specializing in food product certifications, faced significant challenges processing label compliance for imported FMCG products. Their manual workflow required reviewing hundreds of product labels, translating content to Arabic, calculating nutritional values, and ensuring compliance with local regulations—a process taking weeks per batch and prone to inconsistencies.",
    solution: "ByteBeam implemented an AI-powered compliance automation platform that processes product artwork in bulk, automatically extracting product information, translating content, validating against GCC regulations, and generating submission-ready forms and compliant labels.",
    results: [
      {
        metric: "10,000+",
        description: "Products Processed",
        detail: "Successfully automated label processing for over 10,000 SKUs across multiple product categories including food, beverages, and packaged goods."
      },
      {
        metric: "70%",
        description: "Faster Processing Time",
        detail: "Reduced label compliance workflow from weeks to days, enabling faster market entry for importers and retailers."
      },
      {
        metric: "100%",
        description: "Regulatory Compliance",
        detail: "Automated validation ensures all labels meet GCC regulatory requirements with zero compliance gaps."
      },
      {
        metric: "Single Portal",
        description: "Unified Management",
        detail: "Centralized platform for tracking all products, managing changes, and learning from regulatory feedback."
      }
    ],
    features: [
      "Automated Arabic translation with industry-specific terminology",
      "NRV (Nutrient Reference Value) calculations for all nutrition panels",
      "Halal certification requirement detection",
      "Allergen flagging and bilingual disclosure",
      "Batch processing for 1-1000 SKUs simultaneously",
      "Change management system with regulatory learning",
      "Audit trail for all compliance decisions"
    ],
    impact: [
      {
        title: "Quality at Scale",
        description: "Consistent label quality across thousands of products with uniform formatting and compliance standards."
      },
      {
        title: "Change Management",
        description: "Platform learns from regulatory feedback and applies corrections across similar products automatically."
      },
      {
        title: "Time Savings",
        description: "Experts focus on reviewing and approving rather than manual data entry and translation work."
      },
      {
        title: "Cost Efficiency",
        description: "Reduced reliance on external freelancers and agencies for routine compliance tasks."
      }
    ],
    testimonial: {
      quote: "Working with ByteBeam has been an exceptional experience. Their agile and well-organised team helped us transform a time-consuming, manual process into a smart, efficient workflow – saving both time and costs while ensuring quality and compliance.",
      author: "Chief Financial Officer",
      position: "Licensed Governmental Center, Takhlees"
    }
  },
  carrefour: {
    id: "carrefour",
    company: "Carrefour",
    logo: carrefourLogo,
    industry: "Retail & Distribution",
    location: "GCC Markets",
    tagline: "85% Time Reduction in Product Localization Through 27-Step AI Workflow Automation",
    challenge: "Carrefour faced a massive challenge processing product labels at scale for localization across GCC markets. The manual process took 20 minutes per product with complex requirements spanning extraction, translation, formatting, and compliance checks. With thousands of SKUs to process, the team initially expected zero errors from AI—a mindset that needed to evolve alongside the automation journey.",
    solution: "ByteBeam built a comprehensive 27-step AI workflow that automated the entire product localization pipeline: from label extraction and Arabic translation to nutritional calculations and compliance validation. The system was designed with human-in-the-loop oversight, allowing one person to review and approve what previously required an entire team.",
    results: [
      {
        metric: "85%",
        description: "Time Reduction",
        detail: "Reduced processing time from 20 minutes to just 3 minutes per product through intelligent automation."
      },
      {
        metric: "10,000+",
        description: "Products Processed",
        detail: "Successfully localized over 10,000 products with zero translation complaints from end customers."
      },
      {
        metric: "27 Steps",
        description: "Automated Workflow",
        detail: "Comprehensive pipeline covering extraction, translation, formatting, validation, and compliance checks."
      },
      {
        metric: "90/10",
        description: "Automation Model",
        detail: "90% AI automation with 10% human oversight—one person now does what used to take an entire team."
      }
    ],
    features: [
      "27-step automated localization workflow",
      "Intelligent label data extraction from any format",
      "Context-aware Arabic translation with industry terminology",
      "Automated nutritional panel calculations and formatting",
      "GCC regulatory compliance validation",
      "Human-in-the-loop review interface for quality control",
      "Batch processing for high-volume operations"
    ],
    impact: [
      {
        title: "Expectation Evolution",
        description: "After ~2,000 products, the client understood and embraced the 90% automation / 10% human oversight model—delivering better results than expecting 100% AI perfection."
      },
      {
        title: "Team Efficiency",
        description: "One person now handles the workload that previously required an entire team, freeing resources for strategic work."
      },
      {
        title: "Zero Translation Complaints",
        description: "Despite processing 10,000+ products, the system achieved zero translation complaints from customers."
      },
      {
        title: "Scalable Operations",
        description: "The workflow scales linearly—processing 1,000 products takes the same effort per product as processing 10."
      }
    ],
    testimonial: null
  },
  infoquest: {
    id: "infoquest",
    company: "InfoQuest",
    logo: infoquestLogo,
    industry: "Knowledge Process Outsourcing",
    location: "International Operations",
    tagline: "Automating Complex Knowledge Work for Enhanced Service Delivery",
    challenge: "InfoQuest, a knowledge process outsourcing provider, needed to accelerate a critical daily workflow that involved processing complex documentation and data validation. The manual process was time-intensive and created capacity constraints for their team.",
    solution: "ByteBeam designed and implemented a custom AI agent that automated the core knowledge work process, handling document processing, data extraction, validation, and output generation—all while maintaining the quality standards InfoQuest's clients expect.",
    results: [
      {
        metric: "60%",
        description: "Faster Processing",
        detail: "Reduced daily workflow completion time from hours to minutes through intelligent automation."
      },
      {
        metric: "Daily",
        description: "Automated Operations",
        detail: "Handles recurring tasks automatically, freeing experts for high-value analysis and client engagement."
      },
      {
        metric: "Consistent",
        description: "Quality Output",
        detail: "Maintains uniform quality standards across all processed documents and deliverables."
      },
      {
        metric: "Scalable",
        description: "Capacity Growth",
        detail: "Team can handle increased workload without proportional headcount growth."
      }
    ],
    features: [
      "Custom AI workflow automation",
      "Document processing and data extraction",
      "Intelligent validation and error checking",
      "Automated output generation",
      "Integration with existing systems",
      "Audit trail and quality control",
      "Expert review interface for oversight"
    ],
    impact: [
      {
        title: "Operational Excellence",
        description: "Consistent, high-quality deliverables with reduced manual intervention."
      },
      {
        title: "Team Productivity",
        description: "Knowledge workers focus on analysis and client relationships instead of repetitive tasks."
      },
      {
        title: "Business Scalability",
        description: "Ability to take on more clients without proportional cost increases."
      },
      {
        title: "Client Satisfaction",
        description: "Faster turnaround times and improved service quality for end clients."
      }
    ],
    testimonial: {
      quote: "ByteBeam's automation solution has been transformative for our operations. We've accelerated our workflow by 60% while maintaining the quality our clients expect.",
      author: "Operations Director",
      position: "InfoQuest"
    }
  },
  "research-copilot": {
    id: "research-copilot",
    company: "Consulting Firm",
    logo: null, // Anonymized case study - no logo
    industry: "Management Consulting",
    location: "Global Operations",
    tagline: "70% Faster Research Turnaround by Encoding Tacit Expert Knowledge into AI Agents",
    challenge: "A client in the consulting space faced a fundamental challenge: extracting knowledge from subject matter experts who don't consciously know what they know. The 'unspoken methodology' that experts apply automatically across research phases was hard to capture. Every handoff between SME and developer meant lost nuance, and traditional automation couldn't encode the implicit decision-making that made these experts valuable.",
    solution: "ByteBeam built a multi-agent research copilot that worked alongside the SME to surface and encode their tacit expertise into the system. Rather than asking experts to document their methodology (which rarely captures the real logic), the system observed patterns and learned the implicit rules that experts apply automatically. The key insight: the hardest part of AI agents isn't the AI—it's surfacing the tacit expertise that experts apply automatically.",
    results: [
      {
        metric: "70%",
        description: "Faster Turnaround",
        detail: "Research deliverables completed 70% faster by encoding expert methodology into the AI system."
      },
      {
        metric: "Tacit",
        description: "Knowledge Captured",
        detail: "Successfully encoded the 'unspoken methodology' that experts couldn't articulate but applied consistently."
      },
      {
        metric: "Multi-Agent",
        description: "Architecture",
        detail: "Purpose-built agent system where each agent handles a specific research phase with encoded expertise."
      },
      {
        metric: "Zero",
        description: "Lost Nuance",
        detail: "Eliminated knowledge loss from SME-developer handoffs by having AI learn directly from expert behavior."
      }
    ],
    features: [
      "Multi-agent research workflow architecture",
      "Tacit knowledge extraction through behavioral observation",
      "Phase-specific agents mirroring expert decision patterns",
      "Adaptive methodology encoding without explicit documentation",
      "Quality validation against expert-level outputs",
      "Continuous learning from expert corrections",
      "Seamless handoff between automated and human phases"
    ],
    impact: [
      {
        title: "Knowledge Preservation",
        description: "Captured institutional knowledge that would otherwise remain locked in individual experts' heads."
      },
      {
        title: "Scalable Expertise",
        description: "Junior team members can now produce expert-level research with AI guidance encoding senior methodology."
      },
      {
        title: "Faster Onboarding",
        description: "New consultants become productive faster by learning from the AI system that embodies best practices."
      },
      {
        title: "Consistent Quality",
        description: "Research outputs maintain consistent quality regardless of which team member is assigned."
      }
    ],
    testimonial: null
  }
};

// SEO keywords for each case study
const caseStudySEO: Record<string, { keywords: string; titleSuffix: string }> = {
  takhlees: {
    keywords: "FMCG label automation case study, GCC regulatory compliance, no-code document automation success story, label localization automation, Arabic translation automation",
    titleSuffix: "10,000+ Product Labels Automated"
  },
  carrefour: {
    keywords: "product localization automation, retail document automation case study, no-code AI workflow, 85% time reduction automation, GCC product compliance",
    titleSuffix: "85% Time Reduction in Product Localization"
  },
  "research-copilot": {
    keywords: "AI research automation, tacit knowledge capture, consulting automation case study, multi-agent AI system, expert knowledge encoding, no-code AI agents",
    titleSuffix: "70% Faster Research with AI Knowledge Capture"
  },
  infoquest: {
    keywords: "knowledge process automation, KPO automation case study, document processing automation, workflow automation success story",
    titleSuffix: "60% Faster Knowledge Work"
  }
};

export default function CaseStudy() {
  const [, params] = useRoute("/case-study/:id");

  const validIds = ["takhlees", "carrefour", "research-copilot"];

  if (!params?.id || !validIds.includes(params.id)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SEO
          title="Case Study Not Found | ByteBeam"
          description="The case study you're looking for is not available. Explore other ByteBeam customer success stories and AI automation solutions."
          ogTitle="Case Study Not Found | ByteBeam"
          ogDescription="The case study you're looking for is not available. Explore ByteBeam's AI automation customer success stories."
          keywords="case study, customer story, ByteBeam, AI automation"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground mb-6">This case study is not available.</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const caseStudy = caseStudies[params.id as keyof typeof caseStudies];
  const seoData = caseStudySEO[params.id] || caseStudySEO.takhlees;

  return (
    <div className="min-h-screen">
      <SEO
        title={`${caseStudy.company} Case Study: ${seoData.titleSuffix} | ByteBeam`}
        description={`See how ByteBeam helped ${caseStudy.company} with no-code AI automation. ${caseStudy.tagline}. Book a demo to achieve similar results.`}
        ogTitle={`${caseStudy.company} Success Story | No-Code AI Automation`}
        ogDescription={`${caseStudy.tagline}. Discover how ${caseStudy.company} transformed their workflow with ByteBeam's no-code AI automation platform.`}
        keywords={`${caseStudy.company} case study, ${seoData.keywords}, ByteBeam customer story, no-code automation`}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${caseStudy.company} Case Study: ${seoData.titleSuffix}`,
            "description": caseStudy.tagline,
            "author": {
              "@type": "Organization",
              "name": "ByteBeam"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ByteBeam",
              "url": "https://bytebeam.co"
            },
            "about": {
              "@type": "Thing",
              "name": "AI Document Automation"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://bytebeam.co"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Case Studies",
                "item": "https://bytebeam.co/case-studies"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": caseStudy.company,
                "item": `https://bytebeam.co/case-study/${caseStudy.id}`
              }
            ]
          }
        ]}
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="gradient-overlay text-white section-padding pt-32">
        <div className="container-custom">
          <Link href="/" data-testid="link-back-home">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg inline-block mb-6">
                <span className="text-sm font-semibold">{caseStudy.industry} · {caseStudy.location}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" data-testid="case-study-title">
                {caseStudy.company} Case Study
              </h1>
              <p className="text-2xl mb-8 text-white/90 leading-relaxed">
                {caseStudy.tagline}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-12 flex items-center justify-center"
            >
              {caseStudy.logo ? (
                <img
                  src={caseStudy.logo}
                  alt={`${caseStudy.company} Logo`}
                  className="max-w-full max-h-32 object-contain"
                  data-testid="company-logo"
                />
              ) : (
                <div className="text-center" data-testid="company-logo">
                  <div className="text-4xl font-bold text-primary mb-2">{caseStudy.company}</div>
                  <div className="text-muted-foreground text-sm">Case Study</div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Stats */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 -mt-24 mb-16">
            {caseStudy.results.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-2xl p-8 text-center"
                data-testid={`result-card-${index}`}
              >
                <div className="text-4xl font-bold text-primary mb-2">{result.metric}</div>
                <div className="text-lg font-semibold mb-3">{result.description}</div>
                <div className="text-sm text-muted-foreground">{result.detail}</div>
              </motion.div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <TrendingUp className="text-destructive" size={32} />
                The Challenge
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-primary" size={32} />
                The Solution
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {caseStudy.solution}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features Implemented</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-muted rounded-lg"
                  data-testid={`feature-${index}`}
                >
                  <CheckCircle2 className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Impact */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Business Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudy.impact.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-border rounded-xl p-8 shadow-sm"
                  data-testid={`impact-${index}`}
                >
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial - only show if available */}
          {caseStudy.testimonial && (
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-12 relative">
              <div className="absolute top-8 left-8 text-primary text-6xl opacity-20">
                "
              </div>
              <blockquote className="relative z-10 text-center max-w-4xl mx-auto">
                <p className="text-2xl text-foreground mb-8 italic leading-relaxed">
                  {caseStudy.testimonial.quote}
                </p>
                <footer>
                  <div className="font-bold text-lg">{caseStudy.testimonial.author}</div>
                  <div className="text-muted-foreground">{caseStudy.testimonial.position}</div>
                </footer>
              </blockquote>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-overlay text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Compliance Workflow?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            See how ByteBeam can deliver similar results for your organization
          </p>
          <Link href="/#contact">
            <Button className="bg-white text-primary hover:bg-gray-100" size="lg" data-testid="button-request-demo-cta">
              Request Your Demo
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
