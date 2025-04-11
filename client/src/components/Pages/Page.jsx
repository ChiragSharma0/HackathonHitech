import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../common/Header";

// Eager-loaded components
const Home = () => <div className="text-center mt-6 text-2xl">🏠 Home Page</div>;
const About = () => <div className="text-center mt-6 text-2xl">ℹ️ About Page</div>;
const HorrorMovies = () => <div className="text-center mt-6 text-2xl">🎥 Horror Movie List</div>;
const GhostStories = () => <div className="text-center mt-6 text-2xl">👻 Ghost Stories Map</div>;

// Lazy-loaded components
const ZombieGuide = lazy(() => import("./Zombie"));
const Chat = lazy(() => import("./Chat"));

function Page() {
  return (
    <div className="Page" style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 100 }}>
      <Header />

      <div className="w-full max-w-5xl p-4">
        <Suspense fallback={<div className="text-xl text-center mt-10">Loading...</div>}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/zombie" element={<ZombieGuide />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/movies" element={<HorrorMovies />} />
            <Route path="/ghosts" element={<GhostStories />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
