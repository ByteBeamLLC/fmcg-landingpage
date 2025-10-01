import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CloudUpload, Bot, FileCheck } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Bulk Upload Artwork",
    description:
      "Upload artwork files for any number of products—from one to one thousand. Support for images, PDFs, and various packaging file formats.",
    features: [
      "Supports PDF, JPG, PNG, and packaging design files",
      "Process single SKUs or bulk batches",
      "Secure, encrypted file handling",
    ],
    icon: CloudUpload,
    iconBg: "bg-muted",
  },
  {
    number: 2,
    title: "Intelligent AI Processing",
    description:
      "Our AI agent automatically extracts, translates, calculates, and validates all required information against local regulatory requirements.",
    features: [
      "Extraction: Product names, ingredients, nutrition panels, allergens",
      "Translation: English to Arabic with local terminology",
      "Calculation: NRV per serving, portion sizes, daily values",
      "Validation: Restricted ingredients, certification requirements",
    ],
    icon: Bot,
    iconBg: "bg-secondary text-white",
  },
  {
    number: 3,
    title: "Review, Finalize & Submit",
    description:
      "Get pre-filled forms and market-ready labels. Your compliance experts review, make any necessary adjustments, and approve for registration.",
    features: [
      "Regulator-ready submission forms auto-generated",
      "Market-compliant labels for immediate use",
      "Expert review interface for quality assurance",
      "Audit trail for compliance documentation",
    ],
    icon: FileCheck,
    iconBg: "bg-accent/10 text-accent",
  },
];

export default function HowItWorks() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three simple steps from artwork to regulator-ready submission
          </p>
        </motion.div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
              data-testid={`how-it-works-step-${index}`}
            >
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className={`${step.iconBg} rounded-2xl p-8 flex items-center justify-center h-96`}>
                  <div className="text-center">
                    <step.icon size={96} className="mx-auto mb-4" />
                    <div className="text-2xl font-bold">
                      {step.number === 1 && "Bulk Upload Interface"}
                      {step.number === 2 && "AI Agent Processing"}
                      {step.number === 3 && "Ready for Submission"}
                    </div>
                    {step.number === 1 && <div className="text-muted-foreground mt-2">Drag & drop 1-1000 SKUs</div>}
                    {step.number === 2 && (
                      <div className="mt-4 flex justify-center gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Extracting...</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Translating...</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Validating...</span>
                      </div>
                    )}
                    {step.number === 3 && (
                      <div className="mt-4 flex justify-center gap-2">
                        <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold">
                          ✓ Forms Generated
                        </span>
                        <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold">
                          ✓ Labels Created
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center text-2xl font-bold font-display mb-6">
                  {step.number}
                </div>
                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-accent mt-1"></i>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
