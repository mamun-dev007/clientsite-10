import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-gray-950 text-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-5 xl:px-0 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ===== BRAND ===== */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            HabitTracker
          </h2>
          <p className="text-sm text-gray-400 max-w-xs">
            Build better habits, stay consistent, and transform your life
            one day at a time.
          </p>
        </div>

        {/* ===== CONTACT ===== */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Contact
          </h3>

          <p className="flex items-center gap-2 text-sm mb-2">
            <FaEnvelope className="text-blue-400" />
            support@habittracker.com
          </p>

          <p className="flex items-center gap-2 text-sm mb-2">
            <FaPhone className="text-blue-400" />
            +880 17XXXXXXX
          </p>

          <p className="text-sm text-gray-400">
            Dhaka, Bangladesh
          </p>
        </div>

        {/* ===== LINKS & SOCIAL ===== */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm mb-4">
            <li>
              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/publichabit" className="hover:text-blue-400 transition">
                Community
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-blue-400 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM ===== */}
      <div className="border-t border-blue-800 dark:border-gray-800 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} HabitTracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
