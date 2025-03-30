'use client';
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink, Code, Terminal, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import { projects, techTools } from "@/data/about";
import { Footer } from "@/components/sections/footer"
import Image from 'next/image';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -50])

  const [isStackOpen, setIsStackOpen] = useState(false);

  return (
    <>
    <div className="flex min-h-screen flex-col items-center pt-20 bg-gray-900 overflow-x-hidden">
      <motion.div 
          ref={containerRef}
        style={{ y: yOffset, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-16"
        >
          <h1 className="text-4xl font-bold text-white mb-8 text-center">About Me</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-blue-400">My Journey</h2>
              <p className="text-gray-300 leading-relaxed">
                I&apos;m a passionate Full Stack Developer with a deep love for creating innovative web solutions. 
                My journey in tech began with curiosity and has evolved into a professional pursuit of excellence 
                in web development.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I specialize in building modern web applications using cutting-edge technologies like React, 
                Next.js, and Node.js. My approach combines technical expertise with creative problem-solving 
                to deliver exceptional user experiences.
              </p>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                I&apos;m passionate about creating innovative solutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold text-blue-400">What I Do</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-2">🚀</span>
                  <span>Develop full-stack web applications with modern technologies</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💡</span>
                  <span>Create intuitive and responsive user interfaces</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">⚡</span>
                  <span>Build scalable backend services and APIs</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔍</span>
                  <span>Optimize applications for maximum performance</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <h2 className="text-2xl font-semibold text-blue-400 mb-6">My Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Innovation</h3>
                <p className="text-gray-300">Always exploring new technologies and approaches to solve problems.</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Quality</h3>
                <p className="text-gray-300">Committed to writing clean, maintainable, and efficient code.</p>
              </div>
              <div className="p-6 bg-gray-800 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-4">Growth</h3>
                <p className="text-gray-300">Continuously learning and improving my skills.</p>
              </div>
            </div>
          </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            My Journey
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]"
          >
            {/* Featured Project Card */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
              viewport={{ once: true, margin: "-20%" }}
              whileHover={{ scale: 1.02 }}
              className="row-span-2 col-span-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-colors"
            >
              <h3 className="text-2xl font-bold text-white mb-4">Featured Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                {projects.map((project, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800/30 rounded-xl p-4 hover:bg-gray-800/50 transition-colors cursor-pointer"
                    onClick={() => window.open(project.link, '_blank')}
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">{project.name}</h4>
                    <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                    <div className="flex gap-2 flex-wrap mb-3">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/akashbroo007" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Github className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://your-live-project-url.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ExternalLink className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
                </a>
              </div>
            </motion.div>
            {/* Tech Stack Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors relative overflow-hidden"
            >
              <div 
                  className="flex items-center justify-between cursor-pointer group"
                onClick={() => setIsStackOpen(!isStackOpen)}
              >
                <div className="flex items-center gap-2">
                    <Code className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-white">Tech Stack</h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isStackOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </motion.div>
                </div>

              <motion.div
                  initial={false}
                animate={{ 
                  height: isStackOpen ? "auto" : 0,
                  opacity: isStackOpen ? 1 : 0
                }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                  className="mt-4 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800/30 scrollbar-thumb-blue-500/50 hover:scrollbar-thumb-blue-400/70">
                {techTools.map((tool, index) => (
                      <motion.div 
                    key={index} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-xl group hover:bg-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                        <div className="relative w-10 h-10 flex items-center justify-center">
                      <Image 
                        src={tool.icon} 
                        alt={tool.name} 
                            className="w-8 h-8 group-hover:animate-spin transition-all duration-500 opacity-70 filter brightness-75 group-hover:opacity-100 group-hover:brightness-100"
                            style={{ animationDuration: '3s' }}
                      />
                    </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{tool.name}</p>
                          <p className="text-sm text-blue-400 font-medium">{tool.level}</p>
                          <motion.p 
                            initial={{ height: 0, opacity: 0 }}
                            whileHover={{ height: "auto", opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className="text-xs text-gray-400 mt-1 line-clamp-2 group-hover:line-clamp-none"
                          >
                        {tool.description}
                          </motion.p>
                    </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
            </motion.div>
            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              viewport={{ once: true, margin: "-20%" }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-colors"
            >
              <Terminal className="h-8 w-8 text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Experience</h3>
              <p className="text-gray-400">
                2+ years of hands-on experience in web development, focusing on React ecosystem and modern JavaScript
              </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
    </div>
      <Footer />
    </>
  );
}