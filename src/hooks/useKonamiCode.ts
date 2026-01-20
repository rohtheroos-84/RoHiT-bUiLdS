import { useEffect, useState } from 'react';

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowLeft', 'ArrowRight', 'ArrowRight'];

export const useKonamiCode = () => {
  const [success, setSuccess] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => [...prev.slice(-9), e.key]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (keys.join('').endsWith(konamiCode.join(''))) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 10000);
    }
  }, [keys]);

  return success;
};
