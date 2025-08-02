
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  UserCheck,
  UserX,
  BarChart3,
  LogOut,
  User,
  Bell,
  Plus,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import TeacherHeader from '@/components/teacher/TeacherHeader';
import StatsCards from '@/components/teacher/StatsCards';
import StudentList from '@/components/teacher/StudentList';
import ClassAnalytics from '@/components/teacher/ClassAnalytics';
import QuickActions from '@/components/teacher/QuickActions';
import RecentActivity from '@/components/teacher/RecentActivity';

function TeacherDashboard() {
  const { user, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');

  // Mock student data - in real app, this would come from Firebase
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        name: 'Sudeeep',
        email: 'sudeeep@student.edu',
        class: 'Computer Science',
        attendance: { present: 18, total: 20 },
        productivity: 85,
        lastActive: '2 hours ago',
        avatar: 'AJ'
      },
      {
        id: 2,
        name: 'Bob Smith',
        email: 'bob@student.edu',
        class: 'Computer Science',
        attendance: { present: 14, total: 20 },
        productivity: 72,
        lastActive: '1 day ago',
        avatar: 'BS'
      },
      {
        id: 3,
        name: 'Vinay my',
        email: 'vvvinay5630@gmail.com',
        class: 'Mathematics',
        attendance: { present: 19, total: 20 },
        productivity: 92,
        lastActive: '30 minutes ago',
        avatar: 'CD'
      },
      {
        id: 4,
        name: 'Sathwik gowda ph',
        email: 'sathwikgowdaph@gmail.com',
        class: 'Physics',
        attendance: { present: 12, total: 20 },
        productivity: 68,
        lastActive: '3 hours ago',
        avatar: 'DW'
      },
      {
        id: 5,
        name: 'Emma Brown',
        email: 'emma@student.edu',
        class: 'Chemistry',
        attendance: { present: 17, total: 20 },
        productivity: 88,
        lastActive: '1 hour ago',
        avatar: 'EB'
      }
    ];
    setStudents(mockStudents);
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const totalStudents = students.length;
  const averageAttendance = students.reduce((acc, student) => 
    acc + (student.attendance.present / student.attendance.total) * 100, 0) / totalStudents;
  const averageProductivity = students.reduce((acc, student) => acc + student.productivity, 0) / totalStudents;
  const studentsAtRisk = students.filter(student => 
    (student.attendance.present / student.attendance.total) * 100 < 75).length;

  const classes = ['All Classes', ...new Set(students.map(s => s.class))];

  // Add student using user input
  const onAddStudent = () => {
    const name = prompt("Enter student name:");
    const email = prompt("Enter student email:");
    const studentClass = prompt("Enter student class:");
    if (!name || !email || !studentClass) return;

    const newStudent = {
      id: Date.now(),
      name,
      email,
      class: studentClass,
      attendance: { present: 0, total: 0 },
      productivity: 0,
      lastActive: 'Just now',
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    setStudents(prev => [...prev, newStudent]);
  };

  return (
    <>
      <Helmet>
        <title>Teacher Dashboard - EduTracker Pro</title>
        <meta name="description" content="Monitor student attendance, track productivity, and manage your classes with comprehensive analytics and insights." />
      </Helmet>

      <div className="min-h-screen p-4 md:p-6">
        <TeacherHeader user={user} logout={logout} />
        
        <StatsCards 
          totalStudents={totalStudents}
          averageAttendance={averageAttendance}
          averageProductivity={averageProductivity}
          studentsAtRisk={studentsAtRisk}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <StudentList 
              students={filteredStudents}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              classes={classes}
              onAddStudent={onAddStudent} // <-- Pass the function here
            />
          </div>

          <div className="space-y-8">
            <ClassAnalytics students={students} studentsAtRisk={studentsAtRisk} />
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
