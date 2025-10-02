import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User } from "lucide-react";
import takhleesLogo from "@assets/takhlees_logo_1759326324559.webp";
import carrefourLogo from "@assets/hd-carrefour-logo-transparent-background-701751694712996tfxv01icjr_1759326333428.png";
import infoquestLogo from "@assets/FinalLogoB-1024x141_1759326348970.png";

const clients = [
  { id: "takhlees", name: "Takhlees", logo: takhleesLogo, category: "Services Partner" },
  { id: "carrefour", name: "Carrefour", logo: carrefourLogo, category: "F&B Retailer" },
  { id: "infoquest", name: "InfoQuest", logo: infoquestLogo, category: "Automation Client" },
];

export default function SocialProof() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      value: "10,000+",
      label: "Products Processed",
      sublabel: "Across multiple FMCG categories",
    },
    {
      value: "70%",
      label: "Faster Processing",
      sublabel: "From artwork to submission-ready",
    },
    {
      value: "60%",
      label: "Knowledge Work Accelerated",
      sublabel: "Freeing experts for high-value tasks",
    },
  ];

  return (
    <section id="clients" className="section-padding bg-muted">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Who We Worked With</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by leading organizations to automate compliance and knowledge work
          </p>
        </motion.div>

        {/* Client Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-card border-2 border-border rounded-xl p-8 shadow-lg"
              data-testid={`client-card-${client.id}`}
            >
              <img
                src={client.logo}
                alt={`${client.name} Logo`}
                className="h-16 mx-auto mb-4 object-contain opacity-70"
                data-testid={`logo-${client.id}`}
              />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">{client.category}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Banner */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-card border-2 border-border rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              data-testid={`stat-card-${index}`}
            >
              <div className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold font-display text-3xl mb-4">
                {stat.value}
              </div>
              <div className="text-xl font-bold mb-2">{stat.label}</div>
              <div className="text-muted-foreground">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          id="testimonial"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-12 relative" data-testid="testimonial-card">
            <div className="absolute top-8 left-8 text-primary text-6xl opacity-20">
              <i className="fas fa-quote-left"></i>
            </div>
            <blockquote className="relative z-10">
              <p className="text-2xl text-foreground mb-8 italic leading-relaxed">
                "Working with ByteBeam has been an exceptional experience. Their agile and well-organised team
                helped us transform a time-consuming, manual process into a smart, efficient workflow – saving both
                time and costs while ensuring quality and compliance."
              </p>
              <footer className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={32} />
                </div>
                <div>
                  <div className="font-bold text-lg">Chief Financial Officer</div>
                  <div className="text-muted-foreground">Licensed Governmental Center, Takhlees</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
