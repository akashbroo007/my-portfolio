'use client';

import React, { useState, useEffect, ReactNode, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue, useAnimation, useInView } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
  offset?: [number, number]; // [start, end] values for transform
  options?: {
    throttleAmount?: number;
    disableOnMobile?: boolean;
  };
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  style = {},
  offset = [-50, 50], // default offset values
  options = {
    throttleAmount: 0,
    disableOnMobile: true
  }
}): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Detect mobile devices
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Adjust speed based on device
  const effectiveSpeed = isMobile && options.disableOnMobile ? speed * 0.3 : speed;
  
  // Use standard scroll
  const { scrollY } = useScroll();

  // Calculate percentage scrolled (0 - 1) based on element position
  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight || 0);
  
  // Ensure offset is a valid array with two elements
  const safeOffset: [number, number] = useMemo(() => {
    return Array.isArray(offset) && offset.length === 2 
      ? [offset[0], offset[1]] 
      : [-50, 50]; // Default fallback values
  }, [offset]);
  
  // Create all transformations at the component level, not in nested functions
  // This ensures hooks are always called in the same order
  const scrollYProgress = useTransform(
    scrollY,
    [Math.max(0, initial), Math.max(1, final)], // Ensure we don't have negative values
    [0, 1]
  );
  
  // Apply throttling if specified
  const throttleValue = options?.throttleAmount || 0;
  const smoothProgress = useMemo(() => {
    if (throttleValue > 0) {
      return useTransform(scrollYProgress, (value) => 
        Math.round(value * throttleValue) / throttleValue
      );
    }
    return scrollYProgress;
  }, [scrollYProgress, throttleValue]);
  
  // Spring configuration  
  const springConfig = { 
    damping: isMobile ? 25 : 15, 
    stiffness: isMobile ? 100 : 55,
    mass: 0.5
  };
  
  const animatedProgress = useSpring(smoothProgress, springConfig);
  
  // Direction-specific transforms
  const upTransform = useTransform(
    animatedProgress, 
    [0, 1], 
    [safeOffset[1] * effectiveSpeed, safeOffset[0] * effectiveSpeed]
  );
  
  const downTransform = useTransform(
    animatedProgress, 
    [0, 1], 
    [safeOffset[0] * effectiveSpeed, safeOffset[1] * effectiveSpeed]
  );
  
  const leftTransform = useTransform(
    animatedProgress, 
    [0, 1], 
    [safeOffset[1] * effectiveSpeed, safeOffset[0] * effectiveSpeed]
  );
  
  const rightTransform = useTransform(
    animatedProgress, 
    [0, 1], 
    [safeOffset[0] * effectiveSpeed, safeOffset[1] * effectiveSpeed]
  );

  // Get the appropriate transform based on direction
  const getTransformForDirection = () => {
    switch (direction) {
      case 'up': return upTransform;
      case 'down': return downTransform;
      case 'left': return leftTransform;
      case 'right': return rightTransform;
      default: return upTransform;
    }
  };

  const y = direction === 'up' || direction === 'down' 
    ? (isInView ? getTransformForDirection() : undefined) 
    : undefined;
    
  const x = direction === 'left' || direction === 'right' 
    ? (isInView ? getTransformForDirection() : undefined) 
    : undefined;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let rafId: number | null = null;
    
    const updatePosition = () => {
      try {
        if (Math.abs(window.scrollY - lastScrollY) > 5 || lastScrollY === 0) {
          const rect = element.getBoundingClientRect();
          if (rect) {
            setElementTop(rect.top + window.scrollY || 0);
            setClientHeight(window.innerHeight);
            setLastScrollY(window.scrollY);
          }
        }
        // Make sure we have a clean reference to window before continuing
        if (typeof window !== 'undefined') {
          rafId = requestAnimationFrame(updatePosition);
        }
      } catch (error) {
        console.error('Error updating parallax position:', error);
        // Cancel animation frame on error
        if (rafId !== null && typeof window !== 'undefined') {
          cancelAnimationFrame(rafId);
        }
      }
    };

    // Initial measurement with safety checks
    try {
      const rect = element.getBoundingClientRect();
      if (rect) {
        setElementTop(rect.top + window.scrollY || 0);
        setClientHeight(window.innerHeight);
      }
      
      // Use requestAnimationFrame for smoother updates
      if (typeof window !== 'undefined') {
        rafId = requestAnimationFrame(updatePosition);
      }
    } catch (error) {
      console.error('Error in initial parallax setup:', error);
    }
    
    return () => {
      // Cleanup with null check
      if (rafId !== null && typeof window !== 'undefined') {
        cancelAnimationFrame(rafId);
      }
    };
  }, [ref, lastScrollY]);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  // Don't apply parallax if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        ref={ref}
        style={style}
        className={className}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        ...style,
        y,
        x,
        willChange: 'transform',
        contain: 'content',
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
      className={`parallax-container ${className}`}
    >
      {children}
    </motion.div>
  );
};

// ParallaxSection component for creating entire sections with parallax backgrounds
export const ParallaxSection: React.FC<{
  backgroundImage: string;
  children: ReactNode;
  speed?: number;
  className?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  height?: string;
}> = ({
  backgroundImage,
  children,
  speed = 0.3,
  className = '',
  overlayColor = 'rgba(0, 0, 0, 0.7)',
  overlayOpacity = 0.7,
  height = '100vh',
}): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  
  // Safely access scrollYProgress - always call hooks at the top level
  const { scrollYProgress } = useScroll();
  
  // Safely detect mobile devices
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  
  // Reduce effect on mobile
  const effectiveSpeed = isMobile ? speed * 0.5 : speed;
  
  // Always call useTransform at the top level
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0%', `${effectiveSpeed * 100}%`]
  );

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div 
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          y: prefersReducedMotion ? 0 : y,
          willChange: 'transform',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
      />
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

// ParallaxLayer component for creating layered parallax effects
export const ParallaxLayer: React.FC<{
  children: ReactNode;
  speed?: number;
  className?: string;
  zIndex?: number;
}> = ({
  children,
  speed = 0.5,
  className = '',
  zIndex = 10,
}): React.ReactElement => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  
  // Always call hooks at the top level
  const { scrollYProgress } = useScroll();
  
  // Safely detect mobile devices
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  
  // Reduce effect on mobile
  const effectiveSpeed = isMobile ? speed * 0.5 : speed;
  
  // Always call useTransform at the top level
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    ['0%', `${effectiveSpeed * 100}%`]
  );

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <motion.div
      ref={ref}
      className={`absolute w-full parallax-container ${className}`}
      style={{ 
        y: prefersReducedMotion ? 0 : y,
        zIndex,
        willChange: 'transform',
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    >
      {children}
    </motion.div>
  );
}; 