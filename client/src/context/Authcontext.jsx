// src/context/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create context
const AuthContext = createContext();

// Hook to use context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  console.log("🔁 AuthProvider Rendered");
  console.log("🔐 Initial Token:", token);

  // Check for token in URL and store it
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      console.log("📥 Token found in URL:", urlToken);
      localStorage.setItem("token", urlToken);
      setToken(urlToken);
      setIsLoggedIn(true);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  // Fetch user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        console.log("📡 Fetching user with token...");
        try {
          const res = await axios.get("http://localhost:5500/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
          setIsLoggedIn(true);
          console.log("✅ User fetched successfully:", res.data.user);
        } catch (err) {
          console.error("❌ Failed to fetch user:", err);
          setToken(null);
          setUser(null);
          setIsLoggedIn(false);
          localStorage.removeItem("token");
        }
      } else {
        console.log("🚫 No token found, skipping user fetch.");
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = (newToken) => {
    console.log("🔑 Logging in with token:", newToken);
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const logout = () => {
    console.log("👋 Logging out...");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, loading, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
