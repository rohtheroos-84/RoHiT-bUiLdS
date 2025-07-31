import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Shield, Utensils } from 'lucide-react';
import ParallaxTilt from 'react-parallax-tilt';

const projectData = [
  {
    id: 1,
    title: "DeepShield",
    description: "Deepfake Video Detection using Vision Transformers",
    icon: <Shield className="text-neon-blue" size={24} />,
    details: [
      "Built using Vision Transformers on the FaceForensics++ dataset",
      "Flask backend with real-time video upload + frame-level classification",
      "91.03% training & 88.13% validation accuracy",
      "Top 150 out of 2000+ teams at HackHub'25"
    ],
    technologies: ["Python", "PyTorch", "Vision Transformers", "Flask", "OpenCV"],
    github: "https://github.com/rohtheroos-84/DeepShield",
    color: "neon-blue"
  },
  {
    id: 2,
    title: "SavourAI",
    description: "Indian Recipe Recommendation Chatbot",
    icon: <Utensils className="text-neon-green\" size={24} />,
    details: [
      "Uses CNNs + Gemini API to extract ingredients from images",
      "Combines content-based and collaborative filtering for smart recipe recs",
      "React frontend, Flask backend, complete with nutrition breakdowns",
      "Aims to reduce food waste + modernize traditional Indian cooking"
    ],
    technologies: ["Python", "React", "Flask", "CNN", "Gemini API", "Collaborative Filtering"],
    github: "https://github.com/rohtheroos-84/SavourAI",
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
                glareColor={project.color === "neon-blue" ? "#00f0ff" : "#39ff14"}
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
                        href="#"
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
                        boxShadow: `0 0 10px ${project.color === "neon-blue" ? "#00f0ff" : "#39ff14"}`
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