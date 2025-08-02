import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext';
import TeacherHeader from '@/components/teacher/TeacherHeader';
import StatsCards from '@/components/teacher/StatsCards';
import StudentList from '@/components/teacher/StudentList';
import ClassAnalytics from '@/components/teacher/ClassAnalytics';
import QuickActions from '@/components/teacher/QuickActions';
import RecentActivity from '@/components/teacher/RecentActivity';
import AddStudentModal from '@/components/teacher/AddStudentModal';
import { addStudentToDB } from '@/lib/db';

function TeacherDashboard() {
  const { user, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');
  const [showAddModal, setShowAddModal] = useState(false);

  // Load mock student data on mount
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

  // Filter students by search and class
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  // Stats calculations
  const totalStudents = students.length;
  const averageAttendance = totalStudents
    ? students.reduce((acc, student) => acc + (student.attendance.present / student.attendance.total) * 100, 0) / totalStudents
    : 0;
  const averageProductivity = totalStudents
    ? students.reduce((acc, student) => acc + student.productivity, 0) / totalStudents
    : 0;
  const studentsAtRisk = students.filter(student =>
    (student.attendance.present / student.attendance.total) * 100 < 75
  ).length;

  // Classes for filter dropdown
  const classes = ['All Classes', ...new Set(students.map(s => s.class))];

  // Show modal to add student
  const onAddStudent = () => setShowAddModal(true);

  // Handle adding a new student from modal
  const handleAddStudent = async (studentData) => {
    const newStudent = {
      id: Date.now(),
      ...studentData,
      attendance: { present: 0, total: 0 },
      productivity: 0,
      lastActive: 'Just now',
      avatar: studentData.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    try {
      await addStudentToDB(newStudent);
      setStudents(prev => [...prev, newStudent]);
      setShowAddModal(false);
    } catch (err) {
      // Optionally show error toast here
      console.error('Failed to add student:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Teacher Dashboard - EduTracker Pro</title>
        <meta name="description" content="Monitor student attendance, track productivity, and manage your classes with comprehensive analytics and insights." />
      </Helmet>

      <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
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
              onAddStudent={onAddStudent}
            />
          </div>
          <div className="space-y-8">
            <ClassAnalytics students={students} studentsAtRisk={studentsAtRisk} />
            <QuickActions />
            <RecentActivity />
          </div>
        </div>
        <AddStudentModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddStudent}
          classes={classes.filter(c => c !== 'All Classes')}
        />
      </div>
    </>
  );
}

export default TeacherDashboard;
