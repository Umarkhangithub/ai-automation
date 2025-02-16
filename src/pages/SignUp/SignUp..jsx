import { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../firebase/Firebase";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { userName, email, password, confirmPassword } = formData;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !email || !password || !confirmPassword) {
      toast.error("⚠️ All fields are required!", { position: "top-right" });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match!", { position: "top-right" });
      return;
    }
    if (password.length < 6) {
      toast.warning("🔐 Password must be at least 6 characters long.", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: userName,
      });

      toast.success(`🎉 Welcome, ${user.displayName}!`, {
        position: "top-right",
      });

      // Reset Form
      setFormData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast.error("❌ " + error.message, { position: "top-right" });
    }
    setLoading(false);
  };

  return (
    <section className="py-20 mb-5 flex justify-center">
      <div className="max-w-lg w-full bg-white/90 shadow-md rounded-lg p-8">
        {/* Sign-Up Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-900">
          📝 Sign <span className="text-blue-600">Up</span>
        </h2>

        {/* Toast Notifications */}
        <ToastContainer autoClose={3000} />

        {/* Sign-Up Form */}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
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

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>

          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
