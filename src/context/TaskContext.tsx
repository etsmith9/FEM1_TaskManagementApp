import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Task, TaskContextType, TaskFormData } from '../types';
import { useAuth0 } from '@auth0/auth0-react';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth0();

  useEffect(() => {
    if (user?.sub) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const mockTasks: Task[] = [];
      setTasks(mockTasks);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData: TaskFormData) => {
    try {
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: user?.sub || '',
      };
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const updateTask = async (id: string, taskData: Partial<TaskFormData>) => {
    try {
      setTasks(tasks.map(task => 
        task.id === id 
          ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
          : task
      ));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      getTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};