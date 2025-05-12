'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, useTexture, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingLogoProps {
  text?: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  color?: string
  hoverColor?: string
  fontSize?: number
  font?: string
  useCube?: boolean
}

export function FloatingLogo({
  text = "A",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#4299e1',
  hoverColor = '#90cdf4',
  fontSize = 1,
  font = "/fonts/Inter-Bold.woff",
  useCube = false
}: FloatingLogoProps) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  // Animation
  useFrame((state) => {
    if (!ref.current) return
    
    // Gentle float animation
    const t = state.clock.getElapsedTime()
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1
    
    // Subtle rotation
    ref.current.rotation.x = rotation[0] + Math.sin(t * 0.3) * 0.03
    ref.current.rotation.y = rotation[1] + Math.sin(t * 0.2) * 0.03
    
    // Scale on hover effect
    ref.current.scale.x = THREE.MathUtils.lerp(
      ref.current.scale.x,
      hovered ? 1.1 : 1,
      0.1
    )
    ref.current.scale.y = THREE.MathUtils.lerp(
      ref.current.scale.y,
      hovered ? 1.1 : 1,
      0.1
    )
    ref.current.scale.z = THREE.MathUtils.lerp(
      ref.current.scale.z,
      hovered ? 1.1 : 1,
      0.1
    )
  })

  // Logo can be either text or a cube with text on each side
  return useCube ? (
    <mesh
      ref={ref}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[fontSize, fontSize, fontSize]} />
      <meshStandardMaterial 
        color={hovered ? hoverColor : color}
        metalness={0.8}
        roughness={0.2}
      />
      
      {/* Text on each face of the cube */}
      {[
        [0, 0, fontSize/2 + 0.01, 0, 0, 0],
        [0, 0, -fontSize/2 - 0.01, 0, Math.PI, 0],
        [fontSize/2 + 0.01, 0, 0, 0, Math.PI/2, 0],
        [-fontSize/2 - 0.01, 0, 0, 0, -Math.PI/2, 0],
        [0, fontSize/2 + 0.01, 0, Math.PI/2, 0, 0],
        [0, -fontSize/2 - 0.01, 0, -Math.PI/2, 0, 0]
      ].map((props, i) => (
        <Text
          key={i}
          position={[props[0], props[1], props[2]]}
          rotation={[props[3], props[4], props[5]]}
          fontSize={fontSize * 0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font={font}
        >
          {text}
        </Text>
      ))}
    </mesh>
  ) : (
    <Text
      ref={ref}
      position={position}
      rotation={rotation}
      fontSize={fontSize}
      color={hovered ? hoverColor : color}
      anchorX="center"
      anchorY="middle"
      font={font}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {text}
    </Text>
  )
} 