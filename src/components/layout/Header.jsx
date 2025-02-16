import { useState } from "react";
import { FaBrain, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { path: "/features", label: "Features" },
  { path: "/demo", label: "Demo" },
  { path: "/pricing", label: "Pricing" },
  { path: "/testimonials", label: "Testimonials" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
          AI Automate
          <FaBrain className="ml-2 text-4xl" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 rounded transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-blue-600"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA Button (Desktop) */}
        <Link
          to="/signup"
          className="hidden md:block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Free Trial
        </Link>

        {/* Mobile Menu Toggle Button with Animation */}
        <motion.button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      </div>

      {/* Mobile Navigation Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full flex flex-col space-y-3 py-4"
          >
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className="px-6 py-3 text-lg text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <Link
              to="/signup"
              className="mx-6 px-4 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Start Free Trial
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
