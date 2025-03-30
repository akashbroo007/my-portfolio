export function Skills() {
  return (
    <section className="w-full py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Frontend Development</h3>
            <ul className="space-y-2 text-gray-300">
              <li>React.js & Next.js</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          
          {/* Backend */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Backend Development</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Node.js & Express</li>
              <li>RESTful APIs</li>
              <li>MongoDB & PostgreSQL</li>
              <li>Authentication & Security</li>
            </ul>
          </div>
          
          {/* Tools & Others */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-white mb-4">Tools & Technologies</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Git & GitHub</li>
              <li>Docker</li>
              <li>AWS Services</li>
              <li>CI/CD Pipelines</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}