// Single Page Apps for GitHub Pages
// MIT License - Based on https://github.com/rafgraph/spa-github-pages
// This script handles SPA navigation for GitHub Pages

(function(l, basePath) {
  const route = {};

  // First, detect if we need to redirect
  const needsRedirect = (l.hostname.includes('github.io'));
  
  if (!needsRedirect) return; // Not on GitHub Pages, no need for special handling
  
  // Valid routes in the application
  const validRoutes = ['', 'about', 'projects', 'contact'];
  
  // Function to redirect to a specific path
  function redirectToPath(path) {
    const redirectPath = basePath + (path ? '/' + path + '/' : '/');
    window.location.replace(redirectPath);
  }
  
  // Parse the URL
  const fullPath = l.pathname.replace(basePath, '') || '/';
  
  // Extract the route path (just the first segment)
  let routePath = fullPath.split('/').filter(Boolean)[0] || '';
  
  // Handle special case where fullPath is exactly "/" (empty path)
  if (fullPath === '/') {
    // We're at root, no need to redirect
    return;
  }
  
  // If this is not a main route (or is some nested path), we need to check if it's valid
  if (!validRoutes.includes(routePath)) {
    // If not a valid route, redirect to home
    redirectToPath('');
    return;
  }
  
  // If we're on a direct route path but it doesn't end with a slash, add it
  if (validRoutes.includes(routePath) && !l.pathname.endsWith('/')) {
    redirectToPath(routePath);
    return;
  }
  
  // Handle 404 pages
  if (l.pathname.includes('/404') || l.pathname.includes('/404.html')) {
    redirectToPath('');
    return;
  }
  
  // If nothing matched, we're probably on a valid path already
})((window.location || document.location), '/my-portfolio'); 