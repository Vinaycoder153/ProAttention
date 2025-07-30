
import React from 'react';
import { motion } from 'framer-motion';

function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="glass-effect rounded-xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-gray-300">Alice completed 3 tasks</span>
          <span className="text-gray-500 ml-auto">2h ago</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-gray-300">Bob marked attendance</span>
          <span className="text-gray-500 ml-auto">4h ago</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
          <span className="text-gray-300">Carol used Pomodoro timer</span>
          <span className="text-gray-500 ml-auto">6h ago</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-gray-300">David missed a class</span>
          <span className="text-gray-500 ml-auto">1d ago</span>
        </div>
      </div>
    </motion.div>
  );
}

export default RecentActivity;
