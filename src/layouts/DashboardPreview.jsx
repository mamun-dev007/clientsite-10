import { motion } from "framer-motion";
import {
  FaChartLine,
  FaCalendarCheck,
  FaFire,
  FaUserClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const highlights = [
  {
    icon: <FaCalendarCheck size={24} />,
    title: "Daily Habit Overview",
    desc: "See all your habits in one place with completion status.",
  },
  {
    icon: <FaFire size={24} />,
    title: "Streak Tracking",
    desc: "Monitor your consistency and maintain long streaks.",
  },
  {
    icon: <FaChartLine size={24} />,
    title: "Progress Analytics",
    desc: "Visual charts show weekly and monthly performance.",
  },
  {
    icon: <FaUserClock size={24} />,
    title: "Personal Insights",
    desc: "Understand patterns and improve habit success rate.",
  },
];


const DashboardSkeleton = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl p-6 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-4 w-10 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-12 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        {[1, 2, 3].map((_, i) => (
          <div key={i}>
            <div className="h-5 w-10 mx-auto bg-gray-300 dark:bg-gray-700 rounded mb-2" />
            <div className="h-3 w-16 mx-auto bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

const habits = [
  { name: "Reading", value: 70 },
  { name: "Exercise", value: 50 },
  { name: "Meditation", value: 90 },
  { name: "Journaling", value: 60 },
];

const DashboardPreviewCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 border dark:border-gray-800 rounded-2xl shadow-xl p-6 w-full">

      {/* ===== TITLE ===== */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Habit Progress Overview
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Your habit completion status for this week
        </p>
      </div>

      {/* ===== PROGRESS BARS ===== */}
      <div className="space-y-4 w-full">
        {habits.map((habit, i) => (
          <div key={i} className="w-full">
            {/* Label */}
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                {habit.name}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {habit.value}%
              </span>
            </div>

            {/* Bar */}
            <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded">
              <div
                className="h-3 bg-blue-500 rounded"
                style={{ width: `${habit.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-3 gap-4 mt-6 text-center">
        <div>
          <p className="text-lg font-bold text-gray-800 dark:text-white">12</p>
          <p className="text-xs text-gray-500">Habits</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-800 dark:text-white">28</p>
          <p className="text-xs text-gray-500">Day Streak</p>
        </div>
        <div>
          <p className="text-lg font-bold text-gray-800 dark:text-white">82%</p>
          <p className="text-xs text-gray-500">Success</p>
        </div>
      </div>
    </div>
  );
};

const DashboardPreview = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 xl:px-0 grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Personal Dashboard
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
            Once logged in, your dashboard becomes the control center for
            building and tracking habits with real-time insights.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white dark:bg-gray-800
                           border dark:border-gray-800
                           rounded-xl p-5 shadow-sm"
              >
                <div className="text-blue-600 dark:text-blue-400 mt-1">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              View My Dashboard
            </Link>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full"
        >

          {loading ? <DashboardSkeleton /> : <DashboardPreviewCard />}
        </motion.div>

      </div>
    </section>
  );
};

export default DashboardPreview;
