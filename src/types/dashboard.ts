import { z } from 'zod';

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string(), 
  status: z.enum(['todo', 'doing', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
});

export type TaskPayload = z.infer<typeof CreateTaskSchema>;

export type TaskStatus = 'todo' | 'doing' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  priority: TaskPriority;
}

export interface Column {
  id: TaskStatus;
  title: string;
  taskIds: string[]; 
}

export interface BoardData {
  tasks: { [taskId: string]: Task };
  columns: { [columnId in TaskStatus]: Column };
  columnOrder: TaskStatus[]; 
}