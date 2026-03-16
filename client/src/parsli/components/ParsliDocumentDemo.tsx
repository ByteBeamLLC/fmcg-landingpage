import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FileText, Mail, Image, ArrowRight, CheckCircle2 } from "lucide-react";

const demoSteps = [
  {
    id: "input",
    label: "Input Document",
    icon: FileText,
    doc: {
      title: "Invoice #INV-2847",
      fields: [
        { label: "Vendor", value: "Acme Corp" },
        { label: "Date", value: "2026-02-15" },
        { label: "Amount", value: "$4,280.00" },
        { label: "PO Number", value: "PO-92841" },
      ],
    },
  },
  {
    id: "parse",
    label: "AI Parsing",
    icon: Mail,
    doc: null,
  },
  {
    id: "output",
    label: "Structured Data",
    icon: Image,
    doc: null,
  },
];

export default function ParsliDocumentDemo() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [activeStep, setActiveStep] = useState(0);
  const [parsedFields, setParsedFields] = useState<number[]>([]);

  useEffect(() => {
    if (!inView) return;

    const cycle = () => {
      setActiveStep(0);
      setParsedFields([]);

      // Step 1: Show document (0-2s)
      const t1 = setTimeout(() => setActiveStep(1), 2000);
      // Step 2: Parse fields one by one (2-4s)
      const t2 = setTimeout(() => setParsedFields([0]), 2300);
      const t3 = setTimeout(() => setParsedFields([0, 1]), 2600);
      const t4 = setTimeout(() => setParsedFields([0, 1, 2]), 2900);
      const t5 = setTimeout(() => setParsedFields([0, 1, 2, 3]), 3200);
      // Step 3: Show output (4s)
      const t6 = setTimeout(() => setActiveStep(2), 4000);

      return [t1, t2, t3, t4, t5, t6];
    };

    const timers = cycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      cycle();
    }, 7000);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [inView]);

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch Parsli extract structured data from any document in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Step indicators */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {demoSteps.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeStep >= idx
                    ? "bg-parsli-100 text-parsli-700"
                    : "bg-gray-100 text-gray-400"
                }`}>
                  <step.icon className="w-4 h-4" />
                  {step.label}
                </div>
                {idx < demoSteps.length - 1 && (
                  <ArrowRight className={`w-4 h-4 transition-colors ${activeStep > idx ? "text-parsli-400" : "text-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Demo area */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8 min-h-[320px] flex items-center justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Left: Document */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <FileText className="w-4 h-4 text-parsli-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {demoSteps[0].doc!.title}
                  </span>
                </div>
                <div className="space-y-3">
                  {demoSteps[0].doc!.fields.map((field, idx) => (
                    <div key={field.label} className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{field.label}:</span>
                      <div className="relative">
                        <span className="text-sm font-medium text-gray-800">{field.value}</span>
                        <AnimatePresence>
                          {activeStep >= 1 && parsedFields.includes(idx) && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute -inset-1 rounded border-2 border-parsli-400 bg-parsli-50/50"
                              style={{ zIndex: -1 }}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Output */}
              <div className={`bg-parsli-900 rounded-xl p-6 shadow-sm transition-opacity duration-500 ${activeStep >= 2 ? "opacity-100" : "opacity-40"}`}>
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-parsli-700">
                  <CheckCircle2 className="w-4 h-4 text-parsli-400" />
                  <span className="text-sm font-medium text-parsli-200">Extracted JSON</span>
                </div>
                <pre className="text-xs text-parsli-300 font-mono leading-relaxed">
{`{
  "vendor": "Acme Corp",
  "date": "2026-02-15",
  "amount": 4280.00,
  "currency": "USD",
  "po_number": "PO-92841",
  "confidence": 0.995
}`}
                </pre>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
