import React from "react";
import { FaBrain, FaChartLine, FaClock, FaSmile } from "react-icons/fa";


const benefits = [
  { icon: <FaBrain size={30} />, title: "Better Focus", desc: "Stay concentrated on your goals." },
  { icon: <FaSmile size={30} />, title: "Reduced Stress", desc: "Healthy habits improve mental health." },
  { icon: <FaClock size={30} />, title: "Time Management", desc: "Organize your day efficiently." },
  { icon: <FaChartLine size={30} />, title: "Track Progress", desc: "Measure your growth daily." },
];

const WhyBuildHabits  = () => (
  <section className="bg-gray-50 py-12">
    <h2 className="text-3xl font-bold text-center mb-8">Why Build Habits?</h2>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
      {benefits.map((b, i) => (
        <div key={i} className="bg-white p-6 rounded shadow text-center">
          <div className="mb-4 text-blue-600">{b.icon}</div>
          <h3 className="font-semibold mb-2">{b.title}</h3>
          <p className="text-gray-600">{b.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default WhyBuildHabits;

