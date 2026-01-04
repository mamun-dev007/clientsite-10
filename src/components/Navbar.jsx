import { NavLink, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Moon, Sun, ChevronDown, Menu, X } from "lucide-react";
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut, theme, toggleTheme } = useContext(AuthContext);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const navLinkClass =
    "block px-3 py-2 rounded-md hover:bg-white/10 transition";

  return (
    <header className="sticky top-0 z-50">
      <nav
  className={`
    transition-all duration-300
    ${scrolled
      ? "bg-[#0f2c3d]/80 dark:bg-gray-900/80 backdrop-blur shadow-lg"
      : "bg-transparent"}
    text-white
  `}
>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            🧠 Habit Tracker
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/publichabit" className={navLinkClass}>Explore Habits</NavLink>

            {/* Resources */}
<div className="relative group hidden md:block">

  <button
    tabIndex={0}
    className="flex items-center gap-1 px-4 py-2 rounded-md hover:bg-white/10 focus:outline-none"
  >
    Resources <ChevronDown size={16} />
  </button>

  {/* Dropdown */}
  <div
    className="absolute left-0 top-12 w-52
               opacity-0 invisible
               group-hover:opacity-100 group-hover:visible
               group-focus-within:opacity-100 group-focus-within:visible
               transition-all duration-200
               bg-white dark:bg-gray-900
               text-gray-800 dark:text-white
               rounded-lg shadow-lg p-2 z-50"
  >
    <NavLink to="/about" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
      About Us
    </NavLink>
    <NavLink to="/contact" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
      Contact
    </NavLink>
    <NavLink to="/help" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
      Help & Support
    </NavLink>
  </div>
</div>




            {user && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/add-habit" className={navLinkClass}>Add Habit</NavLink>
              </>
            )}
          </div>

          {/* Right Side */}
<div className="flex items-center gap-3">

  {/* Theme toggle (all devices) */}
 <button onClick={toggleTheme}
    className="bg-white/20 p-2 rounded-full hover:bg-white/30"
  >
    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
  </button>

  {/* USER LOGGED IN */}
  {user ? (
    <div className="relative group hidden lg:block">
      <img
        tabIndex={0}
        src={user.photoURL || "https://i.ibb.co/3fJY4Tn/default-avatar.png"}
        className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
      />

      {/* Profile Dropdown */}
      <div
        className="absolute right-0 top-14 w-76
                   opacity-0 invisible
                   group-hover:opacity-100 group-hover:visible
                   group-focus-within:opacity-100 group-focus-within:visible
                   transition-all duration-200
                   bg-white dark:bg-gray-900
                   text-gray-800 dark:text-white
                   rounded-lg shadow-lg p-4 z-50"
      >
      <div className="flex gap-3 py-5">
      <div>
       <img
        tabIndex={0}
        src={user.photoURL || "https://i.ibb.co/3fJY4Tn/default-avatar.png"}
        className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
      />
      </div>
        <div>
           <p className="text-center font-semibold">{user.displayName}</p>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          {user.email}
        </p>
        </div>
      </div>
        
<Link>Dashboard</Link>
        <button
          onClick={logOut}
           className="py-3 text-red-500 flex items-center justify-center gap-2
              "
        >
         <FaSignOutAlt /> LogOut
        </button>
      </div>
    </div>
  ) : (
    /* USER NOT LOGGED IN (Desktop only) */
    <div className="hidden lg:flex items-center gap-2">
      <Link
        to="/login"
        className="px-4 py-2 bg-white text-[#143d52] rounded-md font-semibold"
      >
        <FaSignInAlt size={18} />
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 border border-white rounded-md"
      >
        <FaUserPlus size={18} />
      </Link>
    </div>
  )}

  {/* Hamburger (Mobile only) */}
  <button
    onClick={() => setMobileMenu(!mobileMenu)}
    className="lg:hidden text-white"
  >
    {mobileMenu ? <X size={28} /> : <Menu size={28} />}
  </button>
</div>

        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="lg:hidden bg-[#143d52] dark:bg-gray-900 px-6 py-4 space-y-2">
            <NavLink onClick={() => setMobileMenu(false)} to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink onClick={() => setMobileMenu(false)} to="/publichabit" className={navLinkClass}>
              Explore Habits
            </NavLink>

            {/* Resources Mobile */}
            <div>
              <button
                onClick={() => setResourceOpen(!resourceOpen)}
                className={`${navLinkClass} flex items-center justify-between w-full`}
              >
                Resources <ChevronDown size={16} />
              </button>

              {resourceOpen && (
                <div className="pl-4">
                  <NavLink to="/about" className={navLinkClass}>About Us</NavLink>
                  <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
                  <NavLink to="/help" className={navLinkClass}>Help & Support</NavLink>
                </div>
              )}
            </div>

            {user && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/add-habit" className={navLinkClass}>Add Habit</NavLink>
                <NavLink to="/my-habits" className={navLinkClass}>My Habits</NavLink>

                <button
                  onClick={logOut}
                  className="w-full bg-red-500 py-2 rounded mt-2"
                >
                  Log out
                </button>
              </>
            )}

            {!user && (
              <>
                <Link to="/login" className="block bg-white text-[#143d52] py-2 rounded text-center">
                  Login
                </Link>
                <Link to="/register" className="block border border-white py-2 rounded text-center">
                  Register
                </Link>
              </>
            )}
          </div>

          
        )}
      </nav>
    </header>
  );
};

export default Navbar;
