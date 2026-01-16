import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone, Globe } from "lucide-react";

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

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
          <p className="text-xl mb-10 text-white/90">
            See how ByteBeam can transform your compliance workflow. Book a personalized demo with our team.
          </p>

          <Button
            onClick={handleBookDemo}
            className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-primary dark:hover:bg-gray-100 text-lg mb-12"
            size="lg"
            data-testid="button-book-demo"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Demo
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/90">
            <a
              href="mailto:tech@bytebeam.co"
              className="flex items-center gap-2 hover:text-white transition-colors"
              data-testid="link-email"
            >
              <Mail size={20} />
              tech@bytebeam.co
            </a>
            <a
              href="tel:+447537189226"
              className="flex items-center gap-2 hover:text-white transition-colors"
              data-testid="link-phone"
            >
              <Phone size={20} />
              +44 7537 189226
            </a>
            <a
              href="https://www.bytebeam.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
              data-testid="link-website"
            >
              <Globe size={20} />
              www.bytebeam.co
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
