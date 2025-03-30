'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

export function BentoGrid() {
  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">My Journey</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {/* Grid items */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="row-span-2 col-span-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-colors"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Featured Project</h3>
            <p className="text-gray-400 mb-6">A showcase of my best work in full-stack development</p>
            <div className="flex gap-4">
              <Github className="h-6 w-6 text-gray-400" />
              <ExternalLink className="h-6 w-6 text-gray-400" />
            </div>
          </motion.div>

          {/* Add other grid items here */}
        </div>
      </div>
    </section>
  )
}