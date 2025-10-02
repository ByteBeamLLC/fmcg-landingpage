import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import bytebeamLogo from "@assets/bytebeam_logo_1759326269799.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src={bytebeamLogo} 
              alt="ByteBeam Logo" 
              className={`h-8 transition-all duration-300 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
              data-testid="logo-bytebeam" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative">
              <button
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
                className={`transition-colors font-medium flex items-center gap-1 ${
                  isScrolled 
                    ? "text-foreground hover:text-primary" 
                    : "text-white hover:text-white/80"
                }`}
                data-testid="nav-link-solutions"
              >
                Solutions
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseEnter={() => setSolutionsOpen(true)}
                    onMouseLeave={() => setSolutionsOpen(false)}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-border overflow-hidden"
                    data-testid="solutions-dropdown"
                  >
                    <Link href="/platform" className="block px-4 py-3 hover:bg-muted transition-colors" data-testid="nav-link-platform">
                      <div className="font-semibold text-foreground">AI Platform</div>
                      <div className="text-sm text-muted-foreground">Custom agents for knowledge work</div>
                    </Link>
                    <Link href="/" className="block px-4 py-3 hover:bg-muted transition-colors" data-testid="nav-link-fmcg">
                      <div className="font-semibold text-foreground">FMCG Compliance</div>
                      <div className="text-sm text-muted-foreground">Import packaging automation</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/about"
              className={`transition-colors font-medium ${
                isScrolled 
                  ? "text-foreground hover:text-primary" 
                  : "text-white hover:text-white/80"
              }`}
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
            className={`md:hidden transition-colors ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
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
                <div className="font-semibold text-sm text-muted-foreground px-2">Solutions</div>
                <Link 
                  href="/platform"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-2"
                  data-testid="mobile-nav-link-platform"
                >
                  AI Platform
                </Link>
                <Link 
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-2"
                  data-testid="mobile-nav-link-fmcg"
                >
                  FMCG Compliance
                </Link>
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
