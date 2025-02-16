import React, { memo } from 'react'
import { FaStar } from 'react-icons/fa';
import { motion } from "framer-motion";


/** TestimonialCard Component */
const TestimonialCard = memo(({ name, title, description, review, image, index }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="p-6 bg-white rounded-lg shadow-md text-left transform hover:scale-[1.03] transition-transform duration-300"
      >
        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={`${name}'s profile picture`}
            loading="lazy"
            decoding="async"
            className="w-12 h-12 rounded-full border-2 border-blue-500"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-gray-600 text-sm">{title}</p>
          </div>
        </div>
  
        {/* Star Rating */}
        <div className="flex items-center mt-3" aria-label={`${review} star rating`}>
          {Array.from({ length: review }, (_, index) => (
            <FaStar key={index} className="text-yellow-500" />
          ))}
        </div>
  
        {/* Testimonial Text */}
        <p className="mt-4 text-gray-700">{description}</p>
      </motion.div>
    );
  });
  
export default TestimonialCard
