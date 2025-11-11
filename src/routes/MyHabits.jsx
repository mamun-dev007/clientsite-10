import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/api/my-habits/${user.email}`)
      .then((res) => res.json())
      .then((data) => setHabits(data));
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">
        🧍‍♂️ My Habits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map((habit) => (
          <div key={habit._id} className="border p-4 rounded-lg shadow">
            <h3 className="font-semibold text-lg">{habit.title}</h3>
            <p>{habit.description}</p>
            <small>Category: {habit.category}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHabits;
