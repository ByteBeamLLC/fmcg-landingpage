import { Code, Terminal, Webhook, Key, Gauge, FileJson, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ParsliNavigation from "../components/ParsliNavigation";
import ParsliFooter from "../components/ParsliFooter";
import ParsliSEO from "../components/ParsliSEO";
import ParsliHero from "../components/ParsliHero";
import ParsliFeatureGrid from "../components/ParsliFeatureGrid";
import ParsliFAQ from "../components/ParsliFAQ";
import ParsliCTA from "../components/ParsliCTA";

const apiFeatures = [
  { icon: Terminal, title: "RESTful API", description: "Clean REST endpoints for uploading documents, managing parsers, and retrieving results. OpenAPI 3.0 spec available.", benefit: "Standard REST" },
  { icon: FileJson, title: "Structured JSON Output", description: "Every extraction returns clean JSON with field names, values, confidence scores, and bounding box coordinates.", benefit: "Machine-readable" },
  { icon: Webhook, title: "Webhook Callbacks", description: "Get notified instantly when parsing completes. Configure webhooks for real-time processing pipelines.", benefit: "Real-time events" },
  { icon: Key, title: "API Key Auth", description: "Simple API key authentication. Generate and rotate keys from your dashboard. Scope keys to specific parsers.", benefit: "Secure & simple" },
  { icon: Gauge, title: "Rate Limits & Batching", description: "Generous rate limits with batch upload support. Process hundreds of documents in a single API call.", benefit: "High throughput" },
  { icon: Shield, title: "TLS Encryption", description: "All API traffic is encrypted with TLS 1.3. Documents are encrypted at rest. GDPR-compliant data handling.", benefit: "Enterprise secure" },
];

const apiFAQ = [
  { question: "What programming languages are supported?", answer: "Parsli provides official SDKs for Python and Node.js. The REST API works with any language that can make HTTP requests — cURL, Ruby, PHP, Java, Go, etc." },
  { question: "What's the rate limit?", answer: "Free tier: 10 requests/minute. Paid tiers: 100+ requests/minute depending on plan. Batch endpoints allow uploading up to 50 documents per request." },
  { question: "How do I authenticate?", answer: "Use API key authentication via the X-API-Key header. Generate keys in your dashboard. You can create multiple keys with different scopes for different applications." },
  { question: "Can I use webhooks for async processing?", answer: "Yes. Configure a webhook URL and Parsli will POST results there when parsing completes. This is the recommended approach for production pipelines." },
  { question: "Is there an API sandbox/test mode?", answer: "Yes. Your free tier works as a sandbox. Use it to test integrations before committing to a paid plan. All API endpoints work the same on free and paid tiers." },
];

export default function ParsliAPIOverview() {
  const [codeRef, codeInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      <ParsliSEO
        title="API Documentation - Developer-Friendly Document Parsing"
        description="RESTful API for document parsing with Python and Node.js SDKs. Upload documents, extract data, get JSON results. Webhooks, batch processing, and more."
        path="/api"
        keywords="document parsing API, PDF extraction API, email parser API, OCR API, document automation API, data extraction SDK"
      />

      <ParsliNavigation />

      <ParsliHero
        variant="feature"
        badge="Developer API"
        badgeIcon={Code}
        headline="Parse Documents With Code"
        highlightWord="Code"
        subheadline="Full REST API with Python & Node.js SDKs. Upload documents, extract data, and integrate parsing into any application."
        stats={[
          { value: "REST", label: "API Standard" },
          { value: "< 5s", label: "Response Time" },
          { value: "99.9%", label: "API Uptime" },
        ]}
      />

      {/* Code example */}
      <section ref={codeRef} className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={codeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start</h2>
            <p className="text-lg text-gray-600">Parse your first document in 3 lines of code.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={codeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-400 ml-2">Python</span>
              </div>
              <pre className="p-6 text-sm leading-relaxed overflow-x-auto">
                <code className="text-gray-300">
{`import parsli

# Initialize client
client = parsli.Client(api_key="your_api_key")

# Upload and parse a document
result = client.parse(
    file="invoice.pdf",
    parser_id="inv-parser-001"
)

# Access extracted data
print(result.data)
# {
#   "vendor": "Acme Corp",
#   "amount": 4280.00,
#   "date": "2026-02-15",
#   "line_items": [...],
#   "confidence": 0.995
# }`}
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      <ParsliFeatureGrid
        headline="API Capabilities"
        subheadline="Everything you need to integrate document parsing into your applications."
        features={apiFeatures}
        columns={3}
      />

      <ParsliFAQ items={apiFAQ} />

      <ParsliCTA
        headline="Start Building with the Parsli API"
        subheadline="Free tier includes full API access. 26 pages/month, no credit card."
        ctaText="Get API Key"
      />

      <ParsliFooter />
    </>
  );
}
