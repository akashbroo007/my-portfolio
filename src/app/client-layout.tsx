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
  const pathname = usePathname();
  const router = useRouter();
  const [onGitHubPages, setOnGitHubPages] = useState(false);
  const basePath = getBasePath();

  // Loading screen effect
  useEffect(() => {
    try {
      // Check if we're on GitHub Pages
      const isOnGitHubPages = typeof window !== 'undefined' && isGitHubPages();
      setOnGitHubPages(isOnGitHubPages);
      
      // Disable loading animation completely on GitHub Pages
      if (isOnGitHubPages) {
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

  // GitHub Pages base path handling - improved
  useEffect(() => {
    // Only run on GitHub Pages
    if (typeof window !== 'undefined' && isGitHubPages()) {
      const handleAllNavigation = () => {
        // Fix any relative paths that might not include the base path
        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach(link => {
          const href = link.getAttribute('href');
          if (href && !href.startsWith(basePath) && href !== '/') {
            link.setAttribute('href', formatPath(href));
          }
        });
        
        // Fix any image sources that might not include the base path
        const images = document.querySelectorAll('img[src^="/"]');
        images.forEach(img => {
          const src = img.getAttribute('src');
          if (src && !src.startsWith(basePath)) {
            img.setAttribute('src', formatPath(src));
          }
        });
      };
      
      // Run once on initial load
      handleAllNavigation();
      
      // Also run after any route change detected
      const observer = new MutationObserver(handleAllNavigation);
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
      
      // Set up a global click interceptor for all navigation links
      const handleLinkClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');
        
        if (!link) return; // Not a link click
        
        const href = link.getAttribute('href');
        if (!href) return; // No href attribute
        
        // Ignore external links, anchors, and links with targets
        if (
          href.includes('://') || 
          href.startsWith('#') || 
          link.getAttribute('target') || 
          link.getAttribute('rel') === 'noopener noreferrer'
        ) {
          return;
        }
        
        // Prevent default navigation for internal links
        if (href.startsWith('/') || href.startsWith(basePath)) {
          e.preventDefault();
          
          try {
            // Get clean path for router
            const cleanPath = getCleanPath(href);
            
            // Use router for client-side navigation
            router.push(cleanPath);
          } catch (error) {
            console.error('Navigation error:', error);
            // Fallback to traditional navigation
            window.location.href = href;
          }
        }
      };
      
      // Add the global click handler
      document.addEventListener('click', handleLinkClick);
      
      return () => {
        observer.disconnect();
        document.removeEventListener('click', handleLinkClick);
      };
    }
  }, [pathname, router, basePath]);

  // Handle navigation loading state
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      // Use a small delay to prevent flicker
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    };
    
    // For debugging on GitHub Pages
    if (onGitHubPages) {
      console.log('Current pathname:', pathname);
    }
    
    window.addEventListener('beforeunload', handleStart);
    window.addEventListener('load', handleComplete);
    
    return () => {
      window.removeEventListener('beforeunload', handleStart);
      window.removeEventListener('load', handleComplete);
    };
  }, [pathname, onGitHubPages]);

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