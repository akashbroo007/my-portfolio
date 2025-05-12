'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThreeCanvas } from '@/components/3d/ThreeCanvas'
import { SkillCube } from '@/components/3d/SkillCube'

// Skill data with titles and images
const skills = [
  {
    title: 'Next.js',
    icon: '/images/skills/next.png',
    position: [-2, 0.5, 0],
    speed: 0.5,
    delay: 0
  },
  {
    title: 'TypeScript',
    icon: '/images/skills/typescript.png',
    position: [-1, -0.5, 0.5],
    speed: 0.4,
    delay: 0.1
  },
  {
    title: 'React',
    icon: '/images/skills/react.png',
    position: [0, 0.7, -0.5],
    speed: 0.3,
    delay: 0.2
  },
  {
    title: 'Firebase',
    icon: '/images/skills/firebase.png',
    position: [1, -0.3, 0],
    speed: 0.4,
    delay: 0.3
  },
  {
    title: 'Redux',
    icon: '/images/skills/redux.png',
    position: [2, 0.5, 0.5],
    speed: 0.5,
    delay: 0.4
  },
  {
    title: 'Node.js',
    icon: '/images/skills/node.png',
    position: [-1.5, 0, -1],
    speed: 0.6,
    delay: 0.5
  },
  {
    title: 'OpenAI',
    icon: '/images/skills/openai.png',
    position: [0.5, -0.8, -0.5],
    speed: 0.3,
    delay: 0.6
  },
  {
    title: 'WebSocket',
    icon: '/images/skills/websocket.png',
    position: [1.5, 0.2, -1],
    speed: 0.5,
    delay: 0.7
  },
  {
    title: 'Framer Motion',
    icon: '/images/skills/framer.png',
    position: [-0.5, -0.3, -0.7],
    speed: 0.7,
    delay: 0.8
  }
]

// Fallback skill items for non-WebGL browsers
const SkillItem = ({ skill }) => (
  <div className="bg-gray-800/50 rounded-lg p-5 text-center hover:bg-gray-700/50 transition-colors">
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
      <img src={skill.icon} alt={skill.title} className="w-12 h-12 object-contain" />
    </div>
    <h3 className="text-lg font-medium">{skill.title}</h3>
  </div>
)

export function SkillsSection() {
  const [isMounted, setIsMounted] = useState(false)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  
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

  return (
    <section className="py-20 bg-gradient-to-b from-black to-blue-950/50 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies I Work With</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A curated collection of tools and frameworks that power my development workflow
          </p>
        </motion.div>
        
        {isMounted && isWebGLSupported ? (
          // 3D Skill Cubes
          <div className="h-[500px] relative">
            <ThreeCanvas 
              camera={{ position: [0, 0, 5], fov: 60 }}
              controls
            >
              {skills.map((skill, index) => (
                <motion.group
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: skill.delay, duration: 0.5 }}
                >
                  <SkillCube
                    position={skill.position}
                    iconUrls={[skill.icon, skill.icon, skill.icon, skill.icon, skill.icon, skill.icon]}
                    size={0.7}
                    rotationSpeed={skill.speed}
                  />
                </motion.group>
              ))}
              
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <pointLight position={[-10, -10, -10]} intensity={0.4} />
            </ThreeCanvas>
            
            {/* Skill titles rendered in HTML */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-3 gap-8 h-full place-items-center">
                {skills.map((skill, index) => {
                  const x = ((skill.position[0] + 2) / 4) * 100; // Convert position to percentage
                  const y = ((skill.position[1] + 1) / 2) * 100;
                  
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: skill.delay + 0.3, duration: 0.5 }}
                      className="text-center"
                      style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className="bg-blue-900/80 px-3 py-1 rounded text-sm font-medium">
                        {skill.title}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // Fallback grid for browsers without WebGL
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <SkillItem skill={skill} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 