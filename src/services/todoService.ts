import { type Todo } from '../types/todo';

const LOCAL_STORAGE_KEY = 'todoListData-mui';

export const getTodos = (): Todo[] => {
  try {
    const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Falha ao carregar tarefas do localStorage.", error);
    return [];
  }
};


export const saveTodos = (todos: Todo[]): void => {
  try {
    const data = JSON.stringify(todos);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, data);
  } catch (error) {
    console.error("Falha ao salvar tarefas no localStorage.", error);
  }
};

export const clearCompletedTodos = (): Todo[] => {
  const currentTodos = getTodos();

  const activeTodos = currentTodos.filter(todo => !todo.completed);
  
  saveTodos(activeTodos);
  
  return activeTodos;
};