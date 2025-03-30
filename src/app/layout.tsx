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
            // GitHub Pages SPA Router
            (function() {
              try {
                // Handle route from 404.html redirect
                const search = window.location.search;
                const routeParam = new URLSearchParams(search).get('route');

                if (routeParam) {
                  // Get the base path
                  const isGitHubPages = window.location.hostname.includes('github.io');
                  const basePath = isGitHubPages ? '/my-portfolio' : '';
                  
                  // Build the proper path
                  const path = basePath + '/' + routeParam.replace(/^\\/+/, '');
                  
                  console.log('Redirecting from route param to:', path);
                  
                  // Replace the current URL with the correct route
                  window.history.replaceState(null, null, path);
                }
              } catch (e) {
                console.error('Error in SPA router:', e);
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
