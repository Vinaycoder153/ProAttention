import React, { createContext, useContext, useState } from 'react';

const AttendanceContext = createContext();

export function AttendanceProvider({ children }) {
  const [requests, setRequests] = useState([]);
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);

  // Prevent duplicate requests within 24h
  const canRequestAttendance = (studentId, subject) => {
    const now = Date.now();
    return !requests.some(
      r => r.studentId === studentId && r.subject === subject && now - r.timestamp < 86400000
    );
  };

  const sendRequest = (req) => {
    if (!canRequestAttendance(req.studentId, req.subject)) {
      setToast({ type: 'error', message: 'Duplicate request within 24 hours.' });
      return false;
    }
    setRequests(prev => [...prev, { ...req, status: 'pending', timestamp: Date.now() }]);
    setToast({ type: 'success', message: 'Attendance request sent!' });
    return true;
  };

  const updateRequest = (id, status) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, status } : r)
    );
    if (status === 'accepted') {
      setToast({ type: 'success', message: 'Attendance accepted!' });
    } else if (status === 'rejected') {
      setToast({ type: 'error', message: 'Attendance rejected.' });
    }
    setHistory(prev => [
      ...prev,
      { ...requests.find(r => r.id === id), status, confirmedAt: Date.now() }
    ]);
    setRequests(prev => prev.filter(r => r.id !== id));
  };

  return (
    <AttendanceContext.Provider value={{
      requests, history, sendRequest, updateRequest, toast, setToast
    }}>
      {children}
    </AttendanceContext.Provider>
  );
}

export const useAttendance = () => useContext(AttendanceContext);