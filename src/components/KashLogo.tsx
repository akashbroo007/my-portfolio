'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const KashLogo: React.FC<{ className?: string, isLoading?: boolean }> = ({ 
  className = '',
  isLoading = false
}) => {
  const controls = useAnimation();
  const hasAnimated = useRef(false);
  
  // Make sure the animation is properly completed
  useEffect(() => {
    if (isLoading && !hasAnimated.current) {
      controls.start("visible")
        .then(() => {
          hasAnimated.current = true;
          console.log("Logo animation completed");
        })
        .catch(error => {
          console.error("Logo animation error:", error);
          hasAnimated.current = true; // Mark as done even if there's an error
        });
      
      // Safety timeout to ensure animation completes
      const safetyTimeout = setTimeout(() => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          console.log("Logo animation forced completion via timeout");
        }
      }, 3000);
      
      return () => clearTimeout(safetyTimeout);
    }
  }, [isLoading, controls]);
  
  const pathVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (i: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: {
        pathLength: { 
          type: "spring",
          duration: 1.0, // Shortened animation
          bounce: 0,
          delay: i * 0.15 // Slightly shorter delays
        },
        opacity: { duration: 0.01 }
      }
    })
  };

  const containerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3, // Shorter duration for container animation
        ease: "easeOut",
        staggerChildren: 0.15,
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
              fill: isLoading ? ["none", "none"] : ["none", "#2D1A2D"],
              transition: { delay: 1.0, duration: 0.3 } // Shorter delays
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
              fill: isLoading ? ["none", "none"] : ["none", "#9D8BE5"],
              transition: { delay: 1.2, duration: 0.3 } // Shorter delays
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
              fill: isLoading ? ["none", "none"] : ["none", "#FF6B6B"],
              transition: { delay: 1.4, duration: 0.3 } // Shorter delays
            }}
          />
        </g>
      </motion.svg>
    </div>
  );
};

export default KashLogo; 