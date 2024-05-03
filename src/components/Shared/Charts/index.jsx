"use client";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarCharT = () => {
  const graphData = [
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
  ].map((i) => {
    const revenue = 500 + Math.random() * 2000;
    const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
    return {
      name: i,
      revenue,
      expectedRevenue,
      sales: Math.floor(Math.random() * 500),
    };
  });
  return (
    <div className="flex p-4 h-full flex-col shadow-lg rounded-lg">
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={100}
            height={100}
            data={graphData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />

            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#e3105a" radius={[6, 6, 0, 0]} />
            <Bar dataKey="revenue" fill="#9674f2" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expectedRevenue" fill="#03fcba" radius={[6, 6, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(BarCharT);
