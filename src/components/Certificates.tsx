import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink } from 'lucide-react';

const certificatesData = [
  {
    id: 1,
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "Sep 2024",
    link: "#",
  },
  {
    id: 2,
    title: "Problem Solving (Intermediate DSA)",
    issuer: "HackerRank",
    date: "Sep 2024",
    link: "#",
  }
];

const Certificates: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="certificates" className="section gradient-bg py-20 relative">
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
            Certifi<span className="neon-text-green">cates</span>
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
          >
            {certificatesData.map((certificate) => (
              <motion.div
                key={certificate.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 30px rgba(57, 255, 20, 0.2)" 
                }}
                className="glassmorphism rounded-xl p-6 border-l-2 border-neon-green"
              >
                <div className="flex items-start">
                  <Award className="text-neon-green mr-4 mt-1 flex-shrink-0" size={24} />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-mono text-white flex items-center justify-between">
                      {certificate.title}
                      <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="ml-2 text-gray-400 hover:text-neon-green transition-colors">
                        <ExternalLink size={16} />
                      </a>
                    </h3>
                    
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-gray-300 text-sm">{certificate.issuer}</p>
                      <p className="text-gray-400 text-xs font-mono">{certificate.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;