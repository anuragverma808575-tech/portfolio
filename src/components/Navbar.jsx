import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close menu after click (mobile)
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <motion.div
            onClick={() => scrollToSection("home")}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer"
          >
            <DeveloperLogo />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <NavLink
                key={link.id}
                name={link.name}
                onClick={() => scrollToSection(link.id)}
                delay={0.1 * index}
              />
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden flex flex-col mt-4 space-y-4 bg-black/90 p-4 rounded-xl"
            >
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.id}
                  name={link.name}
                  onClick={() => scrollToSection(link.id)}
                  delay={0.1 * index}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

/* ----- Developer Logo (UNCHANGED) ----- */
const DeveloperLogo = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Keep your same SVG here exactly */}
      <span className="text-white font-bold">&lt;/&gt;</span>
    </div>
  );
};

/* ----- NavLink Component ----- */
const NavLink = ({ name, onClick, delay }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="relative text-sm text-white hover:text-white group"
    >
      {name}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
    </motion.button>
  );
};

export default Navbar;
