import { arrayMove } from '@dnd-kit/sortable';
import { type BoardData, type Task, type TaskPayload, type TaskStatus } from '../types/dashboard';
import { initialData } from './initialData';

const LOCAL_STORAGE_KEY = 'dashboard-kanban';

export const getBoard = (): BoardData => {
  try {
    const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      saveBoard(initialData);
      return initialData;
    }
    return JSON.parse(data) as BoardData;
  } catch (error) {
    console.error("Falha ao carregar dados do localStorage, restaurando para o padrão.", error);
    saveBoard(initialData);
    return initialData;
  }
};

export const saveBoard = (board: BoardData): void => {
  try {
    const data = JSON.stringify(board);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, data);
  } catch (error) {
    console.error("Falha ao salvar dados no localStorage.", error);
  }
};

export const addTask = (taskData: TaskPayload): BoardData => {
  const currentBoard = getBoard();

  const newTaskId = `task-${new Date().getTime()}`;
  const newTask: Task = {
    id: newTaskId,
    status: taskData.status,
    title: taskData.title,
    description: taskData.description,
    priority: taskData.priority,
  };

  const newTasks = { ...currentBoard.tasks, [newTaskId]: newTask };

  const columnToUpdate = { ...currentBoard.columns[taskData.status] };
  columnToUpdate.taskIds = [newTaskId, ...columnToUpdate.taskIds]; 

  const newColumns = { ...currentBoard.columns, [taskData.status]: columnToUpdate };

  const newBoard: BoardData = {
    ...currentBoard,
    tasks: newTasks,
    columns: newColumns,
  };

  saveBoard(newBoard);
  return newBoard;
};

export const updateTask = (
  taskIdToUpdate: string, 
  updatedData: Partial<Omit<Task, 'id'>>
): BoardData => {
  const currentBoard = getBoard();
  
  const taskToUpdate = currentBoard.tasks[taskIdToUpdate];
  if (!taskToUpdate) {
    console.error("Tarefa não encontrada para atualização.");
    return currentBoard;
  }

  const updatedTask = { ...taskToUpdate, ...updatedData };
  const newTasks = { ...currentBoard.tasks, [taskIdToUpdate]: updatedTask };

  let newColumns = { ...currentBoard.columns };

  const statusChanged = updatedData.status && updatedData.status !== taskToUpdate.status;

  if (statusChanged) {
    const oldColumnId = taskToUpdate.status;
    const newColumnId = updatedData.status!;

    const oldColumn = { ...newColumns[oldColumnId] };
    oldColumn.taskIds = oldColumn.taskIds.filter(id => id !== taskIdToUpdate);

    const newColumn = { ...newColumns[newColumnId] };
    newColumn.taskIds = [taskIdToUpdate, ...newColumn.taskIds];

    newColumns = {
      ...newColumns,
      [oldColumnId]: oldColumn,
      [newColumnId]: newColumn,
    };
  }
  
  const newBoard: BoardData = {
    ...currentBoard,
    tasks: newTasks,
    columns: newColumns,
  };

  saveBoard(newBoard);
  return newBoard;
};

export const deleteTask = (taskIdToDelete: string): BoardData => {
  const currentBoard = getBoard();

  const newTasks = { ...currentBoard.tasks };
  const newColumns = { ...currentBoard.columns };

  delete newTasks[taskIdToDelete];

  for (const columnId in newColumns) {
    const column = newColumns[columnId as TaskStatus];
    column.taskIds = column.taskIds.filter(id => id !== taskIdToDelete);
  }

  const newBoard: BoardData = {
    ...currentBoard,
    tasks: newTasks,
    columns: newColumns,
  };

  saveBoard(newBoard);

  return newBoard;
};

export const reorderTasks = (board: BoardData, activeId: string, overId: string): BoardData => {
  const startColumn = Object.values(board.columns).find(col => col.taskIds.includes(activeId));
  
  let endColumn = Object.values(board.columns).find(col => col.taskIds.includes(overId));
  if (!endColumn) {
    endColumn = board.columns[overId as TaskStatus];
  }

  if (!startColumn || !endColumn) {
    return board;
  }

  if (startColumn.id === endColumn.id) {
    const newtaskIds = arrayMove(
      startColumn.taskIds,
      startColumn.taskIds.indexOf(activeId),
      startColumn.taskIds.indexOf(overId) !== -1 ? startColumn.taskIds.indexOf(overId) : startColumn.taskIds.length -1
    );

    const newBoard = {
      ...board,
      columns: {
        ...board.columns,
        [startColumn.id]: { ...startColumn, taskIds: newtaskIds },
      },
    };
    saveBoard(newBoard);
    return newBoard;
  }


  const startTaskIds = startColumn.taskIds.filter(id => id !== activeId);
  
  const endTaskIds = [...endColumn.taskIds];
  const overIndex = endTaskIds.indexOf(overId);
  const newIndex = overIndex !== -1 ? overIndex : endTaskIds.length;
  endTaskIds.splice(newIndex, 0, activeId);

  const newBoard = {
    ...board,
    columns: {
      ...board.columns,
      [startColumn.id]: { ...startColumn, taskIds: startTaskIds },
      [endColumn.id]: { ...endColumn, taskIds: endTaskIds },
    },
  };

  saveBoard(newBoard);
  return newBoard;
};