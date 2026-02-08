import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex justify-between items-center">

          {/* Developer Logo */}
          <motion.div
            onClick={() => scrollToSection('home')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            className="cursor-pointer select-none"
          >
            <DeveloperLogo />
          </motion.div>

          {/* Navigation Links */}
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

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:hidden text-white/70 hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>

        </div>
      </div>
    </motion.nav>
  );
};

// Developer Logo Component with Code Animation
const DeveloperLogo = () => {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
      >
        <defs>
          {/* Gradient for modern look */}
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.7" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Outer hexagon frame */}
        <motion.path
          d="M 50 5 L 85 27.5 L 85 72.5 L 50 95 L 15 72.5 L 15 27.5 Z"
          fill="none"
          stroke="url(#logoGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            rotate: 360
          }}
          transition={{ 
            pathLength: { duration: 1.5, ease: "easeInOut" },
            opacity: { duration: 0.5 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          style={{ originX: '50px', originY: '50px' }}
        />

        {/* Inner rotating circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="28"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          opacity="0.3"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ originX: '50px', originY: '50px' }}
        />

        {/* Code brackets < > with animation */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Left bracket < */}
          <motion.path
            d="M 40 35 L 28 50 L 40 65"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            filter="url(#glow)"
          />

          {/* Right bracket > */}
          <motion.path
            d="M 60 35 L 72 50 L 60 65"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
            filter="url(#glow)"
          />

          {/* Forward slash / */}
          <motion.line
            x1="55"
            y1="35"
            x2="45"
            y2="65"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.15
            }}
            filter="url(#glow)"
          />
        </motion.g>

        {/* Orbiting particles */}
        <motion.circle
          cx="50"
          cy="22"
          r="2"
          fill="white"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ originX: '50px', originY: '50px' }}
        />
        
        <motion.circle
          cx="78"
          cy="50"
          r="2"
          fill="white"
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          style={{ originX: '50px', originY: '50px' }}
        />
        
        <motion.circle
          cx="22"
          cy="50"
          r="2"
          fill="white"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ originX: '50px', originY: '50px' }}
        />

        {/* Pulsing center dot */}
        <motion.circle
          cx="50"
          cy="50"
          r="3"
          fill="white"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: '50px', originY: '50px' }}
        />

        {/* Outer glow ring */}
        <motion.path
          d="M 50 5 L 85 27.5 L 85 72.5 L 50 95 L 15 72.5 L 15 27.5 Z"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity="0.2"
          filter="url(#glow)"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ originX: '50px', originY: '50px' }}
        />
      </svg>
    </div>
  );
};

// Nav link with animated underline
const NavLink = ({ name, onClick, delay }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="relative text-sm text-white hover:text-white transition-colors duration-300 group"
    >
      {name}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
    </motion.button>
  );
};

export default Navbar;
