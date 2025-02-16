import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import Loader from "../Loader/Loader";

const LineChartComponent = ({ taskTrends }) => {
  const isLoading = !taskTrends || taskTrends.length === 0;

  const chartData = useMemo(() => taskTrends || [], [taskTrends]);

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg min-h-[350px] flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">📈 AI Task Trends</h2>

      {isLoading ? (
        <Loader bgColor='transparent' /> // Using the reusable Loader component
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="tasks" stroke="#00c3ff" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LineChartComponent;
