"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const basePath = process.env.NODE_ENV === 'production' ? '/my-portfolio' : '';

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href={`${basePath}/`} className="text-2xl font-bold text-white">
              Akash<span className="text-blue-500">.dev</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={`${basePath}${item.path}`}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-white ${
                    pathname === item.path || pathname === `${basePath}${item.path}`
                      ? 'text-white bg-blue-500/20 hover:bg-blue-500/30'
                      : 'text-gray-300 hover:bg-gray-800/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="https://github.com/akashbroo007"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-gray-900"
        style={{ overflow: 'hidden' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={`${basePath}${item.path}`}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === item.path || pathname === `${basePath}${item.path}`
                  ? 'text-white bg-blue-500/20'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <a
            href="https://github.com/akashbroo007"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 mt-4"
          >
            GitHub
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}