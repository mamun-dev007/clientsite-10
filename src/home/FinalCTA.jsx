import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 bg-blue-50 dark:bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-5 xl:px-0 text-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Start Building Better Habits Today
          </h2>

          {/* Sub text */}
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
            Consistency beats motivation. Track your habits, build streaks,
            and transform your daily routine into long-term success.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/add-habit"
              className="px-8 py-4 bg-white text-blue-700
                         rounded-md font-semibold
                         hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/publichabit"
              className="px-8 py-4 border border-white
                         rounded-md font-semibold
                         hover:bg-white hover:text-blue-700 transition"
            >
              Join Community
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTA;
