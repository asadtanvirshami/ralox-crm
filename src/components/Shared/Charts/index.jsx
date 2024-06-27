"use client";
import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const BarCharT = ({ saleGraphValue }) => {
  return (
    <div className="flex p-4 h-full flex-col shadow-lg rounded-lg">
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={saleGraphValue}>
            <XAxis
              dataKey="month"
              stroke="#red"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Bar
              dataKey="total_sales"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              // className=" fill-rose-400"
              className=" fill-rose-400"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default React.memo(BarCharT);
