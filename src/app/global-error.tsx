'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
          <div className="bg-red-900/20 p-4 rounded-lg mb-6 max-w-lg">
            <pre className="text-red-400 mb-2 text-sm overflow-auto">{error.message}</pre>
            {error.stack && (
              <details className="text-xs text-gray-400 text-left">
                <summary>Error details</summary>
                <pre className="mt-2 overflow-auto p-2 bg-black/50 rounded">{error.stack}</pre>
              </details>
            )}
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
} 