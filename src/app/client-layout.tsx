'use client'

import { useState, useEffect } from "react"
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

    // Force dark mode
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#000';
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-black text-white">
      <LoadingScreen 
        isLoading={isLoading} 
        onLoadingComplete={() => setIsLoading(false)} 
      />
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        {children}
      </div>
    </div>
  );
} 