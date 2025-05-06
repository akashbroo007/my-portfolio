'use client';

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Star, Code, Users, Clock, Zap, Briefcase, MessageSquare } from "lucide-react"
import { ProjectButton } from "@/components/project-button"
import { TechStackItem } from "@/components/tech-stack-item"
import Link from "next/link"
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "@/components/ui/scroll-reveal"
import { Parallax, ParallaxSection, ParallaxLayer } from "@/components/ui/parallax"
import { GradientBackground, GradientText } from "@/components/ui/gradient"

export default function Home() {
  const techStack = [
    {
      name: "Next.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      description: "A React framework for production that enables features like server-side rendering and static site generation for optimal performance."
    },
    {
      name: "TypeScript",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      description: "A strongly typed programming language that builds on JavaScript, adding static types for enhanced development experience and code reliability."
    },
    {
      name: "React",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "A JavaScript library for building user interfaces with reusable components. Features virtual DOM for optimal rendering and a rich ecosystem of tools."
    },
    {
      name: "Firebase",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      description: "Google's platform that helps you build and grow apps, with services for hosting, authentication, databases, and more."
    },
    {
      name: "Redux",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
      description: "A predictable state container for JavaScript apps, helping you write applications that behave consistently across different environments."
    },
    {
      name: "Node.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      description: "Runtime environment that executes JavaScript code outside a web browser. Enables building scalable network applications."
    },
    {
      name: "OpenAI",
      image: "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
      description: "Leading AI research company providing powerful APIs for natural language processing, image generation, and more."
    },
    {
      name: "WebSocket",
      image: "https://cdn.worldvectorlogo.com/logos/websocket.svg",
      description: "Protocol providing full-duplex communication channels over a single TCP connection, ideal for real-time applications."
    },
    {
      name: "Framer Motion",
      image: "https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
      description: "A production-ready motion library for React that powers animations in user interfaces with simple declarative syntax."
    },
    {
      name: "Tailwind",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
      description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup."
    },
    {
      name: "Stripe",
      image: "https://cdn.worldvectorlogo.com/logos/stripe-4.svg",
      description: "Online payment processing for internet businesses, providing robust APIs for secure payment integration."
    }
  ]

  const featuredProjects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack marketplace with real-time inventory management and secure payments",
      image: process.env.NODE_ENV === 'production' ? '/my-portfolio/images/ecommerce-website.jpg' : '/images/ecommerce-website.jpg',
      tech: ["Next.js", "TypeScript", "Stripe"],
      link: "/projects"
    },
    {
      title: "Task Management App",
      description: "Collaborative task tracking with real-time updates and team features",
      image: process.env.NODE_ENV === 'production' ? '/my-portfolio/images/task-manager.png' : '/images/task-manager.png',
      tech: ["React", "Firebase", "TailwindCSS"],
      link: "/projects"
    },
    {
      title: "AI Chat Application",
      description: "Intelligent conversational interface with natural language processing",
      image: process.env.NODE_ENV === 'production' ? '/my-portfolio/images/chatbot-concept.jpg' : '/images/chatbot-concept.jpg',
      tech: ["Next.js", "OpenAI", "WebSocket"],
      link: "/projects"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      text: "Akash delivered our project on time and exceeded our expectations. The attention to detail was impressive!"
    },
    {
      name: "Michael Chen",
      role: "Tech Lead",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      text: "Working with Akash was a pleasure. His technical skills and problem-solving abilities are top-notch."
    },
    {
      name: "Emily Rodriguez",
      role: "Startup Founder",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      text: "Akash helped bring our vision to life with a beautiful, functional web application that our users love."
    }
  ]

  const services = [
    {
      icon: <Code className="w-8 h-8 text-blue-400" />,
      title: "Full-Stack Development",
      description: "End-to-end web applications with polished UIs and robust backends"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: "Performance Optimization",
      description: "Improving speed, responsiveness and overall user experience"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-green-400" />,
      title: "Project Consultation",
      description: "Technical guidance and strategy for your development projects"
    }
  ]

  return (
    <div className="flex flex-col overflow-hidden bg-black">
      {/* Hero Section with Enhanced Parallax */}
      <div id="home">
        <ParallaxSection
          backgroundImage={process.env.NODE_ENV === 'production' ? '/my-portfolio/images/background.jpg' : '/images/background.jpg'}
          speed={0.15}
          overlayOpacity={0.65}
          className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8 pt-20"
        >
          {/* Floating particles with parallax */}
          <ParallaxLayer speed={0.3} className="pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-blue-500/10 blur-xl"></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-purple-500/10 blur-xl"></div>
            <div className="absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full bg-cyan-500/10 blur-xl"></div>
          </ParallaxLayer>
          
          <ParallaxLayer speed={0.2} className="pointer-events-none">
            <div className="absolute top-1/2 left-1/3 w-6 h-6 rounded-full bg-pink-500/10 blur-lg"></div>
            <div className="absolute top-2/3 right-1/3 w-16 h-16 rounded-full bg-indigo-500/10 blur-xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-8 h-8 rounded-full bg-green-500/10 blur-lg"></div>
          </ParallaxLayer>

          {/* Header Section */}
          <header className="text-center mb-12 relative z-10 pt-12 text-white w-full">
            <ScrollReveal direction="down" delay={0.2}>
              <Parallax speed={0.4} direction="down">
                <Avatar className="mx-auto mb-6 w-32 h-32 ring-4 ring-blue-500/30 ring-offset-4 ring-offset-black">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/143693850?s=400&u=3aa6b0677bbb4531794ad9724a0e0b5dc7e3236e&v=4" alt="Akash Prabhakaran" className="object-center" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
              </Parallax>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.4}>
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                <GradientText
                  colors={['#38bdf8', '#818cf8', '#4f46e5']}
                  animate={true}
                  animationDuration={6}
                  className="font-bold"
                >
                  Akash Prabhakaran
                </GradientText>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.6}>
              <Parallax speed={0.25} direction="up">
                <p className="text-xl text-gray-400">Passionate Full Stack Developer</p>
              </Parallax>
            </ScrollReveal>
          </header>

          {/* Welcome Section */}
          <ScrollReveal width="100%" delay={0.8} direction="up">
            <section className="text-center max-w-4xl mx-auto mb-12 p-8 glass rounded-3xl shadow-lg shadow-gray-800 transform hover:scale-105 transition-transform text-white">
              <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
              <p className="text-gray-400 text-lg mb-6">
                Hi there! I&apos;m Akash Prabhakaran, a{" "}
                <a 
                  href="https://www.google.com/search?q=vibe+coder+meaning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gradient-text-blue animate-gradient-text"
                >
                  Vibe Coder
                </a>
                , and I&apos;m on a journey to become a skilled full stack developer.
                I started this journey out of pure passion and have been exploring the world of web development
                ever since. I love creating full-stack applications that enhance user experience and solve real-world problems.
              </p>
              <div className="flex justify-center mt-6 space-x-4">
                <ProjectButton />
                <Link href={process.env.NODE_ENV === 'production' ? '/my-portfolio/about' : '/about'}>
                  <Button 
                    variant="outline" 
                    className="flex items-center mt-8"
                  >
                    Learn About Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </section>
          </ScrollReveal>
        </ParallaxSection>
      </div>

      {/* Services Section with Enhanced Gradient Background */}
      <GradientBackground
        colors={['#0f172a', '#1e293b', '#1e1b4b', '#0f172a']}
        direction="to-bottom-right"
        animate={true}
        className="py-20"
        animationDuration={20}
      >
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center text-white mb-4">
              <GradientText
                colors={['#a855f7', '#0ea5e9', '#6ee7b7']}
                direction="to-right"
                animate={true}
                animationDuration={5}
              >
                What I Do
              </GradientText>
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
              Crafting digital experiences with code and creativity
            </p>
          </ScrollReveal>
          
          <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" staggerChildren={0.2}>
            {services.map((service, index) => (
              <ScrollRevealItem key={index} direction="up">
                <Parallax 
                  speed={0.1 + (index * 0.08)}
                  direction={index % 2 === 0 ? "up" : "down"}
                  className="h-full"
                >
                  <div className="glass p-8 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10 h-full">
                    <div className="mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>
                </Parallax>
              </ScrollRevealItem>
            ))}
          </ScrollRevealContainer>
        </div>
      </GradientBackground>

      {/* Featured Projects Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background parallax elements */}
        <div className="absolute -left-40 top-1/4 pointer-events-none">
          <Parallax speed={0.05} direction="left">
            <div className="w-80 h-80 rounded-full bg-blue-900/10 blur-[100px]"></div>
          </Parallax>
        </div>
        
        <div className="absolute -right-40 bottom-1/4 pointer-events-none">
          <Parallax speed={0.07} direction="right">
            <div className="w-80 h-80 rounded-full bg-purple-900/10 blur-[100px]"></div>
          </Parallax>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">
              <GradientText
                colors={['#fb923c', '#fbbf24', '#f87171']}
                direction="to-right"
                animate={true}
                animationDuration={7}
              >
                Featured Work
              </GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
              A selection of my recent projects showcasing my technical skills and problem-solving abilities
            </p>
          </ScrollReveal>

          <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" staggerChildren={0.2}>
            {featuredProjects.map((project, index) => (
              <ScrollRevealItem key={index} direction="up">
                <Parallax 
                  speed={0.2 - (index * 0.03)}
                  direction="up" 
                  className="h-full"
                >
                  <Link 
                    href={process.env.NODE_ENV === 'production' ? `/my-portfolio${project.link}` : project.link} 
                    className="group block h-full"
                  >
                    <div className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full">
                      <div className="relative aspect-video overflow-hidden">
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${project.image})`, objectPosition: 'center' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Parallax>
              </ScrollRevealItem>
            ))}
          </ScrollRevealContainer>
        </div>
      </section>

      {/* Tech Stack Section with Enhanced Gradient */}
      <GradientBackground
        colors={['#0f172a', '#0f1735', '#1e1b4b', '#312e81']}
        direction="to-bottom"
        className="py-20"
        animate={true}
        animationDuration={25}
      >
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">
              <GradientText
                colors={['#34d399', '#10b981', '#0ea5e9', '#2dd4bf']}
                direction="to-right"
                animate={true}
                animationDuration={4}
              >
                Technologies I Work With
              </GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
              A curated collection of tools and frameworks that power my development workflow
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {techStack.map((tech, index) => (
              <Parallax 
                key={index} 
                speed={0.05 + (index % 5) * 0.025}
                direction={index % 4 === 0 ? 'up' : index % 4 === 1 ? 'down' : index % 4 === 2 ? 'left' : 'right'}
              >
                <TechStackItem
                  name={tech.name}
                  image={tech.image}
                  description={tech.description}
                />
              </Parallax>
            ))}
          </div>
        </div>
      </GradientBackground>

      {/* Testimonials Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background parallax elements */}
        <div className="absolute -left-20 bottom-0 pointer-events-none">
          <Parallax speed={0.08} direction="up">
            <div className="w-60 h-60 rounded-full bg-purple-900/10 blur-[80px]"></div>
          </Parallax>
        </div>
        
        <div className="absolute right-20 top-20 pointer-events-none">
          <Parallax speed={0.12} direction="down">
            <div className="w-40 h-40 rounded-full bg-blue-900/10 blur-[80px]"></div>
          </Parallax>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-center mb-4">
              <GradientText
                colors={['#c084fc', '#a855f7', '#d946ef', '#e879f9']}
                direction="to-right"
                animate={true}
                animationDuration={6}
              >
                Client Testimonials
              </GradientText>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
              What people say about working with me
            </p>
          </ScrollReveal>

          <ScrollRevealContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" staggerChildren={0.15}>
            {testimonials.map((testimonial, index) => (
              <ScrollRevealItem key={index} direction="up">
                <Parallax 
                  speed={0.18 - (index * 0.04)}
                  direction="up" 
                  className="h-full"
                >
                  <div className="glass p-8 rounded-3xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 h-full">
                    <div className="flex items-start mb-6">
                      <Avatar className="mr-4 ring-2 ring-purple-500/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-bold text-white">{testimonial.name}</h3>
                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">"{testimonial.text}"</p>
                    <div className="flex mt-4">
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                      <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                    </div>
                  </div>
                </Parallax>
              </ScrollRevealItem>
            ))}
          </ScrollRevealContainer>
        </div>
      </section>

      {/* Call to Action with Enhanced Gradient */}
      <GradientBackground
        colors={['#111827', '#1e1b4b', '#312e81', '#4338ca']}
        animate={true}
        direction="to-bottom-right"
        className="py-20"
        animationDuration={18}
      >
        <Parallax speed={0.1} direction="up" className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Ready to start your project?</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Let&apos;s collaborate to bring your ideas to life with modern technologies and creative solutions
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <Link href={process.env.NODE_ENV === 'production' ? '/my-portfolio/contact' : '/contact'}>
              <Button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 px-8 py-6 rounded-full text-lg font-medium animate-gradient">
                Get in Touch <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </ScrollReveal>
        </Parallax>
      </GradientBackground>
    </div>
  );
}
