import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Download, FileText, Calculator, BookOpen, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import brochurePdf from "@assets/bytebeam-tradecompliance_1759324504893.pdf";

const resources = [
  {
    id: "brochure",
    type: "Product Brochure",
    title: "ByteBeam Agent Builder Overview",
    description: "Comprehensive guide to ByteBeam Agent Builder—a table-based AI agent builder for document work. Features, benefits, and use cases.",
    icon: FileText,
    downloadUrl: brochurePdf,
    fileName: "ByteBeam_Product_Brochure.pdf",
    fileSize: "2.4 MB"
  },
  {
    id: "whitepaper",
    type: "Whitepaper",
    title: "The Future of FMCG Compliance in GCC Markets",
    description: "Industry insights on regulatory trends, automation opportunities, and how AI is transforming label compliance.",
    icon: BookOpen,
    downloadUrl: "#whitepaper",
    fileName: "ByteBeam_GCC_Compliance_Whitepaper.pdf",
    fileSize: "1.8 MB"
  },
  {
    id: "guide",
    type: "Compliance Guide",
    title: "GCC Label Requirements Checklist",
    description: "Complete checklist of mandatory label requirements for food, cosmetics, and general FMCG products across GCC countries.",
    icon: FileText,
    downloadUrl: "#guide",
    fileName: "GCC_Label_Requirements_Checklist.pdf",
    fileSize: "850 KB"
  },
  {
    id: "calculator",
    type: "ROI Calculator",
    title: "Compliance Automation ROI Calculator",
    description: "Calculate potential time and cost savings by automating your label compliance workflow with ByteBeam.",
    icon: Calculator,
    downloadUrl: "#calculator",
    fileName: null,
    fileSize: null
  }
];

export default function ResourcesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleDownload = (resource: typeof resources[0]) => {
    if (resource.id === "brochure") {
      window.open(resource.downloadUrl, "_blank");
    } else if (resource.id === "calculator") {
      alert("ROI Calculator: Coming soon! This interactive tool will help you calculate potential savings from automation. Please request a demo for a personalized ROI analysis.");
    } else {
      alert(`${resource.title}: This resource is currently being prepared. Please contact us for early access or request a demo to discuss your specific needs.`);
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Resources & Tools</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Download guides, tools, and insights to accelerate your compliance journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {resources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-2 border-border"
              data-testid={`resource-card-${resource.id}`}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 rounded-lg bg-primary text-white">
                  <resource.icon size={32} />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-primary font-semibold mb-1">{resource.type}</div>
                  <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {resource.description}
              </p>

              {resource.fileSize && (
                <div className="text-sm text-muted-foreground mb-4">
                  <i className="fas fa-file-pdf mr-2"></i>
                  {resource.fileName} · {resource.fileSize}
                </div>
              )}

              <Button 
                className="w-full"
                onClick={() => handleDownload(resource)}
                data-testid={`button-download-${resource.id}`}
              >
                <Download className="mr-2 h-4 w-4" />
                {resource.id === "calculator" ? "Use Calculator" : "Download"}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16 p-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl"
        >
          <TrendingUp className="mx-auto mb-4 text-primary" size={48} />
          <h3 className="text-2xl font-bold mb-4">Need Custom Resources or Guidance?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team can provide tailored compliance guides, regulatory updates, and personalized ROI analysis for your specific needs
          </p>
          <a href="#contact">
            <Button size="lg" data-testid="button-request-custom-resources">
              Request Custom Resources
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
