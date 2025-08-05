import React, { useState } from 'react';
import { useAttendance } from '@/contexts/AttendanceContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function AttendanceDashboard() {
  const { requests, history, updateRequest } = useAttendance();
  const [tab, setTab] = useState('pending');

  const renderCard = (req) => (
    <motion.div
      key={req.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-xl p-4 flex items-center gap-4 mb-4 shadow-lg"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
        {req.avatar}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-white">{req.name} <span className="text-xs text-gray-400">({req.studentId})</span></div>
        <div className="text-gray-400 text-sm">{req.subject}</div>
        <div className="text-xs text-gray-500">{new Date(req.timestamp).toLocaleString()}</div>
      </div>
      {tab === 'pending' && (
        <div className="flex gap-2">
          <Button className="bg-green-600 hover:bg-green-700" onClick={() => updateRequest(req.id, 'accepted')}>Accept</Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => updateRequest(req.id, 'rejected')}>Reject</Button>
        </div>
      )}
      {tab === 'accepted' && <span className="text-green-400 font-bold">✅ Accepted</span>}
      {tab === 'history' && (
        <span className={`font-bold ${req.status === 'accepted' ? 'text-green-400' : 'text-red-400'}`}>
          {req.status === 'accepted' ? '✅ Present' : '❌ Rejected'}
        </span>
      )}
    </motion.div>
  );

  const filtered = tab === 'pending'
    ? requests.filter(r => r.status === 'pending')
    : tab === 'accepted'
      ? history.filter(r => r.status === 'accepted')
      : history;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex gap-4 mb-6">
        {['pending', 'accepted', 'history'].map(t => (
          <Button
            key={t}
            className={`rounded-full px-4 py-2 ${tab === t ? 'bg-blue-600 text-white' : 'bg-white/10 text-blue-300'}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </Button>
        ))}
      </div>
      <div>
        {filtered.length === 0 ? (
          <div className="text-gray-400 text-center py-8">No requests found.</div>
        ) : (
          filtered.map(renderCard)
        )}
      </div>
    </motion.div>
  );
}

export default AttendanceDashboard;