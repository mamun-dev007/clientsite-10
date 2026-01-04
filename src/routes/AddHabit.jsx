import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../axios";

const AddHabit = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= IMAGE UPLOAD ================= */
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

      if (data.success) {
        setImageUrl(data.data.display_url);
        toast.success("Image uploaded!");
      } else {
        toast.error("Image upload failed");
      }
    } catch {
      toast.error("Image upload error");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setImageUrl("");
    toast.info("Image removed");
  };

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    setLoading(true);

    const habitData = {
      title: data.title,
      description: data.description,
      category: data.category,
      reminderTime: data.reminderTime,
      image: imageUrl,
      userEmail: user?.email,
      userName: user?.displayName,
      isPublic: true,
      createdAt: new Date(),
      streak: 0,
    };

    try {
      const res = await api.post("/habits", habitData);
      if (res.data.acknowledged) {
        toast.success("Habit added successfully!");
        reset();
        setImageUrl("");
      } else {
        toast.error("Failed to add habit");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-md bg-blue-900/10 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#255f85]";

  return (
    <div className="bg-gray-900 max-h-screen py-20">
      
       <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl shadow border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-500">
        Add New Habit
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Habit Title */}
        <div>
          <label className="text-sm font-medium text-gray-300">
            Habit Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            className={inputClass}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-300">
            Description
          </label>
          <textarea
            rows="3"
            {...register("description", { required: "Description required" })}
            className={inputClass}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-300">
            Category
          </label>
          <select
            {...register("category", { required: "Select a category" })}
            className={inputClass}
          >
            <option value="" className="bg-blue-900/10 text-gray-400">
              Select Category
            </option>
            <option value="Morning" className="bg-[#020817] text-white">
              Morning
            </option>
            <option value="Work" className="bg-[#020817] text-white">
              Work
            </option>
            <option value="Fitness" className="bg-[#020817] text-white">
              Fitness
            </option>
            <option value="Evening" className="bg-[#020817] text-white">
              Evening
            </option>
            <option value="Study" className="bg-[#020817] text-white">
              Study
            </option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Reminder Time */}
        <div>
          <label className="text-sm font-medium text-gray-300">
            Reminder Time
          </label>
          <input
            type="time"
            {...register("reminderTime", { required: "Time required" })}
            className={inputClass}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm font-medium text-gray-300">
            Upload Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="
              text-sm text-gray-300
              file:bg-[#255f85] file:text-white
              file:border-0 file:px-3 file:py-1
              file:rounded-md file:cursor-pointer
            "
          />
          {uploading && (
            <p className="text-sm text-blue-400 mt-1">Uploading...</p>
          )}

          {imageUrl && (
            <div className="mt-3 relative w-32">
              <img
                src={imageUrl}
                alt="preview"
                className="w-32 h-32 rounded object-cover border border-white/10"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-2">
          <input
            value={user?.displayName || ""}
            readOnly
            className={`${inputClass} bg-gray-800`}
          />
          <input
            value={user?.email || ""}
            readOnly
            className={`${inputClass} bg-gray-800`}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2 rounded-md text-white transition
            bg-gradient-to-r from-[#255f85] to-[#1f4f6d]
            hover:from-[#133247] hover:to-[#133c55]
            disabled:opacity-60
          "
        >
          {loading ? "Adding..." : "Add Habit"}
        </button>
      </form>
      </div>

      

      
    </div>
  );
};

export default AddHabit;
