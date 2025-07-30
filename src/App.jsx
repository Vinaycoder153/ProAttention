
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import StudentDashboard from '@/pages/StudentDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';

function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'student' ? '/student' : '/teacher'} replace />;
  }
  
  return children;
}

function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400"></div>
      </div>
    );
  }
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to={user.role === 'student' ? '/student' : '/teacher'} replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to={user.role === 'student' ? '/student' : '/teacher'} replace /> : <Register />} 
      />
      <Route 
        path="/student" 
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teacher" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/" 
        element={
          user ? 
            <Navigate to={user.role === 'student' ? '/student' : '/teacher'} replace /> : 
            <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Helmet>
          <title>EduTracker Pro - Next-Gen Productivity & Attendance System</title>
          <meta name="description" content="Advanced productivity and attendance tracking system for students and teachers with real-time analytics, Pomodoro timer, and smart insights." />
        </Helmet>
        <div className="min-h-screen">
          <AppRoutes />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
