import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import app from "../firebase.config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Loading from "../components/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'react-toastify';

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(email, password);
      console.log(email, password);
      setLoading(false);
      navigate(from, { replace: true });
         toast.success("Login successful!");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
      
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await googleLogin();
      navigate(from, { replace: true });
      toast.success("Login successful!");
    } catch (err) {
      setError(err.message || "Google login failed");
    }
  };

  const handleForgot = async () => {
    if (!email) {
      toast.error("Please enter your email!");
      return;
    }
    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow ">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Login</h2>

      <div className=""></div>
      {error && <p className="text-red-600">{error}</p>}

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
              className="w-full mt-1 px-3 py-2 border rounded pr-20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-2 text-sm px-2 py-1 rounded"
            >
              {showPassword ? <Eye></Eye> : <EyeOff></EyeOff>}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
             {loading ?<span class="loading loading-spinner text-primary"></span>
 : "login"}
          </button>

          <button
            type="button"
            onClick={handleForgot}
            className="text-sm text-green-700 underline"
          >
            Forgot Password?
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm">Or login with</p>
          <div className="flex justify-center mt-2 gap-2">
            <button
              onClick={handleGoogle}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/Register" className="text-green-700 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
