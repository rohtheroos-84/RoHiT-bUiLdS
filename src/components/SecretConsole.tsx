import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

const SecretConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState('');
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>([
    '> Welcome to Rohit\'s Secret Console',
    '> Type "help" for available commands',
  ]);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isOpen) return;
      
      const newBuffer = (keyBuffer + e.key).slice(-3);
      setKeyBuffer(newBuffer);
      
      if (newBuffer.toLowerCase() === 'dev') {
        setIsOpen(true);
        setKeyBuffer('');
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isOpen, keyBuffer]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const commands: Record<string, string> = {
    help: 'Available commands: about, skills, hire, education, projects, clear, exit',
    about: 'Rohit N | B.Tech CSE Junior | Full-Stack Developer | AI/ML Enthusiast',
    skills: 'React.js, Node.js, Python, Java, C++, AWS, GCP, Docker, MongoDB, PostgreSQL',
    hire: '📧 rohit84.official@gmail.com | 💼 Always open to opportunities!',
    education: 'Vellore Institute of Technology, Chennai | B.Tech CSE Junior | CGPA: 8.89',
    projects: 'AI-powered apps, Cloud solutions, Full-stack web apps | Check out my portfolio!',
    clear: 'CLEAR_SCREEN',
    exit: 'EXIT_CONSOLE',
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.toLowerCase().trim();
    
    if (!cmd) return;
    
    if (cmd === 'clear') {
      setOutput([]);
    } else if (cmd === 'exit') {
      setIsOpen(false);
      setOutput([
        '> Welcome to Rohit\'s Secret Console',
        '> Type "help" for available commands',
      ]);
    } else {
      const response = commands[cmd] || `Command not found: "${cmd}". Type "help" for available commands.`;
      setOutput(prev => [...prev, `> ${command}`, response]);
    }
    
    setCommand('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 w-[500px] max-w-[90vw] z-50"
        >
          <div className="glassmorphism rounded-lg border border-neon-green shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-black bg-opacity-50">
              <div className="flex items-center gap-2">
                <Terminal className="text-neon-green" size={18} />
                <span className="font-mono text-sm text-neon-green">secret_console.sh</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div 
              ref={outputRef}
              className="p-4 h-[300px] overflow-y-auto font-mono text-sm bg-black bg-opacity-30"
            >
              {output.map((line, i) => (
                <div 
                  key={i} 
                  className={`mb-1 ${line.startsWith('>') ? 'text-neon-green' : 'text-gray-300'}`}
                >
                  {line}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex items-center mt-2">
                <span className="text-neon-green mr-2">&gt;</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white font-mono"
                  autoFocus
                  placeholder="Type a command..."
                />
              </form>
            </div>
            
            <div className="px-4 py-2 border-t border-gray-700 bg-black bg-opacity-50">
              <p className="text-xs text-gray-500 font-mono">
                congrats finding the easter egg - iydkwim, type "dev" anywhere on the page to open this console
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretConsole;
