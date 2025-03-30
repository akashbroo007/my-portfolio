'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { motion, useAnimation, Variant } from 'framer-motion';
import { useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  once?: boolean;
  style?: React.CSSProperties;
  distance?: number;
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  width = "fit-content",
  delay = 0.2,
  direction = 'up',
  className = '',
  once = true,
  style = {},
  distance = 50,
  duration = 0.6,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-100px' });
  const controls = useAnimation();

  // Set up variants based on direction
  const getVariants = () => {
    let initial: Variant = { opacity: 0 };
    
    switch (direction) {
      case 'up':
        initial.y = distance;
        break;
      case 'down':
        initial.y = -distance;
        break;
      case 'left':
        initial.x = distance;
        break;
      case 'right':
        initial.x = -distance;
        break;
      case 'none':
        // Only opacity animation
        break;
    }
    
    return {
      hidden: initial,
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          duration: duration,
          delay: delay,
          ease: [0.2, 0.65, 0.3, 0.9],
        }
      }
    };
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      style={{ width, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Create a staggered container for multiple elements
export const ScrollRevealContainer: React.FC<{
  children: ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
}> = ({ 
  children, 
  delay = 0, 
  staggerChildren = 0.1,
  className = '',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren,
        delayChildren: delay,
      }
    }
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Child item for the staggered container
export const ScrollRevealItem: React.FC<{
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
  distance?: number;
}> = ({ 
  children, 
  direction = 'up',
  className = '',
  distance = 30,
}) => {
  const getVariants = () => {
    let initial: Variant = { opacity: 0 };
    
    switch (direction) {
      case 'up':
        initial.y = distance;
        break;
      case 'down':
        initial.y = -distance;
        break;
      case 'left':
        initial.x = distance;
        break;
      case 'right':
        initial.x = -distance;
        break;
      case 'none':
        // Only opacity animation
        break;
    }
    
    return {
      hidden: initial,
      visible: { 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.2, 0.65, 0.3, 0.9],
        }
      }
    };
  };

  return (
    <motion.div
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
}; 