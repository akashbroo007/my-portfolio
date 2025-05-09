'use client';

import { motion } from "framer-motion";
import { Github, ExternalLink, Terminal } from "lucide-react";
import Image from 'next/image';
import { projects, techTools } from "@/data/about";
import { useState } from "react";
import { Code, ChevronDown } from "lucide-react";
import { Parallax } from "@/components/ui/parallax";
import { GradientBackground, GradientText } from "@/components/ui/gradient";
import Link from "next/link";

export function Journey() {
  const [isStackOpen, setIsStackOpen] = useState(false);

  return (
    <GradientBackground
      colors={['#0f172a', '#111827', '#0a0f1e']}
      direction="to-bottom-right"
      animate={true}
      animationDuration={30}
      className="py-16"
    >
      <div className="container mx-auto px-4 text-white relative">
        {/* Background elements with parallax */}
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-900/10 blur-[70px] pointer-events-none">
          <Parallax speed={0.05} direction="up">
            <div className="w-full h-full"></div>
          </Parallax>
        </div>
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-purple-900/10 blur-[80px] pointer-events-none">
          <Parallax speed={0.08} direction="left">
            <div className="w-full h-full"></div>
          </Parallax>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-20%" }}
          className="relative z-10"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-20%" }}
            className="text-3xl font-bold text-center mb-12"
          >
            <GradientText
              colors={['#38bdf8', '#6366f1', '#4338ca']}
              animate={true}
              animationDuration={6}
              className="font-bold"
            >
              My Journey
            </GradientText>
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
              className="row-span-2 col-span-2 glass rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-colors shadow-lg shadow-black/20"
            >
              <Parallax speed={0.1} direction="up">
                <h3 className="text-2xl font-bold text-white mb-4">
                  <GradientText
                    colors={['#8b5cf6', '#6366f1', '#3b82f6']}
                    direction="to-right"
                    animate={true}
                    animationDuration={4}
                  >
                    Featured Projects
                  </GradientText>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  {projects.map((project, index) => (
                    <Parallax 
                      key={index} 
                      speed={0.05 + (index * 0.03)} 
                      direction={index % 2 === 0 ? "up" : "down"}
                    >
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-xl p-4 hover:from-purple-900/20 hover:to-blue-900/20 transition-colors duration-300 cursor-pointer border border-gray-700/30 hover:border-blue-500/30 shadow-lg shadow-black/10 block"
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">{project.name}</h4>
                        <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                        <div className="flex gap-2 flex-wrap mb-3">
                          {project.tags.map((tag, i) => (
                            <span key={i} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </a>
                    </Parallax>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/akashbroo007" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-colors shadow-lg shadow-black/10"
                  >
                    <Github className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
                  </a>
                  <a 
                    href="https://your-live-project-url.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-colors shadow-lg shadow-black/10"
                  >
                    <ExternalLink className="h-6 w-6 text-gray-400 hover:text-white transition-colors" />
                  </a>
                </div>
              </Parallax>
            </motion.div>
            {/* Tech Stack Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-3xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors relative overflow-hidden shadow-lg shadow-black/20"
            >
              <Parallax speed={0.15} direction="right">
                <button 
                  className="flex items-center justify-between cursor-pointer group w-full"
                  onClick={() => setIsStackOpen(!isStackOpen)}
                >
                  <div className="flex items-center gap-2">
                    <Code className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-white">
                      <GradientText
                        colors={['#38bdf8', '#0ea5e9', '#2dd4bf']}
                        direction="to-right"
                        animate={true}
                        animationDuration={4}
                      >
                        Tech Stack
                      </GradientText>
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isStackOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </motion.div>
                </button>

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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                    {techTools.map((tool, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 glass p-4 rounded-xl group hover:bg-gray-800/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 border border-gray-800/20 hover:border-blue-500/20"
                      >
                        <div className="relative w-10 h-10 flex items-center justify-center">
                          <Image 
                            src={tool.icon} 
                            alt={tool.name} 
                            width={32}
                            height={32}
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
              </Parallax>
            </motion.div>
            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
              viewport={{ once: true, margin: "-20%" }}
              whileHover={{ scale: 1.02 }}
              className="glass rounded-3xl p-6 border border-gray-700/50 hover:border-green-500/50 transition-colors shadow-lg shadow-black/20"
            >
              <Parallax speed={0.2} direction="up">
                <Terminal className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  <GradientText
                    colors={['#10b981', '#34d399', '#6ee7b7']}
                    direction="to-right"
                    animate={true}
                    animationDuration={4}
                  >
                    Experience
                  </GradientText>
                </h3>
                <p className="text-gray-400">
                  2+ years of hands-on experience in web development, focusing on React ecosystem and modern JavaScript
                </p>
              </Parallax>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </GradientBackground>
  );
} 