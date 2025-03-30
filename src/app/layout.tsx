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
              var redirect = sessionStorage.redirect;
              delete sessionStorage.redirect;
              if (redirect && redirect !== location.href) {
                history.replaceState(null, null, redirect);
              }
              
              // Check for path param in URL
              const urlParams = new URLSearchParams(window.location.search);
              const path = urlParams.get('path');
              if (path) {
                // Strip parameters and navigate to the path
                const basePath = window.location.pathname.split('?')[0];
                const navigateTo = basePath + path.replace(/^\/?/, '/');
                // Clean up the URL
                window.history.replaceState(null, null, navigateTo);
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
