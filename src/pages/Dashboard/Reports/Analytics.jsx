import React, { useEffect, lazy, Suspense, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  db,
  collection,
  onSnapshot,
  query,
  where,
} from "../../../firebase/Firebase";
import {
  setTaskStats,
  setTaskTrends,
  setUser,
  setLoading,
  selectTaskStats,
  selectTaskTrends,
  selectLoading,
} from "../../../Features/analytics/AnalyticsSlice";
import { selectUser } from "../../../Features/auth/authSlice";
import Loader from "../../../components/Loader/Loader";

// Lazy load charts
const PieChartComponent = lazy(() =>
  import("../../../components/Chart/PieChartComponents")
);
const LineChartComponent = lazy(() =>
  import("../../../components/Chart/LineChartComponents")
);
const BarChartComponent = lazy(() =>
  import("../../../components/Chart/BarChartComponents")
);

const Analytics = () => {
  const dispatch = useDispatch();
  const taskStats = useSelector(selectTaskStats);
  const taskTrends = useSelector(selectTaskTrends);
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  // Proper useEffect with dependency on `user`
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(setUser(null));
    }
  }, [dispatch, user]);


  useEffect(() => {
    if (!user) {
      dispatch(setLoading(false));
      return;
    }

    const q = query(
      collection(db, "ai_tasks"),
      where("userId", "==", user.uid)
    );
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
      dispatch(setTaskStats(stats));

      // Process Task Trends Over Time
      const trends = tasks.reduce((acc, task) => {
        const timestamp = task.createdAt?.seconds * 1000 || Date.now();
        const date = new Date(timestamp).toISOString().split("T")[0];
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      dispatch(
        setTaskTrends(
          Object.entries(trends).map(([day, tasks]) => ({ day, tasks }))
        )
      );

      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [user, dispatch]);

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
      <h1 className="text-3xl font-bold">
        📊 AI Automation Reports & Analytics
      </h1>
      <p className="opacity-80">
        Track AI performance and task statistics in real-time.
      </p>

      {loading ? (
       <Loader bgColor="transparent" />
      ) : (
        <Suspense
          fallback={
            <Loader bgColor="transparent" />

          }
        >
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
