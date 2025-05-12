'use client'

import { useRef, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ComputerModelProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
  screenshotUrl?: string
}

export function ComputerModel({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  screenshotUrl = '/images/placeholder-project.jpg'
}: ComputerModelProps) {
  const group = useRef<THREE.Group>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [screenshot, setScreenshot] = useState<THREE.Texture | null>(null)
  
  // Check for mobile device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])
  
  // Load screenshot texture
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      screenshotUrl,
      (texture) => {
        texture.flipY = false
        setScreenshot(texture)
      },
      undefined,
      (error) => {
        console.error('An error happened while loading the texture:', error)
      }
    )
  }, [screenshotUrl])

  // Simple computer model created directly in Three.js
  // In a real application, you'd load a proper GLTF model
  useFrame((state) => {
    if (!group.current) return
    
    // Add a slight floating animation
    const t = state.clock.getElapsedTime()
    group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.05
    
    // Add some rotation when hovered
    group.current.rotation.y = rotation[1] + (hovered ? Math.sin(t * 0.3) * 0.05 : 0)
    
    // Scale effect when hovered
    const targetScale = hovered ? scale * 1.05 : scale
    group.current.scale.x = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.1)
    group.current.scale.y = THREE.MathUtils.lerp(group.current.scale.y, targetScale, 0.1)
    group.current.scale.z = THREE.MathUtils.lerp(group.current.scale.z, targetScale, 0.1)
  })

  // Responsively adjust based on device
  const adjustedScale = isMobile ? scale * 0.7 : scale
  const adjustedRotation: [number, number, number] = [
    rotation[0] + 0.1,
    rotation[1] + (isMobile ? -0.2 : 0.2),
    rotation[2]
  ]

  return (
    <group 
      ref={group} 
      position={position}
      rotation={adjustedRotation}
      scale={[adjustedScale, adjustedScale, adjustedScale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Laptop base */}
      <mesh castShadow receiveShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[1.5, 0.05, 1]} />
        <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Laptop screen */}
      <group position={[0, 0.5, -0.5]} rotation={[Math.PI / 6, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.9, 0.05]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Screen display with the screenshot */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.2, 0.7]} />
          {screenshot ? (
            <meshBasicMaterial map={screenshot} />
          ) : (
            <meshBasicMaterial color="#0066cc" />
          )}
        </mesh>
      </group>
      
      {/* Keyboard */}
      <mesh position={[0, 0, 0.2]} rotation={[0, 0, 0]}>
        <planeGeometry args={[1.2, 0.7]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      {/* Trackpad */}
      <mesh position={[0, -0.05, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 0.25]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      {/* Logo on back of screen (facing away from camera) */}
      <mesh position={[0, 0.5, -0.53]} rotation={[Math.PI / 6, Math.PI, 0]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#0066cc" emissive="#0066cc" emissiveIntensity={0.5} />
      </mesh>
    </group>
  )
} 