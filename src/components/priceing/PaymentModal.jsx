import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PaymentModal = ({ selectedPlan, onClose, onConfirm }) => {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    upiId: "",
    paypalEmail: "",
  });

  // Validate Payment Details
  const isPaymentValid = useCallback(() => {
    if (paymentMethod === "card")
      return paymentDetails.cardNumber.length === 16;
    if (paymentMethod === "upi")
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/.test(paymentDetails.upiId);
    if (paymentMethod === "paypal")
      return /\S+@\S+\.\S+/.test(paymentDetails.paypalEmail);
    return false;
  }, [paymentMethod, paymentDetails]);

  return (
    <AnimatePresence>
      {selectedPlan && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-96 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h2 className="text-2xl font-bold text-gray-900">
              💳 Complete Payment
            </h2>
            <p className="mt-2 text-gray-600">
              You're upgrading to <strong>{selectedPlan.name}</strong>
            </p>
            <p className="mt-2 text-3xl text-blue-500">{selectedPlan.price}</p>

            {/* Payment Method Selection */}
            <div className="mt-4">
              <p className="text-gray-700 font-semibold">
                Choose Payment Method:
              </p>
              <div className="flex justify-center gap-2 mt-2">
                {["card", "upi", "paypal"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`px-4 py-2 rounded-md transition-all ${
                      paymentMethod === method
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {method === "card" && "💳 Card"}
                    {method === "upi" && "📲 UPI"}
                    {method === "paypal" && "🅿️ PayPal"}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Details Form */}
            {paymentMethod && (
              <div className="mt-4">
                {paymentMethod === "card" && (
                  <input
                    type="text"
                    placeholder="Enter Card Number"
                    className="w-full p-2 border rounded-md mt-2"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16);
                      setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: value,
                      });
                    }}
                    maxLength={16}
                  />
                )}

                {paymentMethod === "upi" && (
                  <input
                    type="text"
                    placeholder="Enter UPI ID (e.g., yourname@upi)"
                    className="w-full p-2 border rounded-md mt-2"
                    value={paymentDetails.upiId}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        upiId: e.target.value,
                      })
                    }
                  />
                )}

                {paymentMethod === "paypal" && (
                  <input
                    type="email"
                    placeholder="Enter PayPal Email"
                    className="w-full p-2 border rounded-md mt-2"
                    value={paymentDetails.paypalEmail}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        paypalEmail: e.target.value,
                      })
                    }
                  />
                )}
              </div>
            )}

            {/* Confirm Payment */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-400 rounded-md hover:bg-gray-500 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 rounded-md transition-all ${
                  isPaymentValid()
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!isPaymentValid()}
              >
                Confirm Payment
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
