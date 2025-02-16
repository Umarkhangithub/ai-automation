import React, { useEffect, lazy, Suspense } from "react";
import {
  FaRobot,
  FaTasks,
  FaCheckCircle,
  FaPlay,
  FaChartLine,
} from "react-icons/fa";
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

const ChartComponent = lazy(() => import("./ChartComponent"));

const DashboardHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="p-6 bg-gray-900/90 min-h-screen text-white">
      <h1 className="text-3xl font-bold">🚀 Welcome to AI Dashboard</h1>
      <p className="opacity-80">Monitor and control your AI automations.</p>

      {userData && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg shadow-md">
          <p>
            👤 <strong>User:</strong> {userData.email}
          </p>
          <p>
            🌟 <strong>Plan:</strong> {userData.subscription}
          </p>
        </div>
      )}

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

      <div className="grid grid-cols-3 gap-6 mt-6">
        <Card
          icon={<FaRobot />}
          title="Total AI Tasks"
          value={aiStats.totalTasks}
          color="text-blue-500"
        />
        {userData?.subscription === "free" && (
          <Card
            icon={<FaCheckCircle />}
            title="Task Limit"
            value="Up to 100 Tasks"
            color="text-gray-500"
          />
        )}
        {userData?.subscription === "basic" && (
          <>
            <Card
              icon={<FaTasks />}
              title="Remaining Tasks"
              value={`${50 - aiStats.totalTasks} Left`}
              color="text-yellow-500"
            />
            <Card
              icon={<FaCheckCircle />}
              title="Support"
              value="Basic (Email Only)"
              color="text-gray-500"
            />
          </>
        )}
        {userData?.subscription === "pro" && (
          <>
            <Card
              icon={<FaCheckCircle />}
              title="Success Rate"
              value={`${aiStats.successRate}%`}
              color="text-green-500"
            />
            <Card
              icon={<FaTasks />}
              title="Pending Tasks"
              value={aiStats.pendingTasks}
              color="text-yellow-500"
            />
            <Card
              icon={<FaChartLine />}
              title="Advanced Analytics"
              value="Enabled"
              color="text-purple-500"
            />
          </>
        )}
        {userData?.subscription === "premium" && (
          <>
            <Card
              icon={<FaCheckCircle />}
              title="Success Rate"
              value={`${aiStats.successRate}%`}
              color="text-green-500"
            />
            <Card
              icon={<FaTasks />}
              title="Pending Tasks"
              value={aiStats.pendingTasks}
              color="text-yellow-500"
            />
            <Card
              icon={<FaChartLine />}
              title="Real-Time Insights"
              value="Enabled"
              color="text-purple-500"
            />
          </>
        )}
        {userData?.subscription === "enterprise" && (
          <>
            <Card
              icon={<FaCheckCircle />}
              title="Success Rate"
              value={`${aiStats.successRate}%`}
              color="text-green-500"
            />
            <Card
              icon={<FaTasks />}
              title="Pending Tasks"
              value={aiStats.pendingTasks}
              color="text-yellow-500"
            />
            <Card
              icon={<FaChartLine />}
              title="AI API Integrations"
              value="Enabled"
              color="text-blue-500"
            />
            <Card
              icon={<FaPlay />}
              title="Custom AI Workflows"
              value="Active"
              color="text-pink-500"
            />
            <Card
              icon={<FaCheckCircle />}
              title="VIP Features"
              value="Unlocked"
              color="text-indigo-500"
            />
          </>
        )}
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          📊 AI Task Trends (Last 7 Days)
        </h2>
        <Suspense fallback={<Loader />}>
          <ChartComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default DashboardHome;
