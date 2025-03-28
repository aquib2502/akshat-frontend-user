"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../../components/layout/navbar.jsx";

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
    <div className="relative min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col">
      <Navbar />
      <div className={`absolute inset-0 bg-black bg-opacity-50 transition-all duration-300 ${blurBg ? "backdrop-blur-md" : ""}`}></div>

      <div className="relative z-10 flex-grow flex items-center justify-center py-12 px-6 lg:px-16">
        <div className="w-full max-w-4xl bg-white p-8 sm:p-10 rounded-2xl shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center text-blue-700 mb-8">
            Book an Appointment
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Choose a category, pick a date and time, and enter your details to book your consultation.
          </p>

          {error && (
            <p className="text-center text-red-600 font-medium mb-6">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-blue-600 font-medium mb-3">Select Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full p-4 border-2 border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              >
                <option value="">Select a category</option>
                <option value="Career Guidance">Career Guidance</option>
                <option value="Parenting">Parenting</option>
                <option value="Family/Couple">Family/Couple Counselling</option>
                <option value="Depression/Anxiety/Stress">Depression/Anxiety/Stress</option>
                <option value="Suicidal Thoughts">Suicidal Thoughts</option>
                <option value="Children/ Teen / Students Counselling">Children/ Teen / Students Counselling</option>
              </select>
            </div>

            {/* Mode */}
            <div>
              <label className="block text-blue-600 font-medium mb-3">Mode of Consultation</label>
              <select
                  name="mode"
                  id="mode"
                  value={formData.mode}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                    >
                  <option value="online">Online</option>
                  <option value="in-person">In-Person</option>
                </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-blue-600 font-medium mb-3">Preferred Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full p-4 border-2 border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-blue-600 font-medium mb-3">Select Time Slot</label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full p-4 border-2 border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              >
                <option value="">Select a time</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-blue-600 font-medium mb-3">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full p-4 border-2 border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-blue-600 font-medium mb-3">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full p-4 border-2 border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
