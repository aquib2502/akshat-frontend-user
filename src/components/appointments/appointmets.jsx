"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/layout/navbar.jsx";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, Sparkles, Send, Monitor, Building } from "lucide-react";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    category: "",
    mode: "Online",  // Default mode is Online
    date: "",
    timeSlot: "",
    name: "",
    mobile: "",
  });
  const [token, setToken] = useState("");
  const [blurBg, setBlurBg] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
    }
  }, [router]);

  const handleFocus = () => setBlurBg(true);
  const handleBlur = () => setBlurBg(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = formData.category && formData.date && formData.timeSlot && formData.name && formData.mobile;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingResponse = await axios.post(
        "http://localhost:3046/api/appointments/book",
        {
          type: formData.category,
          mode: formData.mode,
          date: formData.date,
          time: formData.timeSlot,
          name: formData.name,
          mobile: formData.mobile,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (bookingResponse?.data?.success) {
        const appointmentId = bookingResponse.data.appointment._id;
        router.push(`/questionnaire?appointmentId=${appointmentId}&category=${encodeURIComponent(formData.category)}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong while booking your appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-16 lg:px-24 py-20 overflow-hidden">
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
            <span className="text-white/80 font-medium">Schedule Your Session</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80"
          >
            Book an Appointment
          </motion.h1>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent" />
      </section>

      {/* Form Section */}
      <div className="relative py-24 px-4 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-gradient-to-b from-white to-gray-50/50 rounded-2xl p-8 shadow-lg backdrop-blur-sm border border-white/20">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Select Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="">Select a category</option>
                  <option value="Career Guidance">Career Guidance</option>
                  <option value="Parenting">Parenting</option>
                  <option value="Family/Couple Counselling">Family/Couple Counselling</option>
                  <option value="Depression/Anxiety/Stress">Depression/Anxiety/Stress</option>
                  <option value="Suicidal Thoughts">Suicidal Thoughts</option>
                  <option value="Children/Teen/Students Counselling">Children/ Teen / Students Counselling</option>
                </select>
              </div>

              {/* Mode */}
              <div className="space-y-2">
                <label className="block text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Mode of Consultation
                </label>
                <div className="flex gap-4">
                  {[
                    { value: "online", label: "Online", icon: Monitor },
                    { value: "in-person", label: "In-Person", icon: Building }
                  ].map((mode) => (
                    <label
                      key={mode.value}
                      className={`flex-1 flex items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${
                        formData.mode.toLowerCase() === mode.value
                          ? "bg-blue-500/10 border-blue-500/50"
                          : "bg-white/50 border-gray-200 hover:bg-blue-500/5"
                      }`}
                    >
                      <input
                        type="radio"
                        name="mode"
                        value={mode.value}
                        checked={formData.mode.toLowerCase() === mode.value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <mode.icon className={`w-5 h-5 ${
                        formData.mode.toLowerCase() === mode.value
                          ? "text-blue-600"
                          : "text-gray-400"
                      }`} />
                      <span className={formData.mode.toLowerCase() === mode.value ? "text-blue-600" : "text-gray-600"}>
                        {mode.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date and Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div className="space-y-2">
                  <label className="block text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full bg-white/50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Time Slot */}
                <div className="space-y-2">
                  <label className="block text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Select Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full bg-white/50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="">Select a time</option>
                      <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                      <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                      <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Personal Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full bg-white/50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label className="block text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full bg-white/50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!isFormValid}
                className={`w-full mt-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isFormValid
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <span>Book Appointment</span>
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