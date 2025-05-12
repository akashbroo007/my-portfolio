'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface SkillCubeProps {
  position?: [number, number, number]
  iconUrls?: string[]
  size?: number
  autoRotate?: boolean
  rotationSpeed?: number
}

export function SkillCube({
  position = [0, 0, 0],
  iconUrls = [
    '/images/skills/react.png',
    '/images/skills/next.png',
    '/images/skills/tailwind.png',
    '/images/skills/typescript.png',
    '/images/skills/node.png',
    '/images/skills/three.png',
  ],
  size = 1,
  autoRotate = true,
  rotationSpeed = 0.5
}: SkillCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [textures, setTextures] = useState<THREE.Texture[]>([])
  const [loaded, setLoaded] = useState(false)
  
  // Load textures for each face of the cube
  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()
    const loadTextures = async () => {
      try {
        const loadedTextures = await Promise.all(
          iconUrls.map((url) => {
            return new Promise<THREE.Texture>((resolve, reject) => {
              textureLoader.load(
                url,
                (texture) => {
                  texture.colorSpace = THREE.SRGBColorSpace
                  resolve(texture)
                },
                undefined,
                (error) => reject(error)
              )
            })
          })
        )
        setTextures(loadedTextures)
        setLoaded(true)
      } catch (error) {
        console.error('Error loading textures:', error)
      }
    }
    
    loadTextures()
  }, [iconUrls])
  
  // Create an array of materials for each face of the cube
  const materials = textures.map((texture) => (
    new THREE.MeshStandardMaterial({
      map: texture,
      transparent: true,
      roughness: 0.3,
      metalness: 0.5
    })
  ))
  
  // Fill any missing materials with default color
  while (materials.length < 6) {
    materials.push(
      new THREE.MeshStandardMaterial({
        color: '#0066cc',
        roughness: 0.3,
        metalness: 0.5
      })
    )
  }
  
  // Animation for cube rotation
  useFrame((state) => {
    if (!meshRef.current || !loaded) return
    
    const t = state.clock.getElapsedTime()
    
    // Auto rotation if enabled
    if (autoRotate) {
      meshRef.current.rotation.x = Math.sin(t * 0.2) * rotationSpeed
      meshRef.current.rotation.y = t * rotationSpeed * 0.5
    }
    
    // Hover effect - speed up rotation and scale
    const scaleFactor = hovered ? 1.1 : 1
    meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, scaleFactor, 0.1)
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, scaleFactor, 0.1)
    meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, scaleFactor, 0.1)
    
    // Add a floating animation
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.05
  })

  // Only render the cube when textures are loaded
  if (!loaded) return null

  return (
    <mesh
      ref={meshRef}
      position={position}
      material={materials}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[size, size, size]} />
    </mesh>
  )
} 