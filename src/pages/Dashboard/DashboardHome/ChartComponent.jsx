import React, { memo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ChartComponent = memo(() => {
  const chartData = [
    { day: "Mon", tasks: 5 },
    { day: "Tue", tasks: 8 },
    { day: "Wed", tasks: 12 },
    { day: "Thu", tasks: 7 },
    { day: "Fri", tasks: 15 },
    { day: "Sat", tasks: 10 },
    { day: "Sun", tasks: 18 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="day" stroke="#ccc" />
        <YAxis stroke="#ccc" />
        <Tooltip />
        <CartesianGrid strokeDasharray="3 3" />
        <Line type="monotone" dataKey="tasks" stroke="#00c3ff" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
});

export default ChartComponent;
