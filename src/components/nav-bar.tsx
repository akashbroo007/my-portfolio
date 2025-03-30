"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "./ui/button"
import Link from 'next/link'
import KashLogo from './KashLogo'

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only prevent default for anchor links
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="flex items-center relative group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600/20 to-transparent p-1">
                  <KashLogo className="w-12 h-12" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute -inset-2 bg-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />
              </div>
              <span className="text-white text-xl font-mono tracking-wide group-hover:text-purple-400 transition-colors duration-300">
                KashVenture Inc.
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={(e) => scrollToSection(e, item.href)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={(e) => scrollToSection(e, item.href)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}