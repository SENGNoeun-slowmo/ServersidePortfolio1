// src/pages/Home.tsx
import React from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaLaravel,
  FaNodeJs, FaPython, FaGit, FaFacebook, FaTelegram, FaInstagram,
} from "react-icons/fa";
import { SiTailwindcss, SiMysql, SiTypescript } from "react-icons/si";
import useFetchData from "../Use/useFetchData";
import Profile from "./Profile";
import Skills from "../pages/Skills";
import Experiences from "../pages/Experience";
import Navbar from "../components/Navbar";           // ← new
import Footer from "../components/Footer"; 
          // we'll create below

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

type Skill = { id: string; name: string; level?: string; created_at?: string | null; };
type Experience = { id: string; company_name: string; role: string; start_date: string; end_date: string; responsibilities: string[] | null; };
type ProfileType = { id: string; full_name: string; title: string; bio: string; profile_image: string; };

const iconMap: Record<string, JSX.Element> = {
  html: <FaHtml5 className="text-orange-500 text-6xl" />,
  css: <FaCss3Alt className="text-blue-500 text-6xl" />,
  javascript: <FaJs className="text-yellow-400 text-6xl" />,
  react: <FaReact className="text-sky-500 text-6xl" />,
  "tailwind css": <SiTailwindcss className="text-teal-500 text-6xl" />,
  php: <FaPhp className="text-purple-600 text-6xl" />,
  laravel: <FaLaravel className="text-red-500 text-6xl" />,
  "node.js": <FaNodeJs className="text-green-600 text-6xl" />,
  mysql: <SiMysql className="text-blue-600 text-6xl" />,
  python: <FaPython className="text-yellow-500 text-6xl" />,
  typescript: <SiTypescript className="text-blue-600 text-6xl" />,
  git: <FaGit className="text-red-500 text-6xl" />,
};

const socialLinks = [
  { icon: <FaFacebook className="text-3xl" />, name: "Facebook", url: "https://www.facebook.com/share/1E4MjjabiM/", color: "text-blue-600 hover:text-blue-700" },
  { icon: <FaTelegram className="text-3xl" />, name: "Telegram", url: "https://t.me/sengnoeun", color: "text-sky-500 hover:text-sky-600" },
  // { icon: <FaInstagram className="text-3xl" />, name: "Instagram", url: "https://instagram.com/sengnoeun", color: "text-pink-600 hover:text-pink-700" },
];

function Home() {
  const { data: profileData, isLoading: pLoad, isError: pErr } = useFetchData<ProfileType[]>(`${API_URL}/api/profiles`);
  const { data: skillsData, isLoading: sLoad, isError: sErr } = useFetchData<Skill[]>(`${API_URL}/api/skills`);
  const { data: expData, isLoading: eLoad, isError: eErr } = useFetchData<Experience[]>(`${API_URL}/api/experiences`);

  const profile = profileData?.[0] ?? null;
  const skills = (skillsData ?? []).sort((a, b) => (a.created_at ?? "").localeCompare(b.created_at ?? ""));
  const experiences = expData ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />

      <main className="">
        <Profile
          isLoading={pLoad}
          isError={pErr}
          profile={profile}
          socialLinks={socialLinks} // pass if you want icons in hero too
        />

        <section id="skills" className="">
          <Skills
            isLoading={sLoad}
            isError={sErr}
            skills={skills}
            normalizeSkillName={(name) => name.trim().toLowerCase()}
            iconMap={iconMap}
          />
        </section>

        <section id="experience">
          <Experiences
            isLoading={eLoad}
            isError={eErr}
            experiences={experiences}
          />
        </section>

        {/* Add Projects section later when you have data */}
      </main>
      <Footer socialLinks={socialLinks} fullName={profile?.full_name ?? "Seng Noeun"} />
    </div>
  );
}

export default Home;