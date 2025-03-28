"use client";
import React from "react";
import { motion } from "framer-motion";

const experts = [
  {
    name: "Dr. Alice Johnson",
    role: "Curriculum Development Expert",
    description: "Specialist in designing innovative curricula to enhance learning outcomes.",
    image: "/experts/expert1.jpg",
  },
  {
    name: "Mr. Robert Smith",
    role: "Teacher Training Specialist",
    description: "Expert in professional development and modern teaching methodologies.",
    image: "/experts/expert2.jpg",
  },
  {
    name: "Ms. Clara Lee",
    role: "Student Counseling Advisor",
    description: "Focused on guiding students towards academic and personal success.",
    image: "/experts/expert3.jpg",
  },
  {
    name: "Mr. David Brown",
    role: "EdTech Solutions Expert",
    description: "Provides insights on integrating technology to revolutionize the learning experience.",
    image: "/experts/expert4.jpg",
  },
  {
    name: "Mrs. Emily Davis",
    role: "School Management Consultant",
    description: "Specializes in optimizing school operations and enhancing academic standards.",
    image: "/experts/expert5.jpg",
  },
  {
    name: "Aquib Hingwala",
    role: "Educational Policy Advisor",
    description: "Adding Managing skills to student mind and counselling.",
    image: "/experts/expert6.jpg",
  },
];

export default function ExpertSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Meet Our Experts
        </h2>
        <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
          Our experienced consultants provide specialized guidance in various aspects of educational consultancy.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
      </motion.div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 relative z-10">
        {experts.map((expert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
              {/* Expert Image */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Expert Info */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {expert.name}
                </h3>
                <p className="text-purple-600 font-medium mt-1 group-hover:text-pink-600 transition-colors">
                  {expert.role}
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  {expert.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-purple-500/20 transition-all duration-500"></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-64 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}