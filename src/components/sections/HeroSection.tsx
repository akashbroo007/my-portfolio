'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the 3D components with no SSR
const ThreeJSBackground = dynamic(
  () => import('@/components/3d/DynamicHeroBackground').then(mod => mod.DynamicHeroBackground),
  { ssr: false }
)

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false)
  
  // Check if we're on the client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden">
      {/* 3D Background */}
      {isMounted && <ThreeJSBackground />}
      
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
              Akash Prabhakaran
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-xl sm:text-2xl font-medium text-gray-200 mb-8">
              Passionate Full Stack Developer
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-xl mx-auto"
          >
            <p className="text-gray-400 mb-10 leading-relaxed">
              Hi there! I&apos;m Akash Prabhakaran, a Vibe Coder, and I&apos;m on a journey to become a skilled full stack developer. I love creating full-stack applications that enhance user experience and solve real-world problems.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/projects">
              <Button size="lg" className="w-full sm:w-auto">
                View My Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn About Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Overlay gradient to blend with the background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 pointer-events-none -z-10" />
    </section>
  )
} 