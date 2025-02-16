import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plan: [
    {
      link: "/dashboard",
      name: "Free Plan",
      price: { monthly: 0, yearly: 0 },
      features: ["Limited AI Features", "Basic Support (Email only)", "Up to 100 Tasks"],
      buttonText: "Get Started",
      mostPopular: false,
    },
    {
      link: "/upgrade-pro-plan",
      name: "Pro Plan",
      price: { monthly: 29, yearly: 290 },
      features: [
        "Unlimited AI Tasks",
        "Priority Support (Chat & Email)",
        "Access to All Features",
        "Advanced Analytics Dashboard",
        "No Dedicated Account Manager",
      ],
      buttonText: "Upgrade Now",
      mostPopular: true,
    },
    {
      link: "/contact",
      name: "Enterprise Plan",
      price: { monthly: "Custom", yearly: "Custom" },
      features: [
        "Custom AI Workflows",
        "Dedicated Account Manager",
        "24/7 Support & Consulting",
        "Access to AI API Integrations",
        "VIP Access to New Features",
      ],
      buttonText: "Contact Us",
      mostPopular: false,
    },
  ],
};

const pricingPlanSlice = createSlice({
  name: "pricingPlan",
  initialState,
  reducers: {}, // No reducers for now, but we keep this for future updates
});

// Corrected selector to match the slice name
export const selectPlan = (state) => state.pricingPlan?.plan || [];

export default pricingPlanSlice.reducer;
