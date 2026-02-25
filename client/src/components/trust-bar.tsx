import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import takhleesLogo from "@assets/takhlees_logo_1759326324559.webp";
import carrefourLogo from "@assets/carrefour_1759413703784.png";
import infoquestLogo from "@assets/infoquest-logo-black_1759405455898.png";

export default function TrustBar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const logos = [
    { src: takhleesLogo, alt: "Takhlees", height: "h-8" },
    { src: carrefourLogo, alt: "Carrefour", height: "h-12" },
    { src: infoquestLogo, alt: "InfoQuest", height: "h-8" },
  ];

  return (
    <section ref={ref} className="py-12 bg-white border-b border-border/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-8">
            Trusted by leading organizations
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {logos.map((logo, i) => (
              <motion.img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={`${logo.height} opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 object-contain`}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 0.5, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
