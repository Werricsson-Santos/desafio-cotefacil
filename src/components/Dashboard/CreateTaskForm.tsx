import { useState, type FormEventHandler  } from "react";
import { z } from "zod";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Stack,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateTaskSchema } from "../../types/dashboard";

interface CreateTaskFormProps {
  onTaskCreate: (taskData: z.infer<typeof CreateTaskSchema>) => void;
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onTaskCreate }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);

    const taskPayload = {
      title: formData.get("title"),
      description: formData.get("description"),
      status: formData.get("status"),
      priority: formData.get("priority"),
    };

    try {
      const taskData = CreateTaskSchema.parse(taskPayload);

      onTaskCreate(taskData);
      
      ev.currentTarget.reset();
      handleClose();

    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Erros de validação:", error.format());
        alert("Por favor, preencha todos os campos corretamente.");
      }
    }
  };

  return (
    <>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
        Nova Tarefa
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleSubmit,
          },
        }}
      >
        <DialogTitle>Nova Tarefa</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Adicione novas tarefas ao quadro preenchendo os campos abaixo.
          </DialogContentText>
          
          <Stack spacing={2}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Título"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              margin="dense"
              id="description"
              name="description"
              label="Descrição"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />

            <Stack direction="row" spacing={4} sx={{ pt: 1 }}>
              <FormControl>
                <FormLabel>Situação</FormLabel>
                <RadioGroup row name="status" defaultValue="todo">
                  <FormControlLabel value="todo" control={<Radio />} label={<Chip label="Para Fazer" size="small" />} />
                  <FormControlLabel value="doing" control={<Radio />} label={<Chip label="Em Progresso" color="warning" size="small" />} />
                  <FormControlLabel value="done" control={<Radio />} label={<Chip label="Concluído" color="success" size="small" />} />
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Prioridade</FormLabel>
                <RadioGroup row name="priority" defaultValue="low">
                  <FormControlLabel value="low" control={<Radio />} label={<Chip label="Baixa" color="info" size="small" />} />
                  <FormControlLabel value="medium" control={<Radio />} label={<Chip label="Média" color="warning" size="small" />} />
                  <FormControlLabel value="high" control={<Radio />} label={<Chip label="Alta" color="error" size="small" />} />
                </RadioGroup>
              </FormControl>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Criar Tarefa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};