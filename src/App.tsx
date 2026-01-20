import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import PatentsPublications from './components/PatentsPublications';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import BackToTop from './components/BackToTop';
import SecretConsole from './components/SecretConsole';
import MatrixRain from './components/MatrixRain';
import { useKonamiCode } from './hooks/useKonamiCode';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const konamiActivated = useKonamiCode();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleThemeToggle = () => {
    // Show easter egg - light mode is banned!
    setShowEasterEgg(true);
    setTimeout(() => setShowEasterEgg(false), 2500);
  };

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
    <>
      <div className="App gradient-bg">
        <Cursor />
        <Navbar onThemeToggle={handleThemeToggle} />
        <main>
          <Hero />
          <About />
          <Education />
          <Projects />
          <Experience />
          <Skills />
          <Certificates />
          <PatentsPublications />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>

      {/* Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                rotate: [0, -2, 2, -2, 0],
                opacity: 1
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ 
                type: "spring",
                damping: 10,
                stiffness: 100,
                rotate: {
                  repeat: 2,
                  duration: 0.2
                }
              }}
              className="glassmorphism rounded-xl p-8 border-2 border-red-500 shadow-2xl pointer-events-auto"
              style={{
                boxShadow: '0 0 30px rgba(255, 0, 0, 0.5), 0 0 60px rgba(255, 0, 0, 0.3)'
              }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgba(255, 0, 0, 0.8)',
                      '0 0 20px rgba(255, 0, 0, 1), 0 0 30px rgba(255, 0, 0, 0.8)',
                      '0 0 10px rgba(255, 0, 0, 0.8)'
                    ]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="text-3xl md:text-4xl font-mono font-bold text-red-500 mb-2"
                >
                  ⚠️ LIGHT MODE IS BANNED HERE
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Secret Console Easter Egg - Type "dev" anywhere */}
      <SecretConsole />
      
      {/* Matrix Rain Easter Egg - Konami Code: ↑↑↓↓←→←→BA */}
      <MatrixRain active={konamiActivated} />
    </>
  );
}

export default App;