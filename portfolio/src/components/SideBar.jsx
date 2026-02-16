// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome, FaUser, FaTools, FaBriefcase, FaEnvelope,
  FaBars, FaTimes,
} from 'react-icons/fa';

const navItems = [
  { path: '/', label: 'Home', icon: <FaHome /> },
  { path: '/about', label: 'About', icon: <FaUser /> },
  { path: '/skills', label: 'Skills', icon: <FaTools /> },
  { path: '/experience', label: 'Experience', icon: <FaBriefcase /> },
  { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
];

function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
return null;
  return (
    <>
      {/* Desktop Sidebar – fixed left */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40 overflow-y-auto pt-20">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-indigo-600 mb-10">Seng</h2>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Nav / Hamburger */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-3 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 text-sm ${
                location.pathname === item.path ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Hamburger Toggle (top-right if needed) */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile slide-in menu (optional overlay style) */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileOpen(false)}>
          <div className="bg-white w-64 h-full p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-indigo-600 mb-8">Menu</h2>
            <nav className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block py-3 text-lg font-medium text-gray-800"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;