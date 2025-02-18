import React, { useEffect, lazy, Suspense } from "react";
import { FaRobot, FaTasks, FaCheckCircle, FaPlay, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserData,
  fetchUserTasks,
  selectUser,
  selectUserData,
  selectAiStats,
  selectLoading,
} from "../../../Features/auth/authSlice";
import Loader from "../../../components/Loader/Loader";
import Card from "../../../components/dashboard/card";

// Lazy load the chart component
const ChartComponent = lazy(() =>
  import("../../../components/dashboard/ChartComponent")
);

// Task limits by subscription plan
const taskLimits = {
  free: 5,
  basic: 50,
  pro: 500,
  premium: 1000,
  enterprise: Infinity,
};

const DashboardHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state selectors
  const user = useSelector(selectUser);
  const userData = useSelector(selectUserData);
  const aiStats = useSelector(selectAiStats);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(fetchUserData(user.uid));
    dispatch(fetchUserTasks(user.uid));
  }, [user, dispatch, navigate]);

  if (loading) return <Loader />;

  const userPlan = userData?.subscription || "free";
  const maxTasks = taskLimits[userPlan];
  const remainingTasks = maxTasks === Infinity ? "Unlimited" : `${maxTasks - aiStats.totalTasks} Left`;

  // Render subscription-based cards dynamically
  const renderCard = (icon, title, value, color) => (
    <Card icon={icon} title={title} value={value} color={color} />
  );

  return (
    <div className="p-6 bg-gray-900/90 min-h-screen text-white">
      <h1 className="text-3xl font-bold">🚀 Welcome to AI Dashboard</h1>
      <p className="opacity-80">Monitor and control your AI automations.</p>

      {/* User Info */}
      {userData && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg shadow-md">
          <p>👤 <strong>User:</strong> {userData.email}</p>
          <p>🌟 <strong>Plan:</strong> {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <button
          onClick={() => navigate("automation")}
          className="bg-blue-500 p-4 rounded-lg hover:bg-blue-700 transition"
        >
          ⚡ Run AI Automation
        </button>
        <button
          onClick={() => navigate("analytics")}
          className="bg-green-500 p-4 rounded-lg hover:bg-green-700 transition"
        >
          📊 View Reports & Analytics
        </button>
      </div>

      {/* AI Task Information */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {renderCard(<FaRobot />, "Total AI Tasks", aiStats.totalTasks, "text-blue-500")}
        {renderCard(<FaTasks />, "Remaining Tasks", remainingTasks, "text-yellow-500")}

        {/* Conditional rendering based on user plan */}
        {userPlan !== "enterprise" && 
          renderCard(<FaCheckCircle />, "Task Limit", maxTasks === Infinity ? "Unlimited" : `Up to ${maxTasks} Tasks`, "text-gray-500")
        }

        {userPlan === "pro" && renderCard(<FaChartLine />, "Advanced Analytics", "Enabled", "text-purple-500")}
        {userPlan === "premium" && renderCard(<FaChartLine />, "Real-Time Insights", "Enabled", "text-purple-500")}
        
        {/* Enterprise Plan Cards */}
        {userPlan === "enterprise" && (
          <>
            {renderCard(<FaChartLine />, "AI API Integrations", "Enabled", "text-blue-500")}
            {renderCard(<FaPlay />, "Custom AI Workflows", "Active", "text-pink-500")}
            {renderCard(<FaCheckCircle />, "VIP Features", "Unlocked", "text-indigo-500")}
          </>
        )}
      </div>

      {/* AI Task Trends (Chart) */}
      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">📊 AI Task Trends (Last 7 Days)</h2>
        <Suspense fallback={<Loader />}>
          <ChartComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardHome;
