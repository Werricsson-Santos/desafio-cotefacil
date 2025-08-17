import { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay, 
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Box, CircularProgress, Stack } from '@mui/material';


import { getBoard, reorderTasks, updateTask, deleteTask, addTask } from '../../services/dashService';
import { CreateTaskForm } from '../../components/Dashboard/CreateTaskForm';
import { Column } from '../../components/Dashboard/Column';
import { type BoardData, type Task, type TaskPayload, type TaskStatus } from '../../types/dashboard';
import { TaskCard } from '../../components/Dashboard/TaskCard';
import { useHeader } from '../../contexts/HeaderContext';

export const Dashboard: React.FC = () => {
  const [board, setBoard] = useState<BoardData | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<TaskStatus | null>(null);
  const { setTitle, setActions } = useHeader();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    const boardData = getBoard();
    setBoard(boardData);
  }, []);

  const handleAddTask = useCallback((taskData: TaskPayload) => {
    const newBoard = addTask(taskData);
    setBoard(newBoard);
  }, []);

  const handleUpdateTask = useCallback((taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => {
    const newBoard = updateTask(taskId, updatedData);
    setBoard(newBoard);
  }, []);

  const handleDeleteTask = useCallback((taskIdToDelete: string) => {
    const newBoard = deleteTask(taskIdToDelete);
    setBoard(newBoard);
  }, []);

  useEffect(() => {
    setTitle('Dashboard Kanban');
    setActions(<CreateTaskForm onTaskCreate={handleAddTask} />);
    return () => {
      setTitle('');
      setActions(null);
    };
  }, [setTitle, setActions, handleAddTask]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;
    const task = board?.tasks[taskId];
    
    const column = Object.values(board?.columns || {}).find(col => col.taskIds.includes(taskId));

    if (task && column) {
      setActiveTask(task);
      setActiveColumnId(column.id as TaskStatus);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);
    setActiveColumnId(null);

    const { active, over } = event;
    if (!over || !board || active.id === over.id) return;
    const newBoard = reorderTasks(board, active.id as string, over.id as string);
    setBoard(newBoard);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
    setActiveColumnId(null);
  };

  if (!board) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress /></Box>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <Box component="main" sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{
            p: { xs: 1, sm: 2, md: 3 },
            margin: 'auto',
            minHeight: { md: '100%' },
            alignItems: { xs: 'center', md: 'stretch' },
            justifyContent: 'center'
          }}
        >
          {board.columnOrder.map((columnId) => {
            const column = board.columns[columnId as TaskStatus];
            const tasks = column.taskIds.map((taskId) => board.tasks[taskId]).filter(Boolean);
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={handleDeleteTask}
              />
            );
          })}
        </Stack>
      </Box>
      <DragOverlay>
        {(activeTask && activeColumnId) ? (
          <TaskCard task={activeTask} columnId={activeColumnId} isOverlay/> 
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};