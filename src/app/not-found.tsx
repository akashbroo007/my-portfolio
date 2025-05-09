'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatPath, getCleanPath, isGitHubPages } from '@/utils/navigation';

export default function NotFound() {
  const router = useRouter();
  const [onGitHubPages, setOnGitHubPages] = useState(false);
  
  useEffect(() => {
    // Check if we're on GitHub Pages
    if (typeof window !== 'undefined') {
      setOnGitHubPages(isGitHubPages());
    }
  }, []);
  
  // Handle navigation to prevent navigation issues
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onGitHubPages) {
      e.preventDefault();
      
      try {
        // Get clean path for router
        const cleanPath = getCleanPath(path);
        
        // Use Next.js router for client-side navigation
        router.push(cleanPath);
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to traditional navigation
        window.location.href = formatPath(path);
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto w-full"
      >
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-medium mb-8">This page could not be found.</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href={formatPath('/')} 
            onClick={(e) => handleNavigation(e, '/')}
          >
            <Button>
              Return Home
            </Button>
          </Link>
          <Link 
            href={formatPath('/projects/')} 
            onClick={(e) => handleNavigation(e, '/projects/')}
          >
            <Button variant="outline">
              View Projects
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 