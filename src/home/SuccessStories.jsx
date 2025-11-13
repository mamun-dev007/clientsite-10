import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
const SuccessStories = () => {
  const stories = [
    {
      name: "Dr. Novel",
      habit: "Morning Exercise",
      quote: "Now I wake up early and feel more energetic!",
      img: "https://i.ibb.co.com/DHBNGRfy/OIP.jpg",
      color: "bg-blue-200",
    },
    {
      name: "Scientist A Roman",
      habit: "Reading Daily",
      quote: "Consistency changed my mindset.",
      img: "https://i.ibb.co.com/8DDCKRwB/OIP-1.jpg",
      color: "bg-green-200",
    },
    {
      name: "Elina Noor",
      habit: "Meditation",
      quote: "Less stress, more focus — life feels balanced!",
      img: "https://i.ibb.co.com/20f4Xbvw/OIP-2.jpg",
      color: "bg-pink-200",
    },
    {
      name: "Rafi Islam",
      habit: "Healthy Eating",
      quote: "Discipline made me stronger mentally.",
      img: "https://i.ibb.co.com/tMWh9yHq/OIP-3.jpg",
      color: "bg-yellow-200",
    },
    {
      name: "Tania Sultana",
      habit: "Journaling",
      quote: "Writing daily helped me clear my thoughts.",
      img: "https://i.ibb.co.com/Kxdh02n9/OIP-4.jpg",
      color: "bg-purple-200",
    },
    {
      name: "Joy Sarkar",
      habit: "Night Reading",
      quote: "A page a day, a smarter me!",
      img: "https://i.ibb.co/GvPKPG7/avatar6.png",
      color: "bg-orange-200",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % stories.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const prev = (index - 1 + stories.length) % stories.length;
  const next = (index + 1) % stories.length;

  return (
    <section className="bg-blue-30 py-12 overflow-hidden">
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className=" text-center"
    >
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-10">
          Success Stories
        </h2>

        <div className="relative flex justify-center items-center h-[420px]">
          <div
            className={`absolute w-64 p-5 rounded-xl shadow-lg transition-all duration-1000 ease-in-out transform ${stories[prev].color} opacity-70 scale-90 translate-x-[-240px]`}
          >
            <img
              src={stories[prev].img}
              alt={stories[prev].name}
              className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
            />
            <h4 className="font-semibold text-lg">{stories[prev].name}</h4>
            <p className="text-sm italic text-gray-600">“{stories[prev].quote}”</p>
            <p className="text-xs text-blue-700 mt-2 font-medium">
              Habit: {stories[prev].habit}
            </p>
          </div>
          <div
            className={`absolute z-20 w-72 p-6 rounded-2xl shadow-xl transition-all duration-1000 ease-in-out transform ${stories[index].color} scale-110 h-[280px]`}
          >
            <img
              src={stories[index].img}
              alt={stories[index].name}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h4 className="font-semibold text-lg">{stories[index].name}</h4>
            <p className="text-sm italic text-gray-600">“{stories[index].quote}”</p>
            <p className="text-xs text-blue-700 mt-2 font-medium">
              Habit: {stories[index].habit}
            </p>
          </div>

          <div
            className={`absolute w-64 p-5 rounded-xl shadow-lg transition-all duration-1000 ease-in-out transform ${stories[next].color} opacity-70 scale-90 translate-x-[240px]`}
          >
            <img
              src={stories[next].img}
              alt={stories[next].name}
              className="w-16 h-16 rounded-full mx-auto mb-3 object-cover"
            />
            <h4 className="font-semibold text-lg">{stories[next].name}</h4>
            <p className="text-sm italic text-gray-600">“{stories[next].quote}”</p>
            <p className="text-xs text-blue-700 mt-2 font-medium">
              Habit: {stories[next].habit}
            </p>
          </div>
        </div>
      </div>
      </motion.section>
    </section>
  );
};

export default SuccessStories;
