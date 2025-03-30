import Image from 'next/image'

export function Contact() {
  return (
    <>
      <section className="w-full py-12 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Get In Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-gray-800/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-400 mb-1">Email</p>
                  <a href="mailto:akashfgz80@gmail.com" className="text-gray-300 hover:text-blue-400 transition">
                    akashfgz80@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-blue-400 mb-1">Location</p>
                  <p className="text-gray-300">From: Kannur, Kerala</p>
                  <p className="text-gray-300">Currently in: Mysore, India</p>
                </div>
                <div>
                  <p className="text-blue-400 mb-1">Social</p>
                  <div className="flex space-x-4">
                    <a href="https://github.com/akashbroo007" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                      GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/akash-prabhkaran-699919282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition">
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-blue-500"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4">
            <Image
              src="/images/logo.png"
              alt="KashVenture Inc. Logo"
              width={40}
              height={40}
              className="opacity-80"
            />
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} KashVenture Inc. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Crafted with ❤️ by Akash Prabhakaran
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}