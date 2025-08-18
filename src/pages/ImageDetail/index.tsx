import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Box, CircularProgress, Typography, Button, Link, useTheme, useMediaQuery, IconButton } from '@mui/material';
import { useHeader } from '../../contexts/HeaderContext';
import * as imageService from '../../services/imageService';
import { type Image } from '../../types/gallery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ImageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setTitle, setActions } = useHeader();
  const [image, setImage] = useState<Image | null>(null);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  useEffect(() => {
    if (id) {
      const fetchImage = async () => {
        setLoading(true);
        const fetchedImage = await imageService.getImageById(id);
        setImage(fetchedImage);
        setLoading(false);
      };
      fetchImage();
    }
  }, [id]);

  useEffect(() => {
    setTitle(image ? `Detalhes` : 'Carregando...');
    setActions(
            isMobile ? (
                <IconButton 
                    component={RouterLink} 
                    to="/galeria-de-imagens"
                    aria-label="Voltar para a galeria"
                >
                    <ArrowBackIcon color='primary' />
                </IconButton>
            ) : (
                <Button
                    component={RouterLink}
                    to="/galeria-de-imagens"
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                >
                    Voltar
                </Button>
            )
        );
    return () => {
      setTitle('Página Inicial');
      setActions(null);
    };
  }, [setTitle, setActions, image, isMobile]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
  }

  if (!image) {
    return <Typography>Imagem não encontrada.</Typography>;
  }

  const imageUrl = image.isLocal ? image.urls.raw : image.urls.regular;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box 
        component="img" 
        src={imageUrl} 
        alt={image.alt_description}
        sx={{ width: '100%', borderRadius: 2, mb: 2 }}
      />
      <Typography variant="h5" gutterBottom>
        {image.alt_description || "Imagem sem descrição"}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Fotógrafo: <Link href={image.user.links.html} target="_blank">{image.user.name}</Link>
      </Typography>
    </Container>
  );
};