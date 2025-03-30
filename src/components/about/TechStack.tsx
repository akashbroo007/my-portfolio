import { Code, ChevronUp, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface TechTool {
  name: string;
  icon: string;
  level: string;
  description: string;
}

export const TechStack = ({ tools }: { tools: TechTool[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-colors relative overflow-hidden"
    >
      {/* ... Tech stack content ... */}
    </motion.div>
  );
};