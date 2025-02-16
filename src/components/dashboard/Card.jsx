import React, { memo } from "react";
import { motion } from "framer-motion";

const Card = memo(({ icon, title, value, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="p-6 bg-gray-800 rounded-lg flex items-center space-x-4 shadow-lg"
  >
    <div className={`text-4xl ${color}`}>{icon}</div>
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  </motion.div>
));

export default Card;
