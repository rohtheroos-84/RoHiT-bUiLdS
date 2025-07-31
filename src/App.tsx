import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { motion } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-primary-bg">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-4xl md:text-6xl font-mono font-bold"
        >
          <span className="neon-text-blue">ROHIT</span>
          <span className="neon-text-purple">.N</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="App gradient-bg">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Projects />
        <Experience />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;