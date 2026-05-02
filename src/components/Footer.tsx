import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const Footer: React.FC = () => {
  const [viewCount, setViewCount] = useState<number | null>();

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const res = await fetch('https://api.counterapi.dev/v1/rohitn-portfolio/visits/up');
        if (!res.ok) {
          throw new Error(`Counter API responded with ${res.status}`);
        }

        const data = await res.json();
        if (typeof data?.count === 'number') {
          setViewCount(data.count);
          return;
        }

        throw new Error('Counter API response did not include a count');
      } catch {
        try {
          const namespace = 'rohitn-portfolio-v2';
          const key = 'page-visits';
          const res = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
          if (!res.ok) {
            throw new Error(`Count API responded with ${res.status}`);
          }

          const data = await res.json();
          if (typeof data?.value === 'number') {
            setViewCount(data.value);
            return;
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
        <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-[1fr_auto_1fr] md:items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="font-mono text-lg md:justify-self-start"
          >
            <span className="neon-text-blue">ROHIT</span>
            <span className="neon-text-purple">.N</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex items-center justify-center gap-1.5 text-gray-300 text-xs font-mono whitespace-nowrap md:justify-self-center"
          >
            <Eye size={12} className="text-neon-blue opacity-80" />
            <span>
              {typeof viewCount === 'number'
                ? `${viewCount.toLocaleString()} visits`
                : viewCount === null
                  ? 'Visits unavailable'
                  : 'Counting visits...'}
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center text-gray-400 text-sm md:justify-self-end"
          >
            <span>© {new Date().getFullYear()} | Designed & Built by Rohit N</span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
