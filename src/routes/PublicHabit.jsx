import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const res = await api.get("/public-habits");
        console.log("RESPONSE:", res.data);
        setHabits(res.data);
        setFiltered(res.data);
      } catch (error) {
        console.log("ERROR:", error.response?.status, error.response?.data);
        console.log("Failed to load habits", error);
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

    if (search.trim() !== "") {
      result = result.filter((h) =>
        h.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [category, search, habits]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-5xl pt-10 mx-auto px-5">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Public Habits
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search habits..."
          className="border px-3 py-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded sm:w-1/3 w-full"
        >
          <option value="All">All Categories</option>
          <option value="Morning">Morning</option>
          <option value="Work">Work</option>
          <option value="Fitness">Fitness</option>
          <option value="Evening">Evening</option>
          <option value="Study">Study</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((habit) => (
            <div
              key={habit._id}
              className="border border-blue-200 rounded-lg shadow hover:shadow-md transition"
            >
              <img
                src={habit.image}
                alt={habit.title}
                className="w-full h-52 object-cover rounded-t-lg"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{habit.title}</h3>
                <p className="text-sm text-gray-600">{habit.category}</p>

                <Link
                  to={`/habit-details/${habit._id}`}
                  className="mt-3 block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm text-center"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No habits found
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicHabits;
