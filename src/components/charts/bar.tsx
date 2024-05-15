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
      score: 80,
    },
    {
      name: "Disicpline",
      score: 58,
    },
    {
      name: "Mental Health",
      score: 36,
    },
    {
      name: "Time Off",
      score: 61,
    },
    {
      name: "Physical Health",
      score: 58,
    },
  ];

  return (
    <ResponsiveContainer className={""} width="100%" height={250}>
      <BarChart width={730} height={250} data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis type="number" domain={[0, 100]} />
        <XAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="score" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
