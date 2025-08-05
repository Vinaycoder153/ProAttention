import React, { useState, useEffect } from 'react';

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-white text-lg font-mono mb-4 text-center">
      {now.toLocaleTimeString()} | {now.toLocaleDateString()}
    </div>
  );
}

export default Clock;