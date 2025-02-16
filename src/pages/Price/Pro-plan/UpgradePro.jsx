import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/Firebase";

const PaymentModal = lazy(() => import("../../../components/priceing/PaymentModal"));

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9/month",
    description: "For individuals starting out",
    features: [
      "50 AI Tasks per Month",
      "Basic Support (Email only)",
      "Access to Core Features",
      "No Priority Access",
      "No Advanced Analytics",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29/month",
    description: "Perfect for growing businesses",
    features: [
      "Unlimited AI Tasks",
      "Priority Support (Chat & Email)",
      "Access to All Features",
      "Advanced Analytics Dashboard",
      "No Dedicated Account Manager",
    ],
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$59/month",
    description: "Advanced features for professionals",
    features: [
      "Unlimited AI Tasks",
      "24/7 Priority Support",
      "Exclusive AI Features",
      "Real-time Data Insights",
      "Monthly AI Training Reports",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99/month",
    description: "Custom AI solutions for enterprises",
    features: [
      "Custom AI Workflows",
      "Dedicated Account Manager",
      "24/7 Support & Consulting",
      "Access to AI API Integrations",
      "VIP Access to New Features",
    ],
  },
];

const UpgradePro = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handlePaymentSuccess = async () => {
    if (!auth.currentUser) {
      toast.error("⚠️ User not logged in!");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);

    try {
      await setDoc(
        userRef,
        { subscription: selectedPlan.id },
        { merge: true }
      );

      toast.success("🎉 Payment Successful! Subscription Updated.", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast.error("❌ Failed to update subscription. Try again.");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-6xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-900">💰 Pricing Plans</h1>
        <p className="mt-4 text-lg text-gray-600">Choose the perfect plan that fits your needs.</p>

        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`relative p-8 rounded-2xl shadow-lg flex flex-col transition-all border ${
                plan.popular ? "border-blue-500 bg-white" : "border-gray-200 bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {plan.popular && (
                <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <h2 className="text-3xl font-bold text-gray-900">{plan.name}</h2>
              <p className="text-lg text-gray-500">{plan.description}</p>
              <p className="text-4xl font-extrabold text-blue-500 mt-4">{plan.price}</p>

              <ul className="mt-6 text-left space-y-3 text-gray-700">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {feature.includes("No") ? (
                      <XCircle className="text-red-400 w-5 h-5" />
                    ) : (
                      <CheckCircle className="text-green-500 w-5 h-5" />
                    )}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan)}
                className={`mt-6 w-full px-6 py-3 text-white rounded-lg transition-all ${
                  plan.popular ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-800 hover:bg-gray-900"
                }`}
              >
                {plan.popular ? "Get Started" : "Upgrade Now"}
              </button>
            </motion.div>
          ))}
        </div>

        <Suspense fallback={<div className="text-center text-gray-500 mt-6">Loading Payment Modal...</div>}>
          {selectedPlan && (
            <PaymentModal
              selectedPlan={selectedPlan}
              onClose={() => setSelectedPlan(null)}
              onConfirm={handlePaymentSuccess}
            />
          )}
        </Suspense>

        <ToastContainer />
      </div>
    </section>
  );
};

export default UpgradePro;
