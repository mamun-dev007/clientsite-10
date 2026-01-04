import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFire, FaHeart } from "react-icons/fa";
import api from "../axios";
import Loading from "../components/Loading";

const FeaturedSection = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await api.get("/featured-habits");
        setFeatured(res.data);
      } catch (err) {
        console.error("Failed to fetch featured habits", err);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  if (loading) return <Loading />;

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
            Featured Public Habits
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Discover habits shared by the community and get inspired
          </p>
        </motion.div>

        {/* Habits Grid */}
        {featured.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No featured habits available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map((habit, index) => (
              <motion.div
                key={habit._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800
                           border border-gray-200 dark:border-gray-800
                           rounded-xl overflow-hidden
                           hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={habit.image || "https://via.placeholder.com/400x250"}
                  alt={habit.title}
                  className="w-full h-40 object-cover"
                />

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    {habit.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    Category: {habit.category}
                  </p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Created by <span className="font-medium">{habit.userName}</span>
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-1 text-orange-500">
                      <FaFire />
                      <span>{habit.streak || 0} day streak</span>
                    </div>

                    {/* Placeholder for likes */}
                    <div className="flex items-center gap-1 text-pink-500">
                      <FaHeart />
                      <span>{habit.likes || 0}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    to={`/habit-details/${habit._id}`}
                    className="
        block text-center
        bg-gradient-to-r from-[#255f85] to-[#1f4f6d]
        hover:from-[#133247] hover:to-[#133c55]
        text-white
        py-2 px-4
        rounded-md
        transition
        text-sm font-medium
      ">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedSection;
