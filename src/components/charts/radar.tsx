import React from "react";
import {
  RadialBar,
  RadialBarChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function RadarChartComponent() {
  const data = [
    {
      name: "Carrer",
      score: 85,
      fill: "#8884d8",
    },
    {
      name: "Discipline",
      score: 58,

      fill: "#83a6ed",
    },
    {
      name: "Mental Health",
      score: 36,

      fill: "#8dd1e1",
    },
    {
      name: "Interests/Time Off",
      score: 61,

      fill: "#82ca9d",
    },
    {
      name: "Physical Health",
      score: 58,

      fill: "#a4de6c",
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RadialBarChart
        width={730}
        height={250}
        innerRadius="100%"
        outerRadius="10%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar
          label={{ fill: "#666", position: "insideStart" }}
          background
          dataKey="score"
        />
        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

export default RadarChartComponent;
