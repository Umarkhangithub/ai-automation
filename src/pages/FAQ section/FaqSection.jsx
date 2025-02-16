import React, { Suspense } from "react";
import { motion } from "framer-motion";

const FaqQuestion = React.lazy(() => import("../../components/FAQ/FaqQuestion"));

const FAQ = () => {
  return (
    <section id="faq" className="bg-gray-100/60 min-h-screen grid items-center">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 text-center"
        >
          Frequently Asked <span className="text-blue-600">Questions</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-black text-center"
        >
          Find answers to the most common questions about our SaaS.
        </motion.p>

        {/* FAQ Accordion */}
        <Suspense
          fallback={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mt-6 text-gray-700"
            >
              Loading FAQs...
            </motion.div>
          }
        >
          <FaqQuestion />
        </Suspense>
      </div>
    </section>
  );
};

export default FAQ;
