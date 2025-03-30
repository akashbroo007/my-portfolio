import { motion } from 'framer-motion'
import { projects } from '@/data/about'

interface ProjectCardProps {
  title: string
  description: string
  tech: string[]
  icon: React.ReactNode
  status: string
  timeline: string
}

export function ProjectCard({ title, description, tech, icon, status, timeline }: ProjectCardProps) {
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
    viewport={{ once: true, margin: "-20%" }}
    whileHover={{ scale: 1.02, rotateY: 1 }}
    className="row-span-2 col-span-2 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-colors"
  >
    {/* ... Project card content ... */}
  </motion.div>
}