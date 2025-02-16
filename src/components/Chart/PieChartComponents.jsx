import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Loader from "../Loader/Loader";

const PieChartComponent = ({ pieData }) => {
  const isLoading = !pieData || pieData.length === 0;

  // Memoized data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => pieData || [], [pieData]);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg min-h-[350px] flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">📌 Task Status Distribution</h2>

      {isLoading ? (
       <Loader />
      ) : memoizedData.every((item) => item.value === 0) ? (
        <p className="text-gray-400 text-center">No task data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={memoizedData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {memoizedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartComponent;
