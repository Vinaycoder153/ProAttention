import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

function PomodoroTimer({ timerState, startTimer, pauseTimer, resetTimer }) {
  const { minutes, seconds, isRunning, isBreak } = timerState;

  const timerProgress = isBreak
    ? ((300 - (minutes * 60 + seconds)) / 300) * 100
    : ((1500 - (minutes * 60 + seconds)) / 1500) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-effect p-6 rounded-xl flex flex-col items-center"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        {isBreak ? 'Break Time' : 'Pomodoro Timer'}
      </h2>
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-700"
            strokeWidth="7"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <motion.circle
            className={isBreak ? "text-green-400" : "text-blue-400"}
            strokeWidth="7"
            strokeDasharray="283"
            strokeDashoffset={283 - (timerProgress / 100) * 283}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (timerProgress / 100) * 283 }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </svg>
        <div className="absolute text-4xl font-bold text-white">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        {isRunning ? (
          <Button onClick={pauseTimer} size="icon" className="w-12 h-12 rounded-full bg-yellow-500/80 hover:bg-yellow-500">
            <Pause className="h-6 w-6 text-white" />
          </Button>
        ) : (
          <Button onClick={startTimer} size="icon" className="w-12 h-12 rounded-full bg-green-500/80 hover:bg-green-500">
            <Play className="h-6 w-6 text-white" />
          </Button>
        )}
        <Button onClick={resetTimer} size="icon" variant="ghost" className="w-12 h-12 rounded-full glass-effect-inner">
          <RotateCcw className="h-6 w-6 text-white" />
        </Button>
      </div>
    </motion.div>
  );
}

export default PomodoroTimer;