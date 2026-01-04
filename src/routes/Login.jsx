import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import app from "../firebase.config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const { logIn, googleLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // ✅ LOGIN
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await logIn(data.email, data.password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DEMO LOGIN
  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      await logIn("mamun@demo.com", "mamun.D1");
      toast.success("Demo login successful!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google login failed");
    }
  };


  const handleForgotPassword = async () => {
    const email = getValues("email");
    if (!email) return toast.error("Please enter email first");

    try {
      const auth = getAuth(app);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border rounded-md dark:bg-gray-700"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                className="w-full px-4 py-2 mt-1 border rounded-md pr-10 dark:bg-gray-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md text-white
                       bg-gradient-to-r from-[#255f85] to-[#1f4f6d]
                       hover:from-[#133247] hover:to-[#133c55]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Demo */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2 border rounded-md"
          >
            Demo User Login
          </button>

          {/* Forgot */}
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-blue-600 underline block text-center"
          >
            Forgot Password?
          </button>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-md"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              className="w-5"
              alt=""
            />
            Login with Google
          </button>

          <p className="text-sm text-center mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
