import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../common/Header";
import PageWrapper from "../common/PageWrapper";
import Login from "../authpage/Login";

import Signup from "../authpage/Signup";

// Eager-loaded components
const Home = () => <div className="text-center mt-6 text-2xl">🏠 Home Page</div>;
const HorrorMovies = () => <div className="text-center mt-6 text-2xl">🎥 Horror Movie List</div>;
const Store = lazy(() => import("./Items"));

// Lazy-loaded components
const Zombiecomp = lazy(() => import("./Zombie"));
const Chat = lazy(() => import("./Chat"));
const GhostChat = lazy(() => import("./GHOSTchat"));
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
            <Route path="/ghost" element={<PageWrapper><GhostChat /></PageWrapper>} />
            <Route path="/zombie" element={<PageWrapper><Zombiecomp /></PageWrapper>} />
            <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
            <Route path="/movies" element={<PageWrapper><HorrorMovies /></PageWrapper>} />
            <Route path="/Store" element={<PageWrapper><Store /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><Signup /></PageWrapper>} />

          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
