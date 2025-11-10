import React, { useEffect, useState } from "react";
import HabitCard from "./HabitCard";

const FeaturedSection = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/habits?limit=6&sort=-createdAt")
      .then((res) => res.json())
      .then((data) => {
        setHabits(data);
        setLoading(false);
      });
  }, []);

  // if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Habits</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <HabitCard key={habit._id} habit={habit} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
