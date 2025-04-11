import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axios";

// Create context
const AuthContext = createContext();

// Hook to use context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get("/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          setToken(null);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  // Login function
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
