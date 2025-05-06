'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Helper function to determine the proper image path
const getImagePath = (path: string) => {
  return process.env.NODE_ENV === 'production' ? `/my-portfolio${path}` : path;
};

export default function ContentExplorer() {
  const [currentPath, setCurrentPath] = useState<string>('');
  
  useEffect(() => {
    // Get the current path to customize content
    setCurrentPath(window.location.pathname);
  }, []);
  
  // Get message based on path
  const getMessage = () => {
    if (currentPath.includes('about')) {
      return "Learn more about Akash's journey and skills.";
    } else if (currentPath.includes('projects')) {
      return "Explore Akash's portfolio of innovative projects.";
    } else if (currentPath.includes('contact')) {
      return "Connect with Akash to discuss opportunities.";
    } else {
      return "Discover all sections of Akash's portfolio.";
    }
  };

  return (
    <div className="flex flex-col text-center px-4 py-16 bg-black text-white min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto w-full"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Explore My Portfolio</h1>
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">{getMessage()}</p>
        
        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* About Card */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="h-48 relative">
              <Image 
                src={getImagePath('/images/ecommerce-website.jpg')}
                alt="About Akash"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">About Me</h3>
              <p className="text-gray-400 mb-4">Learn about my journey, skills, and what drives me as a developer.</p>
              <Link href="/about/">
                <Button className="w-full">View About</Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Projects Card */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="h-48 relative">
              <Image 
                src={getImagePath('/images/task-manager.png')}
                alt="Projects"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Projects</h3>
              <p className="text-gray-400 mb-4">Explore my latest work and see what I've been building.</p>
              <Link href="/projects/">
                <Button className="w-full">View Projects</Button>
              </Link>
            </div>
          </motion.div>
          
          {/* Contact Card */}
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
          >
            <div className="h-48 relative">
              <Image 
                src={getImagePath('/images/chatbot-concept.jpg')}
                alt="Contact"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
              <p className="text-gray-400 mb-4">Interested in working together? Let's connect.</p>
              <Link href="/contact/">
                <Button className="w-full">Contact Me</Button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Back Home Button */}
        <Link href="/">
          <Button variant="outline" size="lg">
            Return to Homepage
          </Button>
        </Link>
      </motion.div>
    </div>
  );
} 