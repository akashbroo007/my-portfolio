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
            // SPA GitHub Pages router
            (function() {
              // Check if we have a saved path from 404.html redirect
              const redirectPath = sessionStorage.getItem('redirect_path');
              if (redirectPath) {
                // Clear the redirect path from sessionStorage
                sessionStorage.removeItem('redirect_path');
                
                // Use the correct base path
                const base = window.location.pathname.endsWith('/') 
                  ? window.location.pathname.slice(0, -1) 
                  : window.location.pathname;
                
                // Navigate to the correct route
                const targetPath = base + redirectPath;
                console.log('Redirecting to:', targetPath);
                
                // Update history to not break the back button
                window.history.replaceState(null, null, targetPath);
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
