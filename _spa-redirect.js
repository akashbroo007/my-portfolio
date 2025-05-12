// Single Page Apps for GitHub Pages
// MIT License - Based on https://github.com/rafgraph/spa-github-pages
// This script checks if we need to redirect to the index.html for SPA routing

(function() {
  // Only run this on GitHub Pages
  if (!window.location.hostname.includes('github.io')) return;
  
  // Check if this is a direct page load (not via navigation within the app)
  const isDirectPageLoad = !window.location.href.includes('/#/');
  
  if (isDirectPageLoad) {
    // Base path for GitHub Pages
    const basePath = '/my-portfolio';
    
    // Get the path after the base path
    let path = window.location.pathname;
    
    // Remove base path to get the route
    if (path.startsWith(basePath)) {
      path = path.substring(basePath.length) || '/';
    }
    
    // Don't redirect from the root path or if it's a static asset
    if (path === '/' || path === '/index.html') return;
    
    // Don't redirect from 404.html (we're handling that separately)
    if (path.includes('/404') || path.includes('/404.html')) return;
    
    // Special handling for main navigation routes
    const mainRoutes = ['/about/', '/projects/', '/contact/'];
    
    // Check if this is one of our main routes
    if (mainRoutes.some(route => path === route || path === route.slice(0, -1))) {
      // Redirect to the home page with the route in the hash
      const targetRoute = path.endsWith('/') ? path.slice(0, -1) : path;
      const newPath = `${basePath}/#${targetRoute}`;
      window.location.replace(newPath);
    }
  }
})(); 