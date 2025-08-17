import { type BoardData, type TaskStatus } from "../types/dashboard";
// --- DADOS DE TESTE (MOCK) ---
// Usaremos estes dados enquanto não integramos com a API

export const initialData: BoardData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Boas-vindas ao seu Kanban!', status: 'todo', description: 'Arraste este cartão para outra coluna.', priority: 'medium' },
    'task-2': { id: 'task-2', title: 'Criar uma nova tarefa', status: 'doing', description: 'Clique no botão "Nova Tarefa" no canto superior direito.', priority: 'high' },
    'task-3': { id: 'task-3', title: 'Conheça as prioridades', status: 'done', description: 'Os cartões têm cores para prioridade: alta, média e baixa.', priority: 'low' },
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'Pendente',
      taskIds: ['task-1'],
    },
    'doing': {
      id: 'doing',
      title: 'Em Progresso',
      taskIds: ['task-2'],
    },
    'done': {
      id: 'done',
      title: 'Concluída',
      taskIds: ['task-3'],
    },
  },
  columnOrder: ['todo', 'doing', 'done'] as TaskStatus[],
};