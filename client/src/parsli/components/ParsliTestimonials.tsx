import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Parsli cut our invoice processing time from 15 minutes per document to under 10 seconds. The accuracy is remarkable.",
    author: "Sarah Chen",
    role: "CFO, TechStart Inc.",
    rating: 5,
  },
  {
    quote: "We switched from Parseur and immediately saw 30% more value. Same price, more pages, better accuracy. Easy decision.",
    author: "Marcus Johnson",
    role: "Operations Lead, SupplyFlow",
    rating: 5,
  },
  {
    quote: "The Gmail integration is seamless. Invoices come in, data goes straight to our Google Sheet. Zero manual work.",
    author: "Priya Sharma",
    role: "AP Manager, Retail Co.",
    rating: 5,
  },
];

export default function ParsliTestimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
            Loved by Teams Everywhere
          </h2>
          <p className="text-lg text-gray-600">
            See why businesses choose Parsli for document extraction.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-parsli-200 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-parsli-200 mb-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                "{testimonial.quote}"
              </p>
              <div className="pt-4 border-t border-gray-100">
                <div className="font-semibold text-sm text-gray-900">
                  {testimonial.author}
                </div>
                <div className="text-xs text-gray-500">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
