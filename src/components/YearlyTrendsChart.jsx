import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const YearlyTrendsChart = ({ product, yearlyData }) => {
  const chartData = Object.entries(yearlyData).map(([year, payment]) => ({
    year,
    payment,
  }));

  return (
    <div>
      <h3>{product}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Legend />
          <Line
            type="monotone"
            dataKey="payment"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


