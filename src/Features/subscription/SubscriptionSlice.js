import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  plans: [
    {
      id: "basic",
      name: "Basic",
      price: "$9/month",
      description: "For individuals starting out",
      taskLimit: 50, // Add task limit
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
      taskLimit: 500, // Add task limit
      features: [
        "500 AI Tasks per Month",
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
      taskLimit: 2000, // Add task limit
      features: [
        "2000 AI Tasks per Month",
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
      taskLimit: Infinity, // Unlimited AI Tasks for Enterprise
      features: [
        "Unlimited AI Tasks",
        "Custom AI Workflows",
        "Dedicated Account Manager",
        "24/7 Support & Consulting",
        "Access to AI API Integrations",
        "VIP Access to New Features",
      ],
    },
  ],
  selectedPlan: null,
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    selectPlan: (state, action) => {
      state.selectedPlan = action.payload;
    },
    clearSelection: (state) => {
      state.selectedPlan = null;
    },
  },
});

export const { selectPlan, clearSelection } = plansSlice.actions;
export const selectPlans = (state) => state.subscription.plans;
export default plansSlice.reducer;
