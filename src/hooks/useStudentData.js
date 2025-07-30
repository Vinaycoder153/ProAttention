
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

function useStudentData(userId) {
  const { toast } = useToast();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [attendance, setAttendance] = useState({ present: 0, total: 0 });
  const [timerState, setTimerState] = useState({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    isBreak: false
  });
  const [completedTasks, setCompletedTasks] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem(`todos_${userId}`);
    const savedAttendance = localStorage.getItem(`attendance_${userId}`);
    const savedCompletedTasks = localStorage.getItem(`completed_tasks_${userId}`);
    
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance));
    if (savedCompletedTasks) setCompletedTasks(parseInt(savedCompletedTasks, 10) || 0);

    const mockRewards = [
      { id: 1, title: 'Perfect Week', icon: '🌟', unlocked: true, date: '2025-07-28' },
      { id: 2, title: 'Productivity Pro', icon: '🚀', unlocked: false },
      { id: 3, title: 'Focus Master', icon: '🧠', unlocked: true, date: '2025-07-25' },
    ];
    setRewards(mockRewards);

    const mockMessages = [
      { id: 1, sender: 'Prof. Smith', text: "Great work on the last assignment!", timestamp: "2025-07-29T10:00:00Z" },
      { id: 2, sender: 'You', text: "Thank you! I'm working on the next one.", timestamp: "2025-07-29T10:05:00Z" },
    ];
    setMessages(mockMessages);

  }, [userId]);

  useEffect(() => {
    localStorage.setItem(`todos_${userId}`, JSON.stringify(todos));
  }, [todos, userId]);

  useEffect(() => {
    localStorage.setItem(`attendance_${userId}`, JSON.stringify(attendance));
  }, [attendance, userId]);

  useEffect(() => {
    localStorage.setItem(`completed_tasks_${userId}`, completedTasks.toString());
  }, [completedTasks, userId]);

  useEffect(() => {
    let interval = null;
    if (timerState.isRunning) {
      interval = setInterval(() => {
        setTimerState(prev => {
          if (prev.seconds === 0) {
            if (prev.minutes === 0) {
              clearInterval(interval);
              const isBreak = !prev.isBreak;
              toast({
                title: isBreak ? "Pomodoro completed! 🎉" : "Break time's up! 🎯",
                description: isBreak ? "Take a 5-minute break!" : "Time to get back to work!",
              });
              return {
                minutes: isBreak ? 5 : 25,
                seconds: 0,
                isRunning: false,
                isBreak: isBreak
              };
            }
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
          }
          return { ...prev, seconds: prev.seconds - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.isBreak, toast]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
      toast({ title: "Task added! ✅", description: "Keep up the great work!" });
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updated = { ...todo, completed: !todo.completed };
        if (updated.completed && !todo.completed) {
          setCompletedTasks(prev => prev + 1);
          toast({ title: "Task completed! 🎉" });
        } else if (!updated.completed && todo.completed) {
          setCompletedTasks(prev => Math.max(0, prev - 1));
        }
        return updated;
      }
      return todo;
    }));
  };

  const deleteTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    if (todo && todo.completed) {
      setCompletedTasks(prev => Math.max(0, prev - 1));
    }
    setTodos(todos.filter(todo => todo.id !== id));
    toast({ title: "Task removed.", variant: "destructive" });
  };

  const markAttendance = () => {
    setAttendance(prev => ({ present: prev.present + 1, total: prev.total + 1 }));
    toast({ title: "Attendance marked! 📚" });
  };

  const addMissedClass = () => {
    setAttendance(prev => ({ ...prev, total: prev.total + 1 }));
    toast({ title: "Class added to record" });
  };

  const startTimer = () => setTimerState(prev => ({ ...prev, isRunning: true }));
  const pauseTimer = () => setTimerState(prev => ({ ...prev, isRunning: false }));
  const resetTimer = () => setTimerState({ minutes: 25, seconds: 0, isRunning: false, isBreak: false });

  const attendancePercentage = attendance.total > 0 ? (attendance.present / attendance.total) * 100 : 0;
  const attendanceStatus = attendancePercentage >= 75 ? 'good' : 'warning';
  const classesNeeded = attendancePercentage < 75 ? Math.max(0, Math.ceil((0.75 * attendance.total - attendance.present) / 0.25)) : 0;

  const productivityData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 6 },
    { name: 'Wed', tasks: 3 },
    { name: 'Thu', tasks: 8 },
    { name: 'Fri', tasks: 5 },
    { name: 'Sat', tasks: 7 },
    { name: 'Sun', tasks: 2 },
  ];

  const sendMessage = (text) => {
    if(text.trim()) {
      setMessages(prev => [...prev, { id: Date.now(), sender: 'You', text: text.trim(), timestamp: new Date().toISOString() }]);
      toast({ title: "Message sent!"});
    }
  }

  return {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    toggleTodo,
    deleteTodo,
    attendance,
    markAttendance,
    addMissedClass,
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    completedTasks,
    attendancePercentage,
    attendanceStatus,
    classesNeeded,
    productivityData,
    rewards,
    messages,
    sendMessage
  };
}

export default useStudentData;
