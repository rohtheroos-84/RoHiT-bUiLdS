import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Users, Code } from 'lucide-react';

const experienceData = [
  {
    id: 1,
    role: "Management Team",
    organization: "iSpace Club",
    period: "Aug 2023 - Dec 2024",
    description: "Handled tech & non-tech iOS events, logistics, team onboarding, and event outreach.",
    icon: <Users className="text-neon-purple" size={24} />,
    color: "neon-purple"
  },
  {
    id: 2,
    role: "Competitive Programming",
    organization: "Google Developer Group",
    period: "Oct 2024 - Present",
    description: "Participated in Codeforces, LeetCode, Codechef, led post-contest analysis & peer strategy.",
    icon: <Code className="text-neon-green\" size={24} />,
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