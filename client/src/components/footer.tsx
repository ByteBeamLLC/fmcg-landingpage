import { MapPin } from "lucide-react";
import { Link } from "wouter";
import bytebeamLogo from "@assets/bytebeam_logo_1759326269799.png";

// Schema.org Organization structured data for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ByteBeam",
  "url": "https://bytebeam.co",
  "logo": "https://bytebeam.co/bytebeam_logo.png",
  "description": "AI agents built by Subject Matter Experts for document automation, regulatory compliance, and intelligent document processing across FMCG, pharma, finance, and legal industries.",
  "foundingDate": "2023",
  "sameAs": [
    "https://www.linkedin.com/company/bytebeam"
  ],
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "20 Wenlock Road",
      "addressLocality": "London",
      "addressRegion": "England",
      "postalCode": "N1 7GU",
      "addressCountry": "GB"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "St, Bechara El Khoury & Fouad Chehab Avenue, Nassif El Yazaji St Street, Syriac Patriarchate, Khalil Sarkis",
      "addressLocality": "Beirut",
      "addressCountry": "LB"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "availableLanguage": ["English", "Arabic"]
  }
};

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground py-12 border-t border-border" role="contentinfo">
      {/* Schema.org Organization structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="container-custom">
        <div className="grid md:grid-cols-7 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" aria-label="ByteBeam Homepage">
              <img
                src={bytebeamLogo}
                alt="ByteBeam - AI Document Automation Platform"
                className="h-8 mb-4"
                data-testid="footer-logo"
                width="120"
                height="32"
              />
            </Link>
            <p className="text-muted-foreground mb-4">
              AI agents built by Subject Matter Experts, not engineers. No code required.
            </p>
          </div>

          {/* Industries Navigation */}
          <nav aria-label="Industries" className="md:col-span-1">
            <h4 className="font-bold mb-4">Industries</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/industries/finance"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-finance"
                >
                  Finance
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/legal"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-legal"
                >
                  Legal
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/insurance"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-insurance"
                >
                  Insurance
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/pharma"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-pharma"
                >
                  Pharma
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/fmcg"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-fmcg"
                >
                  FMCG
                </Link>
              </li>
              <li>
                <Link
                  href="/industries/operations"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-operations"
                >
                  Operations
                </Link>
              </li>
            </ul>
          </nav>

          {/* AI Agents Navigation */}
          <nav aria-label="AI Agents" className="md:col-span-1">
            <h4 className="font-bold mb-4">AI Agents</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/solutions/uae-food-label-localization"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-uae-labels"
                >
                  UAE Food Label Localization
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions/saudi-pharma-gap-analysis"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-saudi-pharma"
                >
                  Saudi Pharma Gap Analysis
                </Link>
              </li>
            </ul>
          </nav>

          {/* Free Tools Navigation */}
          <nav aria-label="Free Tools" className="md:col-span-1">
            <h4 className="font-bold mb-4">Free Tools</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/tools"
                  className="hover:text-primary transition-colors font-medium"
                  data-testid="footer-link-tools"
                >
                  All Tools
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/image-to-text"
                  className="hover:text-primary transition-colors"
                >
                  Image to Text (OCR)
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/pdf-merger"
                  className="hover:text-primary transition-colors"
                >
                  PDF Merger
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/pdf-compressor"
                  className="hover:text-primary transition-colors"
                >
                  PDF Compressor
                </Link>
              </li>
            </ul>
          </nav>

          {/* Resources / Blog Navigation - Important for SEO internal linking */}
          <nav aria-label="Resources" className="md:col-span-1">
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors font-medium"
                  data-testid="footer-link-blog"
                >
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/uae-food-labeling-requirements-2026"
                  className="hover:text-primary transition-colors"
                >
                  UAE Food Labeling Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/sfda-drug-registration-guide-saudi-arabia"
                  className="hover:text-primary transition-colors"
                >
                  SFDA Registration Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/intelligent-document-processing-business-guide-2026"
                  className="hover:text-primary transition-colors"
                >
                  IDP Business Guide
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company Navigation */}
          <nav aria-label="Company" className="md:col-span-1">
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-about"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-blogs"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/#case-studies"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-case-studies"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </nav>

          {/* Office Locations */}
          <div className="md:col-span-1">
            <h4 className="font-bold mb-4">Offices</h4>
            <address className="not-italic space-y-4">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm">
                    20 Wenlock Road
                    <br />
                    London, England
                    <br />
                    N1 7GU
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm">
                    St, Bechara El Khoury & Fouad Chehab Avenue, Nassif El Yazaji St Street, Syriac Patriarchate, Khalil Sarkis, Beirut
                  </p>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Footer Bottom - Copyright and Legal */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ByteBeam. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex gap-4">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
              data-testid="footer-link-privacy"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
              data-testid="footer-link-terms"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
