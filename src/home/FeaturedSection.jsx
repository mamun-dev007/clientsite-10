import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

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
    <div className="max-w-6xl mx-auto px-4 py-10">
      
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-700">
         Featured Habits
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {featured.map((habit) => (
          <div
            key={habit._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition bg-white"
          >
            <img
              src={habit.image || "https://via.placeholder.com/300x200"}
              alt={habit.title}
              className="rounded-md mb-3 w-full h-40 object-cover"
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
      </div>
      </div>
  );
};

export default FeaturedSection;
