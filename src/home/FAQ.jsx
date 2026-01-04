import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Is Habit Tracker free to use?",
    answer:
      "Yes, Habit Tracker is completely free. You can create, track, and manage your habits without any cost.",
  },
  {
    question: "Can I make my habits public?",
    answer:
      "Absolutely! You can choose to make habits public so others can see and get inspired by your progress.",
  },
  {
    question: "How does the streak system work?",
    answer:
      "Every time you complete a habit for a day, your streak increases by one. Missing a day will reset the streak.",
  },
  {
    question: "Can I track multiple habits at once?",
    answer:
      "Yes, you can track as many habits as you like, each with its own streak and progress analytics.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. Your personal habit data is private by default and securely stored. Public habits are shared only if you choose.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-5 xl:px-0">

        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Everything you need to know before getting started
          </p>
        </motion.div>

        {/* ===== FAQ LIST ===== */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800
                         border dark:border-gray-800
                         rounded-xl overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between
                           px-6 py-4 text-left
                           text-gray-800 dark:text-white
                           font-medium"
              >
                {faq.question}
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-600 dark:text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
