import { ListItem, ListItemIcon, Checkbox, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { type Todo } from '../../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const handleEdit = () => {
    const newText = prompt("Editar tarefa:", todo.text);
    if (newText && newText.trim() !== todo.text) {
      onEdit(todo.id, newText.trim());
    }
  };

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.completed}
          tabIndex={-1}
          disableRipple
          onChange={() => onToggle(todo.id)}
        />
      </ListItemIcon>
      <ListItemText 
        primary={todo.text} 
        sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }} 
      />
    </ListItem>
  );
};