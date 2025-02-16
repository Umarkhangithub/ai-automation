import { NavLink } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy load the image to optimize performance
const HeroImage = lazy(() => import("./HeroImage"));

const NAV_LINKS = [
  { to: "signup", label: "Start Free Trial", className: "bg-blue-600 text-white hover:bg-blue-700" },
  { to: "demo", label: "Watch Demo", className: "border border-gray-300 hover:bg-gray-800" },
];

const HeroSection = () => {
  return (
    <section className="bg-gray-900/90 text-white min-h-screen grid items-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 p-6">
        
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Supercharge Your Workflow with{" "}
            <span className="text-blue-500">AI Automation</span>
          </h1>
          <p className="text-lg text-gray-300">
            Harness the power of AI to automate workflows, boost efficiency, and scale effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center md:justify-start space-x-4">
            {NAV_LINKS.map(({ to, label, className }) => (
              <NavLink
                key={to}
                to={to}
                className={`px-6 py-3 rounded-lg text-lg transition ${className}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right Image/Illustration (Lazy Loaded) */}
        <div className="md:w-1/2 flex justify-center">
          <Suspense fallback={<div className="w-48 h-48 bg-gray-700 animate-pulse rounded-2xl" />}>
            <HeroImage />
          </Suspense>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
