import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Shield, Target, BookOpen, Monitor, FileText } from 'lucide-react';
import ParallaxTilt from 'react-parallax-tilt';

const projectData = [
  {
    id: 1,
    title: "DeepShield – Deepfake Video Detection",
    description: "A deepfake detection system using Vision Transformer (ViT) with 91.03% training accuracy.",
    icon: <Shield className="text-neon-blue" size={24} />,
    details: [
      "Engineered a ViT-based system, achieving 88.13% validation accuracy on the FaceForensics++ dataset.",
      "Deployed a Flask backend for real-time video uploads and frame-by-frame classification.",
      "Enhanced detection precision using color jitter, horizontal flips, and normalization techniques.",
      "Selected among top 150 out of 2000+ teams at HackHub'25."
    ],
    technologies: ["Python", "ViT", "Flask", "Deep Learning"],
    github: "https://github.com/rohtheroos-84/HackHobbits",
    link: "https://github.com/rohtheroos-84/HackHobbits",
    color: "neon-blue"
  },
  {
    id: 2,
    title: "Quality Assurance Assistant – AI-Powered Quality Analysis Platform",
    description: "An AI-driven quality engineering assistant that combines classical quality tools with modern AI insights for data-driven process improvement.",
    icon: <Target className="text-neon-purple" size={24} />,
    details: [
      "AI chat with multiple personas for novice, expert, and managerial perspectives.",
      "Automated generation of Pareto charts, histograms, control charts, and Cp/Cpk analysis.",
      "CSV and Excel data upload with automatic statistical analysis.",
      "Interactive, exportable visualizations.",
      "Context-aware AI recommendations for process improvement.",
      "Modern UI with glassmorphism, animations, and WebGL effects."
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "Gemini AI", "Pandas"],
    github: "https://github.com/rohtheroos-84/Quality-Assurance-Assistant",
    link: "https://quality-assurance-assistant.vercel.app",
    color: "neon-purple"
  },
  {
    id: 3,
    title: "ZyNc – Full-Stack Comic-Themed Blogging Platform",
    description: "A full-stack blogging platform with a comic-book aesthetic, featuring user authentication, content moderation, and interactive engagement.",
    icon: <BookOpen className="text-neon-green" size={24} />,
    details: [
      "JWT-based authentication with secure login and signup.",
      "Role-based admin panel for post approval and moderation.",
      "Markdown-powered blog creation with likes and comments.",
      "Search and trending discovery system.",
      "Fully responsive comic-style UI.",
      "RESTful API with protected routes and input validation."
    ],
    technologies: ["React 19", "Vite", "Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/rohtheroos-84/bLoGgInG_pLaTfOrM",
    link: "https://tryzync.vercel.app",
    color: "neon-green"
  },
  {
    id: 4,
    title: "Paper Thoughts – AI-Powered Lecture Note Mood Analyzer",
    description: "A notebook-style web app that analyzes lecture notes using AI to detect confusion, confidence, boredom, and alertness, helping students study smarter.",
    icon: <FileText className="text-neon-blue" size={24} />,
    details: [
      "Paragraph-level mood classification with visual timelines and heatmaps.",
      "AI-generated TL;DR summaries and personalized study plans.",
      "OCR support for handwritten and printed notes via image upload.",
      "Difficulty rating and prerequisite detection for confused sections.",
      "Multi-note tab management with drag-and-drop organization.",
      "PDF export for offline review and revision."
    ],
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Gemini AI", "jsPDF"],
    github: "https://github.com/rohtheroos-84/paper-thoughts",
    link: "https://trypaperthoughts.vercel.app",
    color: "neon-blue"
  },
  {
    id: 5,
    title: "EM-Connect – Event Management System (Event-Driven Architecture)",
    description: "A backend-first event management system built with Spring Boot and Golang using an event-driven microservices architecture.",
    icon: <Monitor className="text-neon-purple" size={24} />,
    details: [
      "Spring Boot API with JWT authentication and role-based access control.",
      "Event lifecycle management with strict state machine enforcement.",
      "Atomic capacity handling using pessimistic locking to prevent overbooking.",
      "RabbitMQ-based domain event publishing for decoupled services.",
      "Golang workers for ticket generation, email notifications, and WebSocket hub.",
      "Asynchronous QR ticket generation with validation endpoints."
    ],
    technologies: ["Spring Boot", "Java 17", "Golang", "RabbitMQ", "PostgreSQL", "JWT", "Docker"],
    github: "https://github.com/rohtheroos-84/EM-Connect",
    link: "https://github.com/rohtheroos-84/EM-Connect",
    color: "neon-purple"
  },
  {
    id: 6,
    title: "LinkedNet 98 – Retro AI LinkedIn Content Assistant",
    description: "A Windows 98–inspired AI assistant that interviews users to generate authentic, human-sounding LinkedIn posts grounded in real achievements and current context.",
    icon: <Monitor className="text-neon-purple" size={24} />,
    details: [
      "Interview-first AI flow that extracts metrics, emotions, and real insights before writing.",
      "Real-time web research to ground posts in current trends.",
      "Deep-thinking content synthesis using large-context Gemini models.",
      "Retro Windows 98 UI with light and dark modes.",
      "Editable drafts with one-click copy to clipboard.",
      "Explicitly avoids generic AI phrasing and buzzwords."
    ],
    technologies: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Gemini API"],
    github: "https://github.com/rohtheroos-84/linkednet-98",
    link: "https://github.com/rohtheroos-84/linkednet-98",
    color: "neon-green"
  }
];

const Projects: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="projects" className="section gradient-bg py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={cardVariants} className="section-heading text-center mx-auto text-white">
            Pro<span className="neon-text-green">jects</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            {projectData.map((project) => (
              <ParallaxTilt
                key={project.id}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                glareEnable={true}
                glareMaxOpacity={0.1}
                glareColor={project.color === "neon-blue" ? "#00f0ff" : project.color === "neon-purple" ? "#b026ff" : "#39ff14"}
                glarePosition="all"
                scale={hoveredId === project.id ? 1.05 : 1}
                transitionSpeed={400}
                tiltReverse={true}
              >
                <motion.div
                  variants={cardVariants}
                  className={`glassmorphism rounded-xl overflow-hidden project-card`}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  whileHover={{ y: -10 }}
                >
                  <div className="p-6 relative">
                    <div className={`text-${project.color} absolute top-6 right-6`}>
                      {project.icon}
                    </div>

                    <h3 className={`text-xl font-bold mb-2 font-mono text-${project.color}`}>
                      {project.title}
                    </h3>

                    <p className="text-white text-lg mb-4">{project.description}</p>

                    <ul className="space-y-2 mb-6">
                      {project.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`text-${project.color} mr-2`}>▹</span>
                          <span className="text-gray-300 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className={`text-xs px-3 py-1 rounded-full text-${project.color} border border-${project.color} bg-opacity-10 bg-${project.color}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full border border-${project.color} hover:bg-${project.color} hover:bg-opacity-20 transition-colors`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className={`text-${project.color}`} size={18} />
                      </motion.a>

                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-full border border-${project.color} hover:bg-${project.color} hover:bg-opacity-20 transition-colors`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className={`text-${project.color}`} size={18} />
                      </motion.a>
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 h-1 bg-${project.color}`}
                      style={{
                        width: hoveredId === project.id ? '100%' : '30%',
                        transition: 'width 0.5s ease',
                        boxShadow: `0 0 10px ${project.color === "neon-blue" ? "#00f0ff" : project.color === "neon-purple" ? "#b026ff" : "#39ff14"}`
                      }}
                    />
                  </div>
                </motion.div>
              </ParallaxTilt>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;