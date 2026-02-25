import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Calendar } from "lucide-react";
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

  const handleBookDemo = () => {
    window.open("https://calendly.com/talal-bytebeam/bytebeam-discovery-call", "_blank");
  };

  const isActive = (path: string) => location === path;
  const isActivePrefix = (prefix: string) => location.startsWith(prefix);

  const navLinkClass = (path: string) =>
    `relative transition-colors font-medium ${
      isActive(path) ? "text-primary" : "text-foreground hover:text-primary"
    }`;

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
              <DropdownMenuTrigger
                className={`flex items-center gap-1 transition-colors font-medium ${
                  isActivePrefix("/solutions") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                data-testid="dropdown-trigger-solutions"
              >
                AI Agents
                <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" data-testid="dropdown-content-solutions">
                <DropdownMenuItem asChild>
                  <Link href="/solutions/uae-food-label-localization" className="w-full cursor-pointer">
                    UAE Food Label Localization
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/solutions/saudi-pharma-gap-analysis" className="w-full cursor-pointer">
                    Saudi Pharma Gap Analysis
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`flex items-center gap-1 transition-colors font-medium ${
                  isActivePrefix("/industries") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
                data-testid="dropdown-trigger-industries"
              >
                Industries
                <ChevronDown className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" data-testid="dropdown-content-industries">
                <DropdownMenuItem asChild>
                  <Link href="/industries/fmcg" className="w-full cursor-pointer">
                    FMCG
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/industries/pharma" className="w-full cursor-pointer">
                    Pharma
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/industries/finance" className="w-full cursor-pointer">
                    Finance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/industries/legal" className="w-full cursor-pointer">
                    Legal
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/industries/insurance" className="w-full cursor-pointer">
                    Insurance
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/industries/operations" className="w-full cursor-pointer">
                    Operations
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/tools"
              className={navLinkClass("/tools")}
              data-testid="nav-link-tools"
            >
              Free Tools
              {isActive("/tools") && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>

            <Link
              href="/blog"
              className={navLinkClass("/blog")}
              data-testid="nav-link-blog"
            >
              Blog
              {isActive("/blog") && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>

            <Link
              href="/about"
              className={navLinkClass("/about")}
              data-testid="nav-link-about"
            >
              About
              {isActive("/about") && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </Link>

            <Button
              onClick={handleBookDemo}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              data-testid="button-request-demo-nav"
            >
              <Calendar className="mr-1.5 h-4 w-4" />
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border shadow-xl"
          >
            <div className="container-custom py-4 space-y-1">
              <div className="space-y-1">
                <div className="font-medium text-foreground py-2 px-2">
                  AI Agents
                </div>
                <Link
                  href="/solutions/uae-food-label-localization"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                >
                  UAE Food Label Localization
                </Link>
                <Link
                  href="/solutions/saudi-pharma-gap-analysis"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                >
                  Saudi Pharma Gap Analysis
                </Link>
              </div>
              <div className="border-t border-border/50 my-2" />
              <div className="space-y-1">
                <div className="font-medium text-foreground py-2 px-2">
                  Industries
                </div>
                <Link
                  href="/industries/fmcg"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                >
                  FMCG
                </Link>
                <Link
                  href="/industries/pharma"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                >
                  Pharma
                </Link>
                <Link
                  href="/industries/finance"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                >
                  Finance
                </Link>
                <Link
                  href="/industries/legal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                >
                  Legal
                </Link>
                <Link
                  href="/industries/insurance"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                >
                  Insurance
                </Link>
                <Link
                  href="/industries/operations"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-foreground/80 hover:text-primary transition-colors py-2 px-6"
                >
                  Operations
                </Link>
              </div>
              <div className="border-t border-border/50 my-2" />
              <Link
                href="/tools"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-2"
                data-testid="mobile-nav-link-tools"
              >
                Free Tools
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-2"
                data-testid="mobile-nav-link-blog"
              >
                Blog
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-2"
                data-testid="mobile-nav-link-about"
              >
                About
              </Link>
              <div className="pt-2">
                <Button
                  onClick={() => {
                    handleBookDemo();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-request-demo-mobile"
                >
                  <Calendar className="mr-1.5 h-4 w-4" />
                  Book a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
