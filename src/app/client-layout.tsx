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

  // GitHub Pages base path handling
  useEffect(() => {
    // Check if we need to add meta tags for GitHub Pages
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isGitHubPages = hostname.includes('github.io');
      
      if (isGitHubPages) {
        // We're on GitHub Pages, make sure all resources load correctly
        const basePath = '/my-portfolio';
        
        // Fix any relative paths that might not include the base path
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith(basePath) && href !== '/') {
            link.setAttribute('href', `${basePath}${href}`);
          }
        });
        
        // Fix any image sources that might not include the base path
        const images = document.querySelectorAll('img[src^="/"]');
        images.forEach(img => {
          const src = img.getAttribute('src');
          if (src && !src.startsWith(basePath)) {
            img.setAttribute('src', `${basePath}${src}`);
          }
        });
        
        // Handle 404 correctly by redirecting to the not-found page
        if (window.location.pathname.includes('/my-portfolio/404.html')) {
          router.replace(`${basePath}/not-found`);
        }
        
        // If we're at the root of the GitHub Pages site, redirect to the home page with the base path
        if (window.location.pathname === '/my-portfolio/') {
          // We're already at the home page with correct base path, no need to redirect
        } else if (window.location.pathname === '/') {
          // Redirect to the home page with the correct base path
          window.location.href = `${basePath}/`;
        }
        
        // Set up a click handler to intercept navigation links
        const handleLinkClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          const link = target.closest('a');
          
          if (link && link.getAttribute('href')?.startsWith(basePath)) {
            // This is a local link with the correct base path
            const href = link.getAttribute('href');
            if (href && !href.includes('://') && !link.getAttribute('target')) {
              e.preventDefault();
              
              // Add a loading state if needed
              setIsLoading(true);
              
              // Use the router for client-side navigation
              const cleanPath = href.replace(basePath, '');
              router.push(cleanPath);
              
              // Disable loading after navigation
              setTimeout(() => {
                setIsLoading(false);
              }, 300);
            }
          }
        };
        
        document.addEventListener('click', handleLinkClick);
        
        return () => {
          document.removeEventListener('click', handleLinkClick);
        };
      }
    }
  }, [pathname, router]);

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