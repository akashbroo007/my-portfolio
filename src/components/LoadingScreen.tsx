import React from 'react';
import { motion } from 'framer-motion';
import KashLogo from './KashLogo';

const LoadingScreen: React.FC<{ isLoading: boolean; onLoadingComplete: () => void }> = ({
  isLoading,
  onLoadingComplete
}) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isLoading ? 1 : 0,
        transitionEnd: {
          display: isLoading ? 'flex' : 'none'
        }
      }}
      transition={{ duration: 0.5, delay: 2.2 }}
      onAnimationComplete={() => !isLoading && onLoadingComplete()}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
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