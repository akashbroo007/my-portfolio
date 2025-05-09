'use client';

import React, { ReactNode, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

type GradientDirection = 
  | 'to-right'
  | 'to-left'
  | 'to-bottom'
  | 'to-top'
  | 'to-bottom-right'
  | 'to-bottom-left'
  | 'to-top-right'
  | 'to-top-left'
  | 'radial';

interface GradientBackgroundProps {
  children: ReactNode;
  className?: string;
  colors: string[]; // Array of color values
  direction?: GradientDirection;
  animate?: boolean;
  animationDuration?: number;
  opacity?: number;
  performance?: 'low' | 'medium' | 'high';
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  className = '',
  colors,
  direction = 'to-bottom',
  animate = false,
  animationDuration = 8,
  opacity = 1,
  performance = 'medium',
}): React.ReactElement => {
  // All state declarations at the top
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Convert direction to CSS gradient direction - using useMemo to avoid recomputation
  const gradientDirection = useMemo(() => {
    switch (direction) {
      case 'to-right': return 'to right';
      case 'to-left': return 'to left';
      case 'to-bottom': return 'to bottom';
      case 'to-top': return 'to top';
      case 'to-bottom-right': return 'to bottom right';
      case 'to-bottom-left': return 'to bottom left';
      case 'to-top-right': return 'to top right';
      case 'to-top-left': return 'to top left';
      case 'radial': return 'circle at center';
      default: return 'to bottom';
    }
  }, [direction]);
  
  // Generate gradient string with safety checks - using useMemo
  const gradientString = useMemo(() => {
    // Ensure colorList is an array
    if (!Array.isArray(colors) || colors.length === 0) {
      return 'linear-gradient(to bottom, #000, #333)'; // Fallback gradient
    }
    
    try {
      if (direction === 'radial') {
        return `radial-gradient(${gradientDirection}, ${colors.join(', ')})`;
      }
      return `linear-gradient(${gradientDirection}, ${colors.join(', ')})`;
    } catch (error) {
      console.error('Error generating gradient:', error);
      return 'linear-gradient(to bottom, #000, #333)'; // Fallback gradient
    }
  }, [colors, direction, gradientDirection]);
  
  // Animation variants defined once at the top level
  const variants = useMemo(() => ({
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: animationDuration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  }), [animationDuration]);
  
  // Calculate animation settings based on component state - using useMemo
  const animationSettings = useMemo(() => {
    // Default empty settings if no animation
    if (!shouldAnimate) {
      return {
        style: {} as React.CSSProperties,
        animate: undefined as any,
        variants: undefined as any,
      };
    }
    
    try {
      const backgroundSize = performance === 'high' ? '200% 200%' : '150% 150%';
      
      // On mobile or lower performance settings, use CSS animation instead
      if (isMobile || performance === 'low') {
        return {
          style: {
            animation: `gradientAnimation ${animationDuration}s ease infinite`,
            backgroundSize,
          } as React.CSSProperties,
          animate: undefined as any,
          variants: undefined as any,
        };
      }
      
      // For higher performance, use framer-motion
      return {
        style: { backgroundSize } as React.CSSProperties,
        animate: 'animate' as const,
        variants,
      };
    } catch (error) {
      console.error('Error in animation settings:', error);
      // Return safe fallback
      return {
        style: {} as React.CSSProperties,
        animate: undefined as any,
        variants: undefined as any,
      };
    }
  }, [shouldAnimate, performance, isMobile, animationDuration, variants]);
  
  // Base style derived from component props
  const baseStyle = useMemo<React.CSSProperties>(() => ({
    backgroundImage: gradientString,
    opacity,
    willChange: shouldAnimate ? 'background-position' : 'auto',
    transform: 'translateZ(0)', // Force GPU acceleration
  }), [gradientString, opacity, shouldAnimate]);
  
  // Safe extraction with defaults - using useMemo
  const { 
    style: animationStyle = {}, 
    animate: animationState = undefined, 
    variants: animationVariants = undefined 
  } = animationSettings;
  
  // Check client preferences once mounted with safe guards against undefined
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    let isActive = true; // Flag to track component mounted state
    
    try {
      // Safe checks for browser APIs
      const prefersReducedMotion = 
        window.matchMedia && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Safely check for battery API
      let isLowPowerMode = false;
      if (
        'getBattery' in navigator && 
        typeof navigator.getBattery === 'function'
      ) {
        // Handle battery detection safely
        navigator.getBattery?.()
          .then((battery: any) => {
            if (!isActive) return; // Don't set state if unmounted
            
            if (battery && typeof battery.charging === 'boolean' && typeof battery.level === 'number') {
              isLowPowerMode = battery.charging === false && battery.level < 0.3;
            }
          })
          .catch(() => {
            // Silently fail if battery API fails
          });
      }
      
      // Safe window width check
      const checkMobile = () => {
        if (!isActive) return; // Don't set state if unmounted
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      
      // Add resize listener with cleanup
      if (window.addEventListener) {
        window.addEventListener('resize', checkMobile);
      }
      
      // Only animate if user hasn't requested reduced motion and performance allows
      const shouldEnableAnimation = animate && 
        !prefersReducedMotion && 
        !(performance === 'low' && isMobile);
      
      if (isActive) {
        setShouldAnimate(shouldEnableAnimation);
      }
      
      // Cleanup
      return () => {
        isActive = false; // Mark component as unmounted
        if (window.removeEventListener) {
          window.removeEventListener('resize', checkMobile);
        }
      };
    } catch (error) {
      // Fallback to no animation on error
      console.error('Error in gradient animation setup:', error);
      if (isActive) {
        setShouldAnimate(false);
      }
    }
  }, [animate, performance, isMobile]);

  return (
    <motion.div
      className={`relative gradient-container ${className}`}
      style={{
        ...baseStyle,
        ...animationStyle,
      }}
      animate={animationState}
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );
};

