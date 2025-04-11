import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../context/Authcontext"; // adjust path if needed

const AuthForm = ({ isSignup }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Handle social login redirect
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");
    const name = query.get("username");
    const profilePic = query.get("profilePic");

    if (token) {
      login(token); // save token via context
      console.log("✅ Social Login Name:", name);
      console.log("🖼️ Profile Picture URL:", profilePic);
      window.history.replaceState({}, document.title, "/dashboard");
    }
  }, [location.search, login]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await axios.post("http://localhost:5500/api/auth/register", {
          username,
          email,
          password,
        });
        alert("Signup Successful!");
        navigate("/login");
      } else {
        const res = await axios.post("http://localhost:5500/api/auth/login", {
          email,
          password,
        });
        login(res.data.token); // save token via context
        alert("Login Successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleSocialLogin = (provider) => {
    window.open(`http://localhost:5500/api/auth/${provider}`, "_self");
  };

  return (
    <div className="AuthPage">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url('/image.jpeg')` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, ease: "easeOut" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-0" />

      {/* Auth card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-300 mb-6">
          {isSignup
            ? "Sign up with social media or email"
            : "Login with your social media or email"}
        </p>

        {/* Social Login */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handleSocialLogin("google")}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-full shadow hover:bg-red-600 transition"
          >
            <FaGoogle />
            Google
          </button>
        </div>

        <div className="flex items-center my-4 text-white">
          <hr className="flex-grow border-white/30" />
          <span className="mx-3 text-white/60">OR</span>
          <hr className="flex-grow border-white/30" />
        </div>

        {/* Email/Password Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-2 rounded-full border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-2 rounded-full border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-2 rounded-full border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          {isSignup && (
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Confirm Password"
              className="w-full bg-white/20 text-white placeholder-white/60 px-4 py-2 rounded-full border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-full transition shadow-md"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        {/* Toggle login/signup */}
        <div className="text-center mt-4 text-white">
          {isSignup ? (
            <p>
              Already a member?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-green-300 hover:underline cursor-pointer"
              >
                Login Here
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-green-300 hover:underline cursor-pointer"
              >
                Signup
              </span>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
