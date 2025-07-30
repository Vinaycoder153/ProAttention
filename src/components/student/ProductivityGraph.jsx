import React from 'react';
import { motion } from 'framer-motion';

function ProductivityGraph({ productivityData }) {
  const maxTasks = Math.max(...productivityData.map(d => d.tasks), 0);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-effect p-6 rounded-xl"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Weekly Productivity</h2>
      <div className="flex justify-between items-end h-48">
        {productivityData.map((day, index) => (
          <div key={day.name} className="flex flex-col items-center w-1/7">
            <motion.div
              className="w-6 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-sm"
              initial={{ height: 0 }}
              animate={{ height: maxTasks > 0 ? `${(day.tasks / maxTasks) * 100}%` : '0%' }}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 100 }}
            ></motion.div>
            <span className="text-xs text-gray-400 mt-2">{day.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProductivityGraph;