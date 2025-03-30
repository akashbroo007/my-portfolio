'use client'

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#000';
  }, []);

  return (
    <div className="bg-black text-white">
      {children}
    </div>
  );
} 