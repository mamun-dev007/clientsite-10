import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../axios";
import Loading from "../components/Loading";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const getCompletedToday = () =>
    JSON.parse(localStorage.getItem("completedHabits") || "{}");

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://backend-10-lime.vercel.app/api/my-habits/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        const storedProgress = JSON.parse(
          localStorage.getItem("habitProgress") || "{}"
        );
        const storedCompleted = getCompletedToday();

        const merged = data.map((h) => ({
          ...h,
          streak: storedProgress[h._id]?.streak || h.streak || 0,
          completedToday: storedCompleted[h._id] === today,
        }));

        setHabits(merged);
      })
      .catch(() => toast.error("Failed to load habits"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleComplete = async (id) => {
    const habit = habits.find((h) => h._id === id);
    if (habit.completedToday) return toast.info("Already completed today");

    try {
      const res = await api.patch(`/habits/complete/${id}`);
      if (res.data.modifiedCount > 0) {
        const updated = habits.map((h) =>
          h._id === id
            ? { ...h, streak: h.streak + 1, completedToday: true }
            : h
        );
        setHabits(updated);

        const progress = JSON.parse(
          localStorage.getItem("habitProgress") || "{}"
        );
        progress[id] = { streak: habit.streak + 1 };
        localStorage.setItem("habitProgress", JSON.stringify(progress));

        const completed = getCompletedToday();
        completed[id] = today;
        localStorage.setItem("completedHabits", JSON.stringify(completed));

        toast.success("Habit completed!");
      }
    } catch {
      toast.error("Failed to update habit");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/habits/${selectedId}`);
      if (res.data.deletedCount > 0) {
        setHabits(habits.filter((h) => h._id !== selectedId));
        toast.success("Habit deleted");
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  if (loading)
    return <Loading></Loading>

  return (
    <div className="bg-gray-900  py-20">

    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600 dark:text-blue-400">
        My Habits
      </h2>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500">No habits added yet</p>
      ) : (
        <>
<div className="hidden md:block overflow-x-auto rounded-xl border border-white/10 bg-[#020817]">
  <table className="w-full text-left text-sm text-gray-300">
    <thead className="bg-[#0f172a] text-gray-400 uppercase tracking-wide">
      <tr>
        <th className="px-6 py-4">Habit</th>
        <th className="px-6 py-4">Category</th>
        <th className="px-6 py-4 text-center">Streak</th>
        <th className="px-6 py-4">Created</th>
        <th className="px-6 py-4 text-center">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-white/10">
      {habits.map((h) => (
        <tr
          key={h._id}
          className="hover:bg-white/5 transition"
        >
          {/* Title */}
          <td className="px-6 py-4 font-medium text-white">
            {h.title}
          </td>

          {/* Category */}
          <td className="px-6 py-4">
            <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400">
              {h.category}
            </span>
          </td>

          {/* Streak */}
          <td className="px-6 py-4 text-center">
            🔥 <span className="font-semibold">{h.streak}</span>
          </td>

          {/* Date */}
          <td className="px-6 py-4">
            {new Date(h.createdAt).toLocaleDateString()}
          </td>

          {/* Actions */}
          <td className="px-6 py-4 text-center space-x-2">
            <button
              onClick={() => handleComplete(h._id)}
              disabled={h.completedToday}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition
                ${
                  h.completedToday
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }
              `}
            >
              {h.completedToday ? "Completed" : "Complete"}
            </button>

            <button
              onClick={() => navigate(`/updatehabit/${h._id}`)}
              className="px-3 py-1.5 rounded-md text-xs font-medium
                         bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Update
            </button>

            <button
              onClick={() => {
                setSelectedId(h._id);
                setShowConfirm(true);
              }}
              className="px-3 py-1.5 rounded-md text-xs font-medium
                         bg-red-600 hover:bg-red-700 text-white transition"
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          <div className="md:hidden space-y-4">
            {habits.map((h) => (
              <div
                key={h._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700"
              >
                <h3 className="font-semibold text-lg mb-1">{h.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{h.category}</p>

                <div className="flex justify-between text-sm mb-3">
                  <span>🔥 Streak: {h.streak}</span>
                  <span>
                    📅 {new Date(h.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleComplete(h._id)}
                    disabled={h.completedToday}
                    className={`flex-1 py-2 rounded text-white ${
                      h.completedToday
                        ? "bg-gray-400"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {h.completedToday ? "Completed" : "Complete"}
                  </button>

                  <button
                    onClick={() => navigate(`/updatehabit/${h._id}`)}
                    className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => {
                      setSelectedId(h._id);
                      setShowConfirm(true);
                    }}
                    className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80 text-center">
            <h3 className="font-semibold mb-4">
              Delete this habit?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      
    </div>
  );
};

export default MyHabits;
