import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Attendance from "./components/Attendence.jsx";
import AdminPanel from "./components/AdminPannel.jsx";
import AdminUsersPage from "./components/AdminUsersPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignUpPage.jsx";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/UseAuthStore.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const { user, isLoading, GetProfile,getalluser } = useAuthStore();

  const isAdmin = user?.role === "admin";
  console.log(isAdmin);
  console.log(user);
  useEffect(() => {
    async function fetchProfile() {
      await GetProfile();
      await getalluser();
    }
    fetchProfile();
  }, []);


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">
        <h1 className="text-4xl text-white animate-pulse">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 text-white">
      <Toaster />
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Attendance />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminUsersPage />
              ) : (
                <div className="text-center text-red-300 text-3xl font-semibold py-20 animate-pulse">
                  Access Denied
                </div>
              )
            }
          />
          <Route
            path="/admin/user/:userId"
            element={
              user?.role === "admin" ? (
                <AdminPanel />
              ) : (
                <div className="text-center text-red-300 text-3xl font-semibold py-20 animate-pulse">
                  Access Denied
                </div>
              )
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-6xl text-white/70 animate-bounce">404 | Page Not Found</h1>
              </div>
            }
          />
        </Routes>

      </div>
      <Footer />
    </div>
  );
};

export default App;
