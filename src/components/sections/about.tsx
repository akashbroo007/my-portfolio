'use client';

import Image from 'next/image';
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { Parallax, ParallaxSection } from "@/components/ui/parallax";
import { GradientBackground, GradientText } from "@/components/ui/gradient";

export function About() {
  const getImagePath = (path: string) => {
    return process.env.NODE_ENV === 'production' ? `/my-portfolio${path}` : path;
  };

  return (
    <div id="about">
      <GradientBackground
        colors={['#0f172a', '#1e1b4b', '#0f172a']}
        animate={true}
        animationDuration={25}
        className="w-full py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative background elements with parallax */}
          <div className="absolute -left-10 top-20 pointer-events-none">
            <Parallax speed={0.06} direction="left">
              <div className="w-40 h-40 rounded-full bg-blue-500/5 blur-[60px]"></div>
            </Parallax>
          </div>
          <div className="absolute -right-10 bottom-40 pointer-events-none">
            <Parallax speed={0.08} direction="right">
              <div className="w-60 h-60 rounded-full bg-purple-500/5 blur-[80px]"></div>
            </Parallax>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <ScrollReveal>
                <h2 className="text-3xl font-bold mb-6">
                  <GradientText
                    colors={['#38bdf8', '#818cf8', '#6366f1']}
                    animate={true}
                    animationDuration={5}
                    className="font-bold"
                  >
                    About Me
                  </GradientText>
                </h2>
              </ScrollReveal>
              <ScrollRevealContainer className="space-y-4 text-gray-300" staggerChildren={0.15}>
                <ScrollRevealItem>
                  <Parallax speed={0.1} direction="up">
                    <p className="text-gray-300 leading-relaxed">
                      I&apos;m a passionate Full Stack Developer with a deep love for creating innovative web solutions. 
                      My journey in tech began with curiosity and has evolved into a professional pursuit of excellence 
                      in web development.
                    </p>
                  </Parallax>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <Parallax speed={0.15} direction="up">
                    <p className="text-gray-300 leading-relaxed">
                      I&apos;m always eager to learn and grow, staying up-to-date with the latest technologies 
                      and best practices in web development.
                    </p>
                  </Parallax>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <Parallax speed={0.2} direction="up">
                    <p>
                      I specialize in modern web technologies and have experience working with various frameworks and tools in both frontend and backend development. My approach combines technical expertise with creative problem-solving to deliver high-quality solutions.
                    </p>
                  </Parallax>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <Parallax speed={0.25} direction="up">
                    <p>
                      When I&apos;m not coding, I enjoy staying up-to-date with the latest tech trends, contributing to open-source projects, and sharing knowledge with the developer community.
                    </p>
                  </Parallax>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <Parallax speed={0.3} direction="up">
                    <div className="mt-6 space-y-2 glass p-4 rounded-xl border border-gray-800/50">
                      <p className="flex items-center flex-wrap">
                        <span className="text-blue-400 mr-2">Email:</span>
                        <a href="mailto:akashfgz80@gmail.com" className="gradient-text-blue hover:animate-gradient-text transition">akashfgz80@gmail.com</a>
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
                  </Parallax>
                </ScrollRevealItem>
              </ScrollRevealContainer>
              <ScrollReveal delay={0.5}>
                <Parallax speed={0.15} direction="up">
                  <div className="mt-8 space-x-4 flex flex-wrap gap-4">
                    <a 
                      href="https://github.com/akashbroo007" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3 rounded-lg hover:from-gray-700 hover:to-gray-600 transition shadow-lg"
                    >
                      GitHub Profile
                    </a>
                    <a 
                      href={getImagePath('/contact')}
                      className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition shadow-lg"
                    >
                      Contact Me
                    </a>
                  </div>
                </Parallax>
              </ScrollReveal>
            </div>
            
            {/* Project Showcase Images */}
            <div>
              <ScrollReveal>
                <h3 className="text-2xl font-bold mb-6">
                  <GradientText
                    colors={['#f59e0b', '#ef4444', '#ec4899']}
                    animate={true}
                    animationDuration={5}
                    className="font-bold"
                  >
                    Featured Projects
                  </GradientText>
                </h3>
              </ScrollReveal>
              <ScrollRevealContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" staggerChildren={0.15}>
                <ScrollRevealItem>
                  <Parallax speed={0.2} direction="right">
                    <div className="relative group overflow-hidden rounded-lg shadow-lg shadow-black/30">
                      <Image 
                        src={getImagePath('/images/ecommerce-website.jpg')}
                        alt="E-Commerce Platform"
                        width={400}
                        height={225}
                        className="w-full aspect-video object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 font-medium">E-Commerce Platform</p>
                      </div>
                    </div>
                  </Parallax>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <Parallax speed={0.15} direction="left">
                    <div className="relative group overflow-hidden rounded-lg shadow-lg shadow-black/30">
                      <Image 
                        src={getImagePath('/images/task-manager.png')}
                        alt="Task Management App"
                        width={400}
                        height={225}
                        className="w-full aspect-video object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 font-medium">Task Management App</p>
                      </div>
                    </div>
                  </Parallax>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <Parallax speed={0.25} direction="up">
                    <div className="relative group overflow-hidden rounded-lg shadow-lg shadow-black/30">
                      <Image 
                        src={getImagePath('/images/chatbot-concept.jpg')}
                        alt="AI Chat Application"
                        width={400}
                        height={225}
                        className="w-full aspect-video object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 font-medium">AI Chat Application</p>
                      </div>
                    </div>
                  </Parallax>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <Parallax speed={0.2} direction="up">
                    <div className="relative group overflow-hidden rounded-lg shadow-lg shadow-black/30">
                      <Image 
                        src={getImagePath('/images/portfolio.jpg')}
                        alt="Portfolio Website"
                        width={400}
                        height={225}
                        className="w-full aspect-video object-cover object-center transform transition-transform duration-300 group-hover:scale-110"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 font-medium">Portfolio Website</p>
                      </div>
                    </div>
                  </Parallax>
                </ScrollRevealItem>
              </ScrollRevealContainer>
            </div>
          </div>
        </div>
      </GradientBackground>
    </div>
  )
}