import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedToday, setCompletedToday] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const storedProgress = JSON.parse(
      localStorage.getItem("habitProgress") || "{}"
    );
    const storedHabits = JSON.parse(
      localStorage.getItem("completedHabits") || "{}"
    );

    fetch(
      `https://backend-10-lime.vercel.app/api/habits/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Attach streak & completion history if stored locally
        if (storedProgress[id]) {
          data.streak = storedProgress[id].streak;
          data.completionHistory = storedProgress[id].completionHistory;
        }

        setHabit(data);
      })
      .finally(() => setLoading(false));

    if (storedHabits[id] === today) {
      setCompletedToday(true);
    }
  }, [id, today]);

  const handleComplete = async () => {
    if (completedToday) {
      toast.info("Already completed today!");
      return;
    }

    try {
      const res = await api.patch(
        `/habits/complete/${id}`
      );

      const data = res.data;

      if (data.modifiedCount > 0 || data.success) {
        toast.success("Habit marked complete for today!");

        const updatedHabit = {
          ...habit,
          streak: (habit.streak || 0) + 1,
          completionHistory: [...(habit.completionHistory || []), today],
        };

        setHabit(updatedHabit);
        setCompletedToday(true);

        // Store progress locally
        const storedProgress = JSON.parse(
          localStorage.getItem("habitProgress") || "{}"
        );
        storedProgress[id] = {
          streak: updatedHabit.streak,
          completionHistory: updatedHabit.completionHistory,
        };
        localStorage.setItem("habitProgress", JSON.stringify(storedProgress));

        // Store today's completion
        const storedHabits = JSON.parse(
          localStorage.getItem("completedHabits") || "{}"
        );
        storedHabits[id] = today;
        localStorage.setItem("completedHabits", JSON.stringify(storedHabits));
      } else {
        toast.info("Already marked complete today!");
      }
    } catch (err) {
      toast.error("Failed to mark as complete!");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading habit details...</p>;

  if (!habit)
    return <p className="text-center text-red-500 mt-10">Habit not found!</p>;

  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  });

  const completedDays =
    habit.completionHistory?.filter((d) => last30Days.includes(d)).length || 0;

  const progress = Math.round((completedDays / 30) * 100);

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow-lg overflow-hidden border">
      <img
        src={habit.image || "https://via.placeholder.com/500"}
        alt={habit.title}
        className="w-11/12 mx-auto mt-5 rounded-t-2xl h-64 object-cover"
      />

      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-blue-700">{habit.title}</h2>

          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            🔥 Streak: {habit.streak || 0}
          </span>
        </div>

        <p className="text-gray-700 mb-4">{habit.description}</p>
        <p className="text-sm text-gray-500 mb-1">
          🏷 Category: <span className="font-medium">{habit.category}</span>
        </p>

        <p className="text-sm text-gray-500 mb-3">
          👤 Creator: {habit.userName || "Unknown"}
        </p>

        <div className="mb-4">
          <label className="text-sm font-medium">Progress (last 30 days)</label>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-1">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                progress === 100 ? "bg-green-600" : "bg-blue-600"
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-sm text-gray-600 mt-1">
            {progress}% completed
            {progress === 100 && " 🎉 Goal Achieved!"}
          </p>
        </div>

        <button
          onClick={handleComplete}
          disabled={completedToday || progress === 100}
          className={`mt-4 w-full py-2 rounded-md transition ${
            completedToday || progress === 100
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {completedToday
            ? "Already Completed Today"
            : progress === 100
            ? "All Done! 🎯"
            : "Mark Complete"}
        </button>
      </div>
    </div>
  );
};

export default HabitDetails;
