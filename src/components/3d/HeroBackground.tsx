'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { inSphere } from 'maath/random'

interface HeroBackgroundProps {
  count?: number
  size?: number
  radius?: number
  colors?: string[]
  speed?: number
}

export function HeroBackground({
  count = 2000,
  size = 0.02,
  radius = 1.5,
  colors = ['#0052cc', '#4299e1', '#90cdf4'],
  speed = 0.1
}: HeroBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Adjust for mobile screens
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  // Generate random points in a sphere
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    inSphere(positions, { radius })
    return positions
  }, [count, radius])
  
  // Color array for particles
  const colorArray = useMemo(() => {
    const color = new Float32Array(count * 3)
    const colorObjects = colors.map(c => new THREE.Color(c))
    
    for (let i = 0; i < count; i++) {
      const randomColor = colorObjects[Math.floor(Math.random() * colorObjects.length)]
      color.set([randomColor.r, randomColor.g, randomColor.b], i * 3)
    }
    
    return color
  }, [count, colors])

  // Animation loop
  useFrame((state, delta) => {
    if (!pointsRef.current) return
    
    const adjustedSpeed = isMobile ? speed * 0.5 : speed
    
    // Rotate the point cloud
    pointsRef.current.rotation.x -= delta * adjustedSpeed * 0.15
    pointsRef.current.rotation.y -= delta * adjustedSpeed * 0.1
    
    // Make particles pulsate
    const time = state.clock.getElapsedTime()
    pointsRef.current.scale.set(
      1 + Math.sin(time * 0.3) * 0.05,
      1 + Math.sin(time * 0.2) * 0.05,
      1 + Math.sin(time * 0.1) * 0.05
    )
  })

  return (
    <Points
      ref={pointsRef}
      positions={particlePositions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={isMobile ? size * 0.7 : size}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute 
        attach="geometry.attributes.color"
        args={[colorArray, 3]} 
      />
    </Points>
  )
} 