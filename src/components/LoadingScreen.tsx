'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import KashLogo from './KashLogo';

const LoadingScreen: React.FC<{ isLoading: boolean; onLoadingComplete: () => void }> = ({
  isLoading,
  onLoadingComplete
}) => {
  const controls = useAnimation();
  
  useEffect(() => {
    // If not loading, start the exit animation
    if (!isLoading) {
      controls.start({
        opacity: 0,
        transitionEnd: { display: 'none' }
      });
    }
    
    // Automatic fallback to ensure the loading screen eventually disappears
    const safetyTimeout = setTimeout(() => {
      if (isLoading) {
        console.log('Safety timeout triggered to complete loading');
        onLoadingComplete();
      }
    }, 4000); // Failsafe timeout
    
    return () => clearTimeout(safetyTimeout);
  }, [isLoading, controls, onLoadingComplete]);
  
  return (
    <motion.div
      initial={{ opacity: 1, display: 'flex' }}
      animate={controls}
      transition={{ duration: 0.5, delay: 2.2 }}
      onAnimationComplete={() => {
        if (!isLoading) {
          console.log('Loading animation complete');
          onLoadingComplete();
        }
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <div className="w-32 h-32 mb-8">
        <KashLogo isLoading={true} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-white text-xl font-mono"
      >
        KashVenture Inc.
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen; 