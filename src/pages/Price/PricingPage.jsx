import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PricingCard from "../../components/priceing/PricingCard"; // Fixed import typo
import { useSelector } from "react-redux";
import { selectPlan } from "../../Features/price/PricingPlanSlice";



const Pricing = () => {
  const PRICING_PLANS = useSelector(selectPlan)
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Optimized Navigation Handler
  const handleNavigate = useCallback((to) => navigate(to), [navigate]);

  return (
    <section id="pricing" className="bg-gray-900/90 text-white min-h-screen grid items-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Section Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
        >
          💰 Flexible Pricing Plans
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="opacity-80 mt-2"
        >
          Choose a plan that fits your needs.
        </motion.p>

        {/* Monthly/Yearly Toggle */}
        <div className="flex justify-center mt-4">
          {["monthly", "yearly"].map((cycle) => (
            <motion.button
              key={cycle}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`px-4 py-2 w-32 rounded-lg mx-1 transition-all duration-300 ${
                billingCycle === cycle ? "bg-blue-500" : "bg-gray-700 hover:bg-gray-600"
              }`}
              onClick={() => setBillingCycle(cycle)}
              aria-pressed={billingCycle === cycle}
              aria-label={`Select ${cycle} billing cycle`}
            >
              {cycle === "yearly" ? "Yearly (Save 20%)" : "Monthly"}
            </motion.button>
          ))}
        </div>

        {/* Pricing Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
              handleNavigate={handleNavigate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
