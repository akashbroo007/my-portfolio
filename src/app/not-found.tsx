'use client';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  // Direct navigation to home page
  const goHome = () => {
    const isGitHubPages = typeof window !== 'undefined' && 
      window.location.hostname.includes('github.io');
    
    const basePath = isGitHubPages ? '/my-portfolio' : '';
    window.location.href = `${basePath}/`;
  };
  
  // Direct navigation to projects page
  const goToProjects = () => {
    const isGitHubPages = typeof window !== 'undefined' && 
      window.location.hostname.includes('github.io');
    
    const basePath = isGitHubPages ? '/my-portfolio' : '';
    window.location.href = `${basePath}/projects/`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-8">This page could not be found.</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={goHome}>
          Return Home
        </Button>
        <Button 
          variant="outline"
          onClick={goToProjects}
        >
          View Projects
        </Button>
      </div>
    </div>
  );
} 