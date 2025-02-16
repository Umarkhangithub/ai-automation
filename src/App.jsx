import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, lazy, Suspense } from "react";
import { auth, onAuthStateChanged } from "./firebase/Firebase";

import Layout from "./components/layout/Layout";
import Loader from "./components/Loader/Loader";

// ✅ Lazy Loaded Pages for Better Performance
const HomePage = lazy(() => import("./pages/Home page/HomePage"));
const Features = lazy(() => import("./pages/features/Features"));
const Pricing = lazy(() => import("./pages/Price/PricingPage"));
const Testimonials = lazy(() => import("./pages/Testomonials/TestimonialsPage"));
const ShowCase = lazy(() => import("./pages/Demo/ShowCase"));
const FAQ = lazy(() => import("./pages/FAQ section/FaqSection"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp."));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const UpgradePro = lazy(() => import("./pages/Price/Pro-plan/UpgradePro"));

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe; // ✅ Cleanup listener on unmount
  }, []);

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/demo" element={<ShowCase />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/upgrade-pro-plan" element={<UpgradePro />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* ✅ Protect Dashboard Route */}
            <Route path="/dashboard/*" element={user ? <Dashboard /> : <Login />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
