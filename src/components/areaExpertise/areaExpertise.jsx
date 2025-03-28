"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <section className="relative overflow-hidden">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Our Areas of Expertise
        </h2>
        <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
          We provide industry-leading consultancy across multiple domains, helping professionals and businesses succeed.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
      </motion.div>

      {/* Expertise Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 relative z-10">
        {expertiseFields.map((field, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/appointments">
              <div className="group relative w-full h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
                {/* Background Image */}
                <img 
                  src={field.image} 
                  alt={field.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-sm flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    {field.title}
                  </h3>
                  <p className="text-white/90 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {field.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 -left-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -right-64 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}