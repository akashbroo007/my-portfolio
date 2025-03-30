'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import KashLogo from './KashLogo';

const LoadingScreen: React.FC<{ isLoading: boolean; onLoadingComplete: () => void }> = ({
  isLoading,
  onLoadingComplete
}) => {
  const controls = useAnimation();
  const animationStartedRef = useRef(false);
  const forcedCompletionRef = useRef(false);
  
  // Force completion after a timeout, no matter what
  useEffect(() => {
    // Super agressive timeout to force loading to complete
    const forcedTimeout = setTimeout(() => {
      if (!forcedCompletionRef.current) {
        console.log('FORCED loading animation completion after timeout');
        forcedCompletionRef.current = true;
        controls.set({ opacity: 0, display: 'none' });
        onLoadingComplete();
      }
    }, 4000);
    
    return () => clearTimeout(forcedTimeout);
  }, [controls, onLoadingComplete]);
  
  // Handle normal animation flow
  useEffect(() => {
    if (!animationStartedRef.current) {
      animationStartedRef.current = true;
      
      // Initial animation delay - shorter than before
      setTimeout(() => {
        if (!forcedCompletionRef.current) {
          if (!isLoading) {
            controls.start({
              opacity: 0,
              transitionEnd: { display: 'none' }
            });
          }
        }
      }, 2000);
    }
  }, [isLoading, controls]);
  
  if (forcedCompletionRef.current) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ opacity: 1, display: 'flex' }}
      animate={controls}
      transition={{ duration: 0.5 }}
      onAnimationComplete={() => {
        if (!isLoading && !forcedCompletionRef.current) {
          console.log('Loading animation complete');
          forcedCompletionRef.current = true;
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
        transition={{ delay: 0.5 }}
        className="text-white text-xl font-mono"
      >
        KashVenture Inc.
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen; 