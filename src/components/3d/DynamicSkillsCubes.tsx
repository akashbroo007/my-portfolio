'use client'

import { useState, useEffect } from 'react'
import { ThreeCanvas } from '@/components/3d/ThreeCanvas'
import { SkillCube } from '@/components/3d/SkillCube'
import { motion } from 'framer-motion'

interface DynamicSkillsCubesProps {
  skills: Array<{
    title: string;
    icon: string;
    position: [number, number, number];
    speed: number;
    delay: number;
  }>;
}

export function DynamicSkillsCubes({ skills }: DynamicSkillsCubesProps) {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  
  // Check for WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setIsWebGLSupported(!!gl)
    } catch (e) {
      setIsWebGLSupported(false)
      console.error('WebGL not supported')
    }
  }, [])

  if (!isWebGLSupported) {
    // Fallback for non-WebGL browsers
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800/50 rounded-lg p-5 text-center hover:bg-gray-700/50 transition-colors">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <img src={skill.icon} alt={skill.title} className="w-12 h-12 object-contain" />
              </div>
              <h3 className="text-lg font-medium">{skill.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
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
  )
} 