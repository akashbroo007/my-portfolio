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
  // Define all refs and state at the top
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // All hooks must be called before any conditionals
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const controls = useAnimation();
  const { scrollY } = useScroll();
  
  // Calculate values for transforms
  const initial = useMemo(() => Math.max(0, elementTop - clientHeight), [elementTop, clientHeight]);
  const final = useMemo(() => Math.max(1, elementTop + (ref.current?.offsetHeight || 0)), [elementTop, ref]);
  
  // Ensure offset is a valid array with two elements
  const safeOffset = useMemo(() => 
    Array.isArray(offset) && offset.length === 2 ? [offset[0], offset[1]] : [-50, 50],
  [offset]);
  
  // Adjust speed based on device type
  const effectiveSpeed = useMemo(() => 
    (isMobile && options.disableOnMobile) ? speed * 0.3 : speed,
  [isMobile, options.disableOnMobile, speed]);
  
  // Define all transforms using hooks at the top level
  const scrollYProgress = useTransform(scrollY, [initial, final], [0, 1]);
  
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
  
  // Spring configuration for smooth motion
  const springConfig = useMemo(() => ({ 
    damping: isMobile ? 25 : 15, 
    stiffness: isMobile ? 100 : 55,
    mass: 0.5
  }), [isMobile]);
  
  const animatedProgress = useSpring(smoothProgress, springConfig);
  
  // Pre-define all direction transforms at the component level
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
  
  // Select which transform to use based on direction
  const activeTransform = useMemo(() => {
    switch(direction) {
      case 'down': return downTransform;
      case 'left': return leftTransform;
      case 'right': return rightTransform;
      case 'up':
      default: return upTransform;
    }
  }, [direction, upTransform, downTransform, leftTransform, rightTransform]);
  
  // Determine if we should use x or y transform
  const y = useMemo(() => 
    (direction === 'up' || direction === 'down') && isInView ? activeTransform : undefined,
  [direction, isInView, activeTransform]);
  
  const x = useMemo(() => 
    (direction === 'left' || direction === 'right') && isInView ? activeTransform : undefined,
  [direction, isInView, activeTransform]);
  
  // Check for reduced motion preference
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);
  
  // Detect mobile devices
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Update element position on scroll
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let rafId: number | null = null;
    let isActive = true; // Flag to prevent updates after unmount
    
    const updatePosition = () => {
      if (!isActive) return;
      
      try {
        if (Math.abs(window.scrollY - lastScrollY) > 5 || lastScrollY === 0) {
          const rect = element.getBoundingClientRect();
          if (rect) {
            setElementTop(rect.top + window.scrollY);
            setClientHeight(window.innerHeight);
            setLastScrollY(window.scrollY);
          }
        }
        
        // Request next frame if component is still mounted
        if (typeof window !== 'undefined' && isActive) {
          rafId = requestAnimationFrame(updatePosition);
        }
      } catch (error) {
        console.error('Error updating parallax position:', error);
        if (rafId !== null && typeof window !== 'undefined') {
          cancelAnimationFrame(rafId);
        }
      }
    };
    
    // Initial measurement
    try {
      const rect = element.getBoundingClientRect();
      if (rect) {
        setElementTop(rect.top + window.scrollY);
        setClientHeight(window.innerHeight);
      }
      
      if (typeof window !== 'undefined') {
        rafId = requestAnimationFrame(updatePosition);
      }
    } catch (error) {
      console.error('Error in initial parallax setup:', error);
    }
    
    return () => {
      isActive = false; // Mark component as unmounted
      if (rafId !== null && typeof window !== 'undefined') {
        cancelAnimationFrame(rafId);
      }
    };
  }, [lastScrollY]);
  
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
  
  // All hooks need to be called before any conditionals
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll();
  
  // Computed values using useMemo
  const isMobile = useMemo(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  []);
  
  const effectiveSpeed = useMemo(() => 
    isMobile ? speed * 0.5 : speed,
  [isMobile, speed]);
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${effectiveSpeed * 100}%`]);
  
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);

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
  
  // All hooks must be called at the top level
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const { scrollYProgress } = useScroll();
  
  // Computed values using useMemo
  const isMobile = useMemo(() => 
    typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  []);
  
  const effectiveSpeed = useMemo(() => 
    isMobile ? speed * 0.5 : speed,
  [isMobile, speed]);
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${effectiveSpeed * 100}%`]);
  
  const prefersReducedMotion = useMemo(() => 
    typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false,
  []);

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