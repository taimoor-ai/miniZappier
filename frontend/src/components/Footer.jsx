// import {  Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    { icon: "Twitter", href: "#", label: "Twitter" },
    { icon: "Github", href: "#", label: "GitHub" },
    { icon: "Linkedin", href: "#", label: "LinkedIn" },
    { icon: "Mail", href: "#", label: "Email" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Top Section */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <span className="text-lg font-bold text-white">Mini Zapier</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The simplest way to automate your workflows and save hours every week.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
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
        <div className="border-t border-slate-800/50 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Copyright */}
          <div className="text-center md:text-left text-gray-400 text-sm">
            <p>&copy; {currentYear} Mini Zapier. All rights reserved.</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-slate-800/50 hover:bg-blue-600 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/50 bg-slate-900/30 px-4 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>Made with love by the Mini Zapier team</div>
          <div>Status Page • Contact Us • Help Center</div>
        </div>
      </div>
    </footer>
  );
}
