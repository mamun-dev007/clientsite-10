import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const UpdateHabit = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/api/habits/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setHabit(data);
        setImageUrl(data.image || "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.data?.display_url) {
        setImageUrl(data.data.display_url);
        toast.success(" Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (err) {
      toast.error(err,"Image upload error!");
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
      isPublic: habit.isPublic || true,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/habits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHabit),
      });

      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success(" Habit updated successfully!");
        navigate("/my-habits");
      } else {
        toast.info("No changes made.");
      }
    } catch (err) {
      toast.error(" Failed to update habit!");
      console.error(err);
    }
  };

  if (loading || !habit ) return <p className="text-center mt-10">Loading...</p>;

  return (


    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
         Update Habit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block mb-1 font-medium">Habit Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={habit.title}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            required
            defaultValue={habit.description}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            defaultValue={habit.category}
            required
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          >
            <option value="">Select Category</option>
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
            required
            defaultValue={habit.reminderTime}
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full"
          />
          {imageUrl && (
            <div className="mt-2 relative inline-block">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
            </div>
          )}
        </div>

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

        <button
          type="submit"
          disabled={uploading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update Habit
        </button>
      </form>
    </div>
  );
};

export default UpdateHabit;


