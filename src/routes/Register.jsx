import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { signUp, updateUserProfile, googleLogin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (pw) => {
    const Upper = /[A-Z]/.test(pw);
    const Lower = /[a-z]/.test(pw);
    const longEnough = pw.length >= 6;
    if (!Upper) return "Password must contain an uppercase letter.";
    if (!Lower) return "Password must contain a lowercase letter.";
    if (!longEnough) return "Password must be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const pwErr = validatePassword(password);
    if (pwErr) {
      setError(pwErr);
      return;
    }
    try {
      const result = await signUp(email, password);
      if (result?.user) {
        if (name || photo) {
          await updateUserProfile(name || undefined, photo || undefined);
        }
        setLoading(false);
        navigate("/login", { replace: true });
        toast.success("Login successful!");

      }
    } catch (err) {
      setError(err.message || "Signup failed");
      setLoading(false);
      toast.error("Login Fail");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Google signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-md shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Signup</h2>

      {error && <p className="mb-3 text-red-600">{error}</p>}
      <div className="">{loading? <Loading></Loading>:""}</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Photo URL</label>
          <input
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
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
              className="absolute right-2 top-2 text-sm px-2 py-1  rounded"
            >
              {showPassword ? <Eye></Eye> : <EyeOff></EyeOff>}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Password must have uppercase, lowercase and 6+ characters.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            Register
          </button>
          <button
              onClick={handleGoogle}
              class="btn bg-white text-black border-[#e5e5e5]"
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

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline text-green-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
