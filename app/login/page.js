"use client";
// pages/login.js
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve password from environment variable
    const correctPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD;

    if (password === correctPassword) {
      // Redirect to username page
      router.push("/username"); // Use window.location for static hosting
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-sm w-full space-y-6 text-center">
        {/* Header with Image */}
        <div>
          <img
            src="/pincess-diana.github.io/melo.png"
            alt="My Melody"
            className="w-24 h-24 mx-auto rounded-full border-4 border-pink-300"
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter your password to join
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-left text-sm font-medium text-gray-700 mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

        {/* Footer Decoration */}
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-4 h-4 bg-pink-300 rounded-full animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
