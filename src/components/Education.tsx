import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, School } from 'lucide-react';

const Education: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="education" className="section bg-primary-bg py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.1),transparent_70%)]"></div>
      
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
            Edu<span className="neon-text-purple">cation</span>
          </motion.h2>

          <div className="relative mt-16 pb-10">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-green opacity-40"></div>

            {/* VIT Chennai */}
            <motion.div 
              variants={itemVariants}
              className="relative mb-24"
            >
              <div className="flex items-center justify-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-bg rounded-full border-2 border-neon-blue flex items-center justify-center z-10 shadow-neon-blue">
                  <GraduationCap className="text-neon-blue" size={20} />
                </div>
              </div>
              
              <motion.div 
                className="mr-0 md:mr-auto md:w-2/5 md:pr-10 mt-14 md:mt-0 relative md:right-12 glassmorphism rounded-xl p-6"
                whileHover={{
                  boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)",
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold font-mono text-white">Vellore Institute of Technology, Chennai</h3>
                <div className="font-mono text-neon-blue text-sm mb-2">August 2023 – Present</div>
                <p className="text-gray-300">Bachelors in Computer Science with spl. in AI & ML</p>
                <p className="font-semibold text-neon-green">CGPA: 8.89</p>
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm">
                    Pursuing a comprehensive curriculum with a specialisation in Artificial Intelligence and Machine Learning.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Shrishti Vidyashram */}
            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div className="flex items-center justify-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-primary-bg rounded-full border-2 border-neon-purple flex items-center justify-center z-10 shadow-neon-purple">
                  <School className="text-neon-purple" size={20} />
                </div>
              </div>
              
              <motion.div 
                className="mr-0 md:ml-auto md:w-2/5 md:pr-10 mt-14 md:mt-0 relative md:left-12 glassmorphism rounded-xl p-6"
                whileHover={{
                  boxShadow: "0 0 20px rgba(176, 38, 255, 0.3)",
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold font-mono text-white">Shrishti Vidyashram Sr. Sec. School</h3>
                <div className="font-mono text-neon-purple text-sm mb-2">June 2016 - April 2023</div>
                <p className="text-gray-300">Till 12th grade</p>
                <p className="font-semibold text-neon-green">Percentage: 83.2</p>
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <p className="text-gray-400 text-sm">
                    Completed higher secondary education with a focus on science and technology.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;