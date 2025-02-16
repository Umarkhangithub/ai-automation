import { Suspense, lazy } from "react";

// Lazy load the Features component
const Feature = lazy(() => import("../../components/Features/Features"));

const Features = () => {
  return (
    <section id="features" className="bg-gray-100/60 min-h-screen grid items-center">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-8">
        
        {/* Section Heading */}
        <header>
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose <span className="text-blue-600">AI Automate?</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Boost productivity and streamline your workflows with AI-powered automation.
          </p>
        </header>

        {/* Features (Lazy Loaded) */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-48 bg-gray-300 animate-pulse rounded-lg"
                /> 
              ))}
            </div>
          }
        >
          <Feature />
        </Suspense>

      </div>
    </section>
  );
};

export default Features;
