import React from "react";
import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaTasks,
  FaBookOpen,
  FaSpa,
  FaDumbbell,
} from "react-icons/fa";

const categories = [
  {
    icon: <FaHeartbeat size={26} />,
    title: "Health",
    desc: "Build habits for a healthier body and mind.",
  },
  {
    icon: <FaTasks size={26} />,
    title: "Productivity",
    desc: "Stay organized and get more done every day.",
  },
  {
    icon: <FaBookOpen size={26} />,
    title: "Learning",
    desc: "Develop skills and grow your knowledge daily.",
  },
  {
    icon: <FaSpa size={26} />,
    title: "Mindfulness",
    desc: "Reduce stress and improve mental clarity.",
  },
  {
    icon: <FaDumbbell size={26} />,
    title: "Fitness",
    desc: "Create routines for strength and physical fitness.",
  },
];

const HabitCategories = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Habit Categories
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Choose a category to get inspired and start building better habits
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white dark:bg-gray-800
                         border border-gray-200 dark:border-gray-800
                         rounded-xl p-6 text-center
                         hover:shadow-lg transition"
            >
              {/* Icon */}
              <div
                className="mx-auto mb-4 w-14 h-14 flex items-center justify-center
                           rounded-full bg-blue-100 text-blue-600
                           dark:bg-blue-500/10 dark:text-blue-400
                           group-hover:scale-110 transition"
              >
                {cat.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {cat.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {cat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HabitCategories;
