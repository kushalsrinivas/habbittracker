import React from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function BarChartComponent() {
  const data = [
    {
      name: "Carrer",
      uv: 4000,
    },
    {
      name: "Disicpline",
      uv: 3000,
    },
    {
      name: "Mental Health",
      uv: 2000,
    },
    {
      name: "Interests/Time Off",
      uv: 2780,
    },
    {
      name: "Physical Health",
      uv: 1890,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={730}>
      <BarChart width={730} height={250} data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
