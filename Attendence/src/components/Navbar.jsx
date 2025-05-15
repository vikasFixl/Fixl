import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../store/UseAuthStore';
import { User, LogOut, Menu } from 'lucide-react';

const Navbar = () => {
  // Correct Zustand selector usage
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

 

  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white shadow-lg px-4 py-5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/" className="hover:underline">AttendanceSystem</Link>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-base">
          <Link to="/" className="hover:text-white hover:underline transition duration-200">Home</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="hover:text-white hover:underline transition duration-200">Admin Page</Link>
          )}

          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 font-medium">
                <User size={20} />
                <span className="hover:underline">{user?.name}</span>
              </div>
              <button
                onClick={()=>logout()}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition duration-200"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="hover:text-white hover:underline transition duration-200">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-white/10 backdrop-blur-md rounded-md p-4 text-sm space-y-3">
          <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="block hover:underline" onClick={() => setMenuOpen(false)}>Admin Page</Link>
          )}
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <span>{user.name}</span>
                <User size={18} />
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
