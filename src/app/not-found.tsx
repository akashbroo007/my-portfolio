'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    console.log('Not found page - current path:', pathname);
    
    // Check if we should try to recover from GitHub Pages 404
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // Store this invalid path in sessionStorage before redirecting to home
      sessionStorage.setItem('redirect_path', '/');
      console.log('Saving home path to sessionStorage for recovery');
      
      // Redirect to homepage after a brief delay
      const timeout = setTimeout(() => {
        const basePath = '/my-portfolio';
        router.push(basePath);
      }, 2000);
      
      return () => clearTimeout(timeout);
    }
  }, [pathname, router]);

  const getBasePath = () => {
    if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
      return '/my-portfolio';
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-8">This page could not be found.</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href={`${getBasePath()}/`}>
          <Button>
            Return Home
          </Button>
        </Link>
        <Link href={`${getBasePath()}/projects`}>
          <Button variant="outline">
            View Projects
          </Button>
        </Link>
      </div>
    </div>
  );
} 