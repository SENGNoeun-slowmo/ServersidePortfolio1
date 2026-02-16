// src/components/MobileBottomNav.tsx
import React from 'react';
import { FaHome, FaUser, FaTools, FaBriefcase, FaFolderOpen } from 'react-icons/fa';

 function BottomNav() {
  return (
    <nav 
      className="
        fixed bottom-0 left-0 right-0 z-50 
        md:hidden
        bg-black/90 backdrop-blur-xl border-t border-neutral-800
        safe-area-inset-bottom
      "
    >
      <div className="grid grid-cols-5 items-center py-1 px-2 max-w-md mx-auto">
        
        <a href="#" className="flex flex-col items-center py-2 text-blue-500">
          <FaHome size={26} />
          <span className="text-[10px] mt-0.5">Home</span>
        </a>

        <a href="#about" className="flex flex-col items-center py-2 text-neutral-400 hover:text-blue-400">
          <FaUser size={26} />
          <span className="text-[10px] mt-0.5">About</span>
        </a>

        <a href="#skills" className="flex flex-col items-center py-2 text-neutral-400 hover:text-blue-400">
          <FaTools size={26} />
          <span className="text-[10px] mt-0.5">Skills</span>
        </a>

        <a href="#experience" className="flex flex-col items-center py-2 text-neutral-400 hover:text-blue-400">
          <FaBriefcase size={26} />
          <span className="text-[10px] mt-0.5">Exp</span>
        </a>

        <a href="#projects" className="flex flex-col items-center py-2 text-neutral-400 hover:text-blue-400">
          <FaFolderOpen size={26} />
          <span className="text-[10px] mt-0.5">Projects</span>
        </a>

      </div>
    </nav>
  );
}
export default BottomNav