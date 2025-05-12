'use client'

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/LoadingScreen"
import { usePathname, useRouter } from 'next/navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const isProduction = process.env.NODE_ENV === 'production';

  useEffect(() => {
    try {
      // Disable loading animation completely on GitHub Pages
      const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
      
      if (isGitHubPages) {
        console.log('Skipping loading animation for GitHub Pages');
        setIsLoading(false);
        return;
      }
      
      // Check if we already showed the loading screen in this session
      const hasLoadingBeenShown = sessionStorage.getItem('loading_shown');
      
      if (hasLoadingBeenShown === 'true') {
        // Skip loading animation if already shown
        setIsLoading(false);
        return;
      }
      
      // Set a maximum timeout to prevent infinite loading
      const maxTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000); // Fail-safe: force loading to end after 5 seconds
      
      // Normal loading timeout
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark loading as shown for this session
        try {
          sessionStorage.setItem('loading_shown', 'true');
        } catch (e) {
          console.error('Error setting sessionStorage:', e);
        }
      }, 3000);
      
      // Force dark mode
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#000';
      
      return () => {
        clearTimeout(timer);
        clearTimeout(maxTimeout);
      };
    } catch (e) {
      // If any error occurs, skip loading
      console.error('Error in loading screen:', e);
      setIsLoading(false);
    }
  }, []);

  // Handle navigation loading state
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);
    
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);
    
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, []);

  return (
    <div className="bg-black text-white">
      {!isLoading ? (
        children
      ) : (
        <>
          <LoadingScreen 
            isLoading={isLoading} 
            onLoadingComplete={() => setIsLoading(false)} 
          />
          <div className="opacity-0">
            {children}
          </div>
        </>
      )}
    </div>
  );
} 