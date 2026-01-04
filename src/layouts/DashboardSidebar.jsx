import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const DashboardSidebar = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const linkClass =
    "block px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition";

  return (
    <>
      <div
        className="
          fixed top-0 left-0 right-0 z-40 lg:hidden
          h-14 bg-white dark:bg-gray-800 shadow
          flex items-center justify-between px-4
        "
      >
        <button onClick={() => setOpen(true)}>
          <Menu size={26} />
        </button>

        {/* Title */}
        <a href="home" className="font-bold text-lg">Habit Tracker</a>

        <img
          src={user?.photoURL || "https://i.ibb.co/3fJY4Tn/default-avatar.png"}
          alt="profile"
          className="w-8 h-8 rounded-full border cursor-pointer"
        />
      </div>

      <div className="h-14 lg:hidden" />      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-full w-64 bg-white dark:bg-gray-800 shadow
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
          <a href="/" className="text-xl font-bold">Habit Tracker</a>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={22} />
          </button>
        </div>

        <div className="px-4 py-4 border-b dark:border-gray-700 lg:hidden">
          <div className="flex items-center gap-3">
             <img
          src={user?.photoURL || "https://i.ibb.co/3fJY4Tn/default-avatar.png"}
          alt="profile"
          className="w-8 h-8 rounded-full border cursor-pointer"
        />
            <div>
              <p className="font-semibold text-sm">{user?.displayName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="mt-4 space-y-1">
          <NavLink
            to="/dashboard"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/my-habits"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            My Habit
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Profile
          </NavLink>

        </nav>
      </aside>
    </>
  );
};

export default DashboardSidebar;
