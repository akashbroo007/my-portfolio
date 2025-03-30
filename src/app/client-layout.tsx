'use client'

import { useState, useEffect } from "react"
import { NavBar } from "@/components/nav-bar"
import LoadingScreen from "@/components/LoadingScreen"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate any initial loading you might need
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust this time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={() => setIsLoading(false)} 
      />
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <NavBar />
        {children}
      </div>
    </>
  );
} 