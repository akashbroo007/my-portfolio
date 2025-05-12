'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Briefcase } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col overflow-hidden bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black"></div>
        
        <div className="container mx-auto px-4 py-24 sm:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-300">
                Akash Prabhakaran
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-xl sm:text-2xl font-medium text-gray-200 mb-8">
                Passionate Full Stack Developer
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <p className="text-gray-400 mb-10 leading-relaxed">
                Hi there! I&apos;m Akash Prabhakaran, a Vibe Coder, and I&apos;m on a journey to become a skilled full stack developer. I love creating full-stack applications that enhance user experience and solve real-world problems.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/projects" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                View My Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-800">
                Learn About Me
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent opacity-30"></div>
        
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A selection of my recent projects showcasing my technical skills and problem-solving abilities
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                description: 'A full-stack marketplace with real-time inventory management and secure payments',
                tags: ['Next.js', 'TypeScript', 'Stripe'],
              },
              {
                title: 'Task Management App',
                description: 'Collaborative task tracking with real-time updates and team features',
                tags: ['React', 'Firebase', 'TailwindCSS'],
              },
              {
                title: 'AI Chat Application',
                description: 'Intelligent conversational interface with natural language processing',
                tags: ['Next.js', 'OpenAI', 'WebSocket'],
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 rounded-lg overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/projects" className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-300 bg-transparent hover:bg-gray-800">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gradient-to-b from-black to-blue-950/50 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies I Work With</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A curated collection of tools and frameworks that power my development workflow
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              'Next.js', 'TypeScript', 'React', 'Firebase', 'Redux',
              'Node.js', 'OpenAI', 'WebSocket', 'Framer Motion', 'Tailwind'
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-lg p-5 text-center hover:bg-gray-700/50 transition-colors"
              >
                <h3 className="text-lg font-medium">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-blue-950/50 to-black relative overflow-hidden">
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
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-gray-800"
            >
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
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
                    className="w-full px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full px-5 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500/20 p-3 rounded-full mr-4">
                    <Code className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold">Full-Stack Development</h3>
                </div>
                <p className="text-gray-400">End-to-end web applications with polished UIs and robust backends</p>
              </div>
              
              <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-500/20 p-3 rounded-full mr-4">
                    <Zap className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold">Performance Optimization</h3>
                </div>
                <p className="text-gray-400">Improving speed, responsiveness and overall user experience</p>
              </div>
              
              <div className="bg-gray-900/30 p-6 rounded-lg border border-gray-800">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/20 p-3 rounded-full mr-4">
                    <Briefcase className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold">Project Consultation</h3>
                </div>
                <p className="text-gray-400">Technical guidance and strategy for your development projects</p>
              </div>
            </motion.div>
          </div>
          
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
    </main>
  );
}
