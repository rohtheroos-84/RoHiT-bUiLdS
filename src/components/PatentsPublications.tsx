import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FileText, ExternalLink, ChevronDown, ChevronUp, Award } from 'lucide-react';
import ParallaxTilt from 'react-parallax-tilt';

interface Patent {
  title: string;
  applicationNo: string;
  dateIssued: string;
  description: string;
  field: string;
  statusLink: string;
}

const patentsData: Patent[] = [
  {
    title: 'SMART REFRIGERATION SYSTEM ENABLING OCCLUSION DETECTION AND TARGETED DEFROSTING, AND METHOD THEREOF',
    applicationNo: '202541096122',
    dateIssued: 'Oct 31, 2025',
    description: 'A smart refrigeration system that uses multimodal sensors and AI to detect hidden food items, generate a 3D occupancy map, and perform targeted, zone-specific defrosting only where needed. The system repositions compartments, optimizes cooling, and synchronizes defrost cycles with user cooking schedules for improved efficiency and food preservation.',
    field: 'Mechanical Engineering',
    statusLink: 'https://iprsearch.ipindia.gov.in/PublicSearch/PublicationSearch/ApplicationStatus'
  }
];

const PatentsPublications: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
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
    <section id="patents" className="section gradient-bg py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="section-heading text-center mx-auto text-white"
          >
            Pat<span className="neon-text-pink">ents</span> & Publications
          </motion.h2>

          <div className="mt-12 space-y-6">
            {patentsData.map((patent, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <ParallaxTilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  glareEnable={true}
                  glareMaxOpacity={0.15}
                  glareColor="#ff2ded"
                  glarePosition="all"
                  glareBorderRadius="16px"
                >
                  <motion.div
                    className="glassmorphism rounded-2xl p-6 md:p-8 relative overflow-hidden border-2 border-transparent transition-all duration-300"
                    whileHover={{
                      borderColor: '#ff2ded',
                      boxShadow: '0 0 30px rgba(255, 45, 237, 0.3)',
                      y: -10
                    }}
                  >
                    {/* Scanline effect */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                      <div className="h-full w-full" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 45, 237, 0.3) 2px, rgba(255, 45, 237, 0.3) 4px)'
                      }} />
                    </div>

                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-neon-pink"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-neon-pink"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-neon-pink"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-neon-pink"></div>

                    {/* Header */}
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <FileText className="text-neon-pink w-10 h-10" />
                        </motion.div>
                      </div>
                      
                      <motion.div
                        className="px-4 py-1.5 rounded-full border-2 border-neon-green flex items-center gap-2"
                        animate={{
                          boxShadow: [
                            '0 0 10px rgba(57, 255, 20, 0.5)',
                            '0 0 20px rgba(57, 255, 20, 0.8)',
                            '0 0 10px rgba(57, 255, 20, 0.5)'
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'reverse'
                        }}
                      >
                        <Award className="text-neon-green w-4 h-4" />
                        <span className="text-neon-green font-mono text-sm font-bold">PUBLISHED</span>
                      </motion.div>
                    </div>

                    {/* Title */}
                    <motion.h3
                      className="text-2xl md:text-3xl font-bold font-mono text-white mb-4 leading-tight group-hover:text-neon-pink transition-colors"
                      whileHover={{ color: '#ff2ded' }}
                    >
                      {patent.title}
                    </motion.h3>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <motion.div
                        className="font-mono text-neon-blue"
                        whileHover={{
                          textShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
                          scale: 1.05
                        }}
                      >
                        Application No: <span className="font-bold">{patent.applicationNo}</span>
                      </motion.div>
                      <div className="text-gray-400">
                        Issued: <span className="text-white">{patent.dateIssued}</span>
                      </div>
                      <div className="px-3 py-1 bg-neon-purple bg-opacity-20 rounded-full text-neon-purple text-xs font-mono border border-neon-purple">
                        {patent.field}
                      </div>
                    </div>

                    {/* Description */}
                    <motion.div
                      className="relative mb-6"
                      animate={{ height: expandedCard === index ? 'auto' : '80px' }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className={`text-gray-300 leading-relaxed ${expandedCard !== index ? 'line-clamp-3' : ''}`}>
                        {patent.description}
                      </p>
                      {expandedCard !== index && (
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-primary-bg to-transparent pointer-events-none"></div>
                      )}
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <motion.a
                        href={patent.statusLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 glassmorphism rounded-full font-mono text-sm flex items-center gap-2 text-neon-pink border border-neon-pink"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 0 20px rgba(255, 45, 237, 0.5)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Check Status
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>

                      <motion.button
                        onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                        className="px-6 py-3 glassmorphism rounded-full font-mono text-sm flex items-center gap-2 text-white border border-gray-600 hover:border-neon-blue transition-colors"
                        whileHover={{
                          scale: 1.05,
                          borderColor: '#00f0ff'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {expandedCard === index ? (
                          <>
                            Show Less
                            <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Read More
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    </div>

                    {/* Floating particles effect */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-2 h-2 bg-neon-pink rounded-full opacity-50"
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-neon-pink rounded-full opacity-50"
                      animate={{
                        x: [0, -80, 0],
                        y: [0, 80, 0],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                      }}
                    />
                  </motion.div>
                </ParallaxTilt>
              </motion.div>
            ))}
          </div>

          {/* Future placeholder */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-8"
          >
            <p className="text-gray-400 font-mono text-sm">
              More patents & publications coming soon...
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PatentsPublications;
