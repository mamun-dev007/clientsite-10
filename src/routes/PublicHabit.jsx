import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaClock, FaArrowRight } from "react-icons/fa";
import Loading from "../components/Loading";

const categories = ["All", "Morning", "Work", "Fitness", "Evening", "Study"];

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const res = await api.get("/public-habits"); 
        setHabits(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.error("Failed to load public habits", error);
      } finally {
        setLoading(false);
      }
    };

    loadHabits();
  }, []);

  useEffect(() => {
    let result = [...habits];
    if (category !== "All") {
      result = result.filter((h) => h.category === category);
    }
    if (search.trim()) {
      result = result.filter((h) =>
        h.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
    setCurrentPage(1);
  }, [search, category, habits]);


  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <Loading></Loading>
  }

  return (
    <section className="min-h-screen py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-5">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-400">
            Public Habits
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Explore habits shared by the community
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-10">

          
          <input
            type="text"
            placeholder="Search habits..."
            className="w-full px-4 py-3 rounded-md border
                       dark:border-gray-700
                       bg-white dark:bg-gray-800
                       text-gray-800 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

       
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-md border
                       dark:border-gray-700
                       bg-white dark:bg-gray-800
                       text-gray-800 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          
          
        </div>

        {paginatedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedData.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800
                           border dark:border-gray-800
                           rounded-xl shadow-sm hover:shadow-lg
                           transition overflow-hidden flex flex-col"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />

                <div className="p-5 flex flex-col flex-grow text-gray-800 dark:text-white">

                  <h3 className="text-xl font-semibold mb-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-blue-400" />
                      <span>{item.userName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-blue-400" />
                      <span>{item.userEmail}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-blue-400" />
                      <span>{item.reminderTime}</span>
                    </div>
                  </div>

                  <Link
                    to={`/habit-details/${item._id}`}
                    className="mt-auto w-full flex items-center justify-center gap-2
                               bg-gradient-to-r from-[#255f85] to-[#1f4f6d]
                               hover:from-[#133247] hover:to-[#133c55]
                               text-white py-2 rounded-md transition text-sm"
                  >
                    View Details <FaArrowRight />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No habits found matching your criteria.
          </p>
        )}

    {/* ===== PAGINATION ===== */}
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-12">

    {/* PREV BUTTON */}
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-md transition
        ${currentPage === 1
          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"}`}
    >
      Prev
    </button>

    {/* PAGE NUMBERS */}
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i}
        onClick={() => setCurrentPage(i + 1)}
        className={`px-4 py-2 rounded-md transition
          ${currentPage === i + 1
            ? "bg-blue-600 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"}`}
      >
        {i + 1}
      </button>
    ))}

    {/* NEXT BUTTON */}
    <button
      onClick={() =>
        setCurrentPage((p) => Math.min(p + 1, totalPages))
      }
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-md transition
        ${currentPage === totalPages
          ? "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"}`}
    >
      Next
    </button>
  </div>
)}


      </div>
    </section>
  );
};

export default PublicHabits;
