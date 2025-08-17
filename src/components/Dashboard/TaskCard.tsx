import { type FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, Typography, Chip, Stack, Button, CardActions } from '@mui/material';
import { type Task, type TaskPriority, type TaskStatus } from '../../types/dashboard';

interface TaskCardProps {
  task: Task;
  columnId: TaskStatus;
  onUpdate?: (taskId: string, updatedData: Partial<Omit<Task, 'id'>>) => void;
  onDelete?: (taskId: string) => void;
  isOverlay?: boolean;
}

const priorityColors: { [key in TaskPriority]: 'error' | 'warning' | 'info' } = {
  high: 'error', medium: 'warning', low: 'info',
};

export const TaskCard: FC<TaskCardProps> = ({ task, columnId, onUpdate, onDelete, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition, visibility: isDragging ? 'hidden' : 'visible' };

  const actionButtonProps: { text: string; color: 'primary' | 'success' | 'secondary'; show: boolean } = {
    text: 'Iniciar', color: 'primary', show: true,
  };

  if (columnId === 'doing') {
    actionButtonProps.text = 'Concluir';
    actionButtonProps.color = 'success';
  } else if (columnId === 'done') {
    actionButtonProps.show = false; // Esconde o botão na coluna "Concluído" -> Não foi criado uma página para arquivar as tarefas fetias, vão ficar todas nas colunas de concluídas, o usuário pode excluir
  }

  const handleMoveTask = () => {
    if (columnId === 'todo' && onUpdate) onUpdate(task.id, { status: 'doing' });
    else if (columnId === 'doing' && onUpdate) onUpdate(task.id, { status: 'done' });
    else if (columnId === 'done' && onDelete) onDelete(task.id);
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}
      sx={(theme) => ({
        touchAction: 'none', cursor: isOverlay ? 'grabbing' : 'grab',
        transition: theme.transitions.create(['transform', 'box-shadow']),
        ...(isOverlay && { transform: 'scale(1.05)', boxShadow: theme.shadows[8], opacity: 0.9, }),
      })}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{task.title}</Typography>
          <Chip label={task.priority} color={priorityColors[task.priority]} size="small" sx={{ textTransform: 'capitalize' }}/>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>{task.description}</Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {actionButtonProps.show && (
          <Button size="small" variant="contained" color={actionButtonProps.color} onClick={handleMoveTask}>
            {actionButtonProps.text}
          </Button>
        )}
        <Button size="small" color="error" onClick={() => onDelete?.(task.id)}>Excluir</Button>
      </CardActions>
    </Card>
  );
};