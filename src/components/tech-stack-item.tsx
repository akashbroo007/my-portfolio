'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface TechStackItemProps {
  name: string
  image: string
  description: string
}

export function TechStackItem({ name, image, description }: TechStackItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState<'bottom' | 'top'>('bottom')
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkPosition = () => {
      if (itemRef.current) {
        const rect = itemRef.current.getBoundingClientRect()
        const spaceBelow = window.innerHeight - rect.bottom
        setTooltipPosition(spaceBelow < 200 ? 'top' : 'bottom')
      }
    }

    checkPosition()
    window.addEventListener('scroll', checkPosition)
    window.addEventListener('resize', checkPosition)

    return () => {
      window.removeEventListener('scroll', checkPosition)
      window.removeEventListener('resize', checkPosition)
    }
  }, [])

  return (
    <div 
      ref={itemRef}
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col items-center p-4 rounded-lg bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-105">
        <div className="w-14 h-14 relative mb-3">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain drop-shadow-lg"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: tooltipPosition === 'bottom' ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: tooltipPosition === 'bottom' ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-50 w-64 p-4 ${
              tooltipPosition === 'bottom' ? 'mt-2' : 'mb-2'
            } bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700`}
            style={{
              left: itemRef.current ? 
                Math.min(
                  Math.max(
                    itemRef.current.getBoundingClientRect().left - 96,
                    20
                  ),
                  window.innerWidth - 276
                ) : 0,
              [tooltipPosition]: itemRef.current ? 
                (tooltipPosition === 'bottom' ? 
                  itemRef.current.getBoundingClientRect().bottom + 8 :
                  window.innerHeight - itemRef.current.getBoundingClientRect().top + 8
                ) : 0
            }}
          >
            <div className="text-sm text-gray-300 leading-relaxed">
              {description}
            </div>
            <div 
              className={`absolute ${
                tooltipPosition === 'bottom' ? '-top-2' : '-bottom-2'
              } left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800/95 rotate-45 border-t border-l border-gray-700`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}