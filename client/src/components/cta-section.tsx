import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone, Globe, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  const contactItems = [
    { icon: Mail, label: "Email", value: "tech@bytebeam.co", href: "mailto:tech@bytebeam.co" },
    { icon: Phone, label: "Phone", value: "+44 7537 189226", href: "tel:+447537189226" },
    { icon: Globe, label: "Website", value: "www.bytebeam.co", href: "https://www.bytebeam.co" },
  ];

  return (
    <section id="contact" className="section-padding gradient-overlay text-white">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Accelerate Your Product Approvals?</h2>
          <p className="text-xl mb-8 text-white/90">
            See how ByteBeam can transform your compliance workflow. Book a personalized demo with our team.
          </p>

          {/* Value Reassurance Strip */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-300" />
              Free 30-min consultation
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-300" />
              No commitment required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-300" />
              Results in 2 weeks
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              onClick={handleBookDemo}
              className="bg-white text-primary hover:bg-gray-100 text-lg font-semibold shadow-xl shadow-white/10 hover:shadow-2xl transition-all duration-300"
              size="lg"
              data-testid="button-book-demo"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Demo
            </Button>
            <Button
              onClick={() => window.location.href = "mailto:tech@bytebeam.co"}
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg font-semibold bg-transparent"
              size="lg"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us Directly
            </Button>
          </div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.label === "Website" ? "_blank" : undefined}
                rel={item.label === "Website" ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                <item.icon size={20} className="text-white/80" />
                <span className="text-xs text-white/60 uppercase tracking-wider">{item.label}</span>
                <span className="text-white font-medium text-sm">{item.value}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
