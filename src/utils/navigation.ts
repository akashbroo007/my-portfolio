/**
 * Navigation utilities for GitHub Pages compatibility
 */

// Get the base path for the application
export const getBasePath = (): string => {
  return process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';
};

// Check if we're on GitHub Pages
export const isGitHubPages = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.hostname.includes('github.io');
};

// Format a path with the correct base path
export const formatPath = (path: string): string => {
  const basePath = getBasePath();
  
  // Don't modify external URLs
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Make sure paths start with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // For home path special handling
  if (normalizedPath === '/') {
    return `${basePath}/`;
  }
  
  // For other paths, ensure no double slashes
  return `${basePath}${normalizedPath}`;
};

// Get a clean path for router (without basePath)
export const getCleanPath = (path: string): string => {
  const basePath = getBasePath();
  
  if (path.startsWith(basePath)) {
    return path.slice(basePath.length) || '/';
  }
  
  return path;
};

// List of valid routes in the application
export const validRoutes = ['/', '/about/', '/projects/', '/contact/'];

// Check if a path is a valid route
export const isValidRoute = (path: string): boolean => {
  return validRoutes.some(route => route === path);
}; 