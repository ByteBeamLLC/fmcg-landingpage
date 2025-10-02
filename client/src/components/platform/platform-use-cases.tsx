import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Package, ShoppingCart, Shield, FileCheck, Pill } from "lucide-react";

const useCases = [
  {
    icon: Heart,
    industry: "Healthcare",
    title: "Clinical Peer Review Automation",
    challenge:
      "Hospitals conduct monthly peer reviews across all departments, manually reviewing discharged patient files to identify errors, documentation gaps, and quality issues. This requires clinical expertise and takes days per department.",
    solution:
      "AI agents review patient records against clinical protocols, flag potential issues, generate detailed reports, and highlight cases requiring physician attention - all while maintaining HIPAA compliance.",
    impact: "Reduce review time by 70% while improving documentation quality",
  },
  {
    icon: Package,
    industry: "FMCG / Food & Beverage",
    title: "Import Packaging Compliance",
    challenge:
      "Every imported product needs label translation, nutritional calculations, compliance checks, and regulatory forms - a process requiring weeks of expert work per product batch.",
    solution:
      "Custom AI extracts product information from artwork, translates content, validates against local regulations, calculates nutritional values, and generates submission-ready forms automatically.",
    impact: "Process 10,000+ products with 70% faster turnaround",
  },
  {
    icon: Pill,
    industry: "Pharma E-Commerce",
    title: "Drug Content Generation",
    challenge:
      "E-commerce platforms receive only product images from distributors. Experts must research each drug, gather information from multiple sources, and create detailed, compliant product descriptions.",
    solution:
      "AI agent identifies the drug from images, researches authoritative medical sources, generates comprehensive product content, and ensures regulatory compliance - all automatically integrated into the e-commerce platform.",
    impact: "Scale content creation from 50 to 1000+ products weekly",
  },
  {
    icon: Shield,
    industry: "Insurance & Finance",
    title: "Customer Onboarding Due Diligence",
    challenge:
      "Onboarding new customers requires reviewing documents, verifying information across databases, conducting compliance checks, and generating risk assessments - work that delays account activation.",
    solution:
      "AI agents automatically review submitted documents, cross-reference information across internal and external systems, conduct background checks, flag risks, and prepare compliance reports for final approval.",
    impact: "Reduce onboarding time from weeks to days",
  },
];

export default function PlatformUseCases() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="use-cases" className="section-padding bg-background">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Real-World Use Cases</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Custom AI agents solving complex knowledge work across industries
          </p>
        </motion.div>

        <div className="space-y-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-card border-2 border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              data-testid={`use-case-${index}`}
            >
              <div className="grid md:grid-cols-[300px_1fr] gap-0">
                <div className="bg-primary/5 p-8 flex flex-col items-center justify-center text-center border-r-0 md:border-r-2 border-b-2 md:border-b-0 border-border">
                  <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <useCase.icon className="text-primary w-10 h-10" />
                  </div>
                  <div className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                    {useCase.industry}
                  </div>
                  <h3 className="text-xl font-bold leading-tight">{useCase.title}</h3>
                </div>

                <div className="p-8">
                  <div className="mb-6">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                      The Challenge
                    </h4>
                    <p className="text-foreground leading-relaxed">{useCase.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                      The Solution
                    </h4>
                    <p className="text-foreground leading-relaxed">{useCase.solution}</p>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <FileCheck className="w-5 h-5" />
                    <span>{useCase.impact}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center bg-muted border-2 border-border rounded-xl p-8"
        >
          <p className="text-xl font-semibold mb-2">Have a different process in mind?</p>
          <p className="text-lg text-muted-foreground">
            These are just examples. If your workflow involves document analysis, expert reasoning, and system integration - we can automate it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
