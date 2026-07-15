import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal, Briefcase, GraduationCap, Mail, Sparkles } from 'lucide-react';

type TerminalLineType = 'system' | 'command' | 'response' | 'error';

type TerminalLine = {
  id: number;
  type: TerminalLineType;
  time: string;
  text?: string;
  response?: ConsoleResponse;
};

type ConsoleCardType = 'profile' | 'list' | 'contact' | 'project' | 'help';

type ConsoleCard = {
  title: string;
  subtitle?: string;
  body?: string;
  items?: string[];
  footnote?: string;
  type: ConsoleCardType;
};

type ConsoleResponse =
  | { kind: 'text'; text: string }
  | { kind: 'card'; card: ConsoleCard };

const promptLabel = 'rohit@portfolio:~$';
const OPEN_CONSOLE_EVENT = 'open-secret-console';

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

const renderCard = (card: ConsoleCard) => {
  const accentClass =
    card.type === 'contact'
      ? 'border-neon-green/40 bg-[rgba(57,255,20,0.06)]'
      : card.type === 'project'
        ? 'border-neon-purple/40 bg-[rgba(176,38,255,0.06)]'
        : card.type === 'profile'
          ? 'border-neon-blue/40 bg-[rgba(0,240,255,0.06)]'
          : 'border-white/10 bg-white/5';

    const icon =
      card.type === 'contact' ? (
        <Mail className="text-neon-green" size={14} />
      ) : card.type === 'project' ? (
        <Briefcase className="text-neon-purple" size={14} />
      ) : card.type === 'profile' ? (
        <Sparkles className="text-neon-blue" size={14} />
      ) : card.type === 'help' ? (
        <Terminal className="text-neon-blue" size={14} />
      ) : (
        <GraduationCap className="text-neon-blue" size={14} />
      );

  return (
    <div className={`w-full rounded-xl border p-4 ${accentClass}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-bold tracking-wide text-white">{card.title}</div>
          {card.subtitle && <div className="mt-1 text-xs text-gray-400">{card.subtitle}</div>}
        </div>
          <div className="mt-0.5">{icon}</div>
      </div>

      {card.body && <p className="mt-3 text-gray-200 leading-relaxed">{card.body}</p>}

      {card.items && card.items.length > 0 && (
        <div className="mt-3 grid gap-2">
          {card.items.map((item) => (
            <div key={item} className="flex items-start gap-2 text-gray-200">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-neon-blue shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      )}

      {card.footnote && <div className="mt-3 text-xs text-gray-500">{card.footnote}</div>}
    </div>
  );
};

const renderResponse = (response: ConsoleResponse) => {
  if (response.kind === 'text') {
    return <div>{response.text}</div>;
  }

  return renderCard(response.card);
};

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
    const handleOpenConsole = () => {
      setIsOpen(true);
      setCommand('');
      historyIndexRef.current = -1;
      setOutput(initialOutput());
    };

    window.addEventListener(OPEN_CONSOLE_EVENT, handleOpenConsole);
    return () => window.removeEventListener(OPEN_CONSOLE_EVENT, handleOpenConsole);
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' });
  }, [output]);

  const commands: Record<string, ConsoleResponse> = {
    help: {
      kind: 'card',
      card: {
        type: 'help',
        title: 'Available commands',
        subtitle: 'Use arrow keys to browse recent commands',
        items: ['about - short profile card', 'skills - quick tech stack view', 'hire - contact details', 'education - education summary', 'projects - featured work', 'clear - wipe the terminal', 'exit - close the console'],
        footnote: 'Tip: try the footer console button if you want a visible trigger.',
      },
    },
    about: {
      kind: 'card',
      card: {
        type: 'profile',
        title: 'Rohit N',
        subtitle: 'B.Tech CSE Junior | Full-Stack Developer | AI/ML Enthusiast',
        body: 'Builds practical web experiences with a focus on performance, clean UI, and systems that feel polished.',
        footnote: 'Currently experimenting with AI-assisted interfaces and portfolio-grade interactions.',
      },
    },
    skills: {
      kind: 'card',
      card: {
        type: 'list',
        title: 'Core stack',
        subtitle: 'Tools and languages used across projects',
        items: ['React.js', 'Node.js', 'Python', 'Java', 'C++', 'AWS', 'GCP', 'Docker', 'MongoDB', 'PostgreSQL'],
      },
    },
    hire: {
      kind: 'card',
      card: {
        type: 'contact',
        title: 'Open for opportunities',
        subtitle: 'Best way to reach out',
        body: 'rohit84.official@gmail.com',
        footnote: 'Always open to internships, product work, and strong engineering teams.',
      },
    },
    education: {
      kind: 'card',
      card: {
        type: 'profile',
        title: 'Education snapshot',
        subtitle: 'Vellore Institute of Technology, Chennai',
        items: ['B.Tech in Computer Science with specialization in AI & ML', 'CGPA: 9.01', 'Pursuing a curriculum focused on applied AI and software systems'],
      },
    },
    projects: {
      kind: 'card',
      card: {
        type: 'project',
        title: 'Featured work',
        subtitle: 'A few things worth checking out',
        items: ['AI-powered apps with context-aware automation', 'Cloud solutions and production-ready deployments', 'Full-stack web apps built for polished portfolio presentation'],
        footnote: 'Use the Projects section for the full breakdown.',
      },
    },
    clear: { kind: 'text', text: 'CLEAR_SCREEN' },
    exit: { kind: 'text', text: 'EXIT_CONSOLE' },
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
      const response = commands[cmd] || { kind: 'text', text: `Command not found: "${cmd}". Type "help" for available commands.` };
      setOutput((prev) => [
        ...prev,
        { ...createLine(`${promptLabel} ${command}`, 'command'), text: `${promptLabel} ${command}` },
        { ...createLine(response.kind === 'text' ? response.text : 'structured response', commands[cmd] ? 'response' : 'error'), response },
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
                      {line.type === 'command'
                        ? line.text
                        : line.response
                          ? renderResponse(line.response)
                          : line.text}
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
