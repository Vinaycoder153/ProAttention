import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

function TodoList({ todos, newTodo, setNewTodo, addTodo, toggleTodo, deleteTodo }) {
  const handleAddTodo = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-effect p-6 rounded-xl"
    >
      <h2 className="text-xl font-semibold text-white mb-4">To-Do List</h2>
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="bg-gray-800/50 border-gray-700 text-white"
        />
        <Button type="submit" className="bg-blue-500/80 hover:bg-blue-500 text-white">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
      <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
              className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => toggleTodo(todo.id)}
                />
                <label
                  htmlFor={`todo-${todo.id}`}
                  className={`text-sm font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-white'}`}
                >
                  {todo.text}
                </label>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo.id)}>
                <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-400" />
              </Button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.div>
  );
}

export default TodoList;