import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function StudentHeader({ user, logout }) {
  const { toast } = useToast();

  const handleNotImplemented = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: "Stay tuned for updates!",
    });
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome, {user.name}!</h1>
        <p className="text-gray-400">Let's make today a productive one.</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="glass-effect" onClick={handleNotImplemented}>
          <Bell className="h-5 w-5 text-white" />
        </Button>
        <Button onClick={logout} className="glass-effect text-white hover:bg-red-500/50">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </motion.header>
  );
}

export default StudentHeader;