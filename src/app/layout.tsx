import type { Metadata, Viewport } from "next"
import "./globals.css"
import ClientLayout from "./client-layout"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/sections/footer"
import Script from 'next/script'

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
        {/* Single Page App routing fix for GitHub Pages */}
        <Script id="spa-redirect" strategy="beforeInteractive">{`
          // This script checks to see if a redirect is present in the query string
          // and converts it back into the correct url and adds it to the
          // browser's history using window.history.replaceState(...),
          // which won't cause the browser to attempt to load the new url.
          (function(l) {
            if (l.search[1] === '/' ) {
              var decoded = l.search.slice(1).split('&').map(function(s) { 
                return s.replace(/~and~/g, '&')
              }).join('?');
              window.history.replaceState(null, null,
                  l.pathname.slice(0, -1) + decoded + l.hash
              );
            }
          }(window.location))
        `}</Script>
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
