import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const Dashboard = () => {
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const storedProgress = JSON.parse(localStorage.getItem("habitProgress")) || {};
    const chartData = Object.entries(storedProgress).map(([habitId, data]) => ({
      name: habitId.slice(0, 6) + "...",
      streak: data.streak || 0,
      completions: data.completionHistory?.length || 0,
    }));
    setProgressData(chartData);
  }, []);

  return (
    <div className="p-6 min-h-screen  max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-600">
        📈 Progress Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1  gap-8">

        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Weekly Habit Completions
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completions" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-4">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Streak Growth Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="streak" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
