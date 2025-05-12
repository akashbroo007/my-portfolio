'use client'

import { useState, useEffect } from "react"
import LoadingScreen from "@/components/LoadingScreen"
import { usePathname, useRouter } from 'next/navigation'
import { formatPath, getBasePath, getCleanPath, isGitHubPages } from "@/utils/navigation"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeRoute, setActiveRoute] = useState('/');
  const pathname = usePathname();
  const router = useRouter();
  const isProduction = process.env.NODE_ENV === 'production';

  // Loading screen effect
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

  // GitHub Pages routing handler
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const hostname = window.location.hostname;
    const isGitHubPages = hostname.includes('github.io');
    
    if (!isGitHubPages) return;
    
    // Hash-based routing for GitHub Pages
    const handleHashChange = () => {
      const hash = window.location.hash;
      
      // Extract route from hash (remove the # symbol)
      const route = hash ? hash.substring(1) || '/' : '/';
      
      // Update active route state
      setActiveRoute(route);
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };
    
    // Initial hash check
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    // Check for direct navigation to a route (no hash)
    if (!window.location.hash) {
      const path = window.location.pathname;
      const basePath = '/my-portfolio';
      
      // If path contains a valid route segment after the base path, redirect to hash-based route
      if (path.startsWith(basePath)) {
        const routePath = path.substring(basePath.length);
        const validRoutes = ['/about', '/projects', '/contact'];
        
        if (validRoutes.includes(routePath)) {
          // Use hash-based routing
          window.location.replace(`${basePath}/#${routePath}`);
        }
      }
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
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

  // Render appropriate content based on hash route for GitHub Pages
  const renderContent = () => {
    // If not GitHub Pages, render children directly
    if (typeof window === 'undefined' || !window.location.hostname.includes('github.io')) {
      return children;
    }
    
    // For GitHub Pages, use hash-based routing
    return children;
  };

  return (
    <div className="bg-black text-white">
      {!isLoading ? (
        renderContent()
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