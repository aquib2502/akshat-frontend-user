"use client"; // Ensure that the component is client-side

import { useEffect } from "react";
import { useRouter } from "next/compat/router";
import Navbar from "../../layout/navbar.jsx";

export default function Completion() {
  const router = useRouter();

  useEffect(() => {
    // Make sure the router is ready before attempting to redirect
    if (router && router.push) {
      const timer = setTimeout(() => {
        // Only attempt redirection if router is available
        router.push("/profile?activeTab=appointments"); // Adjust the URL as needed
      }, 2000); // Redirect after 2 seconds

      return () => clearTimeout(timer); // Clean up the timeout on unmount
    }
  }, [router]); // Re-run when the router object is ready

  return (
    <div>
      <Navbar />
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-blue-500">
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl text-center max-w-xl w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
          Questionnaire Submitted Successfully!
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-4">
          Your responses have been recorded and sent for review.
        </p>
        <p className="text-gray-500 text-sm sm:text-base">
          Please check your profile for Appointments
        </p>
      </div>
    </div>
    </div>
  );
}
