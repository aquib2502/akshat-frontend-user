"use client";
import React from "react";
import Link from "next/link";

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
    <section id="experts" className="py-24 px-6 md:px-20 bg-gray-50">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-gray-900">Meet Our Experts</h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          Our experienced consultants provide specialized guidance in various aspects of educational consultancy.
        </p>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-4"></div>
      </div>

      {/* Experts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow-lg text-center transform transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <img
              src={expert.image}
              alt={expert.name}
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-blue-500"
            />
            <h3 className="mt-6 text-2xl font-semibold text-gray-900">
              {expert.name}
            </h3>
            <p className="text-blue-600 font-medium">{expert.role}</p>
            <p className="text-gray-700 text-md mt-3">{expert.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
