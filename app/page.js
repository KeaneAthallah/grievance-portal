"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [result, setResult] = React.useState("");
  const [showCustomSolution, setShowCustomSolution] = React.useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const username = sessionStorage.getItem("username");
      if (!username) {
        router.push("/login");
      }
    }
  }, [router]);
  const onSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setResult("Sending to you're boyfriend....");

    try {
      const formData = new FormData(event.target);
      formData.append("access_key", "ede86353-0c0e-4760-a3f8-9373961d34b0");

      const response = await fetch("https://api.web3forms.com/submit ", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setResult("You're boyfriend will read the message sent by incess");
        event.target.reset(); // Reset the form fields
      } else {
        console.error("Error:", data);
        setResult(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Network or other error:", error);
      setResult("Failed to send the form. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg"
        onSubmit={onSubmit} // Pass the function reference here
      >
        <input
          type="hidden"
          value={sessionStorage.getItem("username") || ""}
          name="username"
        />
        {/* Title Input */}
        <div className="relative">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            placeholder="Give it a title..."
            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        {/* What's Bothering You? Textarea */}
        <div className="relative">
          <label
            htmlFor="bothering"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            What's bothering you?
          </label>
          <textarea
            name="bothering"
            id="bothering"
            required
            placeholder="Describe what's bothering you..."
            rows="4"
            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          ></textarea>
        </div>

        {/* Mood Emoji Dropdown */}
        <div className="relative">
          <label
            htmlFor="mood"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            How are you feeling?
          </label>
          <select
            name="mood"
            id="mood"
            required
            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="" disabled selected>
              Mood
            </option>
            <option value="😊">😊</option>
            <option value="😢">😢</option>
            <option value="😡">😡</option>
            <option value="😴">😴</option>
            <option value="🤩">🤩</option>
            <option value={"🥱"}>🥱</option>
          </select>
        </div>

        {/* Severity Dropdown */}
        <div className="relative">
          <label
            htmlFor="severity"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            How can i help? 💡
          </label>
          <select
            name="severity"
            id="severity"
            required
            onChange={(e) => setShowCustomSolution(e.target.value === "custom")}
            className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="" disabled selected>
              Select a solution
            </option>
            <option value="☕️">☕️ Take a break</option>
            <option value="📝">📝 Write it down</option>
            <option value="🎧">🎧 Listen to music</option>
            <option value="🏃‍♀️">🏃‍♀️ Go for a walk</option>
            <option value="🍪">🍪 Buy munchies</option>
            <option value="custom">💬 Custom solution</option>
          </select>
        </div>

        {/* Custom Solution Input (Conditional) */}
        {showCustomSolution && (
          <div className="relative">
            <label
              htmlFor="customSolution"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Your Custom Solution 💬
            </label>
            <input
              type="text"
              name="customSolution"
              id="customSolution"
              placeholder="Describe your custom solution..."
              className="block w-full px-4 py-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-3 font-semibold text-white transition-colors duration-300 bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Send
        </button>
      </form>

      {/* Result Display */}
      <span className="mt-4 text-pink-600">{result}</span>
    </div>
  );
}
