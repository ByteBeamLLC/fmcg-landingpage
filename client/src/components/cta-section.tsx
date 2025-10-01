import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Mail, Phone, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [showCalendly, setShowCalendly] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    skuRange: "",
    message: "",
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for your interest!",
        description: "We've received your information. Our team will contact you within 24 hours to schedule your demo.",
      });
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        skuRange: "",
        message: "",
      });
      setShowCalendly(true);
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly at tech@bytebeam.co",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLeadMutation.mutate(formData);
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
                disabled={createLeadMutation.isPending}
                data-testid="button-submit-demo-request"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {createLeadMutation.isPending ? "Submitting..." : "Schedule Your Demo"}
              </Button>
            </form>
          </div>

          {/* Calendar Booking Modal */}
          <Dialog open={showCalendly} onOpenChange={setShowCalendly}>
            <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
              <DialogHeader>
                <DialogTitle className="text-2xl">Schedule Your ByteBeam Demo</DialogTitle>
                <DialogDescription className="text-base">
                  Choose a convenient time to discuss how ByteBeam can accelerate your product approvals
                </DialogDescription>
              </DialogHeader>
              <div className="flex-1 min-h-0">
                <div className="w-full h-full bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center p-8 max-w-md">
                    <Calendar className="w-16 h-16 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Calendar Booking Ready</h3>
                    <p className="text-muted-foreground mb-6">
                      We've received your demo request. Our team will contact you within 24 hours to schedule a personalized demo.
                    </p>
                    <div className="bg-white dark:bg-card p-4 rounded-lg mb-4">
                      <h4 className="font-semibold mb-2">What happens next?</h4>
                      <ul className="space-y-2 text-sm text-left">
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>Our team reviews your compliance needs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>We'll send you a calendar invite</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span>Personalized demo tailored to your SKU range</span>
                        </li>
                      </ul>
                    </div>
                    <Button
                      onClick={() => setShowCalendly(false)}
                      className="w-full"
                      data-testid="button-close-calendar-modal"
                    >
                      Got it, thanks!
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Need immediate help?{" "}
                      <a href="mailto:tech@bytebeam.co" className="text-primary font-semibold hover:underline">
                        Contact us
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

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
