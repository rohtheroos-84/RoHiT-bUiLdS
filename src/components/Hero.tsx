import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import ParticleBackground from './ParticleBackground';
import { ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 font-mono"
            animate={{ 
              textShadow: [
                "0 0 5px rgba(0,240,255,0.5), 0 0 10px rgba(0,240,255,0.3)", 
                "0 0 10px rgba(0,240,255,0.8), 0 0 20px rgba(0,240,255,0.5), 0 0 30px rgba(0,240,255,0.3)",
                "0 0 5px rgba(0,240,255,0.5), 0 0 10px rgba(0,240,255,0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            ROHIT<span className="neon-text-purple">.N</span>
          </motion.h1>
          
          <div className="text-xl md:text-2xl text-gray-300 font-mono mt-6 min-h-[3rem]">
            <Typewriter
              options={{
                strings: [
                  "Hi, I'm Rohit – I build AI bots that cook",
                  "and detectors that decode deception."
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.button
            className="mt-8 px-8 py-3 glassmorphism rounded-full text-neon-blue border border-neon-blue text-lg font-mono"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 20px rgba(0, 240, 255, 0.5)"
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 5px rgba(0, 240, 255, 0.3)",
                "0 0 15px rgba(0, 240, 255, 0.5)",
                "0 0 5px rgba(0, 240, 255, 0.3)"
              ]
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            Explore My Work
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1, 
            y: [0, 10, 0] 
          }}
          transition={{
            y: {
              duration: 1.5,
              repeat: Infinity,
            },
            opacity: { delay: 2, duration: 1 }
          }}
        >
          <a href="#about">
            <ChevronDown className="text-neon-blue h-8 w-8" />
          </a>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-primary-bg to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
};

export default Hero;