import React from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, TrendingUp, UserX } from 'lucide-react';

function StatsCards({ totalStudents, averageAttendance, averageProductivity, studentsAtRisk }) {
  const stats = [
    {
      label: 'Total Students',
      value: totalStudents,
      icon: <Users className="w-6 h-6 text-blue-400" />,
    },
    {
      label: 'Avg Attendance',
      value: `${averageAttendance.toFixed(0)}%`,
      icon: <UserCheck className="w-6 h-6 text-green-400" />,
    },
    {
      label: 'Avg Productivity',
      value: `${averageProductivity.toFixed(0)}%`,
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
    },
    {
      label: 'At Risk',
      value: studentsAtRisk,
      icon: <UserX className="w-6 h-6 text-red-400" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-effect rounded-xl p-6 flex flex-col items-center"
        >
          {stat.icon}
          <div className="mt-2 text-2xl font-bold text-white">{stat.value}</div>
          <div className="text-sm text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;
