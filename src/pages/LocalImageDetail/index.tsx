import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import { useHeader } from '../../contexts/HeaderContext';
import * as imageService from '../../services/imageService';
import { type Image } from '../../types/gallery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const LocalImageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setTitle, setActions } = useHeader();
  const [image, setImage] = useState<Image | null>(null);

  useEffect(() => {
    if (id) {
      const foundImage = imageService.getLocalImageById(id);
      setImage(foundImage || null);
    }
  }, [id]);

  useEffect(() => {
    setTitle(image ? `Minha Foto` : 'Foto não encontrada');
    setActions(
      <Button
        component={RouterLink}
        to="/galeria-de-imagens"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
      >
        Voltar para a Galeria
      </Button>
    );
    return () => {
      setTitle('Página Inicial');
      setActions(null);
    };
  }, [setTitle, setActions, image]);

  if (!image) {
    return <Typography sx={{ p: 4 }}>Imagem não encontrada.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
      <Box 
        component="img" 
        src={image.urls.regular} 
        alt={image.alt_description}
        sx={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 2, mb: 2 }}
      />
      <Typography variant="h5" gutterBottom>
        {image.alt_description}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Adicionado por: {image.user?.name}
      </Typography>
    </Container>
  );
};