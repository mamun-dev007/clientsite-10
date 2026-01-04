import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const members = [
  {
    img: "https://i.ibb.co.com/5hptj0pd/IMG-20251015-WA0016.jpg",
    name: "Arif H.",
    text: "Completed a 30-day meditation streak 🧘",
  },
  {
    img: "https://i.ibb.co.com/5hptj0pd/IMG-20251015-WA0016.jpg",
    name: "Sadia R.",
    text: "Built reading consistency — 45 days strong 📚",
  },
  {
    img: "https://i.ibb.co.com/5hptj0pd/IMG-20251015-WA0016.jpg",
    name: "Tanvir K.",
    text: "Morning workouts became my daily routine 💪",
  },
];

const Community = () => {
  return (
    <section className="py-20 bg-blue-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-5 xl:px-0 text-center"
      >
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">
          Join Our Growing Community
        </h2>

        <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Thousands of users are already improving their lives through
          consistent daily habits. Be part of a supportive community that
          celebrates progress together.
        </p>

        {/* Community Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {members.map((user, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white dark:bg-gray-800
                         border dark:border-gray-800
                         rounded-xl shadow-sm hover:shadow-lg
                         transition"
            >
              <img
                src={user.img}
                alt={user.name}
                className="w-16 h-16 rounded-full mx-auto mb-4
                           object-cover border-2 border-blue-500"
              />
              <h4 className="font-semibold text-lg text-gray-800 dark:text-white">
                {user.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                {user.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center gap-4">
          <Link
            to="/publichabit"
            className="px-6 py-3 bg-blue-600 text-white
                       rounded-md hover:bg-blue-700 transition font-medium"
          >
            Explore Community
          </Link>

          <Link
            to="/"
            className="px-6 py-3 border border-blue-600 text-blue-600
                       dark:text-blue-400 dark:border-blue-400
                       rounded-md hover:bg-blue-600 hover:text-white
                       transition font-medium"
          >
            Join Now
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Community;
