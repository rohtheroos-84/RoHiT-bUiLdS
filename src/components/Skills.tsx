import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

type SkillCategory = 'all' | 'languages' | 'frameworks' | 'tools' | 'platforms';

const skillsData = {
  languages: [
    { name: "Python", level: 95 },
    { name: "C#", level: 80 },
    { name: "C++", level: 85 },
    { name: "C", level: 80 },
    { name: "Java", level: 75 },
    { name: "SQL", level: 85 },
    { name: "Javascript", level: 70 },
    { name: "R", level: 60 }
  ],
  frameworks: [
    { name: "Pandas", level: 90 },
    { name: "NumPy", level: 85 },
    { name: "Scikit-Learn", level: 80 },
    { name: "Matplotlib", level: 75 },
    { name: "Qiskit", level: 70 },
    { name: "Flask", level: 85 },
    { name: "python.net", level: 80 },
    { name: ".Net 4.8", level: 75 },
    { name: "LangChain", level: 80 },
    { name: "RAG", level: 75 }
  ],
  tools: [
    { name: "Excel", level: 85 },
    { name: "PowerPoint", level: 90 },
    { name: "MySQL", level: 85 },
    { name: "Oracle SQL", level: 80 },
    { name: "GitHub", level: 95 },
    { name: "Keil", level: 70 }
  ],
  platforms: [
    { name: "Visual Studio", level: 90 },
    { name: "VS Code", level: 95 },
    { name: "Project Libre", level: 70 },
    { name: "StarUML", level: 75 },
    { name: "Google Colab", level: 85 },
    { name: "Cursor", level: 80 },
    { name: "OCI", level: 80 },
    { name: "AWS", level: 75 }
  ]
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all'
    ? [...skillsData.languages, ...skillsData.frameworks, ...skillsData.tools, ...skillsData.platforms]
    : skillsData[activeCategory];

  return (
    <section id="skills" className="section bg-primary-bg py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="section-heading text-center mx-auto text-white"
          >
            Ski<span className="neon-text-blue">lls</span>
          </motion.h2>

          <motion.div variants={itemVariants} className="flex justify-center flex-wrap gap-3 mb-12 mt-8">
            {(['all', 'languages', 'frameworks', 'tools', 'platforms'] as SkillCategory[]).map(category => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-mono text-sm transition-all ${
                  activeCategory === category
                    ? 'bg-neon-blue text-primary-bg shadow-neon-blue'
                    : 'bg-card-bg text-white hover:bg-opacity-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            variants={containerVariants} 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                variants={itemVariants}
                className="glassmorphism rounded-xl overflow-hidden neon-border"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(0, 240, 255, 0.15)" 
                }}
              >
                <div className="p-4">
                  <p className="text-white font-mono mb-2">{skill.name}</p>
                  <div className="w-full bg-gray-800 rounded-full h-2.5 mb-1">
                    <motion.div 
                      className="bg-gradient-to-r from-neon-blue to-neon-purple h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <p className="text-xs text-right text-gray-400">{skill.level}%</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;