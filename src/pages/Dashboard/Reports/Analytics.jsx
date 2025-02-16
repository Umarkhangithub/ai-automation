import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import { auth, onAuthStateChanged, db, collection, onSnapshot, query, where } from "../../../firebase/Firebase";

// Lazy load charts
const PieChartComponent = lazy(() => import("../../../components/Chart/PieChartComponents"));
const LineChartComponent = lazy(() => import("../../../components/Chart/LineChartComponents"));
const BarChartComponent = lazy(() => import("../../../components/Chart/BarChartComponents"));

const Analytics = () => {
  const [taskStats, setTaskStats] = useState({ completed: 0, pending: 0, failed: 0 });
  const [taskTrends, setTaskTrends] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    const q = query(collection(db, "ai_tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs.map((doc) => doc.data());
      
      // Calculate Task Statistics
      const stats = tasks.reduce(
        (acc, task) => {
          const status = task.status?.toLowerCase();
          if (status) acc[status] = (acc[status] || 0) + 1;
          return acc;
        },
        { completed: 0, pending: 0, failed: 0 }
      );
      setTaskStats(stats);

      // Process Task Trends Over Time
      const trends = tasks.reduce((acc, task) => {
        const timestamp = task.createdAt?.seconds * 1000 || Date.now();
        const date = new Date(timestamp).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      
      setTaskTrends(
        Object.entries(trends).map(([day, tasks]) => ({ day, tasks }))
      );
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Memoized Pie Data
  const pieData = useMemo(
    () => [
      { name: "Completed", value: taskStats.completed, color: "#4CAF50" },
      { name: "Pending", value: taskStats.pending, color: "#FFC107" },
      { name: "Failed", value: taskStats.failed, color: "#F44336" },
    ],
    [taskStats]
  );

  return (
    <div className="p-6 bg-gray-900/90 min-h-screen text-white">
      <h1 className="text-3xl font-bold">📊 AI Automation Reports & Analytics</h1>
      <p className="opacity-80">Track AI performance and task statistics in real-time.</p>

      {loading ? (
        <div className="mt-10 text-center text-gray-400">Loading analytics...</div>
      ) : (
        <Suspense fallback={<div className="mt-10 text-center text-gray-400">Loading charts...</div>}>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PieChartComponent pieData={pieData} />
            <LineChartComponent taskTrends={taskTrends} />
          </div>
          <div className="mt-6">
            <BarChartComponent taskStats={taskStats} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default Analytics;
