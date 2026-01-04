import React from "react";
import { motion } from "framer-motion";
import { CountUp } from "react-countup";
import { FaChartLine, FaUsers, FaCheckCircle } from "react-icons/fa";
import useCountUp from "../hooks/useCountUp";

const stats = [
  {
    icon: <FaChartLine size={28} />,
    value: 10000,
    suffix: "+",
    label: "Habits Tracked",
  },
  {
    icon: <FaUsers size={28} />,
    value: 5000,
    suffix: "+",
    label: "Active Users",
  },
  {
    icon: <FaCheckCircle size={28} />,
    value: 80,
    suffix: "%",
    label: "Success Rate",
  },
];


const StatisticsSection = () => {
  return (
      <section className="py-20 bg-blue-600 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Impact So Far
          </h2>
          <p className="mt-3 text-blue-100">
            Real numbers that show the power of habits
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const count = useCountUp (stat.value, 2000);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center bg-white dark:bg-gray-800 backdrop-blur-md
                           rounded-xl p-8 border border-white/20"
              >
                <div className="flex justify-center mb-4 text-white">
                  {stat.icon}
                </div>

                <h3 className="text-4xl font-bold text-white mb-2">
                  {count}
                  {stat.suffix}
                </h3>

                <p className="text-blue-100 text-sm">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
