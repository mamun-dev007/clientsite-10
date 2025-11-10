import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    const reminderTime = form.reminderTime.value;

    const habitData = {
      title,
      description,
      category,
      reminderTime,
      image: imageUrl,
      userEmail: user?.email,
      userName: user?.displayName,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(habitData),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("✅ Habit added successfully!");
        form.reset();
        setImageUrl("");
      } else {
        toast.error("Failed to add habit!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // optional: Image upload (ImgBB)
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    setImageUrl(data.data.display_url);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-700">
        Add a New Habit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Habit Title */}
        <div>
          <label className="block mb-1 font-medium">Habit Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            required
            rows="3"
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select name="category" required className="w-full border rounded px-3 py-2">
            <option value="">Select Category</option>
            <option value="Morning">Morning</option>
            <option value="Work">Work</option>
            <option value="Fitness">Fitness</option>
            <option value="Evening">Evening</option>
            <option value="Study">Study</option>
          </select>
        </div>

        {/* Reminder Time */}
        <div>
          <label className="block mb-1 font-medium">Reminder Time</label>
          <input
            type="time"
            name="reminderTime"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-2 w-32 rounded" />
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Habit"}
        </button>
      </form>
    </div>
  );
};

export default AddHabit;
