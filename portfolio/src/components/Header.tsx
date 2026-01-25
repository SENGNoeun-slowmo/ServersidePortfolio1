import { Link } from "react-router-dom";
import logoImage from "../assets/image.png";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Optional: subtle header shrink on scroll (Apple-style)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Variants for mobile menu slide + stagger children
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -20 },
    open: { opacity: 1, y: 0 },
  };

  // Hamburger lines animation
  const lineVariants = {
    closed: (i: number) => ({
      rotate: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: "easeInOut" },
    }),
    open: (i: number) => ({
      rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
      y: i === 1 ? 0 : i === 0 ? 8 : -8,
      opacity: i === 1 ? 0 : 1,
      transition: { duration: 0.35, ease: "easeInOut" },
    }),
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "h-16 bg-white/90 backdrop-blur-md shadow-md"
            : "h-20 bg-white shadow-sm"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo – subtle scale on load */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="min-w-[140px]"
          >
            <img
              src={logoImage}
              alt="Your Company Logo"
              className="h-14 w-auto object-contain"
            />
          </motion.div>

          {/* Hamburger – animated lines */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                custom={i}
                variants={lineVariants}
                animate={isOpen ? "open" : "closed"}
                className={`block w-7 h-0.5 bg-black mb-[6px] last:mb-0 rounded-full origin-center`}
              />
            ))}
          </motion.button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-10 text-black font-medium">
              {["/", "/About", "/Contact"].map((path, idx) => {
                const label = ["Home", "About", "Contact"][idx];
                return (
                  <motion.li
                    key={path}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    <Link to={path}>{label}</Link>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          {/* Right placeholder (visible on desktop) */}
          <div className="min-w-[140px] text-right hidden md:block">
            {/* Add button/login here later */}
          </div>
        </div>

        {/* Mobile Menu – AnimatePresence for exit animation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden bg-white border-t shadow-lg overflow-hidden"
            >
              <ul className="flex flex-col items-center py-8 gap-8 text-lg font-medium">
                {["/", "/About", "/Contact"].map((path, idx) => {
                  const label = ["Home", "About", "Contact"][idx];
                  return (
                    <motion.li
                      key={path}
                      variants={itemVariants}
                      className="cursor-pointer hover:text-blue-600 transition-colors"
                    >
                      <Link to={path} onClick={toggleMenu}>
                        {label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Dynamic spacer based on header height */}
      <div className={`h-${scrolled ? "16" : "20"}`} />
    </>
  );
}

export default Header;