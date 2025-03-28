"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/layout/navbar.jsx";

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
    <div className="flex flex-col-reverse lg:flex-row h-full lg:h-screen bg-white">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 lg:p-10 w-full max-w-md border border-blue-300">
          <h2 className="text-2xl lg:text-3xl font-bold text-blue-600 mb-6 text-center">{isLogin ? "Sign In" : "Sign Up"}</h2>

          {message && <p className="text-green-600 text-center mb-4">{message}</p>}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-blue-500 text-sm font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-blue-700 text-sm font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Email"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-blue-700 text-sm font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Phone Number"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-blue-700 text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your Password"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-blue-700 text-sm font-semibold mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            )}

            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
              {isLogin ? "Sign In" : "Sign Up"}
            </button>

            <p className="text-sm text-center text-blue-700 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button type="button" onClick={toggleForm} className="text-blue-500 font-medium">
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full lg:w-1/2 h-64 lg:h-auto bg-cover bg-center" style={{ backgroundImage: "url('/loginImage.jpg')" }}></div>
    </div>
  );
}