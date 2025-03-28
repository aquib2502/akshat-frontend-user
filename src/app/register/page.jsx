"use client";
import axios from "axios";
import React, { useState } from "react";

const Page = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                data,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setMessage(response.data.message);
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message || error.message);
            setMessage("Registration failed");
        }
    };

    return (
        <div
            className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg-image.jpg')" }}
        >
            {/* Dark Overlay for Better Readability */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>

            {/* Signup Form Container */}
            <div className="relative bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md z-10">
                <h2 className="text-3xl font-semibold text-center mb-6 text-white">Sign Up</h2>
                <p className="text-gray-400 text-center mb-6">Create your account to get started</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition duration-200"
                            required
                        />
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-gray-400 text-sm text-center mt-4">
                    Already have an account?{" "}
                    <a href="/" className="text-green-400 hover:underline">
                        Log in
                    </a>
                </p>

                {/* Message Display */}
                {message && (
                    <div className="mt-4 text-center text-sm font-semibold text-green-400">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
