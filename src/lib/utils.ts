import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the base path for the application, accounting for different environments
 * @returns The base path string to prefix all paths
 */
export function getBasePath(): string {
  // Check if we're running in the browser
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // Check if we're on GitHub Pages
    if (hostname.includes('github.io')) {
      return '/my-portfolio';
    }
    
    // Check if we're on an IP address (like 172.20.10.2)
    if (/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
      return '';
    }
  }
  
  // For server-side rendering, use the NODE_ENV
  if (process.env.NODE_ENV === 'production') {
    // Only use the base path for GitHub Pages, not for IP deployments
    if (typeof window !== 'undefined' && !window.location.hostname.match(/^\d+\.\d+\.\d+\.\d+$/)) {
      return '/my-portfolio';
    }
    return '';
  }
  
  // Default for development
  return '';
}
