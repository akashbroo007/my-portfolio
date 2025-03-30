'use client'

import { Layout, Brain, Code2, Github, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Projects() {
  const upcomingProjects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack marketplace application with modern features including real-time inventory management, secure payment processing, and an intuitive admin dashboard.",
      tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
      icon: <Layout className="w-6 h-6 text-blue-400" />,
      status: "Planning Phase",
      timeline: "Q2 2025"
    },
    {
      title: "AI-Powered Chat Application",
      description: "An intelligent chat platform featuring natural language processing, voice recognition, and real-time translation capabilities.",
      tech: ["React", "Node.js", "OpenAI", "WebSocket"],
      icon: <Brain className="w-6 h-6 text-purple-400" />,
      status: "Research Phase",
      timeline: "Q3 2025"
    },
    {
      title: "Portfolio 2.0",
      description: "An enhanced version of this portfolio with 3D animations, interactive project demonstrations, and improved user engagement features.",
      tech: ["Next.js", "Three.js", "Framer Motion", "TailwindCSS"],
      icon: <Code2 className="w-6 h-6 text-green-400" />,
      status: "In Development",
      timeline: "Q2 2025"
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black" id="projects">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here&apos;s what I&apos;m working on. Each project demonstrates my passion for creating innovative solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {upcomingProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
              style={{ backgroundColor: 'rgba(22, 22, 22, 0.8)' }}
            >
              <div className="flex items-center gap-4 mb-4">
                {project.icon}
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-400 font-medium">{project.status}</span>
                <span className="text-gray-500">{project.timeline}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-gray-700/50" style={{ backgroundColor: 'rgba(22, 22, 22, 0.8)' }}>
            <h2 className="text-2xl font-bold text-white mb-4">
              Want to Collaborate?
            </h2>
            <p className="text-gray-400 mb-6">
              I&apos;m always open to discussing new projects and opportunities. 
              Let&apos;s create something amazing together!
            </p>
            <motion.a
              href="https://github.com/akashbroo007"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium group hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
              <span>Check My GitHub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}