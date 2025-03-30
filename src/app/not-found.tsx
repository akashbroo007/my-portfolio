'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // Check if we have a path in the URL from the 404.html redirect
    const urlParams = new URLSearchParams(window.location.search);
    const path = urlParams.get('path');
    
    if (path) {
      // Handle routing for GitHub Pages
      const basePath = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';
      router.push(`${basePath}${path}`);
    }
  }, [router]);

  const getBasePath = () => {
    return process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';
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