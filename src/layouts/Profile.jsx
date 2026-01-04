import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle, FaEnvelope, FaCalendarAlt } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-[#020817] rounded-xl shadow border border-white/10 p-8">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
          My Profile
        </h2>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src={user?.photoURL || "https://i.ibb.co/3fJY4Tn/default-avatar.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-[#255f85] object-cover"
          />

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-white">
              {user?.displayName || "Unknown User"}
            </h3>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        {/* Profile Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Name */}
          <div className="bg-gray-800 rounded-lg p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-2 text-blue-400">
              <FaUserCircle />
              <span className="font-semibold">Name</span>
            </div>
            <p className="text-gray-300">
              {user?.displayName || "Not provided"}
            </p>
          </div>

          {/* Email */}
          <div className="bg-gray-800 rounded-lg p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-2 text-blue-400">
              <FaEnvelope />
              <span className="font-semibold">Email</span>
            </div>
            <p className="text-gray-300">
              {user?.email || "Not provided"}
            </p>
          </div>

          {/* Account Created */}
          <div className="bg-gray-800 rounded-lg p-5 border border-white/10">
            <div className="flex items-center gap-3 mb-2 text-blue-400">
              <FaCalendarAlt />
              <span className="font-semibold">Account Created</span>
            </div>
            <p className="text-gray-300">
              {user?.metadata?.creationTime
                ? new Date(user.metadata.creationTime).toDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
