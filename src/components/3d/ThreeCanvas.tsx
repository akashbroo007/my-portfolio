'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { OrbitControls, Preload } from '@react-three/drei'

interface ThreeCanvasProps {
  children: React.ReactNode
  className?: string
  camera?: { position: [number, number, number], fov?: number }
  style?: React.CSSProperties
  shadows?: boolean
  dpr?: number | [number, number]
  gl?: any
  controls?: boolean
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  children,
  className = '',
  camera = { position: [0, 0, 5], fov: 45 },
  style = {},
  shadows = false,
  dpr = [1, 2],
  gl = { antialias: true, alpha: true },
  controls = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div className={`relative w-full h-full ${className}`} style={style}>
      <Canvas
        ref={canvasRef}
        shadows={shadows}
        camera={camera}
        gl={gl}
        dpr={dpr}
        className="w-full h-full outline-none"
      >
        <Suspense fallback={null}>
          {children}
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.5} 
            castShadow={shadows} 
          />
          {controls && <OrbitControls enableZoom={false} />}
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  )
} 