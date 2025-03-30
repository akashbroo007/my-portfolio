import { motion } from 'framer-motion'

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  icon: React.ReactNode
  status: string
  timeline: string
}

export function ProjectCard({ title, description, tech, icon, status, timeline }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-4">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tech.map((t) => (
          <span
            key={t}
            className="px-2 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-purple-400 font-medium">{status}</span>
        <span className="text-gray-500">{timeline}</span>
      </div>
    </motion.div>
  )
}