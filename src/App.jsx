import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();

  return (
    <>
        <Navbar />

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
      </motion.div>
      
      <main className="min-h-screen bg-blue-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
