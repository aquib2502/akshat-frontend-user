"use client"; // Ensure this is a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/layout/navbar.jsx";
import axios from "axios";

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [feedbackReports, setFeedbackReports] = useState([]);
  const [loadingFeedbackReports, setLoadingFeedbackReports] = useState(false);  // For loading state of feedback reports
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    pincode: "",
    extraOption: "",
    profilePic: null,
  });
  const [previewPic, setPreviewPic] = useState(null);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));
      setUser(
        storedUser || {
          name: "User",
          email: "user@example.com",
          mobile: "",
          dob: "",
          address: "",
          pincode: "",
          extraOption: "",
          image: "/default-avatar.png",
        }
      );
    }
  }, [router]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        dob: user.dob || "",
        address: user.address || "",
        pincode: user.pincode || "",
        extraOption: user.extraOption || "",
        profilePic: null,
      });
      setPreviewPic(user.image || "/default-avatar.png");
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === "appointments") {
      fetchAppointments();
    }
  }, [activeTab, token]);

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    try {
      const response = await axios.get("http://localhost:3046/api/appointments/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setAppointments(response.data.appointments);
      } else {
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
    setLoadingAppointments(false);
  };

  const fetchFeedbackReports = async () => {
    setLoadingFeedbackReports(true);  // Set loading state for feedback reports
    try {
      // Here’s the updated API call to fetch feedback reports
      const response = await axios.get('http://localhost:3046/api/auth/feedback-report', {
        headers: {
          Authorization: `Bearer ${token}`  // Send the token as Authorization header
        }
      });

      if (response.data.success) {
        setFeedbackReports(response.data.feedbackReports);
      } else {
        setFeedbackReports([]);
      }
    } catch (error) {
      console.error('Error fetching feedback reports:', error);
    }
    setLoadingFeedbackReports(false);  // End loading state
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files?.[0]) {
      setFormData({ ...formData, profilePic: files[0] });
      setPreviewPic(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      dob: formData.dob,
      address: formData.address,
      pincode: formData.pincode,
      extraOption: formData.extraOption,
      image: previewPic,
    };
    setUser(updatedUser);
    localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    setMessage("Profile updated successfully!");
    setEditMode(false);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  if (!user) {
    return <p className="text-center mt-10 text-black">Loading user data...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen mt-2.5 pt-16">
      <Navbar />
      <div className="flex flex-1 bg-gray-50 ">
        <div className="w-64 border-2 ml-1.5 border-black bg-sky-200 text-black p-6 flex flex-col rounded-3xl mb-4 shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <Image
              src={previewPic || ""}
              alt="Profile Picture"
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow-lg"
              unoptimized
            />
            <p className="mt-4 text-xl font-semibold">{user.name}</p>
            <p className="text-sm">{user.email}</p>
          </div>

          <nav className="flex-grow">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setEditMode(false);
              }}
              className={`block w-full text-left p-4 rounded-md mb-2 ${activeTab === "dashboard" ? "bg-white text-blue-500 font-semibold" : "hover:bg-blue-600"}`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`block w-full text-left p-4 rounded-md mb-2 ${activeTab === "appointments" ? "bg-white text-blue-500 font-semibold" : "hover:bg-blue-600"}`}
            >
              Appointments
            </button>
            <button
              onClick={() => {
                setActiveTab("reports");
                fetchFeedbackReports(); // Trigger fetching feedback when the tab is clicked
              }}
              className={`block w-full text-left p-4 rounded-md ${activeTab === "reports" ? "bg-white text-blue-500 font-semibold" : "hover:bg-blue-600"}`}
            >
              Reports
            </button>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-auto p-4 w-full bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === "dashboard" && !editMode && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-blue-500 mb-4">Dashboard</h1>
              <div className="space-y-2 text-black">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Mobile:</strong> {user.mobile || "N/A"}</p>
                <p><strong>DOB:</strong> {user.dob || "N/A"}</p>
                <p><strong>Address:</strong> {user.address || "N/A"}</p>
                <p><strong>Pincode:</strong> {user.pincode || "N/A"}</p>
                <p><strong>Option:</strong> {user.extraOption || "N/A"}</p>
              </div>
              <button
                onClick={() => setEditMode(true)}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit Profile
              </button>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-blue-500 mb-4">Your Appointments</h1>
              {loadingAppointments ? (
                <p>Loading appointments...</p>
              ) : appointments.length === 0 ? (
                <p>No appointments found.</p>
              ) : (
                <ul>
                  {appointments.map((app) => (
                    <li key={app._id} className="border-b py-2 text-black">
                      <p>
                        <strong>Date:</strong> {app.date} | <strong>Time:</strong> {app.time}
                      </p>
                      <p>
                        <strong>Type:</strong> {app.type} | <strong>Status:</strong> {app.status}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "reports" && (
           <div className="bg-white p-6 rounded-lg shadow-md">
           <h2 className="text-3xl font-bold text-[#3674B5] mb-4">Feedback Reports</h2>
           {loadingFeedbackReports ? (
             <p>Loading feedback reports...</p>
           ) : feedbackReports.length === 0 ? (
             <p>No feedback reports found.</p>
           ) : (
             feedbackReports.map((report, index) => (
               <div key={index} className="bg-gray-100 text-black p-4 rounded-md mb-6">
                 <p className="mb-2"><strong>Report ID:</strong> {report._id}</p>
                 <p className="mb-2"><strong>Feedback:</strong> 
                   {(() => {
                     try {
                       // Parse the JSON response
                       const parsed = JSON.parse(report.feedbackSummary);
                       let feedbackText = parsed.parts?.[0]?.text || '';
         
                       // Replace any **text** with bold HTML tags
                       feedbackText = feedbackText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
         
                       // Return the formatted text
                       return <span dangerouslySetInnerHTML={{ __html: feedbackText }} />;
                     } catch (e) {
                       console.error("Feedback Parse Error:", e);
                       return <p>Summary is not available.</p>;
                     }
                   })()}
                 </p>
                 <p className="mb-4"><strong>Date:</strong> {new Date(report.createdAt).toLocaleDateString()}</p>
               </div>
             ))
           )}
         </div>
          )}
        </div>
      </div>
    </div>
  );
}
