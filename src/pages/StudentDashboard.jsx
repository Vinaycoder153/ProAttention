import React from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import useStudentData from '@/hooks/useStudentData';
import StudentHeader from '@/components/student/StudentHeader';
import StatsCards from '@/components/student/StatsCards';
import AttendanceTracker from '@/components/student/AttendanceTracker';
import TodoList from '@/components/student/TodoList';
import PomodoroTimer from '@/components/student/PomodoroTimer';
import ProductivityGraph from '@/components/student/ProductivityGraph';
import Rewards from '@/components/student/Rewards';
import Communication from '@/components/student/Communication';
import { motion } from 'framer-motion';

function StudentDashboard() {
  const { user, logout } = useAuth();
  const {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    attendance,
    markAttendance,
    addMissedClass,
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    completedTasks,
    attendancePercentage,
    attendanceStatus,
    classesNeeded,
    productivityData,
    rewards,
    messages,
    sendMessage
  } = useStudentData(user.uid);

  return (
    <>
      <Helmet>
        <title>Student Dashboard - EduTracker Pro</title>
        <meta name="description" content="Track your attendance, manage tasks, and boost productivity with your personalized student dashboard." />
      </Helmet>

      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gradient-radial from-gray-900 to-black">
        <StudentHeader user={user} logout={logout} />
        
        <StatsCards
          attendancePercentage={attendancePercentage}
          attendanceStatus={attendanceStatus}
          attendance={attendance}
          completedTasks={completedTasks}
          todos={todos}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AttendanceTracker
              markAttendance={markAttendance}
              addMissedClass={addMissedClass}
              attendanceStatus={attendanceStatus}
              classesNeeded={classesNeeded}
            />
            <TodoList
              todos={todos}
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              addTodo={addTodo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
            <Communication messages={messages} sendMessage={sendMessage} />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <PomodoroTimer
              timerState={timerState}
              startTimer={startTimer}
              pauseTimer={pauseTimer}
              resetTimer={resetTimer}
            />
            <ProductivityGraph productivityData={productivityData} />
            <Rewards rewards={rewards} />
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;