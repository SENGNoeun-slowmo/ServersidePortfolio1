import React, { type JSX } from 'react';
import loading from "../assets/loading-flash.webp";

interface Skill {
  id: string;
  name: string;
  level?: string;
}

interface SkillsProps {
  isLoading: boolean;
  isError: boolean;
  skills?: Skill[] | null;
  normalizeSkillName: (name: string) => string;
  iconMap: Record<string, JSX.Element>;
}

function Skills({
  isLoading,
  isError,
  skills: rawSkills = [],
  normalizeSkillName,
  iconMap,
}: SkillsProps) {
  const skills = rawSkills ?? [];

  const getProgressValue = (level?: string): number => {
    if (!level) return 70; // more neutral default

    const num = parseInt(level.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num)) {
      return Math.min(Math.max(num, 0), 100);
    }

    const lower = level.toLowerCase();
    if (lower.includes("expert") || lower.includes("master")) return 95;
    if (lower.includes("advanced") || lower.includes("senior")) return 85;
    if (lower.includes("intermediate") || lower.includes("mid")) return 65;
    if (lower.includes("beginner") || lower.includes("basic")) return 35;
    return 70;
  };

  // ─── Loading state ───────────────────────────────────────
   if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // ─── Error state ─────────────────────────────────────────
  if (isError) {
    return (
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-950 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          My Skills
        </h2>
        <p className="text-lg md:text-xl text-red-600 dark:text-red-400">
          Failed to load skills
        </p>
      </section>
    );
  }

  // ─── Empty state ─────────────────────────────────────────
  if (skills.length === 0) {
    return (
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-950 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          My Skills
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          No skills added yet
        </p>
      </section>
    );
  }

  // ─── Main skills display ─────────────────────────────────
  return (
    <section
      id="skills"
      className=" md:py-20 px-4 xs:px-5 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
    >
      <div className="max-w-[480px] md:max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-10 md:mb-16 tracking-tight">
          My Skills
        </h2>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6 md:gap-8">
          {skills.map((skill) => {
            const key = normalizeSkillName(skill.name);
            const progress = getProgressValue(skill.level);
            const icon = iconMap[key] || <span className="text-5xl text-gray-400 dark:text-gray-500">?</span>;

            return (
              <div
                key={skill.id}
                className="group relative flex flex-col items-center transition-all duration-300 hover:-translate-y-2"
              >
                {/* Circular Progress */}
                <div className="relative w-24 h-24 md:w-28 md:h-28">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-gray-200 dark:text-gray-800 opacity-60"
                    />
                    {/* Progress ring */}
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${progress * 2.76} 276`}
                      className={`
                        text-blue-600 dark:text-blue-500 
                        group-hover:text-indigo-600 dark:group-hover:text-indigo-400 
                        transition-all duration-700 ease-out
                      `}
                    />
                  </svg>

                  {/* Centered icon */}
                  <div className="absolute inset-0 flex items-center justify-center text-5xl md:text-6xl">
                    {icon}
                  </div>
                </div>

                {/* Name + level */}
                <div className="mt-4 text-center">
                  <p className="font-semibold text-base md:text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </p>
                  {skill.level && (
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                      {skill.level} {progress !== 70 ? `(${progress}%)` : ""}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;