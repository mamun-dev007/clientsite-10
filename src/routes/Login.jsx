import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import app from "../firebase.config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await logIn(email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || "Google login failed");
    }
  };

  const handleForgot = async () => {
    if (!email) return toast.error("Please enter your email!");

    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded pr-12"
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-3 text-gray-600"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-700 text-white rounded flex items-center"
          >
            {loading ? (
              <span className="loading loading-spinner text-white"></span>
            ) : (
              "Login"
            )}
          </button>

          <button
            type="button"
            onClick={handleForgot}
            className="text-sm text-green-700 underline"
          >
            Forgot Password?
          </button>
        </div>

      
        <div className="text-center mt-4">
          <p className="text-sm">Or login with</p>
          <button
            onClick={handleGoogle}
            type="button"
            className="btn bg-white border mt-2 px-4 py-2 rounded shadow flex items-center gap-2"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="g"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </div>

        <p className="text-sm text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-700 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
