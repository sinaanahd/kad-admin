import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const studentData = [
  { date: "2023-08-29", students: 10 },
  { date: "2023-09-01", students: 0 },
  { date: "2023-09-02", students: 20 },
  { date: "2023-09-03", students: 0 },
  { date: "2023-09-04", students: 25 },
  { date: "2023-09-05", students: 0 },
  { date: "2023-09-06", students: 28 },
  { date: "2023-09-07", students: 0 },
  { date: "2023-09-08", students: 8 },
  { date: "2023-09-08", students: 0 },
  // Add more data for the past days
];

const getLastThreeDaysData = (data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(today.getDate() - 2); // Go back three days
  return data;
  // return data.filter((entry) => new Date(entry.date) >= threeDaysAgo);
};

const StudentSignupChart = () => {
  const lastThreeDaysData = getLastThreeDaysData(studentData);

  return (
    <div className="chart-container">
      <h2>Student Signups in the Last Three Days</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={lastThreeDaysData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="students" stroke="#000" dot={false} />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StudentSignupChart;
