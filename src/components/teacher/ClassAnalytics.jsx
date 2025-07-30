import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

function ClassAnalytics({ students, studentsAtRisk }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-effect rounded-xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
        Class Analytics
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Excellent (90%+)</span>
          <span className="text-green-400 font-semibold">
            {students.filter(s => (s.attendance.present / s.attendance.total) * 100 >= 90).length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Good (75-89%)</span>
          <span className="text-blue-400 font-semibold">
            {students.filter(s => {
              const pct = (s.attendance.present / s.attendance.total) * 100;
              return pct >= 75 && pct < 90;
            }).length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">At Risk (&lt;75%)</span>
          <span className="text-red-400 font-semibold">{studentsAtRisk}</span>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-blue-300 text-sm">
          💡 <strong>Insight:</strong> {studentsAtRisk > 0 
            ? `${studentsAtRisk} students need attention to improve attendance.` 
            : 'All students are maintaining good attendance! 🎉'
          }
        </p>
      </div>
    </motion.div>
  );
}

export default ClassAnalytics;