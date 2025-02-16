import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Loader from "../Loader/Loader";

const BarChartComponent = ({ taskStats }) => {
  const isLoading = !taskStats || Object.values(taskStats).every((value) => value === 0);

  const barData = useMemo(() => [{ name: "Tasks", ...taskStats }], [taskStats]);

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg min-h-[350px] flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">📊 AI Automation Success Rate</h2>

      {isLoading ? (
        <Loader /> // Using the reusable Loader component
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="completed" fill="#4CAF50" name="Completed" />
            <Bar dataKey="pending" fill="#FFC107" name="Pending" />
            <Bar dataKey="failed" fill="#F44336" name="Failed" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default BarChartComponent;
