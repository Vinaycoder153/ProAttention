
import React from 'react';
import { motion } from 'framer-motion';

function StudentCard({ student }) {
  const getAttendanceStatus = (attendance) => {
    const percentage = (attendance.present / attendance.total) * 100;
    if (percentage >= 90) return { status: 'excellent', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (percentage >= 75) return { status: 'good', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    return { status: 'at-risk', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  const getProductivityStatus = (productivity) => {
    if (productivity >= 85) return { status: 'high', color: 'text-green-400' };
    if (productivity >= 70) return { status: 'medium', color: 'text-yellow-400' };
    return { status: 'low', color: 'text-red-400' };
  };

  const attendanceStatus = getAttendanceStatus(student.attendance);
  const productivityStatus = getProductivityStatus(student.productivity);
  const attendancePercentage = (student.attendance.present / student.attendance.total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {student.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-white">{student.name}</h3>
            <p className="text-gray-400 text-sm">{student.email}</p>
            <p className="text-gray-500 text-xs">{student.class} • {student.lastActive}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xs text-gray-400">Attendance</p>
            <p className={`font-semibold ${attendanceStatus.color}`}>
              {attendancePercentage.toFixed(0)}%
            </p>
            <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                style={{ width: `${attendancePercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-gray-400">Productivity</p>
            <p className={`font-semibold ${productivityStatus.color}`}>
              {student.productivity}%
            </p>
            <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${student.productivity}%` }}
              ></div>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${attendanceStatus.bg} ${attendanceStatus.color}`}>
            {attendanceStatus.status === 'excellent' ? '🌟 Excellent' : 
             attendanceStatus.status === 'good' ? '✅ Good' : '⚠️ At Risk'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default StudentCard;
