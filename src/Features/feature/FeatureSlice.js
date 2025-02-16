import { createSlice } from "@reduxjs/toolkit";
import { FaBrain, FaRobot, FaPlug, FaShieldAlt, FaChartLine, FaHeadset } from "react-icons/fa";

const initialState = {
  items: [
    {
      id: 1,
      title: "AI-Powered Insights",
      description: "Get smart recommendations based on real-time data analysis.",
      icon: FaBrain,
    },
    {
      id: 2,
      title: "Automated Workflows",
      description: "Save time by automating repetitive tasks with AI.",
      icon: FaRobot,
    },
    {
      id: 3,
      title: "Seamless Integrations",
      description: "Works with Slack, Notion, Zapier, and 100+ other tools.",
      icon: FaPlug,
    },
    {
      id: 4,
      title: "Enterprise-Grade Security",
      description: "Keep your data safe with end-to-end encryption.",
      icon: FaShieldAlt,
    },
    {
      id: 5,
      title: "Real-Time Analytics",
      description: "Track performance with AI-driven dashboards and reports.",
      icon: FaChartLine,
    },
    {
      id: 6,
      title: "24/7 AI Support",
      description: "Get instant support with AI-powered chat assistance.",
      icon: FaHeadset,
    },
  ],
};

const featuresSlice = createSlice({
  name: "features",
  initialState,
  reducers: {},
});

export default featuresSlice.reducer;
