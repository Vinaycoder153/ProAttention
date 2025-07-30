import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, BookOpen, Clock, ListChecks } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

function StatsCards({ attendancePercentage, attendanceStatus, attendance, completedTasks, todos }) {
  const stats = [
    {
      title: 'Attendance',
      value: `${attendancePercentage.toFixed(1)}%`,
      icon: attendanceStatus === 'good' ? CheckCircle2 : AlertTriangle,
      color: attendanceStatus === 'good' ? 'text-green-400' : 'text-yellow-400',
      description: `You've attended ${attendance.present} of ${attendance.total} classes.`,
    },
    {
      title: 'Tasks Completed',
      value: completedTasks,
      icon: ListChecks,
      color: 'text-blue-400',
      description: `You have ${todos.filter(t => !t.completed).length} pending tasks.`,
    },
    {
      title: 'Total Classes',
      value: attendance.total,
      icon: BookOpen,
      color: 'text-purple-400',
      description: `Keep track of all your lectures.`,
    },
    {
      title: 'Focus Sessions',
      value: '0',
      icon: Clock,
      color: 'text-pink-400',
      description: `Pomodoro sessions completed today.`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={i}
          className="glass-effect p-6 rounded-xl"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-300">{stat.title}</h3>
            <stat.icon className={`h-6 w-6 ${stat.color}`} />
          </div>
          <p className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          <p className="text-sm text-gray-400 mt-2">{stat.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;