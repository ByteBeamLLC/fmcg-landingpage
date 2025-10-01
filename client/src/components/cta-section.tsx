import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Mail, Phone, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    skuRange: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the data to a backend API
    toast({
      title: "Thank you for your interest!",
      description: "Our team will contact you shortly to schedule your demo.",
    });
    setFormData({
      fullName: "",
      email: "",
      company: "",
      phone: "",
      skuRange: "",
      message: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
          <p className="text-xl mb-8 text-white/90">
            See how ByteBeam can transform your FMCG compliance workflow. Book a personalized demo with our team.
          </p>

          {/* Contact Form */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Full Name *</label>
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    className="bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:border-white"
                    placeholder="John Smith"
                    required
                    data-testid="input-full-name"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Company Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:border-white"
                    placeholder="john@company.com"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Company Name *</label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className="bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:border-white"
                    placeholder="Your Company"
                    required
                    data-testid="input-company"
                  />
                </div>
                <div className="text-left">
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:border-white"
                    placeholder="+966 XX XXX XXXX"
                    data-testid="input-phone"
                  />
                </div>
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold mb-2">Number of SKUs</label>
                <Select value={formData.skuRange} onValueChange={(value) => handleChange("skuRange", value)}>
                  <SelectTrigger
                    className="bg-white/20 border-2 border-white/30 text-white focus:border-white"
                    data-testid="select-sku-range"
                  >
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50 SKUs</SelectItem>
                    <SelectItem value="51-200">51-200 SKUs</SelectItem>
                    <SelectItem value="201-500">201-500 SKUs</SelectItem>
                    <SelectItem value="500+">500+ SKUs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-left">
                <label className="block text-sm font-semibold mb-2">Tell us about your needs</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={4}
                  className="bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:border-white"
                  placeholder="What compliance challenges are you facing?"
                  data-testid="textarea-message"
                />
              </div>
              <Button
                type="submit"
                className="bg-white text-primary hover:bg-gray-100 w-full md:w-auto text-lg animate-pulse"
                size="lg"
                data-testid="button-submit-demo-request"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Your Demo
              </Button>
            </form>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/80">
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
