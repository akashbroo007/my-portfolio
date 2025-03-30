'use client'

import KashLogo from '@/components/KashLogo';

export default function LogoDemo() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <KashLogo className="mx-auto mb-4 w-32 h-32" />
        <h1 className="text-2xl font-mono tracking-wider mt-4">
          KashVenture Inc.
        </h1>
      </div>
    </div>
  );
} 