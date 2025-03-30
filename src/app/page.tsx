import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight } from "lucide-react"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { ProjectButton } from "@/components/project-button"
import { TechStackItem } from "@/components/tech-stack-item"

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

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-grow relative">
        <div 
          className="relative w-full flex flex-col items-center justify-center px-4 py-8 pt-20"
          id="home"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80')",
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
            <h1 className="text-4xl font-bold mb-2">Akash Prabhakaran</h1>
            <p className="text-lg text-gray-400">Passionate Full Stack Developer</p>
          </header>

          {/* Welcome Section */}
          <section className="text-center max-w-4xl mx-auto mb-12 p-8 bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-gray-800 transform hover:scale-105 transition-transform text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h2>
            <p className="text-gray-400">
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
            <div className="flex justify-center mt-6">
              <Button 
                variant="secondary" 
                className="flex items-center mt-8"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="text-center w-full max-w-4xl mx-auto mb-12 p-8 bg-gray-900/90 backdrop-blur-sm rounded-3xl shadow-lg shadow-gray-800 text-white">
            <h2 className="text-3xl font-bold mb-4">Tech Stack</h2>
            <p className="text-gray-400 mb-8">
              Here are some of the technologies I use in my full-stack development journey:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {techStack.map((tech, index) => (
                <TechStackItem 
                  key={index}
                  name={tech.name}
                  image={tech.image}
                  description={tech.description}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Additional Sections */}
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}
