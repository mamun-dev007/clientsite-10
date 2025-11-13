import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { motion } from "framer-motion";

const FeaturedSection = () => {
 const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/featured-habits")
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading)
    return (
      <Loading></Loading>
    );

  return (
    <div className="max-w-7xl mx-auto  py-10">
      
<motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className=" text-center"
    >
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
         Featured Habits
      </h2>
      <div className="grid px-5 xl:px-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
        {featured.map((habit) => (
          <div
            key={habit._id}
            className="border border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition bg-gray-100"
          >
            <img
              src={habit.image || "https://via.placeholder.com/300x200"}
              alt={habit.title}
              className="rounded-t-md mb-3 w-full h-40 object-cover"
            />
            <h3 className="text-lg font-semibold mb-2">{habit.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{habit.category}</p>
            <p className="text-gray-700 text-sm mb-2">
              <span className="font-semibold">By:</span> {habit.userName}
            </p>
            <Link
                  to={`/habit-details/${habit._id}`}
                  className="mt-3  bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm text-center items-center justify-center mx-auto flex "
                >
                  See Details
                </Link>
          </div>
        ))}
      </div></motion.section>
      </div>







  );
};

export default FeaturedSection;
