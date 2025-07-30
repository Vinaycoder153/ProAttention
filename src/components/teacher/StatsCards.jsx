
import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, TrendingUp, UserX } from 'lucide-react';

function StatsCards({ totalStudents, averageAttendance, averageProductivity, studentsAtRisk }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">Total Students</p>
            <p className="text-2xl font-bold text-white">{totalStudents}</p>
            <p className="text-xs text-gray-400">Active learners</p>
          </div>
          <div className="p-3 rounded-full bg-blue-500/20">
            <Users className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">Avg Attendance</p>
            <p className="text-2xl font-bold text-white">{averageAttendance.toFixed(1)}%</p>
            <p className="text-xs text-gray-400">Class average</p>
          </div>
          <div className="p-3 rounded-full bg-green-500/20">
            <UserCheck className="w-6 h-6 text-green-400" />
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="h-2 rounded-full progress-bar"
              style={{ width: `${Math.min(averageAttendance, 100)}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">Avg Productivity</p>
            <p className="text-2xl font-bold text-white">{averageProductivity.toFixed(0)}%</p>
            <p className="text-xs text-gray-400">Task completion</p>
          </div>
          <div className="p-3 rounded-full bg-purple-500/20">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-effect rounded-xl p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">At Risk</p>
            <p className="text-2xl font-bold text-white">{studentsAtRisk}</p>
            <p className="text-xs text-gray-400">Below 75% attendance</p>
          </div>
          <div className="p-3 rounded-full bg-red-500/20">
            <UserX className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default StatsCards;
