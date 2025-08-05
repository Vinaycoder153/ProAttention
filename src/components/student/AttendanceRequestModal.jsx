import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAttendance } from '@/contexts/AttendanceContext';

function AttendanceRequestModal({ open, onClose }) {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const { sendRequest } = useAttendance();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && studentId && subject) {
      const success = sendRequest({
        id: Date.now(),
        name,
        studentId,
        subject,
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
      });
      if (success) onClose();
    }
  };

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <form
        onSubmit={handleSubmit}
        className="glass-effect rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-white mb-2">Send Attendance Request</h2>
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <Input value={studentId} onChange={e => setStudentId(e.target.value)} placeholder="Student ID" required />
        <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject" required />
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Send</Button>
        </div>
      </form>
    </motion.div>
  );
}

export default AttendanceRequestModal;