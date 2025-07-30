
import React from 'react';
import { motion } from 'framer-motion';
import { Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

function TeacherHeader({ user, logout }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold gradient-text">Welcome, Professor {user.name}! 👨‍🏫</h1>
        <p className="text-gray-300 mt-1">Monitor and guide your students' progress</p>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="glass-effect border-white/20 text-white hover:bg-white/10"
          onClick={() => toast({ title: "🚧 Notifications feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
        >
          <Bell className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="glass-effect border-white/20 text-white hover:bg-white/10"
          onClick={() => toast({ title: "🚧 Profile feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
        >
          <User className="w-5 h-5" />
        </Button>
        <Button
          onClick={logout}
          variant="outline"
          className="glass-effect border-white/20 text-white hover:bg-white/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </motion.div>
  );
}

export default TeacherHeader;
