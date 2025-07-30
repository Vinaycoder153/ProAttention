
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import StudentCard from '@/components/teacher/StudentCard';

function StudentList({ 
  students, 
  searchTerm, 
  setSearchTerm, 
  selectedClass, 
  setSelectedClass, 
  classes 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-effect rounded-xl p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-400" />
          Student Overview
        </h2>
        <Button
          onClick={() => toast({ title: "🚧 Add student feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students..."
            className="pl-10 glass-effect border-white/20 text-white placeholder-gray-400"
          />
        </div>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="px-4 py-2 rounded-lg glass-effect border border-white/20 text-white bg-transparent"
        >
          {classes.map(cls => (
            <option key={cls} value={cls} className="bg-gray-800">{cls}</option>
          ))}
        </select>
      </div>

      {/* Student Cards */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </motion.div>
  );
}

export default StudentList;
