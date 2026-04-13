import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Download, Zap, ZapOff } from 'lucide-react';
import { useAnimations } from '../context/AnimationContext';

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
  const { animationsEnabled, toggleAnimations } = useAnimations();

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
        className="fixed inset-x-0 top-3 z-40 px-3 sm:px-5 lg:px-8 pointer-events-none"
      >
        <div
          className={`relative mx-auto max-w-[1320px] rounded-[1.8rem] border overflow-hidden pointer-events-auto transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
            isScrolled
              ? 'bg-[rgba(4,10,28,0.34)] border-cyan-300/28 shadow-[0_10px_34px_rgba(0,0,0,0.4),0_0_28px_rgba(0,240,255,0.2)] backdrop-blur-[22px] backdrop-saturate-165'
              : 'bg-[rgba(4,10,28,0.26)] border-cyan-200/22 shadow-[0_8px_30px_rgba(0,0,0,0.3),0_0_22px_rgba(0,240,255,0.16)] backdrop-blur-[20px] backdrop-saturate-170'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_18%_0%,rgba(0,240,255,0.15),transparent_42%),radial-gradient(circle_at_80%_110%,rgba(176,38,255,0.12),transparent_52%),linear-gradient(112deg,rgba(0,240,255,0.04),rgba(176,38,255,0.04)_46%,rgba(0,240,255,0.025))]" />
          <div className="relative flex justify-between items-center px-4 md:px-6 lg:px-8 py-3.5">
          <motion.a
            href="#home"
            className="text-lg md:text-xl font-mono font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="neon-text-blue">ROHIT</span>
            <span className="neon-text-purple">.N</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-white/90 hover:text-neon-blue transition-colors font-mono text-xs xl:text-sm tracking-wide"
                whileHover={{
                  scale: 1.05,
                  textShadow: "0 0 8px rgba(0, 240, 255, 0.7)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
              </motion.a>
            ))}
            
            {/* Resume Download Button */}
            <motion.a
              href="/Rohit's Resume.pdf"
              download="Rohit N - Resume.pdf"
              className="px-3 xl:px-4 py-2 rounded-full flex items-center gap-2 text-neon-blue border border-neon-blue/70 bg-[rgba(0,240,255,0.08)] font-mono text-xs xl:text-sm"
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
              className="p-2 rounded-full border border-transparent hover:border-neon-green/40 hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <Sun className="text-neon-green" size={20} />
            </motion.button>

            <motion.button
              onClick={toggleAnimations}
              className="p-2 rounded-full border border-transparent hover:border-neon-pink/40 hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle animations"
              title={animationsEnabled ? 'Disable animations' : 'Enable animations'}
            >
              {animationsEnabled ? (
                <Zap className="text-neon-pink" size={20} />
              ) : (
                <ZapOff className="text-gray-500" size={20} />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              onClick={toggleAnimations}
              className="p-2 rounded-full mr-1 border border-transparent hover:border-neon-pink/40 hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle animations"
            >
              {animationsEnabled ? (
                <Zap className="text-neon-pink" size={18} />
              ) : (
                <ZapOff className="text-gray-500" size={18} />
              )}
            </motion.button>
            <motion.button
              onClick={onThemeToggle}
              className="p-2 rounded-full mr-2 border border-transparent hover:border-neon-green/40 hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              <Sun className="text-neon-green" size={20} />
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-full border border-white/20 hover:border-neon-blue/50 hover:bg-white/5"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <Menu className="text-white" size={24} />
            </motion.button>
          </div>
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
                    href="/Rohit's Resume.pdf"
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