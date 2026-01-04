import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const storedProgress =
      JSON.parse(localStorage.getItem("habitProgress")) || {};

    const chartData = Object.entries(storedProgress).map(
      ([habitId, data]) => ({
        name: habitId.slice(0, 6) + "...",
        streak: data.streak || 0,
        completions: data.completionHistory?.length || 0,
      })
    );

    setProgressData(chartData);
  }, []);

  return (
    <div className="p-6 min-h-screen max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900">

      {/* ===== TITLE ===== */}
      <h2 className="text-3xl font-bold text-center mb-10 text-indigo-600 dark:text-indigo-400">
        Progress Analytics Dashboard
      </h2>

      {/* ===== EMPTY STATE ===== */}
      {progressData.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No habit progress data available yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">

          {/* ===== BAR CHART ===== */}
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-5 border dark:border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Weekly Habit Completions
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completions" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ===== LINE CHART ===== */}
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-5 border dark:border-gray-800">
            <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
              Streak Growth Overview
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="streak"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      )}
    </div>
  );
};

export default Dashboard;
