'use client';

import React, { ReactNode, useEffect, useState } from 'react';
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
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check client preferences once mounted with safe guards against undefined
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
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
        
      setShouldAnimate(shouldEnableAnimation);
      
      // Cleanup
      return () => {
        if (window.removeEventListener) {
          window.removeEventListener('resize', checkMobile);
        }
      };
    } catch (error) {
      // Fallback to no animation on error
      console.error('Error in gradient animation setup:', error);
      setShouldAnimate(false);
    }
  }, [animate, performance, isMobile]);

  // Convert direction to CSS gradient direction
  const getGradientDirection = () => {
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
  };

  // Generate gradient string with safety checks
  const generateGradient = (colorList: string[]) => {
    // Ensure colorList is an array
    if (!Array.isArray(colorList) || colorList.length === 0) {
      return 'linear-gradient(to bottom, #000, #333)'; // Fallback gradient
    }
    
    try {
      if (direction === 'radial') {
        return `radial-gradient(${getGradientDirection()}, ${colorList.join(', ')})`;
      }
      return `linear-gradient(${getGradientDirection()}, ${colorList.join(', ')})`;
    } catch (error) {
      console.error('Error generating gradient:', error);
      return 'linear-gradient(to bottom, #000, #333)'; // Fallback gradient
    }
  };

  // Animation variants for animated gradients - optimized
  const variants = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: animationDuration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  // Adjust animation parameters based on performance level
  const getAnimationSettings = () => {
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
  };

  const baseStyle: React.CSSProperties = {
    backgroundImage: generateGradient(colors || []),
    opacity,
    willChange: shouldAnimate ? 'background-position' : 'auto',
    transform: 'translateZ(0)', // Force GPU acceleration
  };

  // Safe extraction with defaults
  const { 
    style: animationStyle = {}, 
    animate: animationState = undefined, 
    variants: animationVariants = undefined 
  } = getAnimationSettings();

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
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check client preferences once mounted with safeguards
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    try {
      // Safe media query check
      const prefersReducedMotion = 
        window.matchMedia && 
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Safe mobile detection
      const checkMobile = () => {
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
        
      setShouldAnimate(shouldEnableAnimation);
      
      // Cleanup
      return () => {
        if (window.removeEventListener) {
          window.removeEventListener('resize', checkMobile);
        }
      };
    } catch (error) {
      // Fallback to no animation on error
      console.error('Error in gradient text animation setup:', error);
      setShouldAnimate(false);
    }
  }, [animate, performance]);

  // Convert direction to CSS gradient direction
  const getGradientDirection = () => {
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
  };

  // Generate gradient string with safety checks
  const generateGradient = (colorList: string[]) => {
    // Ensure colorList is an array
    if (!Array.isArray(colorList) || colorList.length === 0) {
      return 'linear-gradient(to right, #fff, #ccc)'; // Fallback gradient
    }
    
    try {
      if (direction === 'radial') {
        return `radial-gradient(${getGradientDirection()}, ${colorList.join(', ')})`;
      }
      return `linear-gradient(${getGradientDirection()}, ${colorList.join(', ')})`;
    } catch (error) {
      console.error('Error generating text gradient:', error);
      return 'linear-gradient(to right, #fff, #ccc)'; // Fallback gradient
    }
  };

  // Animation variants - simplified for text
  const variants = {
    animate: {
      backgroundPosition: ['0% center', '100% center'],
      transition: {
        duration: animationDuration,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  // Get animation settings based on performance level with safety
  const getAnimationSettings = () => {
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
  };

  const baseStyle: React.CSSProperties = {
    backgroundImage: generateGradient(colors || []),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
    display: 'inline-block',
    willChange: shouldAnimate ? 'background-position' : 'auto',
  };

  // Safe extraction with defaults
  const { 
    style: animationStyle = {}, 
    animate: animationState = undefined, 
    variants: animationVariants = undefined 
  } = getAnimationSettings();

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