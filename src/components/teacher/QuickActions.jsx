
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, UserCheck, BarChart3, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-effect rounded-xl p-6"
    >
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-purple-400" />
        Quick Actions
      </h2>
      
      <div className="space-y-3">
        <Button 
          className="w-full justify-start bg-purple-600 hover:bg-purple-700"
          onClick={() => toast({ title: "🚧 Take attendance feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
        >
          <UserCheck className="w-4 h-4 mr-2" />
          Take Attendance
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
          onClick={() => toast({ title: "🚧 Generate report feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
          onClick={() => toast({ title: "🚧 Send notifications feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
        >
          <Bell className="w-4 h-4 mr-2" />
          Send Notifications
        </Button>
      </div>
    </motion.div>
  );
}

export default QuickActions;
