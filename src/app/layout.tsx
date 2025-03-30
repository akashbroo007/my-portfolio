import type { Metadata, Viewport } from "next"
import "./globals.css"
import ClientLayout from "./client-layout"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "Akash Prabhakaran | Full Stack Developer",
  description: "Full Stack Developer Portfolio showcasing projects and technical skills",
}

export const viewport: Viewport = {
  themeColor: "#000000"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            // SPA GitHub Pages router with error handling
            (function() {
              try {
                // Check if we have a saved path from 404.html redirect
                const redirectPath = sessionStorage.getItem('redirect_path');
                
                if (redirectPath) {
                  console.log('Found redirect path in sessionStorage:', redirectPath);
                  
                  // Clear the redirect path from sessionStorage
                  sessionStorage.removeItem('redirect_path');
                  
                  // Detect environment
                  const isGitHubPages = window.location.hostname.includes('github.io');
                  const isIPAddress = /^\\d+\\.\\d+\\.\\d+\\.\\d+$/.test(window.location.hostname);
                  
                  // Get appropriate base path
                  let basePath = '';
                  if (isGitHubPages) {
                    basePath = '/my-portfolio';
                  }
                  
                  // If we're on an IP address (e.g., 172.20.10.2), keep the base path empty
                  
                  // Navigate to the correct route
                  const targetPath = basePath + redirectPath;
                  console.log('Redirecting to:', targetPath);
                  
                  // Update history to not break the back button
                  window.history.replaceState(null, null, targetPath);
                }
              } catch (error) {
                console.error('Error in SPA router script:', error);
              }
            })();
          `
        }} />
      </head>
      <body className="bg-black text-white">
        <ClientLayout>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ClientLayout>
      </body>
    </html>
  )
}
