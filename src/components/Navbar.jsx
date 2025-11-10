import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut();
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <NavLink to="/" className="block px-3 py-2 hover:text-blue-600">
        Home
      </NavLink>

      {user && (
        <>
          <NavLink to="/add-habit" className="block px-3 py-2 hover:text-blue-600">
            Add Habit
          </NavLink>
          <NavLink to="/my-habits" className="block px-3 py-2 hover:text-blue-600 ">
            My Habits
          </NavLink>
        </>
      )}

      <NavLink to="/publichabit" className="block px-3 py-2 hover:text-blue-600">
        Public Habits
      </NavLink>
    </>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        <Link to="/" className="text-2xl font-bold text-blue-700">
          HabitHero
        </Link>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-2">{navLinks}</div>

          {!user ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-100"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/3fJY4Tn/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-4 w-72 ">
                <div className="flex justify-center">
                <img src={user.photoURL || "https://www.facebook.com/share/p/17VCnnRWSo/ "}
                  alt="User Avatar" className="rounded-full w-15 h-15" />
                </div>
                  <p className="font-semibold text-center">{user.displayName}</p>
                  <p className="text-sm text-gray-600 text-center">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-3 w-full bg-red-500 text-white py-1.5 rounded hover:bg-red-600"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="flex flex-col px-6 py-3 space-y-2 w-6/12 mx-auto text-center  z-50">
            {navLinks}

            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md text-center hover:bg-blue-100"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Log out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
