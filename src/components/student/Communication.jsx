import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

function Communication({ messages }) {
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
      description: "Your message was not sent.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-effect p-6 rounded-xl"
    >
      <h2 className="text-xl font-semibold text-white mb-4">Teacher Messages</h2>
      <div className="space-y-4 h-48 overflow-y-auto pr-2 mb-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              layout
              className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}
            >
              <div className={`max-w-xs p-3 rounded-lg ${msg.sender === 'You' ? 'bg-blue-600/50' : 'bg-gray-700/50'}`}>
                <p className="text-sm text-white">{msg.text}</p>
              </div>
              <span className="text-xs text-gray-500 mt-1">{msg.sender}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message to your teacher..."
          className="bg-gray-800/50 border-gray-700 text-white"
        />
        <Button type="submit" size="icon" className="bg-blue-500/80 hover:bg-blue-500 text-white">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  );
}

export default Communication;