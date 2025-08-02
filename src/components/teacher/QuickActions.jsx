import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Calendar, UserCheck, BarChart3, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

function QuickActions() {
  const [loading, setLoading] = useState({});

  // Unified handler for actions
  const handleAction = (action) => {
    setLoading((prev) => ({ ...prev, [action]: true }));
    setTimeout(() => {
      setLoading((prev) => ({ ...prev, [action]: false }));
      switch (action) {
        case 'attendance':
          toast({ title: "🚧 Take attendance feature: support to Vinay for boost his confidence 🚀" });
          break;
        case 'report':
          toast({ title: "🚧 Generate report feature: support to Vinay for boost his confidence 🚀" });
          break;
        case 'notify':
          toast({ title: "🚧 Send notifications feature: support to Vinay for boost his confidence 🚀" });
          break;
        default:
          break;
      }
    }, 800); // Simulate async action
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-effect rounded-xl p-6"
      role="region"
      aria-label="Quick Actions"
    >
      <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
        <Calendar className="w-5 h-5 mr-2 text-purple-400" aria-hidden="true" />
        Quick Actions
      </h2>
      
      <div className="space-y-3">
        <Button 
          className="w-full justify-start bg-purple-600 hover:bg-purple-700"
          aria-label="Take Attendance"
          disabled={loading.attendance}
          onClick={() => handleAction('attendance')}
        >
          <UserCheck className="w-4 h-4 mr-2" aria-hidden="true" />
          {loading.attendance ? "Taking Attendance..." : "Take Attendance"}
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
          aria-label="Generate Report"
          disabled={loading.report}
          onClick={() => handleAction('report')}
        >
          <BarChart3 className="w-4 h-4 mr-2" aria-hidden="true" />
          {loading.report ? "Generating Report..." : "Generate Report"}
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-start border-white/20 text-white hover:bg-white/10"
          aria-label="Send Notifications"
          disabled={loading.notify}
          onClick={() => handleAction('notify')}
        >
          <Bell className="w-4 h-4 mr-2" aria-hidden="true" />
          {loading.notify ? "Sending..." : "Send Notifications"}
        </Button>
      </div>
    </motion.div>
  );
}

QuickActions.propTypes = {};

export default QuickActions;
