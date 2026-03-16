import { Link } from "wouter";

const footerLinks = {
  Product: [
    { label: "Features", href: "/parsli/features" },
    { label: "Pricing", href: "/parsli/pricing" },
    { label: "How It Works", href: "/parsli/how-it-works" },
    { label: "Email Parser", href: "/parsli/email-parser" },
    { label: "PDF Parser", href: "/parsli/pdf-parser" },
    { label: "API Docs", href: "/parsli/api" },
    { label: "Security", href: "/parsli/security" },
  ],
  "Use Cases": [
    { label: "Invoice Parsing", href: "/parsli/use-case/invoice-parsing" },
    { label: "Receipt Parsing", href: "/parsli/use-case/receipt-parsing" },
    { label: "Email to Spreadsheet", href: "/parsli/use-case/email-to-spreadsheet" },
    { label: "Resume Parsing", href: "/parsli/use-case/resume-parsing" },
    { label: "Bank Statements", href: "/parsli/use-case/bank-statements" },
    { label: "Contract Extraction", href: "/parsli/use-case/contract-extraction" },
  ],
  Integrations: [
    { label: "Gmail", href: "/parsli/integration/gmail" },
    { label: "Zapier", href: "/parsli/integration/zapier" },
    { label: "Google Sheets", href: "/parsli/integration/google-sheets" },
    { label: "Make", href: "/parsli/integration/make" },
    { label: "REST API", href: "/parsli/integration/rest-api" },
    { label: "Webhooks", href: "/parsli/integration/webhooks" },
  ],
  Compare: [
    { label: "Parsli vs Parseur", href: "/parsli/compare/parseur" },
    { label: "Parsli vs Docparser", href: "/parsli/compare/docparser" },
    { label: "Parsli vs Mailparser", href: "/parsli/compare/mailparser" },
    { label: "Parsli vs Nanonets", href: "/parsli/compare/nanonets" },
    { label: "Parsli vs Rossum", href: "/parsli/compare/rossum" },
    { label: "Parsli vs Veryfi", href: "/parsli/compare/veryfi" },
  ],
};

export default function ParsliFooter() {
  return (
    <footer className="bg-parsli-900 text-white">
      <div className="container-custom py-16 md:py-20">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/parsli" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-parsli-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-white">Parsli</span>
            </Link>
            <p className="text-parsli-300 text-sm leading-relaxed mb-4">
              AI-powered document extraction that turns emails, PDFs, and documents into structured data in seconds.
            </p>
            <a
              href="https://bytebeam.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-parsli-400 hover:text-parsli-200 transition-colors"
            >
              Powered by ByteBeam
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-parsli-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-parsli-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-parsli-400">
            &copy; {new Date().getFullYear()} Parsli by ByteBeam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/parsli/security" className="text-sm text-parsli-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/parsli/security" className="text-sm text-parsli-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/parsli/security" className="text-sm text-parsli-400 hover:text-white transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Parsli",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: "AI-powered document extraction platform that parses emails, PDFs, and documents into structured data.",
            url: "https://parser.bytebeam.co",
            publisher: {
              "@type": "Organization",
              name: "ByteBeam",
              url: "https://bytebeam.co",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "Free tier with 26 pages/month",
            },
          }),
        }}
      />
    </footer>
  );
}
