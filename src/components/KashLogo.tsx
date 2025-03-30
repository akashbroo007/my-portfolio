'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const KashLogo: React.FC<{ className?: string, isLoading?: boolean }> = ({ 
  className = '',
  isLoading = false
}) => {
  const controls = useAnimation();
  const hasAnimated = useRef(false);
  const [simplified, setSimplified] = useState(false);
  
  // Make the animation simpler if it doesn't complete quickly
  useEffect(() => {
    // Check for GitHub Pages
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    
    if (isGitHubPages) {
      // Use simplified version immediately on GitHub Pages
      setSimplified(true);
      return;
    }
    
    // Safety timeout to simplify animation if it takes too long
    const safetyTimeout = setTimeout(() => {
      console.log("Using simplified logo animation for reliability");
      setSimplified(true);
    }, 1000);
    
    return () => clearTimeout(safetyTimeout);
  }, []);
  
  // Ensure animation completes
  useEffect(() => {
    if (!hasAnimated.current) {
      // Only try to animate if we need to
      if (isLoading && !simplified) {
        controls.start("visible")
          .then(() => {
            hasAnimated.current = true;
          })
          .catch(() => {
            hasAnimated.current = true;
          });
      }
      
      // Force animation completion after short timeout
      const forceTimeout = setTimeout(() => {
        hasAnimated.current = true;
      }, 2000);
      
      return () => clearTimeout(forceTimeout);
    }
  }, [isLoading, controls, simplified]);
  
  // Use a much simpler animation for GitHub Pages and fallback
  if (simplified) {
    return (
      <div className={`relative ${className}`}>
        <svg
          viewBox="0 0 100 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <g transform="translate(15,10)">
            <path
              d="M0 20 L15 0 L30 20 L15 40 Z"
              stroke="#2D1A2D"
              strokeWidth="0"
              fill="#2D1A2D"
            />
            <path
              d="M20 20 L35 0 L50 20 L35 40 Z"
              stroke="#9D8BE5"
              strokeWidth="0"
              fill="#9D8BE5"
            />
            <path
              d="M40 20 L55 0 L70 20 L55 40 Z"
              stroke="#FF6B6B"
              strokeWidth="0"
              fill="#FF6B6B"
            />
          </g>
        </svg>
      </div>
    );
  }

  // Original animated version
  const pathVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: {
        pathLength: { 
          type: "spring",
          duration: 0.8, // Even shorter animation
          bounce: 0,
          delay: i * 0.1 // Minimal delays
        },
        opacity: { duration: 0.01 }
      }
    })
  };

  const containerVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.2, 
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.svg
        viewBox="0 0 100 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <g transform="translate(15,10)">
          {/* First (darkest) rectangle */}
          <motion.path
            d="M0 20 L15 0 L30 20 L15 40 Z"
            variants={pathVariants}
            custom={0}
            stroke="#2D1A2D"
            strokeWidth={isLoading ? 2 : 0}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLoading ? "none" : "#2D1A2D"}
            animate={{
              fill: isLoading ? ["none", "#2D1A2D"] : ["none", "#2D1A2D"],
              transition: { delay: 0.5, duration: 0.2 }
            }}
          />
          
          {/* Middle (purple) rectangle */}
          <motion.path
            d="M20 20 L35 0 L50 20 L35 40 Z"
            variants={pathVariants}
            custom={1}
            stroke="#9D8BE5"
            strokeWidth={isLoading ? 2 : 0}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLoading ? "none" : "#9D8BE5"}
            animate={{
              fill: isLoading ? ["none", "#9D8BE5"] : ["none", "#9D8BE5"],
              transition: { delay: 0.6, duration: 0.2 }
            }}
          />
          
          {/* Last (coral) rectangle */}
          <motion.path
            d="M40 20 L55 0 L70 20 L55 40 Z"
            variants={pathVariants}
            custom={2}
            stroke="#FF6B6B"
            strokeWidth={isLoading ? 2 : 0}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLoading ? "none" : "#FF6B6B"}
            animate={{
              fill: isLoading ? ["none", "#FF6B6B"] : ["none", "#FF6B6B"],
              transition: { delay: 0.7, duration: 0.2 }
            }}
          />
        </g>
      </motion.svg>
    </div>
  );
};

export default KashLogo; 