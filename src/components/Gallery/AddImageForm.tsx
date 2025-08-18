import { useState, useRef } from 'react';
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, Stack, Typography,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import FileUploadIcon from '@mui/icons-material/FileUpload';

interface AddImageFormProps {
  onAddImage: (imageDataUrl: string, description: string) => void;
}

export const AddImageForm: React.FC<AddImageFormProps> = ({ onAddImage }) => {
  const [open, setOpen] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('Nenhum arquivo selecionado');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    setOpen(false);
    setImageBase64(null);
    setDescription('');
    setFileName('Nenhum arquivo selecionado');
  };

  const handleSubmit = () => {
    if (imageBase64 && description.trim()) {
      onAddImage(imageBase64, description.trim());
      resetForm();
    }
  };

  return (
    <>
      {isMobile ? (
        <IconButton color="primary" onClick={() => setOpen(true)} aria-label="adicionar imagem">
          <AddPhotoAlternateIcon />
        </IconButton>
      ) : (
        <Button 
          variant="contained" 
          startIcon={<AddPhotoAlternateIcon />} 
          onClick={() => setOpen(true)}
        >
          Adicionar Imagem
        </Button>
      )}
      <Dialog open={open} onClose={resetForm} fullWidth maxWidth="xs">
        <DialogTitle>Adicionar Nova Imagem</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/gif"
              style={{ display: 'none' }}
            />

            <Button
              variant="outlined"
              component="span"
              onClick={handleSelectFileClick}
              startIcon={<FileUploadIcon />}
            >
              Selecionar Imagem
            </Button>
            
            <Typography variant="body2" color="text.secondary" noWrap>
              {fileName}
            </Typography>

            <TextField
              margin="dense"
              id="description"
              label="Descrição"
              type="text"
              fullWidth
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetForm}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={!imageBase64}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};