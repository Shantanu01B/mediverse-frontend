"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      login(data.token, data.name);
      router.push("/");
    } else {
      alert(data.message || "Login failed");
    }
  };

  const fillDemoCredentials = () => {
    setEmail("demo@mail.com");
    setPassword("123456");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-blue-100 mt-1">Sign in to your MediVerse account</p>
        </div>

        <div className="p-6">
          {/* Demo Credentials Card */}
          <div className="mb-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Demo Credentials</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><span className="font-medium">Email:</span> demo@mail.com</p>
              <p><span className="font-medium">Password:</span> 123456</p>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="mt-3 w-full py-2 px-4 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-md hover:from-green-500 hover:to-blue-500 transition-all duration-200 shadow-sm"
            >
              Auto-Fill Demo Credentials
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors duration-200"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                Login to MediVerse
              </button>
            </div>
          </form>

          {/* Additional Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 font-medium hover:text-blue-800 hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}