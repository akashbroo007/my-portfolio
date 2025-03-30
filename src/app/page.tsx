import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Star, Code, Users, Clock, Zap, Briefcase, MessageSquare } from "lucide-react"
import { Footer } from '@/components/sections/footer'
import { ProjectButton } from "@/components/project-button"
import { TechStackItem } from "@/components/tech-stack-item"
import Link from "next/link"

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
      image: "/images/ecommerce-website.jpg",
      tech: ["Next.js", "TypeScript", "Stripe"],
      link: "/projects"
    },
    {
      title: "Task Management App",
      description: "Collaborative task tracking with real-time updates and team features",
      image: "/images/task-manager.png",
      tech: ["React", "Firebase", "TailwindCSS"],
      link: "/projects"
    },
    {
      title: "AI Chat Application",
      description: "Intelligent conversational interface with natural language processing",
      image: "/images/chatbot-concept.jpg",
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
    <div className="flex flex-col min-h-screen overflow-hidden bg-black">
      <main className="flex-grow relative">
        {/* Hero Section */}
        <div 
          className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-8 pt-20"
          id="home"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed"
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 -z-10"></div>

          {/* Header Section */}
          <header className="text-center mb-12 relative z-10 pt-12 text-white">
            <Avatar className="mx-auto mb-4 w-24 h-24">
              <AvatarImage src="https://avatars.githubusercontent.com/u/143693850?s=400&u=3aa6b0677bbb4531794ad9724a0e0b5dc7e3236e&v=4" alt="Akash Prabhakaran" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl md:text-6xl font-bold mb-2">Akash Prabhakaran</h1>
            <p className="text-xl text-gray-400">Passionate Full Stack Developer</p>
          </header>

          {/* Welcome Section */}
          <section className="text-center max-w-4xl mx-auto mb-12 p-8 bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-gray-800 transform hover:scale-105 transition-transform text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
            <p className="text-gray-400 text-lg mb-6">
              Hi there! I&apos;m Akash Prabhakaran, a{" "}
              <a 
                href="https://www.google.com/search?q=vibe+coder+meaning"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Vibe Coder
              </a>
              , and I&apos;m on a journey to become a skilled full stack developer.
              I started this journey out of pure passion and have been exploring the world of web development
              ever since. I love creating full-stack applications that enhance user experience and solve real-world problems.
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <ProjectButton />
              <Link href="/about">
                <Button 
                  variant="outline" 
                  className="flex items-center mt-8"
                >
                  Learn About Me <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        </div>

        {/* Services Section */}
        <section className="py-20 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">What I Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-black/40 backdrop-blur-sm p-8 rounded-3xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-4">Featured Work</h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
              A selection of my recent projects showcasing my technical skills and problem-solving abilities
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {featuredProjects.map((project, index) => (
                <Link 
                  href={project.link} 
                  key={index}
                  className="group"
                >
                  <div className="bg-gray-900 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="relative aspect-video overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects">
                <Button className="gap-2">
                  View All Projects <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-4">Tech Stack</h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
              Here are some of the technologies I use in my full-stack development journey:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {techStack.map((tech, index) => (
                <TechStackItem 
                  key={index}
                  name={tech.name}
                  image={tech.image}
                  description={tech.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-4">Client Testimonials</h2>
            <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
              What people say about working with me
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4 text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-b from-black to-blue-950">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-12 rounded-3xl border border-blue-700/30 backdrop-blur-sm">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
              <p className="text-gray-300 text-lg mb-8">
                Let&apos;s collaborate to create something amazing together. I&apos;m currently available for freelance projects and collaborations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    <MessageSquare className="h-5 w-5" /> Get in Touch
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
                    <Clock className="h-5 w-5" /> View My Work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
