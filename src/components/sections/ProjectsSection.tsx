'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ThreeCanvas } from '@/components/3d/ThreeCanvas'
import { ComputerModel } from '@/components/3d/ComputerModel'

// Sample project data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack marketplace with real-time inventory management and secure payments',
    image: '/images/projects/ecommerce.jpg',
    tags: ['Next.js', 'TypeScript', 'Stripe'],
    link: '/projects/ecommerce'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task tracking with real-time updates and team features',
    image: '/images/projects/task-app.jpg',
    tags: ['React', 'Firebase', 'TailwindCSS'],
    link: '/projects/task-app'
  },
  {
    id: 3,
    title: 'AI Chat Application',
    description: 'Intelligent conversational interface with natural language processing',
    image: '/images/projects/ai-chat.jpg',
    tags: ['Next.js', 'OpenAI', 'WebSocket'],
    link: '/projects/ai-chat'
  }
]

export function ProjectsSection() {
  const [isMounted, setIsMounted] = useState(false)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  const [activeProject, setActiveProject] = useState(0)
  
  // Check for WebGL support
  useEffect(() => {
    setIsMounted(true)
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setIsWebGLSupported(!!gl)
    } catch (e) {
      setIsWebGLSupported(false)
      console.error('WebGL not supported')
    }
  }, [])
  
  // Rotate through projects
  useEffect(() => {
    if (projects.length <= 1) return
    
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of my recent projects showcasing my technical skills and problem-solving abilities
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Project Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-[400px] relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/30 to-black/80"
          >
            {isMounted && isWebGLSupported ? (
              <ThreeCanvas
                controls
                camera={{ position: [0, 0, 4], fov: 45 }}
                shadows
              >
                <ComputerModel 
                  position={[0, -0.5, 0]} 
                  rotation={[0, Math.PI / 6, 0]}
                  scale={1.8}
                  screenshotUrl={projects[activeProject].image || '/images/placeholder-project.jpg'}
                />
                <ambientLight intensity={0.4} />
                <spotLight
                  position={[5, 5, 5]}
                  angle={0.15}
                  penumbra={1}
                  intensity={0.8}
                  castShadow
                />
                <pointLight position={[-5, -5, -5]} intensity={0.2} />
              </ThreeCanvas>
            ) : (
              <div className="flex items-center justify-center h-full">
                <img
                  src={projects[activeProject].image || '/images/placeholder-project.jpg'}
                  alt={projects[activeProject].title}
                  className="max-h-full object-cover"
                />
              </div>
            )}
          </motion.div>
          
          {/* Project Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              {projects[activeProject].title}
            </h3>
            
            <p className="text-gray-300">
              {projects[activeProject].description}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {projects[activeProject].tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="pt-4">
              <Link href={projects[activeProject].link}>
                <Button size="lg">
                  View Project Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Project Navigation Dots */}
            <div className="flex items-center space-x-2 pt-8">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeProject
                      ? 'bg-blue-500'
                      : 'bg-gray-600 hover:bg-gray-400'
                  }`}
                  aria-label={`View ${project.title}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/projects">
            <Button variant="outline" size="lg">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
} 