import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const HabitCard = ({ habit }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">

  
      <h3 className="text-xl font-semibold mb-2">{habit.name}</h3>
      <p className="text-gray-600 mb-2">{habit.description}</p>
      <img
        src={habit.image || "https://via.placeholder.com/500"}
        alt={habit.title}
        className="w-full h-64 object-cover"
      />
      {habit.isPublic && <p className="text-sm text-gray-500">By: {habit.creatorName}</p>}
      <Link
        to={user ? `/habit/${habit._id}` : "/login"}
        className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default HabitCard;
