'use client'

import { useState, useEffect } from 'react'
import { ThreeCanvas } from '@/components/3d/ThreeCanvas'
import { ComputerModel } from '@/components/3d/ComputerModel'

interface DynamicComputerModelProps {
  activeProject: number;
  projectImage: string;
}

export function DynamicComputerModel({ activeProject, projectImage }: DynamicComputerModelProps) {
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
        <img
          src={projectImage || '/images/placeholder-project.jpg'}
          alt={`Project ${activeProject + 1}`}
          className="max-h-full object-cover"
        />
      </div>
    )
  }

  return (
    <ThreeCanvas
      controls
      camera={{ position: [0, 0, 4], fov: 45 }}
      shadows
    >
      <ComputerModel 
        position={[0, -0.5, 0]} 
        rotation={[0, Math.PI / 6, 0]}
        scale={1.8}
        screenshotUrl={projectImage || '/images/placeholder-project.jpg'}
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
  )
} 