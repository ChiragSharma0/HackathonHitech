import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../common/Header";
import PageWrapper from "../common/PageWrapper";
import Login from "../authpage/Login";

import Signup from "../authpage/Signup";
import { useAuth } from "../../context/Authcontext";

// Eager-loaded components

// Lazy-loaded components
const Zombiecomp = lazy(() => import("./Zombie"));
const Chat = lazy(() => import("./Chat"));
const GhostChat = lazy(() => import("./GHOSTchat"));
const Store = lazy(() => import("./Items"));
const Selfie = lazy(() => import("./Selfie"));
const Movies = lazy(() => import("./StoryMap"));





function Page() {

  const { isLoggedIn } = useAuth();

  return (
    <div className="Page" style={{ display: "flex", flexDirection: "column", alignItems: "center", zIndex: 100 }}>
      <div className="HeaderContainer">
        <Header />
      </div>
      <div className="w-full max-w-5xl p-4 contentbox">
        <Suspense fallback={<div className="text-xl text-center mt-10">Loading...</div>}>
          <Routes>
            {!isLoggedIn &&
              <Route path="*" element={<PageWrapper><Login /></PageWrapper>

              } />
            }
            <Route path="/selfie" element={<PageWrapper><Selfie /></PageWrapper>} />
            <Route path="/ghost" element={<PageWrapper><GhostChat /></PageWrapper>} />
            <Route path="/zombie" element={<PageWrapper><Zombiecomp /></PageWrapper>} />
            <Route path="/chat" element={<PageWrapper><Chat /></PageWrapper>} />
            <Route path="/movie" element={<PageWrapper><Movies /></PageWrapper>} />
            <Route path="/Store" element={<PageWrapper><Store /></PageWrapper>} />

            <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/register" element={<Signup />} />

          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
