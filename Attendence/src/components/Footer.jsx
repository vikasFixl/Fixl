import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Attendance System. All rights reserved.</p>

        <div className="flex space-x-4 text-white/80 text-lg">
          <a href="mailto:support@attendance.com" className="hover:text-white">
            <FaEnvelope />
          </a>
          <a href="https://github.com/your-username" target="_blank" rel="noreferrer" className="hover:text-white">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="hover:text-white">
            <FaLinkedin />
          </a>
        </div>

        <div className="text-sm space-x-3">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
