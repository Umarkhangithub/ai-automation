import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FinalCTA = () => {
  return (
    <section className="bg-gray-900 text-white text-center min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-3xl mx-auto space-y-6"
      >
        {/* CTA Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
          🚀 Ready to <span className="text-blue-500">boost productivity</span>{" "}
          with AI?
        </h2>
        <p className="text-lg sm:text-xl opacity-90">
          Start your free trial today and unlock the full potential of
          automation.
        </p>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="mt-6"
        >
          <Link
            to="/login"
            className="inline-block px-8 py-4 text-lg font-semibold bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-all duration-300"
          >
            Start Your Free Trial
          </Link>
        </motion.div>

        {/* Additional Small Text */}
        <p className="text-sm opacity-75">
          No credit card required • Cancel anytime
        </p>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
