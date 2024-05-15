import React from "react";
import {
  RadialBar,
  RadialBarChart,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
interface props {
  name: string;
  score: number;
  fill: string;
}
function RadarChartComponent({ name, score, fill }: props) {
  const data = [
    { name: name, score: score, fill: fill },
    { score: 100, name: "", fill: "#ffff" },
  ];
  return (
    <ResponsiveContainer width="85%" height={250}>
      <RadialBarChart
        width={730}
        height={250}
        innerRadius="100%"
        outerRadius="10%"
        data={data}
        startAngle={360}
        endAngle={0}
      >
        <RadialBar
          label={{ fill: "#666", position: "middle" }}
          background
          dataKey="score"
          min={100}
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
