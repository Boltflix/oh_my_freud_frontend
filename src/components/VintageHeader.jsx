import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Moon, Star } from 'lucide-react';

const VintageHeader = ({ title, subtitle }) => {
  return (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div 
          className="flex items-center space-x-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Star className="w-6 h-6 text-amber-600" />
          <Brain className="w-8 h-8 text-amber-700" />
          <Moon className="w-6 h-6 text-amber-600" />
        </motion.div>
      </div>
      
      <motion.h1 
        className="font-serif text-4xl md:text-5xl font-bold text-gradient mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          className="text-lg text-amber-800/80 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div 
        className="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-500 mx-auto mt-4 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 96 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </motion.div>
  );
};

export default VintageHeader;
