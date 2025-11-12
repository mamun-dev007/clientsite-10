import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-gray-200 py-8 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

        <div>
          <h2 className="text-2xl font-bold text-white">HabitTracker</h2>
          <p className="text-sm mt-2 text-gray-400">
            Build better habits, one day at a time.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Contact</h3>
          <p>Email: support@habittracker.com</p>
          <p>Phone: +880 17********</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-white">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400"
            >
              <FaInstagram />
            </a>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            © {new Date().getFullYear()} HabitTracker |{" "}
            <a href="/terms" className="underline hover:text-gray-300">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
