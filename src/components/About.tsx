import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Code2, Mail } from 'lucide-react';
import ParallaxTilt from 'react-parallax-tilt';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="section gradient-bg relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariant} className="section-heading text-center mx-auto text-white">
            About <span className="neon-text-blue">Me</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariant} className="relative">
              <ParallaxTilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#00f0ff"
                glarePosition="all"
                glareBorderRadius="12px"
              >
                <div className="glassmorphism rounded-xl p-1.5">
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src="https://images.pexels.com/photos/2102415/pexels-photo-2102415.jpeg" 
                      alt="Rohit N" 
                      className="w-full rounded-lg object-cover h-[400px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent"></div>
                  </div>
                </div>
              </ParallaxTilt>
            </motion.div>
            
            <motion.div variants={itemVariant} className="space-y-6">
              <h3 className="text-3xl font-bold font-mono">
                <span className="neon-text-blue">CSE Student</span> at VIT Chennai
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Second-year B.Tech CSE student specializing in AI & ML with a GPA of 8.94. 
                Passionate about deep learning, backend development, and Python wizardry.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">▹</span>
                  <p className="text-gray-300">Fluent in Python, C, C++, Java, SQL, and JavaScript</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">▹</span>
                  <p className="text-gray-300">Working with frameworks like Flask, Pandas, and NumPy</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neon-green">▹</span>
                  <p className="text-gray-300">Experience with GitHub, MySQL, Keil, Cursor, OracleSQL</p>
                </div>
              </div>
              
              <motion.div 
                className="flex space-x-4 pt-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                <motion.a
                  href="https://github.com/rohtheroos-84"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glassmorphism rounded-full flex items-center justify-center hover:border-neon-blue transition-colors border border-transparent"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(0, 240, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Github size={20} className="text-white" />
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/rohit-n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glassmorphism rounded-full flex items-center justify-center hover:border-neon-purple transition-colors border border-transparent"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(176, 38, 255, 0.5)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Linkedin size={20} className="text-white" />
                </motion.a>
                
                <motion.a
                  href="https://leetcode.com/Rohhcodes84"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 glassmorphism rounded-full flex items-center justify-center hover:border-neon-green transition-colors border border-transparent"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(57, 255, 20, 0.5)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Code2 size={20} className="text-white" />
                </motion.a>
                
                <motion.a
                  href="mailto:rohit84.official@gmail.com"
                  className="p-3 glassmorphism rounded-full flex items-center justify-center hover:border-neon-pink transition-colors border border-transparent"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(255, 45, 237, 0.5)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Mail size={20} className="text-white" />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;