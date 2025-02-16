import React, { lazy, Suspense, memo } from "react";
import { Link } from "react-router-dom";

// Lazy load the iframe (if needed for larger apps)
const DemoVideo = lazy(() => import("./DemoVideo"));

const ShowCase = () => {
  return (
    <section id="demo" className="bg-gray-900/90 min-h-screen grid items-center">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
        
        {/* Section Heading */}
        <header>
          <h2 className="text-4xl font-bold text-white">
            Experience <span className="text-blue-600">AI Automate</span> in Action
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            See how AI Automate streamlines your workflows with intelligent automation.
          </p>
        </header>

        {/* Demo Content */}
        <div className="w-full flex flex-col items-center space-y-6">
          
          {/* Lazy Loaded Demo Video */}
          <Suspense fallback={<div className="w-full h-64 md:h-96 bg-gray-600 animate-pulse rounded-lg" />}>
            <DemoVideo />
          </Suspense>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-all"
            >
              Try AI Now
            </Link>
            <Link
              to="/demo"
              className="px-6 py-3 border border-gray-400 text-white rounded-lg text-lg hover:bg-gray-800 transition-all"
            >
              Watch Full Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Memoize to prevent unnecessary re-renders
export default memo(ShowCase);
