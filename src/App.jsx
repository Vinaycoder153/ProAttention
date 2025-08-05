import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AttendanceProvider } from '@/contexts/AttendanceContext';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import StudentDashboard from '@/pages/StudentDashboard';
import TeacherDashboard from '@/pages/TeacherDashboard';

// Optimized loading spinner component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 shadow-lg"></div>
  </div>
);

// Improved ProtectedRoute with better type checking
function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={`/${user.role}`} replace />;
  }
  
  return children;
}

// Optimized routing logic
function AppRoutes() {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to={`/${user.role}`} replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to={`/${user.role}`} replace /> : <Register />} 
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
            <Navigate to={`/${user.role}`} replace /> : 
            <Navigate to="/login" replace />
        } 
      />
    </Routes>
  );
}

// Main App component with consistent styling
function App() {
  return (
    <AuthProvider>
      <Router>
        <AttendanceProvider>
          <Helmet>
            <title>EduTracker Pro - Next-Gen Productivity & Attendance System</title>
            <meta 
              name="description" 
              content="Advanced productivity and attendance tracking system for students and teachers with real-time analytics, Pomodoro timer, and smart insights." 
            />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#1a1a2e" />
          </Helmet>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white antialiased">
            <AppRoutes />
            <Toaster position="top-center" />
          </div>
        </AttendanceProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
