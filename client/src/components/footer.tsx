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
    <footer className="bg-secondary text-white py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src={bytebeamLogo}
              alt="ByteBeam Logo"
              className="h-8 mb-4 brightness-0 invert"
              data-testid="footer-logo"
            />
            <p className="text-white/70 mb-4">AI agents for automating complex, repetitive knowledge work.</p>
            <p className="text-sm text-white/50">Beyond Buzz. Real Impact.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Solutions</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <button
                  onClick={() => scrollToSection("solutions")}
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-trade-compliance"
                >
                  Trade Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("solutions")}
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-label-localization"
                >
                  Label Localization
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("solutions")}
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-food-beverage"
                >
                  Food & Beverage
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("solutions")}
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-cosmetics"
                >
                  Cosmetics
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <a href="/about" className="hover:text-white transition-colors" data-testid="footer-link-about">
                  About Us
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("case-studies")}
                  className="hover:text-white transition-colors"
                  data-testid="footer-link-case-studies"
                >
                  Case Studies
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Head Office</h4>
            <div className="flex items-start gap-2 text-white/70">
              <MapPin size={16} className="mt-1" />
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
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">© 2024 ByteBeam. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm" data-testid="footer-link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm" data-testid="footer-link-terms">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
