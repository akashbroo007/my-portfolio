'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Instagram, ExternalLink, Heart } from 'lucide-react'
import Link from 'next/link'
import KashLogo from '../KashLogo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      href: 'https://github.com/akashbroo007'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      href: 'https://linkedin.com/in/akash-prabhakaran'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      href: 'https://www.instagram.com/_ak_a_sh__93/?hl=en'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      href: 'mailto:akashfgz80@gmail.com'
    }
  ]

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ]

  return (
    <footer className="relative mt-20 bg-gradient-to-b from-gray-900 to-black">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <KashLogo className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold">KashVenture</h3>
            </motion.div>
            <p className="text-gray-400 text-sm">
              Crafting digital experiences with passion and precision. 
              Building the future of web, one line of code at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-sm flex items-center space-x-1 group"
                  >
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 hover:text-blue-400 text-gray-400 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>© {currentYear} KashVenture.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 inline mx-1" />
              <span>by Akash Prabhakaran</span>
            </div>
            <div className="text-sm text-gray-500">
              Powered by Next.js & Tailwind CSS
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 