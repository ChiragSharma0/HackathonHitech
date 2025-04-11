import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Movies() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState("");

  const handleGenerate = async () => {
    setLoading(true);
    setRecommendations("");

    try {
      const mood = "dark, suspenseful";
      const preferences = "ghosts, psychological, haunted";

      // API call to backend (Express server)
      const res = await axios.post("http://localhost:3000/api/horror-movies", {
        mood,
        preferences,
      });

      if (res.data.recommendations && res.data.recommendations.length > 0) {
        const movieList = res.data.recommendations
          .map((movie, index) => `🎬 ${index + 1}. ${movie.title}\n📌 ${movie.description}\n`)
          .join("\n");
        setRecommendations(movieList);
      } else {
        setRecommendations("❌ No recommendations found.");
      }
    } catch (error) {
      console.error("Error:", error);
      setRecommendations("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12 font-mono relative overflow-hidden">
      {/* 🔥 Background floating horror light */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none blur-sm">
        <div className="w-72 h-72 bg-red-900 opacity-30 rounded-full absolute top-10 left-10 animate-pulse"></div>
        <div className="w-52 h-52 bg-purple-800 opacity-20 rounded-full absolute bottom-10 right-10 animate-ping"></div>
      </div>

      {/* 🎃 Title */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-red-600 text-center z-10 relative drop-shadow-[0_0_10px_#7f1d1d]"
      >
        👻 AI Horror Movie Recommender
      </motion.h1>

      {/* 🩸 Button Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="max-w-2xl mx-auto mt-10 bg-[#1a1a1a] p-8 rounded-xl shadow-xl border border-red-700 text-center z-10 relative"
      >
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-gradient-to-br from-red-700 to-red-900 text-white px-8 py-3 rounded-full hover:scale-105 hover:shadow-red-600 shadow-md transition-all duration-300 text-lg font-bold tracking-wide"
        >
          {loading ? "Summoning Horror..." : "🔮 Generate Horror List"}
        </button>
      </motion.div>

      {/* 🎥 Recommendation List */}
      {recommendations && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-10 bg-[#111] rounded-xl p-6 border border-red-800 shadow-2xl z-10 relative"
        >
          <h2 className="text-2xl font-bold text-red-500 mb-4 border-b border-red-600 pb-2">
            🧛‍♂️ Your Horror Movie Recommendations
          </h2>
          <pre className="whitespace-pre-wrap text-gray-100 text-base leading-relaxed">
            {recommendations}
          </pre>
        </motion.div>
      )}

      {/* 🕷️ Spider Web Corner (Optional spooky deco) */}
      <img
        src="/spiderweb-corner.png"
        alt="web"
        className="absolute top-0 right-0 w-32 opacity-20 pointer-events-none"
      />
    </div>
  );
}