import  { Suspense, lazy } from "react";
import Loader from "../../components/Loader/Loader";

// Lazy loading components
const HeroSection = lazy(() => import("../../components/Home/HeroSection"));
const Features = lazy(() => import("../../pages/features/Features"));
const ShowCase = lazy(() => import("../Demo/ShowCase"));
const Testimonials = lazy(() => import("../Testomonials/TestimonialsPage"));
const Pricing = lazy(() => import("../Price/PricingPage"));
const FAQ = lazy(() => import("../FAQ section/FaqSection"));
const FinalCTA = lazy(() => import("../Final CTA/FinalCTA"));

const HomePage = () => {
  return (
    <Suspense
      fallback={<Loader />}
    >
      <HeroSection />
      <Features />
      <ShowCase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </Suspense>
  );
};

export default HomePage;