// Gradient text component for creating text with gradient colors
export const GradientText: React.FC<{
  children: ReactNode;
  className?: string;
  colors: string[];
  direction?: GradientDirection;
  animate?: boolean;
  animationDuration?: number;
  as?: keyof JSX.IntrinsicElements;
  performance?: 'low' | 'medium' | 'high';
}> = ({
  children,
  className = '',
  colors,
  direction = 'to-right',
  animate = false,
  animationDuration = 8,
  as: Component = 'span',
  performance = 'medium',
}): React.ReactElement => {
  // All state declarations at the top
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Convert direction to CSS gradient direction - using useMemo
  const gradientDirection = useMemo(() => {
    switch (direction) {
      case 'to-right': return 'to right';
      case 'to-left': return 'to left';
      case 'to-bottom': return 'to bottom';
      case 'to-top': return 'to top';
      case 'to-bottom-right': return 'to bottom right';
      case 'to-bottom-left': return 'to bottom left';
      case 'to-top-right': return 'to top right';
      case 'to-top-left': return 'to top left';
      case 'radial': return 'circle at center';
      default: return 'to right';
    }
  }, [direction]);
  
  // Generate gradient string with safety checks - using useMemo
  const gradientString = useMemo(() => {
    // Ensure colors is an array
    if (!Array.isArray(colors) || colors.length === 0) {
      return 'linear-gradient(to right, #fff, #ccc)'; // Fallback gradient
    }
    
    try {
      if (direction === 'radial') {
        return `radial-gradient(${gradientDirection}, ${colors.join(', ')})`;
      }
      return `linear-gradient(${gradientDirection}, ${colors.join(', ')})`;
    } catch (error) {
      console.error('Error generating text gradient:', error);
      return 'linear-gradient(to right, #fff, #ccc)'; // Fallback gradient
    }
  }, [colors, direction, gradientDirection]);
  
  // Animation variants for text gradients - using useMemo
  const variants = useMemo(() => ({
    animate: {
      backgroundPosition: ['0% center', '100% center'],
      transition: {
        duration: animationDuration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  }), [animationDuration]);
  
  // Calculate animation settings - using useMemo
  const animationSettings = useMemo(() => {
    if (!shouldAnimate) {
      return {
        style: {} as React.CSSProperties,
        animate: undefined as any,
        variants: undefined as any,
      };
    }
    
    try {
      // On lower performance, use CSS animation instead of JS animation
      if (performance === 'low' || isMobile) {
        return {
          style: {
            animation: `gradientTextAnimation ${animationDuration}s linear infinite`,
            backgroundSize: '200% auto',
          } as React.CSSProperties,
          animate: undefined as any,
          variants: undefined as any,
        };
      }
      
      return {
        style: { backgroundSize: '200% auto' } as React.CSSProperties,
        animate: 'animate' as const,
        variants,
      };
    } catch (error) {
      console.error('Error in text animation settings:', error);
      return {
        style: {} as React.CSSProperties,
        animate: undefined as any,
        variants: undefined as any,
      };
    }
  }, [shouldAnimate, performance, isMobile, animationDuration, variants]);
  
  // Base style derived from props - using useMemo
  const baseStyle = useMemo<React.CSSProperties>(() => ({
    backgroundImage: gradientString,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    willChange: shouldAnimate ? 'background-position' : 'auto',
  }), [gradientString, shouldAnimate]);
  
  // Safe extraction with defaults
  const { 
    style: animationStyle = {}, 
    animate: animationState = undefined, 
    variants: animationVariants = undefined 
  } = animationSettings;
  
  // Check client preferences once mounted with safeguards
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    let isActive = true; // Flag to track component mounted state
    
    try {
      // Safe media query check
      const prefersReducedMotion = 
        window.matchMedia && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Safe mobile detection
      const checkMobile = () => {
        if (!isActive) return; // Don't set state if unmounted
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      
      // Add resize listener with cleanup
      if (window.addEventListener) {
        window.addEventListener('resize', checkMobile);
      }
      
      // For text animations, we're more conservative (they can be visually distracting)
      const shouldEnableAnimation = animate && 
        !prefersReducedMotion && 
        !(performance === 'low' || (performance === 'medium' && isMobile));
      
      if (isActive) {
        setShouldAnimate(shouldEnableAnimation);
      }
      
      // Cleanup
      return () => {
        isActive = false; // Mark component as unmounted
        if (window.removeEventListener) {
          window.removeEventListener('resize', checkMobile);
        }
      };
    } catch (error) {
      // Fallback to no animation on error
      console.error('Error in gradient text animation setup:', error);
      if (isActive) {
        setShouldAnimate(false);
      }
    }
  }, [animate, performance, isMobile]);

  return (
    <motion.span
      className={className}
      style={{
        ...baseStyle,
        ...animationStyle,
      }}
      animate={animationState}
      variants={animationVariants}
    >
      {children}
    </motion.span>
  );
}; 