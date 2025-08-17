import { useState, useEffect, useCallback } from 'react';

import { Grid, Box, CircularProgress } from '@mui/material';

import { Column } from './Column';
import { getBoard, updateTask, deleteTask } from '../../services/dashService';
import { type BoardData, type Task, type TaskStatus } from '../../types/dashboard';

export const TaskBoard: React.FC = () => {
  const [board, setBoard] = useState<BoardData | null>(null);

  useEffect(() => {
    const boardData = getBoard();
    setBoard(boardData);
  }, []);

  const handleUpdateTask = useCallback((taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => {
    const newBoard = updateTask(taskId, updatedData);
    setBoard(newBoard);
  }, []);

  const handleDeleteTask = useCallback((taskIdToDelete: string) => {
    const newBoard = deleteTask(taskIdToDelete);
    setBoard(newBoard);
  }, []);

  if (!board) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', overflowX: 'auto', p: 2 }}>
      <Grid container spacing={3} sx={{ minWidth: '64rem' }}>
        
        {board.columnOrder.map((columnId) => {
          const column = board.columns[columnId as TaskStatus];
          const tasks = column.taskIds.map((taskId) => board.tasks[taskId]).filter(Boolean);

          return (
            <Grid size={{ xs: 12, md: 4 }} key={column.id}>
              <Column
                column={column}
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            </Grid>
          );
        })}

      </Grid>
    </Box>
  );
}