export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface Auth0User {
  email?: string;
  email_verified?: boolean;
  name?: string;
  nickname?: string;
  picture?: string;
  sub?: string;
  updated_at?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: Task['status'];
  priority: Task['priority'];
  dueDate: string;
}

export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: TaskFormData) => Promise<void>;
  updateTask: (id: string, task: Partial<TaskFormData>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTask: (id: string) => Task | undefined;
} 