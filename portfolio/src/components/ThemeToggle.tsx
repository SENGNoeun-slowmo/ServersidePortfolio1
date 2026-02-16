// components/ThemeToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setDark(saved === 'dark');
    } else {
      setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    if (dark === null) return;

    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  if (dark === null) return null; // avoid flash

  return (
    <button
      onClick={() => setDark(!dark)}
      className={`
        fixed top-4 right-4 z-50
        p-3 rounded-full
        bg-white/10 dark:bg-black/30
        backdrop-blur-lg border border-white/10 dark:border-white/5
        text-gray-800 dark:text-gray-200
        hover:bg-white/20 dark:hover:bg-white/10
        transition-all shadow-lg
      `}
      aria-label="Toggle dark mode"
    >
      {dark ? <FaSun size={20} /> : <FaMoon size={20} />}
    </button>
  );
}