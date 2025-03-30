export function Experience() {
  const experiences = [
    {
      title: "Freelance Full Stack Developer",
      company: "Self-Employed",
      period: "2023 - Present",
      description: "Developing custom web applications and solutions for various clients. Specializing in React, Node.js, and modern web technologies. Successfully delivered e-commerce platforms, task management systems."
    },
    {
      title: "Web Development Projects",
      company: "Independent Projects",
      period: "2022 - 2023",
      description: "Built and deployed multiple web applications including an e-commerce platform, task management system, and AI chat application. Focused on creating scalable solutions using modern tech stacks and best practices."
    },
    {
      title: "Open Source Contributor",
      company: "Various Projects",
      period: "2022 - Present",
      description: "Active contributor to open-source projects. Collaborated with developers worldwide, improved codebase quality, and implemented new features for community-driven projects."
    }
  ]

  return (
    <section className="w-full py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors duration-300">
              <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
              <p className="text-purple-400">{exp.company}</p>
              <p className="text-gray-400">{exp.period}</p>
              <p className="text-gray-300 mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}