"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsernamePage() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      alert("Please enter a valid username.");
      return;
    }

    // Save username in sessionStorage
    try {
      sessionStorage.setItem("username", username);
    } catch (error) {}

    // Redirect using window.location.href for static hosting
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-sm w-full space-y-6 text-center">
        {/* Header with Image */}
        <div>
          <img
            src="/cinna.png"
            alt="Cinnamoroll"
            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-300"
          />
          <p className="text-sm text-gray-500 mt-2">Enter your name to join</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-left text-sm font-medium text-gray-700 mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>

        {/* Footer Decoration */}
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-4 h-4 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: `${index * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
