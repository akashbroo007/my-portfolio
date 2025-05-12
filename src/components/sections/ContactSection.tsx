'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'

// Dynamically import the 3D contact form
const DynamicContactForm = dynamic(
  () => import('@/components/3d/DynamicContactForm').then(mod => mod.DynamicContactForm),
  { ssr: false }
)

export function ContactSection() {
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  
  // Check if we're on the client
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)
    
    try {
      // In the future, this will send data to the backend API
      // For now, simulate a successful submission after a delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitSuccess(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-blue-950/50 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-blue-500/5 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-500/5 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/4" />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to start your project?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Let&apos;s collaborate to bring your ideas to life with modern technologies and creative solutions
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-gray-800"
          >
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            
            {submitSuccess ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 mb-6">
                <h4 className="text-green-400 font-medium text-lg mb-2">Message Sent!</h4>
                <p className="text-gray-300">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
                <Button 
                  className="mt-4" 
                  onClick={() => setSubmitSuccess(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                {submitError && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400 text-sm">There was an error sending your message. Please try again.</p>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </motion.div>
          
          {/* 3D Contact Form Visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-[400px] lg:h-[500px] relative rounded-lg overflow-hidden bg-gradient-to-br from-blue-900/10 to-black/80 backdrop-blur-sm border border-gray-800"
          >
            {isMounted && <DynamicContactForm />}
          </motion.div>
        </div>
        
        {/* Additional contact options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">You can also reach me directly at:</p>
          <a href="mailto:contact@akashdev.com" className="text-blue-400 hover:text-blue-300 transition-colors">
            contact@akashdev.com
          </a>
        </motion.div>
      </div>
    </section>
  )
} 