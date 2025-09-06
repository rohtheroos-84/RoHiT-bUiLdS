import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Code } from 'lucide-react';

import { Briefcase } from 'lucide-react';

const experienceData = [
  {
    id: 1,
    role: "Samsung PRISM Intern",
    organization: "Samsung R&D Institute India – Bangalore | Remote",
    period: "July 2025 - Present",
    description: "Building an AI-powered all-in-one communication app, focusing on context-aware task automation and lightweight on-device AI models.",
    icon: <Briefcase className="text-neon-blue" size={24} />,
    color: "neon-blue"
  },
  {
    id: 2,
    role: "Product Development Intern",
    organization: "Medialogic Solutions Pvt. Ltd. | Chennai, TN",
    period: "June 2025 – July 2025",
    description: "Built and deployed a production-grade speech-to-text system, reducing report completion time by over 80% for medical staff in 4000+ hospitals.",
    icon: <Briefcase className="text-neon-purple" size={24} />,
    color: "neon-purple"
  },
  {
    id: 3,
    role: "Competitive Programming Member",
    organization: "Google Developer Group (GDG) | VIT Chennai",
    period: "Oct 2024 - Present",
    description: "Active member of GDG's Competitive Programming wing, regularly participating in coding contests and collaborative problem-solving sessions.",
    icon: <Code className="text-neon-green" size={24} />,
    color: "neon-green"
  }
];

const Experience: React.FC = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="experience" className="section bg-primary-bg py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,38,255,0.08),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.h2 
            variants={cardVariants} 
            className="section-heading text-center mx-auto text-white"
          >
            Exper<span className="neon-text-purple">ience</span>
          </motion.h2>

          <div className="mt-12 space-y-10">
            {experienceData.map((exp) => (
              <motion.div
                key={exp.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: exp.color === "neon-purple" 
                    ? "0 10px 30px rgba(176, 38, 255, 0.2)"
                    : "0 10px 30px rgba(57, 255, 20, 0.2)"
                }}
                className="glassmorphism rounded-xl p-6 border-l-4"
                style={{ 
                  borderLeftColor: exp.color === "neon-purple" ? "#b026ff" : "#39ff14" 
                }}
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className="mr-4">
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-mono text-white">{exp.role}</h3>
                      <div className="text-lg font-semibold text-gray-300">{exp.organization}</div>
                    </div>
                  </div>
                  
                  <div className="md:ml-auto flex items-center text-sm text-gray-400 font-mono mt-2 md:mt-0">
                    <Calendar size={14} className="mr-1" />
                    {exp.period}
                  </div>
                </div>
                
                <div className="mt-4 text-gray-300">
                  {exp.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;