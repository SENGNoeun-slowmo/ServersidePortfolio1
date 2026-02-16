// src/layouts/RootLayout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Navbar"; // your fixed navbar

export default function RootLayout() {
  return (
    <>
      
      {/* Header (assuming it's fixed top-0) */}
      <Header />

      {/* Main content with offset for fixed header */}
      <main className="min-h-screen ">
        {/* pt-12 = 3rem, adjust if your header height changes */}
        <Outlet />
      </main>
    </>
  );
}