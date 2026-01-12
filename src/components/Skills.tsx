import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiPython, SiCplusplus, SiSharp, SiC, SiJavascript, SiTypescript, 
  SiR, SiMysql, SiHtml5, SiCss3, SiReact, SiNodedotjs, SiDjango, SiFlask,
  SiTailwindcss, SiNextdotjs, SiMongodb, SiOracle,
  SiDocker, SiLinux, SiGit, SiPandas, SiNumpy, SiTensorflow, SiScikitlearn,
  SiPytorch, SiPostman, SiFirebase,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { FaDatabase, FaJava, FaAws } from 'react-icons/fa';
//import { BsFileEarmarkExcel, BsFileEarmarkPpt } from 'react-icons/bs';

type SkillCategory = 'all' | 'languages' | 'webdev' | 'databases' | 'devops' | 'dsml' | 'others';

interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  category: SkillCategory[];
  color: string;
}

const skillsData: Skill[] = [
  // Languages
  { name: 'C', icon: SiC, category: ['languages'], color: '#A8B9CC' },
  { name: 'C++', icon: SiCplusplus, category: ['languages'], color: '#00599C' },
  { name: 'C#', icon: SiSharp, category: ['languages'], color: '#239120' },
  { name: 'Java', icon: FaJava, category: ['languages'], color: '#007396' },
  { name: 'Python', icon: SiPython, category: ['languages'], color: '#3776AB' },
  { name: 'JavaScript', icon: SiJavascript, category: ['languages'], color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, category: ['languages'], color: '#3178C6' },
  { name: 'R', icon: SiR, category: ['languages'], color: '#276DC3' },
  { name: 'SQL', icon: FaDatabase, category: ['languages'], color: '#00758F' },
  
  // Web & App Dev
  { name: 'HTML5', icon: SiHtml5, category: ['webdev'], color: '#E34F26' },
  { name: 'CSS3', icon: SiCss3, category: ['webdev'], color: '#1572B6' },
  { name: 'React', icon: SiReact, category: ['webdev'], color: '#61DAFB' },
  { name: 'React Native', icon: TbBrandReactNative, category: ['webdev'], color: '#61DAFB' },
  { name: 'Node.js', icon: SiNodedotjs, category: ['webdev'], color: '#339933' },
  { name: 'Django', icon: SiDjango, category: ['webdev'], color: '#092E20' },
  { name: 'Flask', icon: SiFlask, category: ['webdev'], color: '#000000' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, category: ['webdev'], color: '#06B6D4' },
  //{ name: 'Bootstrap', icon: SiBootstrap, category: ['webdev'], color: '#7952B3' },
  { name: 'Next.js', icon: SiNextdotjs, category: ['webdev'], color: '#000000' },
  
  // Databases
  { name: 'MySQL', icon: SiMysql, category: ['databases'], color: '#4479A1' },
  { name: 'MongoDB', icon: SiMongodb, category: ['databases'], color: '#47A248' },
  { name: 'Oracle SQL', icon: SiOracle, category: ['databases'], color: '#F80000' },
  
  // DevOps
  { name: 'AWS', icon: FaAws, category: ['devops'], color: '#FF9900' },
  { name: 'Docker', icon: SiDocker, category: ['devops'], color: '#2496ED' },
  { name: 'Linux', icon: SiLinux, category: ['devops'], color: '#FCC624' },
  { name: 'Git', icon: SiGit, category: ['devops'], color: '#F05032' },
  
  // Data Science & ML
  { name: 'Pandas', icon: SiPandas, category: ['dsml'], color: '#150458' },
  { name: 'NumPy', icon: SiNumpy, category: ['dsml'], color: '#013243' },
  { name: 'TensorFlow', icon: SiTensorflow, category: ['dsml'], color: '#FF6F00' },
  { name: 'Scikit-Learn', icon: SiScikitlearn, category: ['dsml'], color: '#F7931E' },
  { name: 'PyTorch', icon: SiPytorch, category: ['dsml'], color: '#EE4C2C' },
  
  // Others
  { name: 'Postman', icon: SiPostman, category: ['others'], color: '#FF6C37' },
  { name: 'Firebase', icon: SiFirebase, category: ['others'], color: '#FFCA28' },
  //{ name: 'GitHub', icon: SiGithub, category: ['others'], color: '#181717' },
  //{ name: 'Excel', icon: BsFileEarmarkExcel, category: ['others'], color: '#217346' },
  //{ name: 'PowerPoint', icon: BsFileEarmarkPpt, category: ['others'], color: '#B7472A' },
  //{ name: 'VS Code', icon: TbBrandVscode, category: ['others'], color: '#007ACC' },
  //{ name: 'Visual Studio', icon: TbBrandVisualStudio, category: ['others'], color: '#5C2D91' },
];

const categories = [
  { id: 'all' as const, label: 'All' },
  { id: 'languages' as const, label: 'Languages' },
  { id: 'webdev' as const, label: 'Web & App Dev' },
  { id: 'databases' as const, label: 'Databases' },
  { id: 'devops' as const, label: 'DevOps' },
  { id: 'dsml' as const, label: 'DS & ML' },
  { id: 'others' as const, label: 'Others' },
];

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter(skill => skill.category.includes(activeCategory));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section id="skills" className="section gradient-bg py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            variants={itemVariants}
            className="section-heading text-center mx-auto text-white"
          >
            Ski<span className="neon-text-green">lls</span>
          </motion.h2>

          {/* Category Filter */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-mono text-sm transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                    : 'glassmorphism text-gray-300 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={
                  activeCategory === category.id
                    ? {
                        boxShadow: [
                          '0 0 10px rgba(0, 240, 255, 0.5)',
                          '0 0 20px rgba(176, 38, 255, 0.5)',
                          '0 0 10px rgba(0, 240, 255, 0.5)'
                        ]
                      }
                    : {}
                }
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }
                }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 max-w-6xl mx-auto"
          >
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative"
              >
                <motion.div
                  className="glassmorphism rounded-xl p-4 flex flex-col items-center justify-center aspect-square cursor-pointer relative overflow-hidden border border-transparent transition-colors duration-300"
                  whileHover={{
                    scale: 1.1,
                    rotate: 2,
                    boxShadow: `0 0 25px ${skill.color}80`,
                    borderColor: skill.color,
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <skill.icon 
                    className="w-12 h-12 mb-2 transition-all duration-300 group-hover:scale-110"
                    style={{ color: skill.color }}
                  />
                  
                  {/* Name */}
                  <span className="text-xs font-mono text-center text-gray-300 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>

                  {/* Hover glow effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl pointer-events-none"
                    style={{ 
                      background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skill count indicator */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8"
          >
            <p className="text-gray-400 font-mono text-sm">
              {filteredSkills.length} skill{filteredSkills.length !== 1 ? 's' : ''} displayed
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;