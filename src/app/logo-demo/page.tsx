'use client'

import { useState, useEffect } from 'react'
import { ThreeCanvas } from '@/components/3d/ThreeCanvas'
import { FloatingLogo } from '@/components/3d/FloatingLogo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Home, RefreshCcw } from 'lucide-react'

export default function LogoDemoPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  const [currentLogo, setCurrentLogo] = useState('AP')
  const [useCube, setUseCube] = useState(false)
  const [color, setColor] = useState('#4299e1')
  
  // Check for WebGL support
  useEffect(() => {
    setIsMounted(true)
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setIsWebGLSupported(!!gl)
    } catch (e) {
      setIsWebGLSupported(false)
      console.error('WebGL not supported')
    }
  }, [])
  
  // Color options
  const colorOptions = [
    { name: 'Blue', value: '#4299e1' },
    { name: 'Purple', value: '#9f7aea' },
    { name: 'Pink', value: '#ed64a6' },
    { name: 'Green', value: '#48bb78' },
    { name: 'Yellow', value: '#ecc94b' },
    { name: 'Red', value: '#f56565' }
  ]
  
  // Text options
  const textOptions = ['AP', 'K', 'DEV', '3D', '🚀']
  
  const randomizeLogo = () => {
    const randomText = textOptions[Math.floor(Math.random() * textOptions.length)]
    const randomColor = colorOptions[Math.floor(Math.random() * colorOptions.length)].value
    const randomCube = Math.random() > 0.5
    
    setCurrentLogo(randomText)
    setColor(randomColor)
    setUseCube(randomCube)
  }

  return (
    <div className="min-h-screen py-20 flex flex-col">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">3D Logo Playground</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Experiment with interactive 3D logos built with Three.js and React Three Fiber
          </p>
        </div>
        
        {/* 3D Logo Display */}
        <div className="h-[500px] bg-gradient-to-b from-blue-900/20 to-black rounded-lg overflow-hidden mb-8">
          {isMounted && isWebGLSupported ? (
            <ThreeCanvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              controls
            >
              <FloatingLogo
                text={currentLogo}
                fontSize={1.2}
                color={color}
                hoverColor="#90cdf4"
                position={[0, 0, 0]}
                useCube={useCube}
              />
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                intensity={1}
              />
              <pointLight position={[-10, -10, -10]} intensity={0.2} />
            </ThreeCanvas>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-2xl font-bold mb-2">WebGL Not Supported</h3>
                <p className="text-gray-400">Your browser does not support WebGL, which is required for 3D graphics.</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900/50 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Customize Logo</h2>
            
            {/* Text selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Logo Text</label>
              <div className="flex flex-wrap gap-2">
                {textOptions.map((text) => (
                  <button
                    key={text}
                    onClick={() => setCurrentLogo(text)}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      currentLogo === text
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {text}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Color selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Logo Color</label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption.name}
                    onClick={() => setColor(colorOption.value)}
                    className={`w-10 h-10 rounded-full transition-transform ${
                      color === colorOption.value ? 'ring-2 ring-white scale-110' : ''
                    }`}
                    style={{ backgroundColor: colorOption.value }}
                    title={colorOption.name}
                    aria-label={`Set color to ${colorOption.name}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Cube toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">Logo Style</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setUseCube(false)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    !useCube
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Text
                </button>
                <button
                  onClick={() => setUseCube(true)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    useCube
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Cube
                </button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={randomizeLogo}
                className="flex items-center"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Randomize
              </Button>
              
              <Link href="/">
                <Button variant="outline" className="flex items-center">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 