'use client';

import Image from 'next/image';
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "@/components/ui/scroll-reveal";

export function About() {
  const getImagePath = (path: string) => {
    return process.env.NODE_ENV === 'production' ? `/my-portfolio${path}` : path;
  };

  return (
    <section className="w-full py-20 bg-black" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-white mb-6">About Me</h2>
            </ScrollReveal>
            <ScrollRevealContainer className="space-y-4 text-gray-300" staggerChildren={0.15}>
              <ScrollRevealItem>
                <p className="text-gray-300 leading-relaxed">
                  I&apos;m a passionate Full Stack Developer with a deep love for creating innovative web solutions. 
                  My journey in tech began with curiosity and has evolved into a professional pursuit of excellence 
                  in web development.
                </p>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <p className="text-gray-300 leading-relaxed">
                  I&apos;m always eager to learn and grow, staying up-to-date with the latest technologies 
                  and best practices in web development.
                </p>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <p>
                  I specialize in modern web technologies and have experience working with various frameworks and tools in both frontend and backend development. My approach combines technical expertise with creative problem-solving to deliver high-quality solutions.
                </p>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <p>
                  When I&apos;m not coding, I enjoy staying up-to-date with the latest tech trends, contributing to open-source projects, and sharing knowledge with the developer community.
                </p>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <div className="mt-6 space-y-2">
                  <p className="flex items-center flex-wrap">
                    <span className="text-blue-400 mr-2">Email:</span>
                    <a href="mailto:akashfgz80@gmail.com" className="hover:text-blue-400 transition">akashfgz80@gmail.com</a>
                  </p>
                  <p className="flex items-center">
                    <span className="text-blue-400 mr-2">From:</span>
                    <span>Kannur, Kerala</span>
                  </p>
                  <p className="flex items-center">
                    <span className="text-blue-400 mr-2">Current Location:</span>
                    <span>Mysore, India</span>
                  </p>
                </div>
              </ScrollRevealItem>
            </ScrollRevealContainer>
            <ScrollReveal delay={0.5}>
              <div className="mt-8 space-x-4 flex flex-wrap gap-4">
                <a 
                  href="https://github.com/akashbroo007" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
                >
                  GitHub Profile
                </a>
                <a 
                  href={getImagePath('/contact')}
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Contact Me
                </a>
              </div>
            </ScrollReveal>
          </div>
          
          {/* Project Showcase Images */}
          <div>
            <ScrollReveal>
              <h3 className="text-2xl font-bold text-white mb-6">Featured Projects</h3>
            </ScrollReveal>
            <ScrollRevealContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerChildren={0.15}>
              <ScrollRevealItem>
                <div className="relative group overflow-hidden rounded-lg">
                  <Image 
                    src={getImagePath('/images/ecommerce-website.jpg')}
                    alt="E-Commerce Platform"
                    width={400}
                    height={225}
                    className="w-full aspect-video object-cover transform transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4">E-Commerce Platform</p>
                  </div>
                </div>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <div className="relative group overflow-hidden rounded-lg">
                  <Image 
                    src={getImagePath('/images/task-manager.png')}
                    alt="Task Management App"
                    width={400}
                    height={225}
                    className="w-full aspect-video object-cover transform transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4">Task Management App</p>
                  </div>
                </div>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <div className="relative group overflow-hidden rounded-lg">
                  <Image 
                    src={getImagePath('/images/chatbot-concept.jpg')}
                    alt="AI Chat Application"
                    width={400}
                    height={225}
                    className="w-full aspect-video object-cover transform transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4">AI Chat Application</p>
                  </div>
                </div>
              </ScrollRevealItem>
              <ScrollRevealItem>
                <div className="relative group overflow-hidden rounded-lg">
                  <Image 
                    src={getImagePath('/images/portfolio.jpg')}
                    alt="Portfolio Website"
                    width={400}
                    height={225}
                    className="w-full aspect-video object-cover transform transition-transform duration-300 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4">Portfolio Website</p>
                  </div>
                </div>
              </ScrollRevealItem>
            </ScrollRevealContainer>
          </div>
        </div>
      </div>
    </section>
  )
}