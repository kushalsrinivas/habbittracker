import React from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function Donut() {
  const data02 = [
    {
      name: "Group A",
      value: 40,
      fill: "#83a6ed",
    },
    {
      name: "Group B",
      value: 60,
      fill: "#ffff",
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart width={730} height={250}>
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Donut;
