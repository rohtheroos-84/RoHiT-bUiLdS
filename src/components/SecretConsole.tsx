import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';

type TerminalLineType = 'system' | 'command' | 'response' | 'error';

type TerminalLine = {
  id: number;
  text: string;
  type: TerminalLineType;
  time: string;
};

const promptLabel = 'rohit@portfolio:~$';

const createLine = (text: string, type: TerminalLineType): TerminalLine => ({
  id: Date.now() + Math.random(),
  text,
  type,
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
});

const initialOutput = () => [
  createLine('Welcome to Rohit\'s Secret Console', 'system'),
  createLine('Type "help" for available commands', 'system'),
];

const SecretConsole: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyBuffer, setKeyBuffer] = useState('');
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const historyIndexRef = useRef(-1);
  const [output, setOutput] = useState<TerminalLine[]>(() => initialOutput());
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
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
  }, [output]);

  const commands: Record<string, string> = {
    help: 'Available commands: about, skills, hire, education, projects, clear, exit',
    about: 'Rohit N | B.Tech CSE Junior | Full-Stack Developer | AI/ML Enthusiast',
    skills: 'React.js, Node.js, Python, Java, C++, AWS, GCP, Docker, MongoDB, PostgreSQL',
    hire: 'rohit84.official@gmail.com | Always open to opportunities!',
    education: 'Vellore Institute of Technology, Chennai | B.Tech CSE Junior | CGPA: 9.01',
    projects: 'AI-powered apps, Cloud solutions, Full-stack web apps | Check out my portfolio!',
    clear: 'CLEAR_SCREEN',
    exit: 'EXIT_CONSOLE',
  };

  const handleHistoryNavigation = (direction: 'up' | 'down') => {
    if (!commandHistory.length) return;

    const currentIndex = historyIndexRef.current;
    const nextIndex =
      direction === 'up'
        ? Math.min(currentIndex + 1, commandHistory.length - 1)
        : Math.max(currentIndex - 1, -1);

    historyIndexRef.current = nextIndex;
    setCommand(nextIndex === -1 ? '' : commandHistory[nextIndex] ?? '');
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = command.toLowerCase().trim();
    
    if (!cmd) return;

    setCommandHistory((prev) => [cmd, ...prev.filter((entry) => entry !== cmd)].slice(0, 20));
    historyIndexRef.current = -1;
    
    if (cmd === 'clear') {
      setOutput([]);
    } else if (cmd === 'exit') {
      setIsOpen(false);
      setOutput(initialOutput());
    } else {
      const response = commands[cmd] || `Command not found: "${cmd}". Type "help" for available commands.`;
      setOutput((prev) => [
        ...prev,
        createLine(`${promptLabel} ${command}`, 'command'),
        createLine(response, commands[cmd] ? 'response' : 'error'),
      ]);
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
              <div className="hidden sm:block font-mono text-[10px] tracking-[0.2em] text-gray-500">
                HISTORY ENABLED
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
              {output.map((line) => (
                <div key={line.id} className="mb-2 flex items-start gap-3">
                  <span className="min-w-[3.2rem] text-[10px] leading-5 text-gray-500">[{line.time}]</span>
                  <div
                    className={
                      line.type === 'command'
                        ? 'text-neon-blue'
                        : line.type === 'error'
                          ? 'text-red-400'
                          : line.type === 'response'
                            ? 'text-gray-200'
                            : 'text-neon-green'
                    }
                  >
                    {line.type === 'command' ? <span>{line.text}</span> : line.text}
                  </div>
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="mt-2 flex items-center gap-2 text-neon-green">
                <span className="whitespace-nowrap">{promptLabel}</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') {
                      e.preventDefault();
                      handleHistoryNavigation('up');
                    }

                    if (e.key === 'ArrowDown') {
                      e.preventDefault();
                      handleHistoryNavigation('down');
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-white font-mono caret-neon-green"
                  autoFocus
                  placeholder="Type a command..."
                />
                <span className="inline-block h-4 w-2 bg-neon-green animate-pulse" aria-hidden="true" />
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
