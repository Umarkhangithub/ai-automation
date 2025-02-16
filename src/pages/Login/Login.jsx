import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase/Firebase";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("⚠️ Please enter both email and password.", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      toast.success(`✅ Login successful! Welcome ${user.email}`, {
        position: "top-right",
      });

      // Reset Form
      setFormData({ email: "", password: "" });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("❌ Invalid email or password. Please try again.", {
        position: "top-right",
      });
      console.error(error.message);
    }
    setLoading(false);
  };

  return (
    <section className="py-20 mb-5 flex justify-center">
      <div className="max-w-lg w-full bg-white/90 shadow-md rounded-lg p-8">
        {/* Login Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900">
          🔑 Log<span className="text-blue-600">In</span>
        </h2>

        {/* Toast Notifications */}
        <ToastContainer autoClose={3000} />

        {/* Login Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="border-gray-300 focus:border-blue-500"
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border-gray-300 focus:border-blue-500 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-11 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-600">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
