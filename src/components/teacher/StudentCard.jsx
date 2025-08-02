import React from 'react';
import { motion } from 'framer-motion';

function StudentCard({ student }) {
  // Attendance status logic
  const getAttendanceStatus = (attendance) => {
    if (!attendance || attendance.total === 0) {
      return { status: 'at-risk', color: 'text-gray-400', bg: 'bg-gray-500/20' };
    }
    const percentage = (attendance.present / attendance.total) * 100;
    if (percentage >= 90) return { status: 'excellent', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (percentage >= 75) return { status: 'good', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    return { status: 'at-risk', color: 'text-red-400', bg: 'bg-red-500/20' };
  };

  // Productivity status logic
  const getProductivityStatus = (productivity) => {
    if (typeof productivity !== 'number') return { status: 'low', color: 'text-gray-400' };
    if (productivity >= 85) return { status: 'high', color: 'text-green-400' };
    if (productivity >= 70) return { status: 'medium', color: 'text-yellow-400' };
    return { status: 'low', color: 'text-red-400' };
  };

  const attendanceStatus = getAttendanceStatus(student.attendance);
  const productivityStatus = getProductivityStatus(student.productivity);
  const attendancePercentage = student.attendance && student.attendance.total > 0
    ? (student.attendance.present / student.attendance.total) * 100
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
      role="listitem"
      aria-label={`Student card for ${student.name}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Student Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg"
            aria-label={`Avatar for ${student.name}`}
          >
            {student.avatar}
          </div>
          <div>
            <h3 className="font-semibold text-white">{student.name}</h3>
            <p className="text-gray-400 text-sm">{student.email}</p>
            <p className="text-gray-500 text-xs">{student.class} • {student.lastActive}</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
          {/* Attendance */}
          <div className="text-center min-w-[80px]">
            <p className="text-xs text-gray-400">Attendance</p>
            <p className={`font-semibold ${attendanceStatus.color}`}>
              {attendancePercentage.toFixed(0)}%
            </p>
            <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="h-1 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                style={{ width: `${attendancePercentage}%` }}
                aria-valuenow={attendancePercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              ></div>
            </div>
          </div>
          
          {/* Productivity */}
          <div className="text-center min-w-[80px]">
            <p className="text-xs text-gray-400">Productivity</p>
            <p className={`font-semibold ${productivityStatus.color}`}>
              {typeof student.productivity === 'number' ? student.productivity : 0}%
            </p>
            <div className="w-16 bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${student.productivity || 0}%` }}
                aria-valuenow={student.productivity || 0}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              ></div>
            </div>
          </div>
          
          {/* Attendance Status */}
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${attendanceStatus.bg} ${attendanceStatus.color}`}
            aria-label={`Attendance status: ${attendanceStatus.status}`}
          >
            {attendanceStatus.status === 'excellent' ? '🌟 Excellent' : 
             attendanceStatus.status === 'good' ? '✅ Good' : '⚠️ At Risk'}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default StudentCard;
