// components/Profile.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { LettersPullUp } from '../animation/LettersPullUp';   // ← import here

interface Profile {
  full_name: string;
  title?: string;
  bio: string;
  profile_image: string;
}

interface ProfileProps {
  profile?: Profile | null;
  isLoading: boolean;
  isError: boolean;
}

export default function Profile({ profile, isLoading, isError }: ProfileProps) {
  const [zoom, setZoom] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold text-red-400">Could not load profile</h2>
      </div>
    );
  }

  return (
    <>
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 px-5 sm:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <div
                className="group relative w-48 h-48 sm:w-56 sm:h-56 lg:w-80 lg:h-[450px] cursor-pointer"
                onClick={() => setZoom(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setZoom(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-600/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-700" />
                <img
                  src={profile.profile_image}
                  alt={profile.full_name}
                  className="relative w-full h-full object-cover rounded-full border-4 border-white/80 dark:border-gray-800 shadow-2xl shadow-indigo-500/30 dark:shadow-purple-900/40 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            {/* Text content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              {/* Animated Name – using LettersPullUp */}
              <div className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                <LettersPullUp 
                  text={profile.full_name} 
                  className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                />
              </div>

              {/* Title */}
              {profile.title && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-2xl sm:text-3xl text-indigo-300 dark:text-indigo-400 font-medium"
                >
                  {profile.title}
                </motion.p>
              )}

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                className="mt-8 max-w-3xl mx-auto lg:mx-0 backdrop-blur-xl bg-white/5 dark:bg-black/30 border border-white/10 dark:border-white/5 rounded-2xl p-7 sm:p-9 shadow-xl"
              >
                <p className="text-lg sm:text-xl leading-relaxed  dark:text-gray-200">
                  {profile.bio}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Zoom modal */}
      {zoom && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setZoom(false)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              className="absolute -top-12 right-4 text-white text-6xl hover:text-gray-300 transition-colors"
              onClick={() => setZoom(false)}
            >
              ×
            </button>
            <img
              src={profile.profile_image}
              alt={profile.full_name}
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl mx-auto border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}