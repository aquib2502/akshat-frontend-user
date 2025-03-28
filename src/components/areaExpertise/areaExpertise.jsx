"use client";
import React from "react";
import Link from "next/link";

const expertiseFields = [
  {
    title: "Career Guidance",
    description: "Provide guidance for academic and career success.",
    image: "/images/career-guidance.png",
  },
  {
    title: "Parenting",
    description: "Support parents with modern parenting strategies.",
    image: "/images/parenting.png",
  },
  {
    title: "Family/Couple Counselling",
    description: "Provide family and couple therapy for better relationships.",
    image: "/images/family-counselling.png",
  },
  {
    title: "Depression/Anxiety/Stress",
    description: "Help manage and cope with depression, anxiety, and stress.",
    image: "/images/depression-anxiety-stress.png",
  },
  {
    title: "Suicidal Thoughts",
    description: "Provide support and counseling for suicidal thoughts.",
    image: "/images/suicidal-thoughts.png",
  },
  {
    title: "Children/Teen/Students Counselling",
    description: "Offer counseling for children, teens, and students for emotional growth.",
    image: "/images/student-counselling.png",
  },
];

export default function AreaOfExpertise() {
  return (
    <section id="expertise" className="py-24 px-6 md:px-20 bg-gray-100">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-5xl font-bold text-gray-900">Our Areas of Expertise</h2>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          We provide industry-leading consultancy across multiple domains, helping professionals and businesses succeed.
        </p>
        <div className="w-20 h-1 bg-orange-500 mx-auto mt-4"></div>
      </div>

      {/* Expertise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {expertiseFields.map((field, index) => (
          <Link href="/appointments" key={index}>
            <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105">
              {/* Background Image */}
              <img src={field.image} alt={field.title} className="w-full h-full object-cover" />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 flex flex-col justify-center items-center text-center transition-all duration-300">
                <h3 className="text-2xl font-semibold text-white">{field.title}</h3>
                <p className="text-white mt-2 px-4">{field.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
