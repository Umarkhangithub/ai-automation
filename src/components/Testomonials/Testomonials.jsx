import { memo, Suspense, useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useSelector } from "react-redux";
import { selectTestimonials } from "../../Features/testimonials/TestimonialSlice";
import TestimonialCard from "./TestimonialCard";


/** SectionHeader Component */
const SectionHeader = () => (
  <motion.header
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="text-center"
  >
    <h2 className="text-4xl font-bold text-gray-900">
      Loved by <span className="text-blue-600">Thousands</span> of Users
    </h2>
    <p className="mt-4 text-lg text-gray-700">
      See how AI Automate is transforming businesses worldwide.
    </p>
  </motion.header>
);

/** TestimonialsList Component */
const TestimonialsList = ({ testimonials, isVisible }) => (
  <Suspense fallback={<p className="text-center text-gray-500">Loading testimonials...</p>}>
    <motion.div
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.2 } },
      }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
    >
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={testimonial.id} index={index} {...testimonial} />
      ))}
    </motion.div>
  </Suspense>
);

/** Main Testimonials Component */
const Testimonials = () => {
  const testimonials = useSelector(selectTestimonials);
  
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [controls]);

  return (
    <section id="testimonials" ref={ref} className="mt-12">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader />
        <TestimonialsList testimonials={testimonials} isVisible={isVisible} />
      </div>
    </section>
  );
};

export default Testimonials;
