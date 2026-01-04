import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";

const DashboardNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow px-6 py-3 flex justify-between">
      <h2 className="font-semibold text-lg"></h2>

      <div className="relative">
        <img
          src={user?.photoURL || "https://i.ibb.co/3fJY4Tn/default-avatar.png"}
          alt="profile"
          className="w-8 h-8 rounded-full border cursor-pointer"
        />

        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded shadow">
            <Link className="block px-4 py-2 hover:bg-gray-100" to="/dashboard">
              Dashboard Home
            </Link>
            <Link className="block px-4 py-2 hover:bg-gray-100" to="/profile">
              Profile
            </Link>
            <button
              onClick={logOut}
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardNavbar;
