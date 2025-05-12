'use client'

import { useState, useEffect } from 'react'
import { ThreeCanvas } from '@/components/3d/ThreeCanvas'
import { ContactForm3D } from '@/components/3d/ContactForm3D'

export function DynamicContactForm() {
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
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8">
          <div className="text-blue-500 text-6xl mb-4">✉️</div>
          <h3 className="text-2xl font-bold mb-2">Let&apos;s Connect</h3>
          <p className="text-gray-400">I&apos;m excited to hear about your project and see how I can help bring your vision to life.</p>
        </div>
      </div>
    )
  }

  return (
    <ThreeCanvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      controls
    >
      <ContactForm3D
        position={[0, 0, 0]}
        rotation={[0, -0.2, 0]}
      />
      <ambientLight intensity={0.5} />
      <spotLight
        position={[10, 5, 10]}
        angle={0.15}
        penumbra={1}
        intensity={0.8}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.2} />
    </ThreeCanvas>
  )
} 