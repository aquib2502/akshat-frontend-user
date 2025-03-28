"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../layout/navbar.jsx";
import ExpertSection from "../expertsection/expertsection.jsx";
import Footer from "../layout/footer.jsx";
import { motion } from "framer-motion";
import AreaOfExpertise from "../areaExpertise/areaExpertise.jsx";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white text-slate-900 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-[url('/path/to/pattern.svg')] opacity-10" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-white/80 font-medium">Welcome to Expert Consultancy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80"
          >
            Unlock Growth & Success with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-pink-200">
              Expert Consultancy
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            We provide strategic solutions for long-term success, helping businesses 
            transform challenges into opportunities.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/appointments")}
              className="group relative px-8 py-4 text-lg font-semibold rounded-full bg-white text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book a Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-pink-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 text-lg font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent" />
        <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Areas of Expertise Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="expertise"
        className="py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-slate-50/50 to-white/50 backdrop-blur-sm"
      >
        <AreaOfExpertise />
      </motion.section>

      {/* Expert Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="experts"
        className="py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-b from-white to-slate-50/50 backdrop-blur-sm"
      >
        <ExpertSection />
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}