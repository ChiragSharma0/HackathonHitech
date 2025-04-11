import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../common/Header";
import PageWrapper from "../common/PageWrapper";

// Eager-loaded components
const Home = () => <div className="text-center mt-6 text-2xl">🏠 Home Page</div>;
const About = () => <div className="text-center mt-6 text-2xl">ℹ️ About Page</div>;
const HorrorMovies = () => <div className="text-center mt-6 text-2xl">🎥 Horror Movie List</div>;
const Store = lazy(() => import("./Items"));

// Lazy-loaded components
const ZombieGuide = lazy(() => import("./Zombie"));
const Chat = lazy(() => import("./Chat"));

function Page() {
  return (
    <div className="Page" style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 100 }}>
      <div className="HeaderContainer">
        <Header />
      </div>
      <div className="w-full max-w-5xl p-4 contentbox">
        <Suspense fallback={<div className="text-xl text-center mt-10">Loading...</div>}>
          <Routes>
            <Route path="/home" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
            <Route path="/zombie" element={<PageWrapper><ZombieGuide /></PageWrapper>} />
            <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
            <Route path="/movies" element={<PageWrapper><HorrorMovies /></PageWrapper>} />
            <Route path="/Store" element={<PageWrapper><Store /></PageWrapper>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
