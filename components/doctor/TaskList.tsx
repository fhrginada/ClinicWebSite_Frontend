'use client';

import { useState } from 'react';
import { CheckSquare2, Plus } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  time: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  {
    id: '1',
    text: 'Call Maria Rodriguez about test results',
    time: '10:30 AM',
    completed: false,
  },
  {
    id: '2',
    text: "Review John Smith's MRI scan",
    time: '10:30 AM',
    completed: false,
  },
];

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addNewTask = () => {
    // Placeholder - in real app, this would open a modal or form
    console.log('Add new task clicked');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CheckSquare2 size={20} className="text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All &gt;
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <p className={`text-gray-900 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.text}
              </p>
              <p className="text-sm text-gray-500 mt-1">{task.time}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addNewTask}
        className="w-full bg-white border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={18} />
        Add New Task
      </button>
    </div>
  );
}

