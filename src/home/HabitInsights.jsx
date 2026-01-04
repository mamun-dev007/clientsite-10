import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const blogs = [
  {
    title: "How to Build Habits That Stick",
    excerpt:
      "Learn science-backed techniques to create habits that last long-term without burnout.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    link: "https://zenhabits.net/",
  },
  {
    title: "Why Streaks Matter More Than Motivation",
    excerpt:
      "Discover how streaks create momentum and help you stay consistent even on low-energy days.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    link: "https://jamesclear.com/habit-streaks",
  },
  {
    title: "Small Habits, Big Results",
    excerpt:
      "Understand how tiny daily actions compound into massive personal growth over time.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80",
    link: "https://jamesclear.com/atomic-habits",
  },
];


const HabitInsights = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5 xl:px-0">

        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Habit Insights & Tips
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Learn proven strategies to build consistency and improve your daily habits
          </p>
        </motion.div>

        {/* ===== BLOG CARDS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.a
  href={blog.link}
  target="_blank"
  rel="noopener noreferrer"
  key={index}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ delay: index * 0.1 }}
  viewport={{ once: true }}
  className="bg-gray-50 dark:bg-gray-800
             border dark:border-gray-800
             rounded-xl overflow-hidden
             shadow-sm hover:shadow-lg transition block"
>
              {/* Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                  {blog.excerpt}
                </p>

               <a
  href={blog.link}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 dark:text-blue-400 font-medium text-sm hover:underline"
>
  Read more →
</a>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HabitInsights;
