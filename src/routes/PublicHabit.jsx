import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch("http://localhost:3000/api/public-habits")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = habits;

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

  return (
    <div className="max-w-5xl pt-10 mx-auto px-5">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
         Public Habits
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 ">
        <input
          type="text"
          placeholder="Search habits..."
          className="border px-3 py-2 rounded  w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded w-1/4"
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
              className="border border-blue-200 rounded-lg p-4 shadow hover:shadow-md transition "
            >
              <h3 className="font-semibold text-lg"><img
        src={habit.image}
        alt={habit.title}
        className="w-full h-52  rounded-t-xl"
      /></h3>
              <h3 className="font-semibold text-lg">{habit.title}</h3>
              <p className="text-sm text-gray-600">{habit.category}</p>
             <Link
                  to={`/habit-details/${habit._id}`}
                  className="mt-3  bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm text-center items-center justify-center mx-auto flex "
                >
                  See Details
                </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No habits found</p>
        )}
      </div>
    </div>
  );
};

export default PublicHabits;
