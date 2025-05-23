'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  // Handle navigation
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    // Use Next.js router for client-side navigation
    router.push(path);
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
            href="/" 
            onClick={(e) => handleNavigation(e, '/')}
          >
            <Button>
              Return Home
            </Button>
              </Link>
          <Link 
            href="/projects" 
            onClick={(e) => handleNavigation(e, '/projects')}
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