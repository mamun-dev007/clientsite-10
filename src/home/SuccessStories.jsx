import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const stories = [
  {
    name: "Dr. Novel",
    habit: "Morning Exercise",
    quote: "Now I wake up early and feel more energetic!",
    img: "https://i.ibb.co/DHBNGRfy/OIP.jpg",
  },
  {
    name: "Scientist A Roman",
    habit: "Reading Daily",
    quote: "Consistency changed my mindset.",
    img: "https://i.ibb.co/8DDCKRwB/OIP-1.jpg",
  },
  {
    name: "Elina Noor",
    habit: "Meditation",
    quote: "Less stress, more focus — life feels balanced!",
    img: "https://i.ibb.co/20f4Xbvw/OIP-2.jpg",
  },
  {
    name: "Rafi Islam",
    habit: "Healthy Eating",
    quote: "Discipline made me stronger mentally.",
    img: "https://i.ibb.co/tMWh9yHq/OIP-3.jpg",
  },
  {
    name: "Tania Sultana",
    habit: "Journaling",
    quote: "Writing daily helped me clear my thoughts.",
    img: "https://i.ibb.co/Kxdh02n9/OIP-4.jpg",
  },
];

const SuccessStories = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % stories.length),
      3500
    );
    return () => clearInterval(timer);
  }, []);

  const prev = (index - 1 + stories.length) % stories.length;
  const next = (index + 1) % stories.length;

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Success Stories
        </h2>

        {/* Desktop */}
        <div className="relative hidden md:flex justify-center items-center h-[380px]">
          {[prev, index, next].map((i, pos) => (
            <div
              key={i}
              className={`absolute transition-all duration-700
                ${pos === 1 ? "scale-110 z-20" : "scale-90 opacity-60"}
                ${pos === 0 ? "-translate-x-64" : ""}
                ${pos === 2 ? "translate-x-64" : ""}
                bg-white dark:bg-gray-800
                border dark:border-gray-800
                rounded-xl shadow-lg p-6 w-72`}
            >
              <img
                src={stories[i].img}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
              />
              <h4 className="font-semibold text-gray-800 dark:text-white">
                {stories[i].name}
              </h4>
              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                “{stories[i].quote}”
              </p>
              <p className="text-xs text-blue-600 mt-2">
                Habit: {stories[i].habit}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 max-w-sm mx-auto">
          <img
            src={stories[index].img}
            className="w-16 h-16 rounded-full mx-auto mb-3"
          />
          <h4 className="font-semibold text-gray-800 dark:text-white">
            {stories[index].name}
          </h4>
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            “{stories[index].quote}”
          </p>
          <p className="text-xs text-blue-600 mt-2">
            Habit: {stories[index].habit}
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default SuccessStories;
