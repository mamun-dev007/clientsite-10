import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../axios";

const UpdateHabit = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(
          `/habits/${id}`
        );
        const data = await res.json();
        setHabit(data);
        setImageUrl(data.image || "");
      } catch (err) {
        toast.error("Failed to load habit!");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data?.data?.display_url) {
        setImageUrl(data.data.display_url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (err) {
      toast.error("Upload error!");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedHabit = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      reminderTime: form.reminderTime.value,
      image: imageUrl,
      isPublic: habit.isPublic,
    };

    try {
      const res = await api.put(
        `/habits/${id}`,
        updatedHabit
      );

      const data = res.data;

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        toast.success("Habit updated successfully!");
        navigate("/my-habits");
      } else {
        toast.info("No changes detected.");
      }
    } catch (err) {
      toast.error("Update failed!");
    }
  };

  if (loading || !habit) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Update Habit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Habit Title</label>
          <input
            type="text"
            name="title"
            defaultValue={habit.title}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            defaultValue={habit.description}
            rows="3"
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            defaultValue={habit.category}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Reminder Time</label>
          <input
            type="time"
            name="reminderTime"
            defaultValue={habit.reminderTime}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-32 h-32 rounded mt-2 object-cover border"
            />
          )}
          {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full px-3 py-2 border bg-gray-100 rounded"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-3 py-2 border bg-gray-100 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Habit
        </button>
      </form>
    </div>
  );
};

export default UpdateHabit;
