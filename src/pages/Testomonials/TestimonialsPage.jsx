import  { lazy, Suspense, memo } from "react";
import { useSelector } from "react-redux";
import { selectCompanies } from "../../Features/testimonials/TesimonialsCompanySlice";

// Lazy load the Testimonial component
const Testimonial = lazy(() => import("../../components/Testomonials/Testomonials"));

const Testimonials = () => {
  const testimonialCompany = useSelector(selectCompanies) 

  return (
    <section id="testimonials"  className="bg-gray-100/60 min-h-screen grid items-center py-20">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
       

        {/* Lazy Loaded Testimonials */}
        <Suspense fallback={<div className="w-full h-48 bg-gray-300 animate-pulse rounded-lg" />}>
          <Testimonial />
        </Suspense>

        {/* Trusted Companies Logos (Auto-scrolling animation) */}
        <div className="mt-12 overflow-hidden relative">
          <div className="flex space-x-10 animate-scroll">
            {testimonialCompany.concat(testimonialCompany).map(({ id, image, title }, index) => (
              <img key={index} src={image} alt={title} className="h-12 max-w-[150px] object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" />
            ))}
          </div>
        </div>

      </div>

      {/* CSS for auto-scrolling animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .animate-scroll {
            display: flex;
            width: max-content;
            animation: scroll 20s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

// Memoize for performance optimization
export default memo(Testimonials);
