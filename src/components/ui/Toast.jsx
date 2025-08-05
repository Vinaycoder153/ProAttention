import React, { useEffect } from 'react';

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;
  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg
      ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
      animate-fade-in`}>
      {toast.message}
    </div>
  );
}

export default Toast;