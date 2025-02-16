import React, { useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("⚠️ All fields are required!");
      return;
    }

    setSubmitted(true);
    console.log("Form Data Submitted:", formData);

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section className="py-20 bg-gray-100/60 mb-5">
      <div className="max-w-4xl mx-auto px-6 bg-white shadow-md rounded-lg p-10">
        
        {/* Contact Heading */}
        <h2 className="text-4xl font-bold text-center text-gray-900">
          📩 Get in <span className="text-blue-600">Touch</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 text-center">
          Have questions? Feel free to reach out.
        </p>

        {/* Contact Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input 
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
          />

          <Input
            label="Message"
            type="textarea"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            disabled={submitted}
          >
            {submitted ? "Sending..." : "Send Message"}
          </Button>
        </form>

        {/* Contact Info */}
        <div className="mt-10 text-center text-gray-700">
          <p>📧 Email: <a href="mailto:support@example.com" className="text-blue-600">support@example.com</a></p>
          <p>📞 Phone: <a href="tel:+1234567890" className="text-blue-600">+1 234 567 890</a></p>
          <p>📍 Location: 123 AI Street, Tech City</p>
        </div>

      </div>
    </section>
  );
};

export default Contact;
