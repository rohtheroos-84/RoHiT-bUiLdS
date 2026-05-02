import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const COUNTER_BASE_URL = 'https://api.counterapi.dev/v1/rohitn-portfolio/visits';
const VISIT_COUNT_STORAGE_KEY = 'rohit-portfolio-visit-count';
const VISIT_COUNTED_SESSION_KEY = 'rohit-portfolio-visit-counted';

const getCachedVisitCount = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const cachedCount = window.localStorage.getItem(VISIT_COUNT_STORAGE_KEY);
  if (!cachedCount) {
    return undefined;
  }

  const parsedCount = Number.parseInt(cachedCount, 10);
  return Number.isFinite(parsedCount) ? parsedCount : undefined;
};

const extractCount = (data: Record<string, unknown>) => {
  const count = data.count ?? data.value;

  if (typeof count === 'number') {
    return count;
  }

  if (typeof count === 'string') {
    const parsedCount = Number.parseInt(count, 10);
    return Number.isFinite(parsedCount) ? parsedCount : undefined;
  }

  return undefined;
};

const fetchCounterValue = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Counter API responded with ${res.status}`);
  }

  const data = await res.json();
  const count = extractCount(data);
  if (typeof count !== 'number') {
    throw new Error('Counter API response did not include a count');
  }

  return count;
};

const Footer: React.FC = () => {
  const [viewCount, setViewCount] = useState<number | null | undefined>(getCachedVisitCount);

  useEffect(() => {
    let isMounted = true;

    const saveViewCount = (count: number) => {
      window.localStorage.setItem(VISIT_COUNT_STORAGE_KEY, String(count));
      if (isMounted) {
        setViewCount(count);
      }
    };

    const fetchViewCount = async () => {
      const hasCountedThisSession = window.sessionStorage.getItem(VISIT_COUNTED_SESSION_KEY);
      const shouldIncrement = !hasCountedThisSession;

      if (shouldIncrement) {
        window.sessionStorage.setItem(VISIT_COUNTED_SESSION_KEY, 'pending');
      }

      try {
        const count = await fetchCounterValue(
          shouldIncrement ? `${COUNTER_BASE_URL}/up` : `${COUNTER_BASE_URL}/`
        );
        window.sessionStorage.setItem(VISIT_COUNTED_SESSION_KEY, '1');
        saveViewCount(count);
      } catch {
        try {
          const count = await fetchCounterValue(`${COUNTER_BASE_URL}/`);
          saveViewCount(count);
        } catch {
          if (isMounted && typeof getCachedVisitCount() !== 'number') {
            setViewCount(null);
          }
        }
      }
    };

    fetchViewCount();

    return () => {
      isMounted = false;
    };
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
