import { motion } from 'framer-motion'
import { techTools } from '@/data/about'

export function TechStack() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {techTools.map((tool, index) => (
        <motion.div
          key={tool.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex items-center gap-3">
            {tool.icon}
            <h3 className="text-lg font-medium text-white">{tool.name}</h3>
          </div>
          <p className="mt-2 text-sm text-gray-400">{tool.description}</p>
        </motion.div>
      ))}
    </div>
  )
}