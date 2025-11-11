import React, { useEffect, useState } from "react";

const PublicHabits = () => {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/public-habits")
      .then((res) => res.json())
      .then((data) => setHabits(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4 text-green-700">
        🌍 Public Habits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map((habit) => (
          <div key={habit._id} className="border p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">{habit.title}</h3>
            <p>{habit.description}</p>
            <small>By: {habit.userName}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicHabits;
