import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lock } from 'lucide-react';

function Rewards({ rewards }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-effect p-6 rounded-xl"
    >
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Award className="w-5 h-5 mr-2 text-yellow-400" />
        Your Rewards
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {rewards.map(reward => (
          <motion.div
            key={reward.id}
            className={`flex flex-col items-center justify-center p-3 rounded-lg ${reward.unlocked ? 'bg-yellow-500/20' : 'bg-gray-800/50'}`}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-4xl ${reward.unlocked ? '' : 'opacity-40'}`}>
              {reward.unlocked ? reward.icon : <Lock />}
            </div>
            <p className={`text-xs mt-2 text-center ${reward.unlocked ? 'text-yellow-300' : 'text-gray-500'}`}>
              {reward.title}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Rewards;