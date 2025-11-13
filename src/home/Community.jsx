import React from 'react';
import { motion } from "framer-motion";
const Community = () => {
    return (
        <div>
            <section className="py-16 bg-white">
            <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className=" text-center"
    >
  <div className="max-w-6xl mx-auto text-center px-4">
    <h2 className="text-3xl font-bold text-blue-700 mb-8"> Join Our Growing Community</h2>
    <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
      Thousands of users are already improving their lives through consistent daily habits.
      Become a part of a motivated and supportive community that celebrates progress together.
    </p>

    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
      {[
        { img: "https://i.ibb.co.com/5hptj0pd/IMG-20251015-WA0016.jpg", name: "Arif H.", text: "Completed 30-day meditation streak! " },
        { img: "https://i.ibb.co.com/5hptj0pd/IMG-20251015-WA0016.jpg", name: "Sadia R.", text: "Built reading consistency — 45 days strong! " },
        { img: "https://i.ibb.co.com/5hptj0pd/IMG-20251015-WA0016.jpg", name: "Tanvir K.", text: "Morning workouts became my routine. " },
      ].map((user, i) => (
        <div key={i} className="p-6 bg-blue-50 rounded-xl shadow hover:bg-blue-100 transition-all">
          <img
            src={user.img}
            alt={user.name}
            className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-blue-400"
          />
          <h4 className="font-semibold text-lg">{user.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{user.text}</p>
        </div>
      ))}
    </div>
  </div>
  </motion.section>
</section>

        </div>
    );
};

export default Community;