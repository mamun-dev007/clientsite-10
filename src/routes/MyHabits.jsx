import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const MyHabits = () => {
  const { user } = useContext(AuthContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/api/my-habits/${user.email}`)
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .finally(() => setLoading(false));
  }, [user]);

  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:3000/api/habits/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        setHabits(habits.filter((habit) => habit._id !== id));
        toast.success(" Habit deleted successfully!");
      }
    } catch (err) {
      toast.error(err," Failed to delete habit!");
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/habits/complete/${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        setHabits(
          habits.map((habit) =>
            habit._id === id
              ? { ...habit, streak: (habit.streak || 0) + 1 }
              : habit
          )
        );
        toast.success("🔥 Habit marked complete!");
      }
    } catch (err) {
      toast.error(err," Failed to update streak!");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading habits...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
        🧍‍♂️ My Habits
      </h2>

      {habits.length === 0 ? (
        <p className="text-center text-gray-500">No habits added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Streak</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{habit.title}</td>
                  <td className="p-2 border">{habit.category}</td>
                  <td className="p-2 border text-center">{habit.streak || 0}</td>
                  <td className="p-2 border">
                    {new Date(habit.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-2 border text-center space-x-2">
                    <button
                      onClick={() => handleComplete(habit._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                       Complete
                    </button>
                    <button
                        onClick={() => navigate(`/updatehabit/${habit._id}`)}
                      
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                       Update
                    </button>
                    <button
                      onClick={() => handleDelete(habit._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
    </div>
  );
};

export default MyHabits;
