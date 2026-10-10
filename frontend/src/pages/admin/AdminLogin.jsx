
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaArrowRight } from "react-icons/fa";
import { adminLogin } from "../../services/authService";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await adminLogin(email, password);

      if (response.success) {
        // JWT token save
        localStorage.setItem("adminToken", response.token);

        // Admin information save
        localStorage.setItem(
          "adminData",
          JSON.stringify(response.admin)
        );

        // Dashboard par jao
        navigate("/admin/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (error) {
      console.error("Admin Login Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#18181b] px-4 py-10">
      {/* Background */}
      <div className="pointer-events-none fixed left-0 top-0 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="pointer-events-none fixed bottom-0 right-0 h-96 w-96 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-lime-400 to-lime-500 text-xl font-black text-white shadow-xl">
            DS
          </div>

          <h1 className="mt-5 text-2xl font-black text-white">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Dalip Singh — Admin Panel
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-8"
        >
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-lime-50 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime-400 text-[#18181b]">
              <FaLock />
            </div>

            <div>
              <p className="text-sm font-black text-slate-900">
                Secure Admin Area
              </p>

              <p className="text-xs text-slate-500">
                Login to manage your website
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Admin Email
            </label>

            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10"
            />
          </div>

          {/* Password */}
          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-lime-400 focus:ring-4 focus:ring-lime-400/10"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#18181b] px-5 py-3.5 font-black text-white shadow-[0_5px_0_#365314] transition-all duration-300 hover:-translate-y-1 hover:bg-[#03264c] active:translate-y-1 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}

            {!loading && <FaArrowRight />}
          </button>

          {/* Login Info Removed */}

          <p className="mt-4 text-center text-[11px] text-slate-400">
            Secure login powered by backend authentication
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          © 2026 Dalip Singh • WEB SOLUTIONS • DEVELOPMENT
        </p>
      </div>
    </div>
  );
}
