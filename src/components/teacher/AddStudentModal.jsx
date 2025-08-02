import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function AddStudentModal({ open, onClose, onSubmit, classes }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentClass, setStudentClass] = useState(classes[0] || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && studentClass) {
      onSubmit({ name, email, class: studentClass });
      setName('');
      setEmail('');
      setStudentClass(classes[0] || '');
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
        <h2 className="text-xl font-semibold text-white mb-2">Add New Student</h2>
        <Input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Student Name"
          className="bg-gray-800/50 border-gray-700 text-white"
          required
        />
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Student Email"
          className="bg-gray-800/50 border-gray-700 text-white"
          required
        />
        <select
          value={studentClass}
          onChange={e => setStudentClass(e.target.value)}
          className="px-4 py-2 rounded-lg glass-effect border border-white/20 text-white bg-transparent w-full"
          required
        >
          {classes.map(cls => (
            <option key={cls} value={cls} className="bg-gray-800">{cls}</option>
          ))}
        </select>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Add</Button>
        </div>
      </form>
    </motion.div>
  );
}

export default AddStudentModal;