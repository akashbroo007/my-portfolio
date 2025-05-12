'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, PerspectiveCamera, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface ContactForm3DProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
}

export function ContactForm3D({
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: ContactForm3DProps) {
  const groupRef = useRef<THREE.Group>(null)
  const planeRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  
  // Particle system for the contact form
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 100
  const particlePositions = new Float32Array(particleCount * 3)
  
  // Generate random positions for particles around the form
  for (let i = 0; i < particleCount; i++) {
    const radius = 1.5
    particlePositions[i * 3] = (Math.random() - 0.5) * radius
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * radius
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * radius
  }
  
  // Animation for contact form and particles
  useFrame((state) => {
    if (!groupRef.current || !planeRef.current || !particlesRef.current) return
    
    const t = state.clock.getElapsedTime()
    
    // Form animation
    groupRef.current.rotation.y = rotation[1] + Math.sin(t * 0.2) * 0.05
    groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.05
    
    // Hover and active effects
    const targetScale = hovered ? 1.05 : 1
    planeRef.current.scale.x = THREE.MathUtils.lerp(planeRef.current.scale.x, targetScale, 0.1)
    planeRef.current.scale.y = THREE.MathUtils.lerp(planeRef.current.scale.y, targetScale, 0.1)
    
    // Particle animation
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      // Create flowing particle pattern
      positions[i3 + 1] += Math.sin(t + i * 0.1) * 0.002
      
      // Reset particles that go too far
      if (positions[i3 + 1] > 1) positions[i3 + 1] = -1
      
      // Make particles move faster when form is hovered
      if (hovered) {
        positions[i3] += Math.sin(t * 2 + i * 0.1) * 0.001
        positions[i3 + 2] += Math.cos(t * 2 + i * 0.1) * 0.001
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Contact form plane */}
      <RoundedBox
        ref={planeRef}
        args={[2, 2.5, 0.1]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setActive(true)}
        onPointerUp={() => setActive(false)}
      >
        <meshStandardMaterial 
          color={active ? '#0052cc' : hovered ? '#0066ff' : '#0077ff'} 
          roughness={0.2}
          metalness={0.7}
        />
      </RoundedBox>
      
      {/* Form fields */}
      <Text
        position={[0, 0.9, 0.06]}
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        CONTACT
      </Text>
      
      {/* Name field */}
      <RoundedBox position={[0, 0.5, 0.06]} args={[1.6, 0.2, 0.02]} radius={0.05}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </RoundedBox>
      
      {/* Email field */}
      <RoundedBox position={[0, 0.2, 0.06]} args={[1.6, 0.2, 0.02]} radius={0.05}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </RoundedBox>
      
      {/* Message field */}
      <RoundedBox position={[0, -0.3, 0.06]} args={[1.6, 0.7, 0.02]} radius={0.05}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} />
      </RoundedBox>
      
      {/* Submit button */}
      <RoundedBox 
        position={[0, -0.8, 0.06]} 
        args={[0.8, 0.2, 0.05]} 
        radius={0.05}
        onPointerOver={(e) => { e.stopPropagation(); setActive(true) }}
        onPointerOut={(e) => { e.stopPropagation(); setActive(false) }}
      >
        <meshStandardMaterial 
          color={active ? '#00cc66' : '#00aa55'} 
          roughness={0.2}
          metalness={0.5}
        />
      </RoundedBox>
      
      <Text
        position={[0, -0.8, 0.1]}
        fontSize={0.08}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        SUBMIT
      </Text>
      
      {/* Decorative dots/labels for form fields */}
      {['NAME', 'EMAIL', 'MESSAGE'].map((label, index) => (
        <Text
          key={index}
          position={[
            -0.7, 
            index === 0 ? 0.5 : index === 1 ? 0.2 : -0.3, 
            0.08
          ]}
          fontSize={0.05}
          color="#aaaaaa"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Medium.woff"
        >
          {label}
        </Text>
      ))}
      
      {/* Particle system */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#4299e1"
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
} 