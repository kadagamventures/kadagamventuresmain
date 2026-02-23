import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../zustand/useAuthStore"; // adjust path if needed
import adminPhoto from "../../assets/Admin/adminPhoto.png";
import logo from "../../assets/Admin/adminKadagamventuresLogo.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData);
      navigate("/admin/dashboard");
    } catch (err) {
      console.log("Login attempt failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-no-repeat bg-bottom bg-contain"
      style={{
        backgroundImage: `url(${adminPhoto})`,
        backgroundColor: "#f3f4f6",
      }}
    >
      {/* Top red bar */}
      <div className="bg-[#9F090C] h-40 w-full"></div>

      {/* Main content – login card */}
      <div className="flex-1 flex items-center justify-center px-4 -mt-40 m-5">
        <div className="bg-gray-100 w-full max-w-md rounded-lg shadow-md px-8 py-10 ">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img
              src={logo}
              alt="Kadagam Ventures Logo"
              className="h-10 md:h-14 object-contain"
            />
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-1">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 text-sm mb-6">
            Login access to kadagam Ventures
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 "
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                placeholder="admin@kadagamventures.com"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#9F090C] focus:ring-2 focus:ring-[#9F090C]/30 outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-[#9F090C] focus:ring-2 focus:ring-[#9F090C]/30 outline-none transition pr-11"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    // Eye off
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.977 9.977 0 012.133-3.675m4.584-.3A3 3 0 0012 9m5.291 5.291A9.96 9.96 0 0112 19c-1.39 0-2.71-.293-3.917-.825m4.792-4.792l-4.243-4.243M9.878 9.878l4.242 4.242M12 9a3 3 0 100 6 3 3 0 000-6z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    // Eye
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9F090C] text-white py-3.5 rounded-lg font-medium hover:bg-[#7f070a] focus:outline-none focus:ring-2 focus:ring-[#9F090C]/50 disabled:opacity-60 disabled:cursor-not-allowed transition mt-3"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Back to home link */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-[#9F090C] text-sm font-medium transition"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
