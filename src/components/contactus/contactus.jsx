"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/navbar.jsx";
import { Sparkles, Send, Mail, User, MessageSquare, FileText } from "lucide-react";

export default function ContactUsPage() {
  const [blurBg, setBlurBg] = useState(false);

  const handleFocus = () => setBlurBg(true);
  const handleBlur = () => setBlurBg(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message submitted");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-white/80 font-medium">Get in Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            We are here to assist you with any queries or concerns. Reach out to us!
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent" />
      </section>

      {/* Contact Form Section */}
      <div className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-white/20">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50"></div>
              <div className="relative w-full h-full bg-white rounded-xl flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/50 border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/50 border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-white/50 border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                <textarea
                  placeholder="Your Message"
                  className="w-full bg-white/50 border border-gray-200 rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32 resize-none"
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:opacity-90 transition-all"
              >
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-40 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-white py-8">
        <div className="relative z-10 text-center">
          <p className="text-white/90">&copy; {new Date().getFullYear()} Consultancy Firm. All Rights Reserved.</p>
        </div>
        <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10"></div>
      </footer>
    </div>
  );
}