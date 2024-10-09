'use client'

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "9:00",
    Amazon: 4000,
    Tesla: 2400,
    Pepsi: 2400,
    Nestle: 2100,
  },
  {
    name: "10:00",
    Amazon: 3000,
    Tesla: 1398,
    Pepsi: 2210,
    Nestle: 5633,
  },
  {
    name: "11:00",
    Amazon: 2000,
    Tesla: 9800,
    Pepsi: 2290,
    Nestle: 4856,
  },
  {
    name: "12:00",
    Amazon: 2780,
    Tesla: 3908,
    Pepsi: 2000,
    Nestle: 3450,
  },
  {
    name: "13:00",
    Amazon: 1890,
    Tesla: 4800,
    Pepsi: 2181,
    Nestle: 2100,
  },
  {
    name: "14:00",
    Amazon: 2390,
    Tesla: 3800,
    Pepsi: 2500,
    Nestle: 2100,
  },
  {
    name: "15:00",
    Amazon: 3490,
    Tesla: 4300,
    Pepsi: 2100,
    Nestle: 3000,
  },
];

export default function Home() {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="Amazon"
        stroke="#d9430d"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Tesla" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Pepsi" stroke="#1224c7" />
      <Line type="monotone" dataKey="Nestle" stroke="#285fd4" />
    </LineChart>
  );
}