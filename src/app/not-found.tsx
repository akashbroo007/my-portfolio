'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  const basePath = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 bg-black text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-8">This page could not be found.</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button>
            Return Home
          </Button>
        </Link>
        <Link href="/projects/">
          <Button variant="outline">
            View Projects
          </Button>
        </Link>
      </div>
    </div>
  );
} 