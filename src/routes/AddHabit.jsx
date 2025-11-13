import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

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

      const json = await res.json();

      if (json.success) {
        const imageUrl = json.data.display_url;
        setImageUrl(imageUrl);
        toast.success("Image uploaded successfully!");
      } else {
        console.error("imgbb upload failed:", json);
        toast.error("Image upload failed!");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload error!");
    } finally {
      setUploading(false);
    }
  };

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
      isPublic: true,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/habits`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(habitData),
      });

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Habit added successfully!");
        form.reset();
        setImageUrl("");
      } else {
        toast.error("Failed to add habit!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    toast.info("Image removed");
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Add a New Habit
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 ">
    
        <div>
          <label className="block mb-1 font-medium">Habit Title</label>
          <input
            type="text"
            name="title"
            required
            placeholder="Type habit title.. "
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            required
            rows="3"
            placeholder="Describe your habit..."
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
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
            className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image (optional)</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="border w-32"
            />
            {uploading && <span className="text-sm text-blue-500">Uploading...</span>}
          </div>

          {imageUrl && (
            <div className="mt-3 relative inline-block">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
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
          disabled={loading}
          className={`w-full py-2 rounded-md text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Adding..." : "Add Habit"}
        </button>
      </form>
    </div>
  );
};

export default AddHabit;
