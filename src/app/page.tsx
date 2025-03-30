'use client'

import { motion } from 'framer-motion'
import { Github } from 'lucide-react'
import { Footer } from '@/components/sections/footer'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { BentoGrid } from '@/components/sections/bento-grid'
import { Projects } from '@/components/sections/projects'

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <main className="flex min-h-screen flex-col items-center justify-between">
          <Hero />
          <About />
          <BentoGrid />
          <Projects />
        </main>
      </div>
      <Footer />
    </>
  )
}
