import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const Footer: React.FC = () => {
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const namespace = 'rohitn-portfolio-v2';
        const key = 'page-visits';
        // Use countapi.xyz as primary
        const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
        const data = await res.json();
        if (data && data.value) {
          setViewCount(data.value);
        }
      } catch {
        // Fallback: try alternative endpoint
        try {
          const res = await fetch('https://api.counterapi.dev/v1/rohitn-portfolio/visits/up');
          const data = await res.json();
          if (data && data.count) {
            setViewCount(data.count);
          }
        } catch {
          setViewCount(null);
        }
      }
    };

    fetchViewCount();
  }, []);

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

          {viewCount !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex items-center gap-1.5 text-gray-500 text-xs font-mono mb-4 md:mb-0"
            >
              <Eye size={12} className="text-neon-blue opacity-60" />
              <span>{viewCount.toLocaleString()} visits</span>
            </motion.div>
          )}
          
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