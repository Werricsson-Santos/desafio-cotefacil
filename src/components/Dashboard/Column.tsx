import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Paper, Typography, Stack, Box, Chip } from '@mui/material';
import { type Column as ColumnType, type Task as TaskType, type TaskStatus, type Task } from '../../types/dashboard';
import { TaskCard } from './TaskCard';

const columnColors: { [key in TaskStatus]: string } = {
  'todo': 'rgba(144, 152, 162, 0.15)',
  'doing': 'rgba(255, 193, 7, 0.453)',
  'done': 'rgba(102, 187, 106, 0.507)',
};

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  onUpdateTask: (taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => void;
  onDeleteTask: (taskId: string) => void;
}

export const Column: React.FC<ColumnProps> = ({ column, tasks, onUpdateTask, onDeleteTask }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <Paper
      elevation={2}
      sx={{
        width: 320,
        flexShrink: 0,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
      }}
    >
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center" 
        sx={{ 
          p: 2,
          backgroundColor: columnColors[column.id],
          borderTopLeftRadius: 'inherit',
          borderTopRightRadius: 'inherit',
        }}
      >
        <Typography variant="h6" component="div">{column.title}</Typography>
        <Chip 
          label={tasks.length} 
          size="small" 
          sx={{ color: 'white', bgcolor: 'rgba(0, 0, 0, 0.2)' }}
        />
      </Stack>
      
      <Box 
        ref={setNodeRef} 
        sx={{ 
          p: 1, 
          flexGrow: 1, 
          overflowY: 'auto' 
        }}
      >
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <Stack spacing={1}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId={column.id}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
              />
            ))}
          </Stack>
        </SortableContext>
      </Box>
    </Paper>
  );
};