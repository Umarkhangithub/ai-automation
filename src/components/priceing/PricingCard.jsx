import React, { memo } from "react";
import { motion } from "framer-motion";

const PricingCard = memo(({ plan, billingCycle, handleNavigate, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`p-6 rounded-lg shadow-lg border ${
        plan.mostPopular ? "bg-blue-600" : "bg-gray-800"
      } transform hover:scale-105 transition-all`}
    >
      {plan.mostPopular && <p className="text-yellow-300 font-bold">⭐ Most Popular</p>}
      <h2 className="text-2xl font-bold mt-2">{plan.name}</h2>
      <p className="text-3xl font-semibold mt-2">
        {billingCycle === "monthly" ? `$${plan.price.monthly}` : `$${plan.price.yearly}`}
        <span className="text-lg"> / {billingCycle}</span>
      </p>
      <ul className="mt-4 space-y-2 text-left">
        {plan.features.map((feature, i) => (
          <li key={i} className="text-gray-300 flex items-center gap-2">
            ✅ {feature}
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleNavigate(plan.link)}
        className="mt-4 w-full py-2 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-all"
      >
        {plan.buttonText}
      </motion.button>
    </motion.div>
  );
});

export default PricingCard;
