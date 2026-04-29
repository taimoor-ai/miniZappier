import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "top-0 bg-white/80 backdrop-blur-xl border-b border-black/10 shadow-sm"
          : "top-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navbar Inner */}
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img
              src={logo}
              alt="Mini Zapier Logo"
              className="h-10 sm:h-11 lg:h-14 w-auto object-contain"
            />
            <span className="text-xl sm:text-2xl font-bold text-black hidden xs:inline whitespace-nowrap">
              Mini Zapier
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-base font-medium text-gray-600 hover:text-black transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Buttons - Desktop */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
            <button className="px-4 py-2 text-sm sm:text-base font-medium text-black hover:text-gray-600 transition-colors duration-200">
              Sign In
            </button>
            <button className="px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-black hover:bg-gray-900 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center gap-2 group">
              Get Started
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-black hover:text-gray-600 transition-colors p-2 hover:bg-black/5 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-black/10 px-4 sm:px-6 py-6 space-y-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-black hover:bg-black/5 rounded-lg transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-black/10 space-y-3">
            <button className="w-full px-4 py-3 text-base font-medium text-black hover:text-gray-600 hover:bg-black/5 rounded-lg transition-all duration-200">
              Sign In
            </button>
            <button className="w-full px-4 py-3 text-base font-semibold text-white bg-black hover:bg-gray-900 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group">
              Get Started
              <ArrowRight
                size={17}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}