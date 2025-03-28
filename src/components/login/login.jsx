"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Sparkles, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/");
    }
  }, []);

  const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
  const mobileRegex = /^\d{10}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3046/api/auth/login",
        { email: formData.email, password: formData.password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));

      setMessage("Login Successful! Redirecting...");
      setError("");

      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(formData.email)) return setError("Invalid email format.");
    if (!mobileRegex.test(formData.mobile)) return setError("Mobile number must be 10 digits.");
    if (!passwordRegex.test(formData.password)) return setError("Password must be 6+ chars with 1 uppercase & special char.");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match.");

    try {
      await axios.post(
        "http://localhost:3046/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      setMessage("Registered Successfully! Redirecting to login...");
      setError("");

      setTimeout(() => {
        setIsLogin(true);
        setMessage("");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", mobile: "", password: "", confirmPassword: "" });
    setError("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-8 h-8 text-white mr-2" />
            <h2 className="text-3xl font-bold text-white">
              {isLogin ? "Welcome Back" : "Join Us"}
            </h2>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-green-500/20 text-green-100 p-4 rounded-lg mb-6 backdrop-blur-sm"
            >
              {message}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 text-red-100 p-4 rounded-lg mb-6 backdrop-blur-sm"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                placeholder="Email Address"
                required
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  placeholder="Phone Number"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                placeholder="Password"
                required
              />
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-10 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/90 transition-all"
            >
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <p className="text-white/80 text-center mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleForm}
                className="text-white font-semibold hover:text-white/90 transition-all"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}