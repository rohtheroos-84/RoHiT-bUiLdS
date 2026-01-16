import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Download } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Patents', href: '#patents' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeToggle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled ? 'py-3 glassmorphism' : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <motion.a
            href="#home"
            className="text-xl font-mono font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="neon-text-blue">ROHIT</span>
            <span className="neon-text-purple">.N</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-white hover:text-neon-blue transition-colors font-mono text-sm tracking-wide"
                whileHover={{
                  scale: 1.1,
                  textShadow: "0 0 8px rgba(0, 240, 255, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
            
            {/* Resume Download Button */}
            <motion.a
              href="/Rohit N's Resume.pdf"
              download="Rohit N - Resume.pdf"
              className="px-4 py-2 glassmorphism rounded-full flex items-center gap-2 text-neon-blue border border-neon-blue font-mono text-sm"
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
              <Download size={16} />
              Resume
            </motion.a>

            <motion.button
              onClick={onThemeToggle}
              className="p-2 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <Sun className="text-neon-green" size={20} />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={onThemeToggle}
              className="p-2 rounded-full mr-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <Sun className="text-neon-green" size={20} />
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <Menu className="text-white" size={24} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-64 glassmorphism"
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex justify-end">
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="text-white" size={24} />
                  </motion.button>
                </div>
                <div className="flex flex-col mt-8 space-y-6">
                  {navItems.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="text-white hover:text-neon-blue py-2 font-mono tracking-wide"
                      whileHover={{ x: 5, color: "#00f0ff" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  
                  {/* Resume Download - Mobile */}
                  <motion.a
                    href="/Rohit N's Resume.pdf"
                    download="Rohit_N_Resume.pdf"
                    className="text-neon-blue hover:text-white py-2 font-mono tracking-wide flex items-center gap-2 border-t border-gray-700 pt-6"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Download size={20} />
                    Download Resume
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;