import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CloudUpload, Bot, FileCheck, FileText, Image, FileSpreadsheet } from "lucide-react";

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
    iconBg: "bg-primary text-white",
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
    iconBg: "bg-primary/10 text-primary",
  },
];

function UploadAnimation() {
  const files = [
    { icon: FileText, name: "Organic-Granola-Bar.pdf", delay: 0 },
    { icon: FileText, name: "Premium-Coffee-8901234567890.pdf", delay: 1 },
    { icon: FileText, name: "Natural-Juice-Blend.pdf", delay: 2 },
  ];

  return (
    <div className="relative h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          y: [0, -12, 0],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
        }}
      >
        <CloudUpload size={96} className="mx-auto mb-6 text-primary" />
      </motion.div>
      <div className="text-2xl font-bold mb-4">Bulk Upload Interface</div>
      <div className="text-muted-foreground mb-6">Drag & drop 1-1000 SKUs</div>
      
      <div className="space-y-3 w-full max-w-xs">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-border/50"
          >
            <file.icon size={24} className="text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate text-foreground">{file.name}</div>
              <div className="relative h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                <motion.div
                  animate={{ 
                    width: ["0%", "100%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 6,
                    delay: file.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.4, 0.6, 1],
                  }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIProcessingAnimation() {
  const processingSteps = [
    { label: "Extracting", color: "bg-blue-500", delay: 0 },
    { label: "Translating", color: "bg-purple-500", delay: 2 },
    { label: "Calculating", color: "bg-orange-500", delay: 4 },
    { label: "Validating", color: "bg-green-500", delay: 6 },
  ];

  return (
    <div className="relative h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut",
        }}
      >
        <Bot size={96} className="mx-auto mb-6" />
      </motion.div>
      <div className="text-2xl font-bold mb-6">AI Agent Processing</div>
      
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {processingSteps.map((step, index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1, 1.1, 1.1, 1, 1, 1, 1],
              opacity: [0.4, 0.4, 1, 1, 0.4, 0.4, 0.4, 0.4],
            }}
            transition={{
              duration: 8,
              delay: step.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative overflow-hidden"
          >
            <motion.div
              animate={{
                backgroundColor: [
                  "rgba(255,255,255,0.2)",
                  "rgba(255,255,255,0.2)",
                  step.color === "bg-blue-500" ? "rgb(59, 130, 246)" :
                  step.color === "bg-purple-500" ? "rgb(168, 85, 247)" :
                  step.color === "bg-orange-500" ? "rgb(249, 115, 22)" :
                  "rgb(34, 197, 94)",
                  step.color === "bg-blue-500" ? "rgb(59, 130, 246)" :
                  step.color === "bg-purple-500" ? "rgb(168, 85, 247)" :
                  step.color === "bg-orange-500" ? "rgb(249, 115, 22)" :
                  "rgb(34, 197, 94)",
                  "rgba(255,255,255,0.2)",
                  "rgba(255,255,255,0.2)",
                  "rgba(255,255,255,0.2)",
                  "rgba(255,255,255,0.2)",
                ],
              }}
              transition={{
                duration: 8,
                delay: step.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="px-4 py-2 text-white rounded-full text-sm font-semibold"
            >
              {step.label}...
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear",
        }}
        className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full"
      />
    </div>
  );
}

function ReviewAnimation() {
  return (
    <div className="relative h-full flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
        }}
      >
        <FileCheck size={96} className="mx-auto mb-6 text-primary" />
      </motion.div>
      <div className="text-2xl font-bold mb-6">Ready for Submission</div>
      
      <div className="space-y-4 w-full max-w-sm">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-primary" size={24} />
              <span className="font-medium text-foreground">Submission Forms</span>
            </div>
            <motion.div
              animate={{
                scale: [0, 0, 1, 1, 1, 1, 0, 0],
                opacity: [0, 0, 1, 1, 1, 1, 0, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold"
            >
              ✓ Generated
            </motion.div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image className="text-primary" size={24} />
              <span className="font-medium text-foreground">Market Labels</span>
            </div>
            <motion.div
              animate={{
                scale: [0, 0, 0, 0, 1, 1, 1, 0],
                opacity: [0, 0, 0, 0, 1, 1, 1, 0],
              }}
              transition={{
                duration: 8,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-semibold"
            >
              ✓ Created
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
              data-testid={`how-it-works-step-${index}`}
            >
              <div className={index % 2 === 0 ? "md:order-2" : ""}>
                <div className={`${step.iconBg} rounded-2xl p-8 flex items-center justify-center h-96 overflow-hidden`}>
                  {step.number === 1 && <UploadAnimation />}
                  {step.number === 2 && <AIProcessingAnimation />}
                  {step.number === 3 && <ReviewAnimation />}
                </div>
              </div>
              <div className={index % 2 === 0 ? "md:order-1" : ""}>
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 text-white flex items-center justify-center text-2xl font-bold font-display mb-6">
                  {step.number}
                </div>
                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                <ul className="space-y-3">
                  {step.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-primary mt-1"></i>
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
