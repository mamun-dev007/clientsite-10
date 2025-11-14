import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import api from "../axios";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const getCompletedToday = () => {
    return JSON.parse(localStorage.getItem("completedHabits") || "{}");
  };

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://backend-10-lime.vercel.app/api/my-habits/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        const storedProgress = JSON.parse(localStorage.getItem("habitProgress") || "{}");
        const storedCompleted = getCompletedToday();

        const mergedData = data.map((habit) => {
          const completedToday = storedCompleted[habit._id] === today;
          return {
            ...habit,
            streak: storedProgress[habit._id]?.streak || habit.streak || 0,
            completedToday,
          };
        });

        setHabits(mergedData);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load habits!");
      })
      .finally(() => setLoading(false));
  }, [user]);

  const handleComplete = async (id) => {
    const habit = habits.find((h) => h._id === id);

    if (habit?.completedToday) {
      toast.info("Already completed today!");
      return;
    }

    try {
     const res = await api.patch(`/habits/complete/${id}`
    );

    const data = res.data;

      if (data.modifiedCount > 0) {
        toast.success("Habit marked complete!");

        const updatedHabits = habits.map((h) =>
          h._id === id
            ? { ...h, streak: (h.streak || 0) + 1, completedToday: true }
            : h
        );
        setHabits(updatedHabits);

        const storedProgress = JSON.parse(localStorage.getItem("habitProgress") || "{}");
        storedProgress[id] = { streak: (habit.streak || 0) + 1 };
        localStorage.setItem("habitProgress", JSON.stringify(storedProgress));

        const storedCompleted = getCompletedToday();
        storedCompleted[id] = today;
        localStorage.setItem("completedHabits", JSON.stringify(storedCompleted));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update streak!");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(
      `/habits/${id}`
    );

    const data = res.data;


      if (data.deletedCount > 0) {
        setHabits(habits.filter((habit) => habit._id !== id));
        toast.success("Habit deleted!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete habit!");
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  const openConfirmPopup = (id) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  if (loading) return <p className="text-center mt-10">Loading habits...</p>;

  return (
    <div className="max-w-7xl mx-auto pt-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">My Habits</h2>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500">No habits added yet.</p>
      ) : (
        <div className="overflow-x-auto mx-5">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border text-center">Streak</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {habits.map((habit) => (
                <tr key={habit._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{habit.title}</td>
                  <td className="p-2 border">{habit.category}</td>
                  <td className="p-2 border text-center">{habit.streak}</td>
                  <td className="p-2 border">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => handleComplete(habit._id)}
                      disabled={habit.completedToday}
                      className={`px-2 py-1 rounded text-white my-1 ${
                        habit.completedToday
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {habit.completedToday ? "Completed ✅" : "Complete"}
                    </button>

                    <button
                      onClick={() => navigate(`/updatehabit/${habit._id}`)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 my-1"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => openConfirmPopup(habit._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 my-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className=" rounded-lg shadow-lg p-6 w-96 bg-green-100 text-center">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this habit?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(selectedId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHabits;
