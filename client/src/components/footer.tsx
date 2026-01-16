import { MapPin } from "lucide-react";
import bytebeamLogo from "@assets/bytebeam_logo_1759326269799.png";

export default function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-muted text-foreground py-12 border-t border-border">
      <div className="container-custom">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div>
            <img
              src={bytebeamLogo}
              alt="ByteBeam Logo"
              className="h-8 mb-4"
              data-testid="footer-logo"
            />
            <p className="text-muted-foreground mb-4">AI agents for automating complex, repetitive knowledge work.</p>
            <p className="text-sm text-muted-foreground">Beyond Buzz. Real Impact.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Industries</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="/industries/finance"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-finance"
                >
                  Finance
                </a>
              </li>
              <li>
                <a
                  href="/industries/legal"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-legal"
                >
                  Legal
                </a>
              </li>
              <li>
                <a
                  href="/industries/insurance"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-insurance"
                >
                  Insurance
                </a>
              </li>
              <li>
                <a
                  href="/industries/pharma"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-pharma"
                >
                  Pharma
                </a>
              </li>
              <li>
                <a
                  href="/industries/fmcg"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-fmcg"
                >
                  FMCG
                </a>
              </li>
              <li>
                <a
                  href="/industries/operations"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-operations"
                >
                  Operations
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">AI Agents</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="/solutions/uae-food-label-localization"
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-uae-labels"
                >
                  UAE Food Label Localization
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="/about" className="hover:text-primary transition-colors" data-testid="footer-link-about">
                  About Us
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("case-studies")}
                  className="hover:text-primary transition-colors"
                  data-testid="footer-link-case-studies"
                >
                  Case Studies
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Offices</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
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
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm">
                    St, Bechara El Khoury & Fouad Chehab Avenue, Nassif El Yazaji St Street, Syriac Patriarchate, Khalil Sarkis, Beirut
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2024 ByteBeam. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm" data-testid="footer-link-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
