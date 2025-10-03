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
    tagline: "Accelerating Private Label Product Approvals for Rapid Market Expansion",
    challenge: "As a leading retailer expanding private label offerings across GCC markets, Carrefour needed to process hundreds of new SKUs monthly for label compliance and regulatory approval. The manual process created bottlenecks that delayed product launches and limited the pace of private label expansion.",
    solution: "ByteBeam deployed its AI compliance platform to automate the entire label localization and approval workflow, enabling Carrefour to rapidly scale private label offerings while maintaining consistent compliance across all GCC markets.",
    results: [
      {
        metric: "3,000+",
        description: "SKUs Processed",
        detail: "Automated label compliance for thousands of private label products across food, beverages, and household categories."
      },
      {
        metric: "60%",
        description: "Faster Time-to-Market",
        detail: "Reduced product approval timeline from months to weeks, accelerating private label launches."
      },
      {
        metric: "Multi-Market",
        description: "Regional Coverage",
        detail: "Unified compliance workflow across multiple GCC countries with country-specific regulations."
      },
      {
        metric: "Real-Time",
        description: "Change Processing",
        detail: "Handle product reformulations and packaging updates without waiting for bulk operations."
      }
    ],
    features: [
      "Bulk artwork upload for hundreds of products",
      "Multi-market compliance validation (UAE, Saudi Arabia, Kuwait, etc.)",
      "Private label artwork optimization",
      "Nutritional panel formatting per country requirements",
      "Ingredient list translation and validation",
      "Real-time regulatory rule updates",
      "Product categorization and certification flagging"
    ],
    impact: [
      {
        title: "Faster Expansion",
        description: "Accelerated private label portfolio growth with streamlined compliance processes."
      },
      {
        title: "Market Agility",
        description: "Quick response to market trends with rapid product launches and reformulations."
      },
      {
        title: "Brand Consistency",
        description: "Maintained uniform label quality and branding across all GCC markets."
      },
      {
        title: "Operational Efficiency",
        description: "Freed internal teams to focus on strategic decisions rather than compliance paperwork."
      }
    ],
    testimonial: {
      quote: "ByteBeam's platform transformed our private label compliance workflow. What used to take our team months now takes weeks, allowing us to bring products to market faster than ever.",
      author: "Private Label Operations Manager",
      position: "Carrefour GCC"
    }
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
  }
};

export default function CaseStudy() {
  const [, params] = useRoute("/case-study/:id");
  
  // Only allow Takhlees case study to be viewed
  if (!params?.id || params.id !== "takhlees") {
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
  
  const caseStudy = caseStudies.takhlees;

  return (
    <div className="min-h-screen">
      <SEO
        title={`${caseStudy.company} Case Study: Automating 10,000+ Product Labels | ByteBeam`}
        description={`See how ByteBeam helped ${caseStudy.company} automate label compliance for 10,000+ FMCG products, reducing processing time by 70% while ensuring 100% GCC regulatory compliance.`}
        ogTitle={`${caseStudy.company} Success Story | AI-Powered Label Compliance Automation`}
        ogDescription={`${caseStudy.tagline}. Discover how ${caseStudy.company} transformed their manual compliance workflow with ByteBeam's AI automation platform.`}
        keywords={`${caseStudy.company} case study, FMCG label automation, compliance automation success story, GCC regulatory compliance, AI label processing, ByteBeam customer story`}
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
              <img 
                src={caseStudy.logo} 
                alt={`${caseStudy.company} Logo`} 
                className="max-w-full max-h-32 object-contain"
                data-testid="company-logo"
              />
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

          {/* Testimonial */}
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
