import { FaBullseye, FaCheckCircle, FaFire, FaHeartbeat } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../axios";
const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalHabits: 0,
    completedToday: 0,
    currentStreak: 0,
    totalCompleted: 0,
  });

  useEffect(() => {
    // 🔁 Backend API (example)
    api.get("/dashboard/overview").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <section className="space-y-8">
      {/* ===== WELCOME BANNER ===== */}
      <div
        className="rounded-2xl p-6 md:p-8 text-white
                   bg-gradient-to-r from-[#255f85] to-[#1f4f6d]"
      >
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          Welcome back, {user?.displayName || "User"}! 👋
        </h2>
        <p className="mt-1 text-white/90">
          Here's your habit tracking overview for today
        </p>
      </div>

      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Total Habits */}
        <StatCard
          icon={<FaBullseye />}
          title="Total Habits"
          value={stats.totalHabits}
          color="bg-blue-600"
        />

        {/* Completed Today */}
        <StatCard
          icon={<FaCheckCircle />}
          title="Completed Today"
          value={stats.completedToday}
          color="bg-green-600"
        />

        {/* Current Streak */}
        <StatCard
          icon={<FaFire />}
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          color="bg-orange-500"
        />

        {/* Total Completed */}
        <StatCard
          icon={<FaHeartbeat />}
          title="Total Completed"
          value={stats.totalCompleted}
          color="bg-purple-600"
        />
      </div>
    </section>
  );
};

export default DashboardOverview;

/* ===== CARD COMPONENT ===== */
const StatCard = ({ icon, title, value, color }) => {
  return (
    <div
      className="rounded-xl p-6 bg-[#0f172a]/90 text-white
                 border border-white/10 backdrop-blur
                 hover:scale-[1.02] transition"
    >
      <div
        className={`w-12 h-12 flex items-center justify-center
                    rounded-lg mb-4 ${color}`}
      >
        <span className="text-xl">{icon}</span>
      </div>

      <p className="text-sm text-gray-300">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
};
