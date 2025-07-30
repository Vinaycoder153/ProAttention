import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

function AttendanceTracker({ markAttendance, addMissedClass, attendanceStatus, classesNeeded }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-effect p-6 rounded-xl"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Attendance Tracker</h2>
      <div className="flex items-center justify-center gap-4 mb-4">
        <Button onClick={markAttendance} className="bg-green-500/80 hover:bg-green-500 text-white">
          <Plus className="mr-2 h-4 w-4" /> Attended
        </Button>
        <Button onClick={addMissedClass} className="bg-red-500/80 hover:bg-red-500 text-white">
          <Minus className="mr-2 h-4 w-4" /> Missed
        </Button>
      </div>
      {attendanceStatus === 'warning' && (
        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center">
          <Info className="h-5 w-5 text-yellow-400 mr-3 shrink-0" />
          <p className="text-yellow-300 text-sm">
            <strong>AI Tip:</strong> You need to attend {classesNeeded} more class(es) to reach the 75% eligibility criteria. Keep going!
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default AttendanceTracker;