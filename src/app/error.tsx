'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getBasePath } from '@/lib/utils';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to the console
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <div className="bg-red-900/20 p-4 rounded-lg mb-6 max-w-lg">
        <p className="text-red-400 mb-2">Error: {error.message}</p>
        {error.digest && (
          <p className="text-xs text-gray-400">Error ID: {error.digest}</p>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={reset} variant="default">
          Try again
        </Button>
        <Link href={`${getBasePath()}/`}>
          <Button variant="outline">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
} 