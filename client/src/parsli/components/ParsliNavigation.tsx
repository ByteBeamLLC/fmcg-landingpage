import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Features", href: "/parsli/features" },
  { label: "Pricing", href: "/parsli/pricing" },
  {
    label: "Use Cases",
    href: "#",
    children: [
      { label: "Invoice Parsing", href: "/parsli/use-case/invoice-parsing" },
      { label: "Receipt Parsing", href: "/parsli/use-case/receipt-parsing" },
      { label: "Email to Spreadsheet", href: "/parsli/use-case/email-to-spreadsheet" },
      { label: "Resume Parsing", href: "/parsli/use-case/resume-parsing" },
      { label: "Bank Statements", href: "/parsli/use-case/bank-statements" },
      { label: "Contract Extraction", href: "/parsli/use-case/contract-extraction" },
    ],
  },
  {
    label: "Integrations",
    href: "#",
    children: [
      { label: "Gmail", href: "/parsli/integration/gmail" },
      { label: "Zapier", href: "/parsli/integration/zapier" },
      { label: "Google Sheets", href: "/parsli/integration/google-sheets" },
      { label: "Make (Integromat)", href: "/parsli/integration/make" },
      { label: "REST API", href: "/parsli/integration/rest-api" },
      { label: "All Integrations", href: "/parsli/features" },
    ],
  },
  { label: "API Docs", href: "/parsli/api" },
];

export default function ParsliNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-parsli-100"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/parsli" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg parsli-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-parsli-900 group-hover:text-parsli-600 transition-colors">
              Parsli
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.children ? (
                  <button
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                      isScrolled ? "text-gray-700 hover:text-parsli-600 hover:bg-parsli-50" : "text-gray-800 hover:text-parsli-600 hover:bg-white/50"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      location === link.href
                        ? "text-parsli-600 bg-parsli-50"
                        : isScrolled
                        ? "text-gray-700 hover:text-parsli-600 hover:bg-parsli-50"
                        : "text-gray-800 hover:text-parsli-600 hover:bg-white/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-50"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-700 hover:text-parsli-600 hover:bg-parsli-50 rounded-lg transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/parsli/pricing">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-parsli-600">
                Log In
              </Button>
            </Link>
            <Link href="/parsli/pricing">
              <Button
                size="sm"
                className="bg-parsli-500 hover:bg-parsli-600 text-white rounded-lg shadow-sm"
              >
                Start Free
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-parsli-50 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-parsli-100 bg-white"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.children ? (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                          className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-parsli-50 rounded-lg"
                        >
                          {link.label}
                          <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {openDropdown === link.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 overflow-hidden"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block px-4 py-2 text-sm text-gray-600 hover:text-parsli-600 hover:bg-parsli-50 rounded-lg"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.href}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-parsli-600 hover:bg-parsli-50 rounded-lg"
                      >
                        {link.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-3 px-4 border-t border-gray-100 space-y-2">
                  <Link href="/parsli/pricing" className="block">
                    <Button className="w-full bg-parsli-500 hover:bg-parsli-600 text-white">
                      Start Free
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
