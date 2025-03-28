"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/navbar.jsx";

export default function ContactUsPage() {
  const [blurBg, setBlurBg] = useState(false);

  const handleFocus = () => setBlurBg(true);
  const handleBlur = () => setBlurBg(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-400 to-blue-500 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-extrabold"
        >
          Contact Us
        </motion.h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          We are here to assist you with any queries or concerns. Reach out to us!
        </p>
      </section>

      {/* Contact Form Section */}
      <div className="py-16 px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-200 animate-popUp mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-semibold mb-1">Message</label>
              <textarea
                placeholder="Your Message"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 h-32"
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors font-semibold"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer Section */}
      <section className="bg-blue-900 text-white py-10 text-center">
        <p>&copy; {new Date().getFullYear()} Consultancy Firm. All Rights Reserved.</p>
      </section>

      {/* Pop-Up Animation Keyframes */}
      <style jsx>
        {`
          @keyframes popUp {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-popUp {
            animation: popUp 0.5s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
