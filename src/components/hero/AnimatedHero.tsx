'use client';

import { motion, Variants } from 'framer-motion';
import { Search, MapPin, GraduationCap, Globe, BookOpen, ArrowRight } from 'lucide-react';
import { FilterState } from '@/types';

interface AnimatedHeroProps {
  onSearch: (key: keyof FilterState, value: string | number) => void;
}

export const AnimatedHero = ({ onSearch }: AnimatedHeroProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 50, damping: 20 }
    }
  };

  const floatVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <div className="relative min-h-150 lg:h-[85vh] bg-indigo-950 text-white overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80')] bg-cover bg-center">
        <div className="absolute inset-0 bg-linear-to-r from-indigo-950/95 via-indigo-900/90 to-purple-900/80 backdrop-blur-[2px]" />
      </div>

      <motion.div
        variants={floatVariants}
        animate="animate"
        className="absolute top-20 left-[10%] opacity-10 hidden lg:block"
      >
        <Globe size={120} />
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 1 }}
        className="absolute bottom-32 right-[10%] opacity-10 hidden lg:block"
      >
        <BookOpen size={140} />
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        transition={{ delay: 2 }}
        className="absolute top-40 right-[20%] opacity-10 hidden lg:block"
      >
        <GraduationCap size={80} />
      </motion.div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-4 inline-block">
            <span className="px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm font-medium backdrop-blur-md">
              The Global Admission Platform
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
          >
            Bridge the Gap to Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-200 via-white to-indigo-200">
              Dream University
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl mx-auto text-lg md:text-xl text-indigo-100/80 mb-12 leading-relaxed"
          >
            Stop guessing. Start applying. Compare tuition, check real-time
            eligibility based on your scores, and fast-track your application
            today.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3 transform transition-all hover:bg-white/15"
          >
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Search university name..."
                className="w-full pl-12 pr-4 py-3 bg-indigo-950/30 border border-transparent rounded-xl text-white placeholder-indigo-300 focus:outline-none focus:bg-indigo-900/50 focus:ring-2 focus:ring-indigo-400 transition-all"
                onChange={(e) => onSearch("query", e.target.value)}
              />
            </div>

            <div className="flex-1 relative group">
              <MapPin className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5 z-10" />
              <select
                className="w-full pl-12 pr-4 py-3 bg-indigo-950/30 border border-transparent rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:bg-indigo-900/50 focus:ring-2 focus:ring-indigo-400 transition-all"
                onChange={(e) => onSearch("country", e.target.value)}
              >
                <option value="" className="bg-indigo-900 text-white">
                  All Countries
                </option>
                <option value="USA" className="bg-indigo-900 text-white">
                  USA
                </option>
                <option value="UK" className="bg-indigo-900 text-white">
                  UK
                </option>
                <option value="Canada" className="bg-indigo-900 text-white">
                  Canada
                </option>
                <option value="Australia" className="bg-indigo-900 text-white">
                  Australia
                </option>
                <option value="Germany" className="bg-indigo-900 text-white">
                  Germany
                </option>
                <option value="Singapore" className="bg-indigo-900 text-white">
                  Singapore
                </option>
                <option
                  value="Switzerland"
                  className="bg-indigo-900 text-white"
                >
                  Switzerland
                </option>
              </select>
            </div>

            <div className="flex-1 relative group">
              <GraduationCap className="absolute left-4 top-3.5 text-indigo-200 w-5 h-5 z-10" />
              <select
                className="w-full pl-12 pr-4 py-3 bg-indigo-950/30 border border-transparent rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:bg-indigo-900/50 focus:ring-2 focus:ring-indigo-400 transition-all"
                onChange={(e) => onSearch("degree", e.target.value)}
              >
                <option value="" className="bg-indigo-900 text-white">
                  All Degrees
                </option>
                <option value="Bachelors" className="bg-indigo-900 text-white">
                  Bachelors
                </option>
                <option value="Masters" className="bg-indigo-900 text-white">
                  Masters
                </option>
                <option value="PhD" className="bg-indigo-900 text-white">
                  PhD
                </option>
              </select>
            </div>

            <button className="bg-white text-indigo-900 font-bold py-3 px-8 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg flex items-center justify-center gap-2">
              Explore <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
