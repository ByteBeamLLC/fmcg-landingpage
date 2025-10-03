import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import bytebeamLogo from "@assets/bytebeam_logo_1759326269799.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleBookDemo = () => {
    window.open("https://calendar.app.google/gcPf1yWT3eznR8uc7", "_blank");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-lg border-b border-white/60 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3" data-testid="logo-bytebeam">
            <img
              src={bytebeamLogo}
              alt="ByteBeam Logo"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 transition-colors font-medium text-foreground hover:text-primary" data-testid="dropdown-trigger-ai-agents">
                AI Agents
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" data-testid="dropdown-content-ai-agents">
                <DropdownMenuItem asChild data-testid="dropdown-item-fmcg">
                  <Link href="/fmcg-label-compliance" className="w-full cursor-pointer">
                    FMCG Compliance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild data-testid="dropdown-item-document-grid">
                  <a href="https://extractor.bytebeam.co" target="_blank" rel="noopener noreferrer" className="w-full cursor-pointer">
                    Document to Grid
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              href="/about"
              className="transition-colors font-medium text-foreground hover:text-primary"
              data-testid="nav-link-about"
            >
              About
            </Link>

            <Button
              onClick={handleBookDemo}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-request-demo-nav"
            >
              Book a Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden transition-colors text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border"
          >
            <div className="container-custom py-4 space-y-4">
              <div className="space-y-2">
                <div className="font-medium text-foreground py-2 px-2" data-testid="mobile-nav-section-ai-agents">
                  AI Agents
                </div>
                <Link 
                  href="/fmcg-label-compliance"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                  data-testid="mobile-nav-link-fmcg"
                >
                  FMCG Compliance
                </Link>
                <a 
                  href="https://extractor.bytebeam.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                  data-testid="mobile-nav-link-document-grid"
                >
                  Document to Grid
                </a>
              </div>
              <Link 
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-2"
                data-testid="mobile-nav-link-about"
              >
                About
              </Link>
              <Button
                onClick={() => {
                  handleBookDemo();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-request-demo-mobile"
              >
                Book a Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
