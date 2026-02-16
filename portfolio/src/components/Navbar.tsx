// src/components/Navbar.tsx
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Home', href: '#' },
    // { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    // { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50  dark:bg-gray-950/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between ">
        <a href="#" className="text-xl  sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          SengNoeun
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition">
              {link.name}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-10">
          
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-gray-700 dark:text-gray-300">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 animate-fade-in  ">
          <nav className="flex flex-col py-4 px-6 space-y-12">
            {links.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg  font-medium text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                {link.name}
              </a>
            ))}
             <ThemeToggle />
          </nav>
         
          
        </div>
      )}
    </header>
  );
}