import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaSmile, FaClock, FaChartLine, FaHeartbeat, FaUsers, FaBook, FaTrophy} from "react-icons/fa";


const benefits = [
{
    icon: <FaBrain size={30} />,
    title: "Better Focus",
    desc: "Stay concentrated on your goals and reduce distractions.",
  },
  {
    icon: <FaSmile size={30} />,
    title: "Reduced Stress",
    desc: "Healthy routines calm your mind and improve well-being.",
  },
  {
    icon: <FaClock size={30} />,
    title: "Time Management",
    desc: "Organize your day efficiently and reclaim wasted hours.",
  },
  {
    icon: <FaChartLine size={30} />,
    title: "Track Progress",
    desc: "Measure your growth daily and celebrate small wins.",
  },
  {
    icon: <FaHeartbeat size={30} />,
    title: "Improved Health",
    desc: "Consistent habits boost physical and mental health.",
  },
  {
    icon: <FaUsers size={30} />,
    title: "Better Relationships",
    desc: "Reliable routines make you more present for others.",
  },
  {
    icon: <FaBook size={30} />,
    title: "Lifelong Learning",
    desc: "Daily practice compounds into real skill growth.",
  },
  {
    icon: <FaTrophy size={30} />,
    title: "Achievement Mindset",
    desc: "Small wins build confidence and long-term success.",
  },

];

const WhyBuildHabits  = () => (
   <section className="py-16 bg-white dark:bg-gray-900">
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
            How It Works
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Build better habits in just four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="relative bg-gray-50 dark:bg-gray-800
                         border border-gray-200 dark:border-gray-800
                         rounded-xl p-6 text-center"
            >
              

              {/* Icon */}
              <div className="mb-4 flex justify-center text-blue-600 dark:text-blue-400">
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
);

export default WhyBuildHabits;

