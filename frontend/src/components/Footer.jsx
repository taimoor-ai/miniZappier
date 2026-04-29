import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("footer");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const footerLinks = {
    Product: [
      { label: "Features", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "API Docs", href: "#" },
    ],
    Company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
    Legal: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Compliance", href: "#" },
    ],
    Resources: [
      { label: "Docs", href: "#" },
      { label: "Guides", href: "#" },
      { label: "Community", href: "#" },
      { label: "Support", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: faInstagram, href: "#", label: "Instagram" },
    { icon: faGithub, href: "#", label: "GitHub" },
    { icon: faLinkedin, href: "#", label: "LinkedIn" },
    { icon: faEnvelope, href: "#", label: "Email" },
  ];

  return (
    <footer id="footer" className="relative bg-black border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 animate-float"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand */}
          <div className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Z</span>
              </div>
              <span className="text-lg font-bold text-white">Mini Zapier</span>
            </div>
            <p className="text-gray-400 text-sm">
              The simplest way to automate your workflows and save hours every week.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <div
              key={category}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-all hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Copyright */}
          <div className={`text-gray-400 text-sm transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            © {currentYear} Mini Zapier. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className={`flex gap-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="group w-10 h-10 rounded-lg bg-white/5 border border-white/20 hover:bg-white/15 hover:border-white/40 text-white/60 hover:text-white flex items-center justify-center transition-all transform hover:scale-110"
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  className="w-4 h-4 group-hover:-translate-y-1 transition-transform"
                />
              </a>
            ))}
          </div>

          {/* Status */}
          <div className={`flex items-center gap-2 text-sm text-gray-400 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}>
            <div className="w-2 h-2 rounded-full bg-white/40 animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-white/5 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>Made with love by the Mini Zapier team</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-300">Status Page</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300">Contact Us</a>
            <span>•</span>
            <a href="#" className="hover:text-gray-300">Help Center</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}