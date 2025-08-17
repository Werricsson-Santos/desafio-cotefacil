import { useState, useEffect } from 'react';
import { Container, Typography, List, Paper, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useHeader } from '../../contexts/HeaderContext';
import * as todoService from '../../services/todoService';
import { type Todo } from '../../types/todo';
import { TodoForm } from '../../components/TodoList/TodoForm';
import { TodoItem } from '../../components/TodoList/TodoItem';

export const TodoList: React.FC = () => {
  const { setTitle, setActions } = useHeader();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const initialTodos = todoService.getTodos();
    const sortedTodos = initialTodos.sort((a, b) => Number(a.completed) - Number(b.completed));
    setTodos(sortedTodos);
    
    setTitle('Lista de Tarefas');
    setActions(null); 
    return () => setTitle('Página Inicial');
  }, [setTitle, setActions]);

  const updateAndSaveTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    todoService.saveTodos(newTodos);
  };

  const handleAddTask = (text: string) => {
    const newTodo: Todo = {
      id: new Date().toISOString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    updateAndSaveTodos([newTodo, ...todos]);
  };

  const handleToggleTodo = (id: string) => {
    const toggledTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    const sortedTodos = toggledTodos.sort((a, b) => {
      return +a.completed - +b.completed;
    });

    updateAndSaveTodos(sortedTodos);
  };

  const handleDeleteTodo = (id: string) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    updateAndSaveTodos(newTodos);
  };

  const handleEditTodo = (id: string, newText: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    );
    updateAndSaveTodos(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = todoService.clearCompletedTodos();
    setTodos(newTodos);
    setConfirmOpen(false);
  };

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Minhas Tarefas
        </Typography>
        <TodoForm onAddTask={handleAddTask} />
        <List>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
            />
          ))}
        </List>
        
        {hasCompletedTodos && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="text"
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={() => setConfirmOpen(true)}
            >
              Limpar Concluídas
            </Button>
          </Box>
        )}
      </Paper>
      
      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja remover todas as tarefas concluídas? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={handleClearCompleted} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};