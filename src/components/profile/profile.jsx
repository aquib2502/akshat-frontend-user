"use client"; // Ensure this is a client-side component

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import Navbar from "../../components/layout/navbar.jsx";

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [feedbackReports, setFeedbackReports] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
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

  // Fetch user data from the API when the component loads
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);

      // Fetch user data from the API using the token
      const fetchUserData = async () => {
        try {
          const response = await axios.get("http://localhost:3046/api/auth/profile", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.data.success) {
            const fetchedUser = response.data.user;
            if (fetchedUser) {
              setUser(fetchedUser);
              setFormData({
                name: fetchedUser.name || "",
                email: fetchedUser.email || "",
                mobile: fetchedUser.mobile || "",
                dob: fetchedUser.dob || "",
                address: fetchedUser.address || "",
                pincode: fetchedUser.pincode || "",
                extraOption: fetchedUser.extraOption || "",
                profilePic: fetchedUser.profilePic || "/default-avatar.png",
              });
              setPreviewPic(fetchedUser.profilePic || "/default-avatar.png");
            } else {
              localStorage.removeItem("authToken"); // Clear invalid token
              setMessage("User not found, please log in again.");
              setTimeout(() => router.push("/login"), 2000); // Redirect to login page after 2 seconds
            }
          } else {
            setMessage("Failed to load user data.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setMessage("Error fetching user data.");
        }
      };

      fetchUserData();
    }
  }, [router]);

  // Fetch feedback reports when Reports tab is active
  useEffect(() => {
    if (activeTab === "reports") {
      const fetchFeedbackReports = async (token) => {
        try {
          const response = await axios.get("http://localhost:3046/api/user/feedbackReports", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success) {
            setFeedbackReports(response.data.reports); // Store the array of feedback reports
          } else {
            setFeedbackReports([]);
            setMessage("No feedback reports found.");
          }
        } catch (error) {
          if (error.response?.status === 404) {
            setFeedbackReports([]);
            setMessage("No feedback reports found.");
          } else {
            console.error("Error fetching feedback reports:", error);
            setMessage("Error fetching feedback reports.");
          }
        }
      };

      fetchFeedbackReports(token);
    }
  }, [activeTab, token]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  if (!user) {
    return <p className="text-center mt-10 text-black">Loading user data...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen mt-2.5 pt-16">
      <Navbar/>
      {/* Your navbar component */}
      <div className="flex flex-1 bg-gray-50 ">
        {/* Sidebar */}
        <div className="w-64 border-2 ml-1.5 border-black bg-sky-200 text-black p-6 flex flex-col rounded-3xl mb-4 shadow-lg">
          {/* Profile Picture & Name */}
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

          {/* Navigation */}
          <nav className="flex-grow">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setEditMode(false);
              }}
              className={`block w-full text-left p-4 rounded-md mb-2 ${
                activeTab === "dashboard" ? "bg-white text-blue-500 font-semibold" : "hover:bg-blue-600"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`block w-full text-left p-4 rounded-md mb-2 ${
                activeTab === "appointments" ? "bg-white text-blue-500 font-semibold" : "hover:bg-blue-600"
              }`}
            >
              Appointments
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`block w-full text-left p-4 rounded-md ${
                activeTab === "reports" ? "bg-white text-blue-500 font-semibold" : "hover:bg-blue-600"
              }`}
            >
              Reports
            </button>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-auto p-4 w-full bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
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
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h1 className="text-3xl font-bold text-blue-500 mb-4">Your Feedback Reports</h1>
              {feedbackReports.length === 0 ? (
                <p>No feedback reports found.</p>
              ) : (
                <ul>
                  {feedbackReports.map((report) => (
                    <li key={report._id} className="border-b py-2 text-black">
                      <p><strong>Report ID:</strong> {report._id}</p>
                      <p><strong>Feedback:</strong> {report.feedback}</p>
                      <p><strong>Date:</strong> {new Date(report.date).toLocaleDateString()}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
