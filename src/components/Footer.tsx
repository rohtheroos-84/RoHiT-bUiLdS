import React from 'react';
import { motion } from 'framer-motion';
//import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-bg py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-mono text-lg mb-4 md:mb-0"
          >
            <span className="neon-text-blue">ROHIT</span>
            <span className="neon-text-purple">.N</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center text-gray-400 text-sm"
          >
            <span>© {new Date().getFullYear()} | Designed & Built by Rohit N</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;