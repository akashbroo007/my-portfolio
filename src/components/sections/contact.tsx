'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "@/components/ui/scroll-reveal";
import { Mail, MapPin, Send, Phone, Github, Linkedin } from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // In a real app, you would send this data to a server
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-center mb-4">Get In Touch</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <ScrollReveal className="w-full" direction="left">
            <div className="bg-gray-900/70 p-8 rounded-2xl h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <ScrollRevealContainer className="space-y-6" staggerChildren={0.1}>
                <ScrollRevealItem>
                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-500 mt-1 mr-4" />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <a href="mailto:akashfgz80@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                        akashfgz80@gmail.com
                      </a>
                    </div>
                  </div>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-500 mt-1 mr-4" />
                    <div>
                      <h4 className="font-medium mb-1">Location</h4>
                      <p className="text-gray-400">Mysore, Karnataka, India</p>
                    </div>
                  </div>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-blue-500 mt-1 mr-4" />
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-gray-400">Available upon request</p>
                    </div>
                  </div>
                </ScrollRevealItem>
              </ScrollRevealContainer>

              <ScrollReveal delay={0.4}>
                <div className="mt-12">
                  <h4 className="font-medium mb-4">Connect with me</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/akashbroo007" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          <ScrollReveal className="w-full" direction="right">
            <form onSubmit={handleSubmit} className="bg-gray-900/70 p-8 rounded-2xl h-full">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <ScrollRevealContainer className="space-y-6" staggerChildren={0.1}>
                <ScrollRevealItem>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </ScrollRevealItem>
                <ScrollRevealItem>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </ScrollRevealItem>
              </ScrollRevealContainer>
              <ScrollReveal delay={0.6}>
                <Button 
                  type="submit" 
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  Send Message <Send className="h-4 w-4" />
                </Button>
              </ScrollReveal>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}