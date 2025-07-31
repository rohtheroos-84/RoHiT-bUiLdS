import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Github, Linkedin, Code2, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form data
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset submitted state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="section gradient-bg py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="section-heading text-center mx-auto text-white"
          >
            Con<span className="neon-text-purple">tact</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <h3 className="text-xl font-bold font-mono text-white mb-6">Get In Touch</h3>
              
              <p className="text-gray-300 mb-8">
                Feel free to reach out for collaboration, opportunities, or just to say hello! I'll do my best to get back to you promptly.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Mail className="text-neon-blue mr-4" size={20} />
                  <a href="mailto:rohit84.official@gmail.com" className="text-gray-300 hover:text-neon-blue transition-colors">
                    rohit84.official@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Github className="text-neon-purple mr-4" size={20} />
                  <a href="https://github.com/rohtheroos-84" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-purple transition-colors">
                    rohtheroos-84
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Linkedin className="text-neon-green mr-4" size={20} />
                  <a href="https://linkedin.com/in/rohit-n" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-green transition-colors">
                    Rohit N
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Code2 className="text-neon-pink mr-4" size={20} />
                  <a href="https://leetcode.com/Rohhcodes84" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-neon-pink transition-colors">
                    Rohhcodes84
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="order-1 md:order-2">
              <form onSubmit={handleSubmit} className="glassmorphism rounded-xl p-6 relative">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-neon-blue mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-gray-700 focus:border-neon-blue rounded-lg p-3 text-white transition-all focus:ring-2 focus:ring-neon-blue focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-neon-blue mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900 border border-gray-700 focus:border-neon-blue rounded-lg p-3 text-white transition-all focus:ring-2 focus:ring-neon-blue focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-neon-blue mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-gray-900 border border-gray-700 focus:border-neon-blue rounded-lg p-3 text-white transition-all focus:ring-2 focus:ring-neon-blue focus:outline-none resize-none"
                    placeholder="Your message here..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-3 px-6 rounded-lg flex justify-center items-center space-x-2 font-mono ${
                    isSubmitted
                      ? 'bg-neon-green text-primary-bg'
                      : 'bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue hover:bg-opacity-10'
                  }`}
                  whileHover={{ 
                    boxShadow: isSubmitted ? '0 0 15px rgba(57, 255, 20, 0.5)' : '0 0 15px rgba(0, 240, 255, 0.5)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  ) : isSubmitted ? (
                    <span>Message Sent!</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
                
                {/* Decorative border animation */}
                <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green animate-[gradientBG_5s_ease_infinite]"></div>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;