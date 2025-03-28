"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../layout/navbar.jsx";
import ExpertSection from "../expertsection/expertsection.jsx";
import Footer from "../layout/footer.jsx";
import { motion } from "framer-motion";
import AreaOfExpertise from "../areaExpertise/areaExpertise.jsx";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-white text-blue-500 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center px-4 sm:px-8 md:px-16 lg:px-24 pt-36 pb-24 bg-gradient-to-r from-blue-400 to-blue-500 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
        >
          Unlock Growth & Success with{" "}
          <span className="text-white">Expert Consultancy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-sm sm:text-base md:text-lg max-w-3xl text-white leading-relaxed"
        >
          We provide strategic solutions, for long-term success.
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="mt-6 flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={() => router.push("/appointments")}
            className="bg-white text-blue-600 px-6 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Book a Consultation
          </button>
          <button className="border-2 border-white text-white px-6 py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-white hover:text-blue-600 transition">
            Learn More
          </button>
        </motion.div>
      </section>

      {/* Areas of Expertise Section */}
      <section id="expertise" className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-100">
        <AreaOfExpertise />
      </section>

      {/* Expert Section */}
      <section id="experts" className="py-20 px-4 sm:px-8 md:px-16 lg:px-24 bg-gray-50">
        <ExpertSection />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
