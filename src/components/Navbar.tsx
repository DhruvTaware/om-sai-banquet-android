import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/banquet", label: "Home" },
  { path: "/banquet/about", label: "About" },
  { path: "/banquet/services", label: "Services" },
  { path: "/banquet/gallery", label: "Gallery" },
  { path: "/banquet/features", label: "Features" },
  { path: "/banquet/testimonials", label: "Event Stories" },
  { path: "/banquet/location", label: "Location" },
  { path: "/banquet/contact", label: "Book Now" },
  { path: "/planner", label: "✨ AI Planner", isSwitch: true },
  { path: "/lawns", label: "🌿 Lawns", isSwitch: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold gold-text">OM SAI</span>
            <span className="hidden sm:block text-xs text-muted-foreground tracking-widest uppercase">
              Banquet
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
  ? "gold-gradient text-primary-foreground"
                    : location.pathname === link.path
                      ? "gold-gradient text-primary-foreground shadow-md"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted"
                } ${link.path === "/banquet/contact" ? "gold-gradient text-primary-foreground glow-hover ml-2" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-navbar border-t border-border/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.path
                      ? "gold-gradient text-primary-foreground"
                      : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
