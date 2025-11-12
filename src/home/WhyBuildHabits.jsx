import React from "react";
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
  <section className="bg-gray-50 py-12">
    <h2 className="text-3xl font-bold text-center mb-8">Why Build Habits?</h2>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
      {benefits.map((b, i) => (
        <div key={i} className="bg-white p-6 rounded shadow text-center">
          <div className="mb-4 text-blue-600 justify-center flex">{b.icon}</div>
          <h3 className="font-semibold mb-2">{b.title}</h3>
          <p className="text-gray-600">{b.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyBuildHabits;

