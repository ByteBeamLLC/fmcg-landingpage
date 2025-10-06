import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import LiveChatWidget from "@/components/live-chat-widget";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  Settings, 
  FileCheck, 
  CheckCircle, 
  AlertTriangle,
  TrendingUp,
  Users,
  Lock,
  FileText,
  Database,
  Calendar
} from "lucide-react";

function EnterpriseHero() {
  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <section className="section-padding pt-32 pb-20 relative overflow-hidden gradient-overlay text-white">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight" data-testid="hero-title">
            Production-Ready AI Agents<br />
            Built for Regulated Industries
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            ByteBeam delivers continuous, production-ready AI agents that extract data, 
            check compliance, and generate audit trails from any volume or type of document
          </p>
          <Button
            onClick={handleBookDemo}
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8"
            data-testid="button-book-demo"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Enterprise Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function ThreePillars() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Validation-First Accuracy",
      description: "Our validation-first approach ensures decisions are correct the first time—critical for regulated industries",
      keyFeatures: [
        {
          title: "Multi-Layer Validation",
          description: "Every AI decision goes through multiple validation checks against regulatory databases, business rules, and historical patterns"
        },
        {
          title: "Expert-in-the-Loop",
          description: "Critical decisions are automatically flagged for human review, ensuring your experts focus on judgment calls, not routine processing"
        },
        {
          title: "Continuous Learning",
          description: "The system learns from corrections and expert feedback, improving accuracy over time while maintaining human oversight"
        }
      ],
      metrics: [
        { value: "99%", label: "First-time accuracy" },
        { value: "95%", label: "Reduction in revisions" }
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Settings,
      title: "Configurable Compliance",
      description: "Configurable for your regulatory obligations and company policies",
      keyFeatures: [
        {
          title: "Custom Rule Engines",
          description: "Build and configure rules specific to your markets, regions, and regulatory requirements—no coding required"
        },
        {
          title: "Real-Time Updates",
          description: "Automatic monitoring of regulatory changes with instant notifications when rules affecting your products are updated"
        },
        {
          title: "Policy Version Control",
          description: "Track every policy change with complete version history, ensuring you can always trace back to previous compliance states"
        }
      ],
      metrics: [
        { value: "100%", label: "Regulatory coverage" },
        { value: "24/7", label: "Compliance monitoring" }
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: FileCheck,
      title: "Complete Traceability",
      description: "ByteBeam's AI agents provide full record-keeping, so every output is source-linked and reviewable",
      keyFeatures: [
        {
          title: "Audit Trails for Every Action",
          description: "Every AI decision, data extraction, and validation check is logged with timestamps, sources, and confidence scores"
        },
        {
          title: "Source Document Linking",
          description: "All outputs link directly back to source documents, making it easy to verify and explain any AI decision"
        },
        {
          title: "Reviewable History",
          description: "Compliance teams can review and export complete decision histories for regulatory audits or internal reviews"
        }
      ],
      metrics: [
        { value: "100%", label: "Audit trail coverage" },
        { value: "Instant", label: "Traceability access" }
      ],
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <section className="section-padding bg-background" data-testid="section-three-pillars">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The Three Pillars of Enterprise AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Handle thousands of files per hour, logging every AI action for security, compliance, and transparency
          </p>
        </motion.div>

        <div className="space-y-24">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
              data-testid={`pillar-section-${index}`}
            >
              {/* Pillar Header */}
              <div className="flex items-start gap-6 mb-8">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <pillar.icon className="text-white" size={40} />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Key Features Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {pillar.keyFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-card border-2 border-border rounded-xl p-6"
                    data-testid={`feature-card-${index}-${idx}`}
                  >
                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                      <CheckCircle className="text-primary" size={20} />
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="flex gap-8 justify-center bg-muted rounded-xl p-6">
                {pillar.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">{metric.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyItMatters() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const challenges = [
    {
      icon: AlertTriangle,
      title: "Compliance Violations Are Costly",
      description: "Average regulatory fine is $14.8M, plus brand damage and market access loss"
    },
    {
      icon: Users,
      title: "Expert Time Is Precious",
      description: "Your compliance team spends 60-70% of time on routine document processing"
    },
    {
      icon: TrendingUp,
      title: "Speed Matters for Growth",
      description: "Delayed product approvals mean missed market opportunities and slower revenue"
    }
  ];

  const benefits = [
    {
      icon: Lock,
      title: "Risk Mitigation",
      description: "Automated compliance checks reduce human error and ensure consistent application of rules"
    },
    {
      icon: Users,
      title: "Expert Leverage",
      description: "Free your experts to focus on strategy, exceptions, and high-value judgment calls"
    },
    {
      icon: TrendingUp,
      title: "Faster Time-to-Market",
      description: "Process thousands of documents in hours instead of weeks, accelerating product launches"
    }
  ];

  return (
    <section className="section-padding bg-muted" data-testid="section-why-it-matters">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why This Matters for Regulated Industries
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The cost of compliance errors and slow processing compounds daily
          </p>
        </motion.div>

        {/* Challenges */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">The Challenge</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-destructive/5 border-2 border-destructive/20 rounded-xl p-6"
                data-testid={`challenge-card-${index}`}
              >
                <challenge.icon className="text-destructive mb-4" size={32} />
                <h4 className="text-lg font-bold mb-3">{challenge.title}</h4>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">The ByteBeam Solution</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-card border-2 border-primary/20 rounded-xl p-6"
                data-testid={`benefit-card-${index}`}
              >
                <benefit.icon className="text-primary mb-4" size={32} />
                <h4 className="text-lg font-bold mb-3">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SecurityCompliance() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Lock,
      title: "Enterprise Security",
      items: [
        "SOC 2 Type II compliant infrastructure",
        "End-to-end encryption for data in transit and at rest",
        "Role-based access control (RBAC)",
        "Single sign-on (SSO) integration"
      ]
    },
    {
      icon: FileText,
      title: "Data Privacy",
      items: [
        "GDPR and CCPA compliant data handling",
        "Data residency options for regional requirements",
        "Automated data retention policies",
        "Right to deletion and data portability"
      ]
    },
    {
      icon: Database,
      title: "Infrastructure",
      items: [
        "99.9% uptime SLA with redundancy",
        "Automatic backups and disaster recovery",
        "Scalable architecture for enterprise volume",
        "Dedicated instances available"
      ]
    }
  ];

  return (
    <section className="section-padding bg-background" data-testid="section-security-compliance">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built with security and privacy at the core
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-card border-2 border-border rounded-xl p-8"
              data-testid={`security-card-${index}`}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-6">{feature.title}</h3>
              <ul className="space-y-3">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="text-primary mt-0.5 flex-shrink-0" size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseCTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <section className="section-padding gradient-overlay text-white" data-testid="section-cta">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Compliance Workflow?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            See how ByteBeam's AI agents can deliver validated accuracy, configurable compliance, 
            and complete traceability for your enterprise
          </p>
          <Button
            onClick={handleBookDemo}
            size="lg"
            className="bg-white text-primary hover:bg-gray-100 text-lg px-8"
            data-testid="button-book-enterprise-demo"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule Enterprise Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default function Enterprise() {
  return (
    <div className="min-h-screen">
      <SEO
        title="Enterprise AI Compliance Solutions | ByteBeam"
        description="Production-ready AI agents for regulated industries. Validation-first accuracy, configurable compliance, and complete traceability for document processing at scale."
        ogTitle="Enterprise AI Compliance Solutions | ByteBeam"
        ogDescription="Handle thousands of files per hour with AI agents that log every action. Built for regulated industries that demand accuracy, compliance, and full traceability."
        keywords="enterprise AI, compliance automation, regulatory compliance, document processing, audit trails, validation, traceability, enterprise security"
      />
      <Navigation />
      <EnterpriseHero />
      <ThreePillars />
      <WhyItMatters />
      <SecurityCompliance />
      <EnterpriseCTA />
      <Footer />
      <LiveChatWidget />
    </div>
  );
}
