import { motion } from "framer-motion";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    toast.success("Subscribed successfully! 🎉");

    setEmail("");
  };

  return (
    <section className="py-20 bg-blue-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-5 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800
                     border dark:border-gray-800
                     rounded-2xl shadow-lg p-10 text-center"
        >
          {/* Icon */}
          <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400">
            <FaEnvelopeOpenText size={40} />
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Stay Motivated Every Day
          </h2>

          {/* Motivation text */}
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Get weekly habit-building tips, motivation, and success stories
            delivered straight to your inbox.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full sm:w-80 px-4 py-3
                         rounded-md border dark:border-gray-700
                         bg-gray-50 dark:bg-gray-900
                         text-gray-800 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white
                         rounded-md hover:bg-blue-700
                         transition font-medium"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
