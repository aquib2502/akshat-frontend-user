"use client";

import { motion } from "framer-motion";
import Navbar from "../../components/layout/navbar.jsx";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl font-extrabold"
        >
          About Our Consultancy
        </motion.h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Transforming businesses with innovative solutions, strategic insights, and expert guidance for a sustainable future.
        </p>
      </section>

      {/* Content Sections */}
      <div className="py-16 px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
          className="bg-white p-8 rounded-xl shadow-lg border-l-8 border-orange-500 transition-all"
        >
          <h2 className="text-3xl font-bold text-blue-900">Our Mission</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our mission is to empower businesses with expert solutions that drive growth, innovation, and long-term success.
            We bridge the gap between strategy and execution with tailored financial planning, operational efficiency, 
            and market expansion strategies.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔ Providing actionable insights and data-driven solutions.</li>
            <li>✔ Enhancing operational efficiency through cutting-edge strategies.</li>
            <li>✔ Guiding businesses through market trends and financial risks.</li>
          </ul>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
          className="bg-white p-8 rounded-xl shadow-lg border-l-8 border-orange-500 transition-all"
        >
          <h2 className="text-3xl font-bold text-blue-900">Our Vision</h2>
          <p className="mt-4 text-gray-700 leading-relaxed">
            Our vision is to become the most trusted and impactful consultancy firm globally.
            We strive to set new industry standards by continuously innovating and adapting to the changing business landscape.
          </p>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔ Inspiring businesses to achieve their full potential.</li>
            <li>✔ Building sustainable growth strategies for long-term success.</li>
            <li>✔ Fostering a culture of innovation, trust, and excellence.</li>
          </ul>
        </motion.div>

      </div>

      {/* Core Values Section */}
      <section className="py-16 px-6 md:px-20 bg-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-900">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="p-6 bg-white text-center shadow-md rounded-lg border-t-4 border-orange-500">
            <h3 className="text-xl font-semibold text-blue-900">Integrity</h3>
            <p className="mt-2 text-gray-600">We uphold the highest ethical standards in all our dealings.</p>
          </div>

          <div className="p-6 bg-white text-center shadow-md rounded-lg border-t-4 border-orange-500">
            <h3 className="text-xl font-semibold text-blue-900">Excellence</h3>
            <p className="mt-2 text-gray-600">We deliver outstanding results that exceed expectations.</p>
          </div>

          <div className="p-6 bg-white text-center shadow-md rounded-lg border-t-4 border-orange-500">
            <h3 className="text-xl font-semibold text-blue-900">Innovation</h3>
            <p className="mt-2 text-gray-600">We embrace change and drive forward-thinking solutions.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="bg-blue-900 text-white py-10 text-center">
        <p>&copy; {new Date().getFullYear()} Consultancy Firm. All Rights Reserved.</p>
      </section>
    </div>
  );
}
