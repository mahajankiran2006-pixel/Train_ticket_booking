// DashboardCharts.jsx
import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./dash.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardCharts({ stats }) {
  // Bar Chart - System Overview
  const barData = {
    labels: ["Trains", "Users", "Bookings"],
    datasets: [
      {
        label: "Count",
        data: [stats.totalTrains, stats.totalUsers, stats.totalBookings],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "System Overview", font: { size: 18 } },
    },
  };

  // Pie Chart - Proportions
  const pieData = {
    labels: ["Trains", "Users", "Bookings"],
    datasets: [
      {
        label: "Proportion",
        data: [stats.totalTrains, stats.totalUsers, stats.totalBookings],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Proportion of System Entities" },
    },
  };

  // Line Chart - Sample Trend (for illustration)
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [12, 19, 8, 17, 25, 20],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
      },
      {
        label: "New Bookings",
        data: [8, 15, 12, 10, 18, 22],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Monthly Trends" },
    },
  };

  return (
    <div className="dashboard-charts-wrapper">
      <div className="chart-card">
        <Bar data={barData} options={barOptions} />
      </div>
      <div className="chart-card">
        <Pie data={pieData} options={pieOptions} />
      </div>
      <div className="chart-card">
        <Line data={lineData} options={lineOptions} />
      </div>
    </div>
  );
}
