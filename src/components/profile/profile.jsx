"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "../../components/layout/navbar.jsx";
import axios from "axios";
import { motion } from "framer-motion";
import { User, Calendar, Phone, MapPin, Hash, Settings, LogOut, FileText, Clock, ChevronRight } from "lucide-react";

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [feedbackReports, setFeedbackReports] = useState([]);
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
      const response = await axios.get("https://consultancy-api.code4bharat.com/api/appointments/user", {
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

  useEffect(() => {
    if (activeTab === "reports") {
      const fetchFeedbackReports = async (token) => {
        try {
          const response = await axios.get("http://localhost:3046/api/feedback/feedback-report", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success) {
            setFeedbackReports(response.data.reports);
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
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="animate-pulse text-blue-600 text-xl">Loading user data...</div>
      </div>
    );
  }

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "appointments", label: "Appointments", icon: Calendar },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-80 bg-white rounded-2xl shadow-lg p-6 h-fit"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Image
                src={previewPic || ""}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-blue-100 shadow-lg"
                unoptimized
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg">
                <Settings className="w-4 h-4 text-white" />
              </div>
            </div>
            <h2 className="mt-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {user.name}
            </h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setEditMode(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {activeTab === item.id && (
                  <ChevronRight className="w-5 h-5 ml-auto" />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full mt-8 flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          {message && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 text-center">
              {message}
            </div>
          )}

          {activeTab === "dashboard" && !editMode && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
                Personal Information
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{user.dob || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Mobile Number</p>
                      <p className="font-medium">{user.mobile || "Not set"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{user.address || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Hash className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-500">Pincode</p>
                      <p className="font-medium">{user.pincode || "Not set"}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditMode(true)}
                className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                Edit Profile
              </button>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
                Your Appointments
              </h1>
              {loadingAppointments ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : appointments.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No appointments found
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((app) => (
                    <motion.div
                      key={app._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium">{app.date}</p>
                            <p className="text-sm text-gray-500">{app.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            app.status === "confirmed"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{app.type}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "reports" && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
                Feedback Reports
              </h1>
              {feedbackReports.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No feedback reports found
                </div>
              ) : (
                <div className="space-y-4">
                  {feedbackReports.map((report, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-gray-50 rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <p className="text-sm text-gray-500">
                          {new Date(report.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">Report ID</p>
                      <p className="font-medium mb-4">{report._id}</p>
                      <p className="text-sm text-gray-500">Feedback</p>
                      <p className="font-medium">{report.feedback}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}