"use client";
import { motion } from "framer-motion";
import Navbar from "../../components/layout/navbar.jsx";
import { Sparkles, Target, Eye, Shield, Award, Lightbulb } from "lucide-react";

export default function AboutUs() {
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
            <span className="text-white/80 font-medium">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
          >
            About Our Consultancy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            Transforming businesses with innovative solutions, strategic insights, and expert guidance for a sustainable future.
          </motion.p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent" />
      </section>

      {/* Content Sections */}
      <div className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative w-full h-full bg-white rounded-xl flex items-center justify-center">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Our Mission</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our mission is to empower businesses with expert solutions that drive growth, innovation, and long-term success.
              We bridge the gap between strategy and execution with tailored financial planning, operational efficiency, 
              and market expansion strategies.
            </p>
            <ul className="mt-6 space-y-3">
              {["Providing actionable insights", "Enhancing operational efficiency", "Guiding through market trends"].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-gray-700 bg-white/50 p-3 rounded-lg backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mr-3"></div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Our Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="group"
        >
          <div className="relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative w-full h-full bg-white rounded-xl flex items-center justify-center">
                <Eye className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Our Vision</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our vision is to become the most trusted and impactful consultancy firm globally.
              We strive to set new industry standards by continuously innovating and adapting to the changing business landscape.
            </p>
            <ul className="mt-6 space-y-3">
              {["Inspiring business potential", "Building sustainable growth", "Fostering innovation"].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center text-gray-700 bg-white/50 p-3 rounded-lg backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mr-3"></div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Core Values Section */}
      <section className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center relative z-10 mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Our Core Values
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: "Integrity", desc: "We uphold the highest ethical standards in all our dealings." },
            { icon: Award, title: "Excellence", desc: "We deliver outstanding results that exceed expectations." },
            { icon: Lightbulb, title: "Innovation", desc: "We embrace change and drive forward-thinking solutions." }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 text-center shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{value.title}</h3>
                <p className="mt-4 text-gray-600">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-40 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </section>

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