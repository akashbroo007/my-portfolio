'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    console.log('404 Not Found Page Rendered');
    
    // Check if we're on GitHub Pages
    const isGitHubPages = typeof window !== 'undefined' && 
      window.location.hostname.includes('github.io');
    
    // Get the current path
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    console.log('Current path:', currentPath);
  }, []);

  // Get the appropriate base path for links
  const getBasePath = () => {
    if (typeof window !== 'undefined') {
      if (window.location.hostname.includes('github.io')) {
        return '/my-portfolio';
      }
    }
    return '';
  };
  
  // Handle navigation action
  const handleNavigation = (path: string) => {
    const basePath = getBasePath();
    const fullPath = `${basePath}${path}`;
    router.push(fullPath);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-8">This page could not be found.</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => handleNavigation('/')}>
          Return Home
        </Button>
        <Button 
          variant="outline"
          onClick={() => handleNavigation('/projects')}
        >
          View Projects
        </Button>
      </div>
    </div>
  );
} 