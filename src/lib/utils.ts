import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Gets the base path for the application, accounting for GitHub Pages deployment
 * @returns The base path string to prefix all paths
 */
export function getBasePath(): string {
  // Check if we're running in the browser
  if (typeof window !== 'undefined') {
    // Check if we're on GitHub Pages
    if (window.location.hostname.includes('github.io')) {
      return '/my-portfolio';
    }
  }
  
  // For server-side rendering, use the NODE_ENV
  if (process.env.NODE_ENV === 'production') {
    return '/my-portfolio';
  }
  
  // Default for development
  return '';
}
