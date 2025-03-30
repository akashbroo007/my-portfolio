'use client'

import { motion } from 'framer-motion'
import { Code2, Rocket } from 'lucide-react'

export function Hero() {
  return (
    <section className="w-full py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center items-center gap-3 mb-6">
            <Code2 className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">Building the Future</h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Currently focused on developing innovative full-stack applications that push the boundaries
            of web technology. Join me on this journey of creating impactful digital solutions.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full text-sm text-blue-400">
            <Rocket className="w-4 h-4" />
            <span>Projects launching Q2-Q3 2025</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}