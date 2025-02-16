import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebase/Firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import Button from "../ui/Button";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: "⚠️ Please enter a valid email!", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const subscribersRef = collection(db, "subscribers");
      const q = query(subscribersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setMessage({ text: "⚠️ This email is already subscribed!", type: "error" });
      } else {
        await addDoc(subscribersRef, { email });
        setMessage({ text: "✅ Subscription successful!", type: "success" });
        setEmail("");
      }
    } catch (error) {
      setMessage({ text: "❌ Something went wrong. Try again!", type: "error" });
    }

    setLoading(false);

    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  return (
    <footer className="bg-gray-900/95 text-gray-300 py-10 border-t">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1 - Company Info */}
        <div>
          <h2 className="text-xl font-bold text-white">AI Automate</h2>
          <p className="mt-2 text-sm">
            Empowering businesses with AI-driven automation to increase efficiency and scale effortlessly.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            {["features", "pricing", "faq", "contact"].map((link) => (
              <li key={link}>
                <Link to={`/${link}`} className="hover:text-blue-400 capitalize">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 - Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold text-white">Subscribe to our Newsletter</h3>
          <p className="mt-2 text-sm">Stay updated with the latest AI trends and updates.</p>

          {/* Subscription Form */}
          <form onSubmit={handleSubscribe} className="mt-4 flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-l-lg bg-gray-800 border border-gray-600 focus:outline-none text-white"
              disabled={loading}
            />
            <Button
              type="submit"
              className={`bg-blue-600 px-4 py-2 rounded-r-lg transition ${
                loading ? "cursor-not-allowed opacity-70" : "hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          {/* Animated Message */}
          {message.text && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className={`mt-2 text-sm ${
                message.type === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message.text}
            </motion.p>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-gray-700 mt-8 pt-5 text-sm">
        © {new Date().getFullYear()} AI Automate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
