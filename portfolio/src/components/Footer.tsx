// components/Footer.tsx
'use client';

import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

type SocialLink = {
  icon: JSX.Element;
  name: string;
  url: string;
  color: string;           // e.g. "text-[#00acee] hover:text-[#1da1f2]"
};

interface FooterProps {
  socialLinks: SocialLink[];
  fullName: string;
}

export default function Footer({ socialLinks, fullName }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer  id='contact' className="
    
      relative mt-auto
      bg-gradient-to-t from-gray-950 via-gray-900 to-gray-950
      dark:from-black dark:via-gray-950 dark:to-black
      text-gray-400
      border-t border-gray-800/50 dark:border-gray-800/70
    ">
      {/* Optional subtle noise / texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] mix-blend-soft-light" />

      <div className="relative container mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Copyright */}
          <div className="text-center md:text-left">
            <p className="text-base md:text-lg font-medium">
              © {new Date().getFullYear()} {fullName}
              <span className="text-gray-500 dark:text-gray-600"> • All rights reserved</span>
            </p>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-600">
              Built with passion and a lot of coffee ☕
            </p>
          </div>

          {/* Center: Social links */}
          <div className="flex items-center gap-6 md:gap-8">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group flex items-center justify-center
                  w-10 h-10 md:w-11 md:h-11
                  rounded-full
                  bg-gray-800/40 dark:bg-gray-800/50
                  backdrop-blur-sm border border-gray-700/50 dark:border-gray-700
                  transition-all duration-300
                  hover:scale-110 hover:-translate-y-1
                  hover:shadow-lg hover:shadow-black/30
                  ${link.color}
                `}
                aria-label={`Visit my ${link.name}`}
              >
                <div className="text-xl md:text-2xl transition-transform group-hover:rotate-12">
                  {link.icon}
                </div>
              </a>
            ))}
          </div>

          {/* Right: Back to top */}
          <button
            onClick={scrollToTop}
            className="
              group flex items-center gap-2
              px-5 py-2.5 rounded-full
              bg-gray-800/40 dark:bg-gray-800/50
              backdrop-blur-sm border border-gray-700/50
              text-gray-300 hover:text-white
              transition-all duration-300
              hover:bg-gray-700/60 hover:shadow-md
              hover:-translate-y-1
            "
            aria-label="Back to top"
          >
            <FaArrowUp className="text-lg group-hover:animate-bounce-short" />
            <span className="text-sm font-medium">Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

// Optional: add this to your global CSS or tailwind config
/*
@keyframes bounce-short {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-4px); }
}
*/