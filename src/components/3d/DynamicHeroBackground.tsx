'use client'

import { useState, useEffect } from 'react'
import { ThreeCanvas } from '@/components/3d/ThreeCanvas'
import { HeroBackground } from '@/components/3d/HeroBackground'
import { FloatingLogo } from '@/components/3d/FloatingLogo'

export function DynamicHeroBackground() {
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
    return null
  }

  return (
    <div className="absolute inset-0 w-full h-full -z-10">
      <ThreeCanvas 
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
      >
        <HeroBackground 
          count={1500} 
          colors={['#0052cc', '#0066ff', '#4299e1', '#90cdf4']} 
          radius={2.5}
        />
        <FloatingLogo 
          text="AP" 
          position={[-2, 0.5, 0]} 
          fontSize={0.6}
          color="#0066ff"
          hoverColor="#4299e1"
        />
        <FloatingLogo 
          useCube={true}
          text="K" 
          position={[2, -0.5, 0]} 
          fontSize={0.5}
          color="#0044aa"
          hoverColor="#0066ff"
        />
      </ThreeCanvas>
    </div>
  )
} 