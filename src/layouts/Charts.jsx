import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import api from "../axios";

const Charts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/dashboard/chart-data").then(res => setData(res.data));
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow mb-8">
      <h3 className="mb-4 font-semibold">Habit Completion (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
