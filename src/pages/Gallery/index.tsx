// src/pages/Gallery/index.tsx

import { useState, useEffect, useMemo } from 'react';
import { Container, ImageList, Box, CircularProgress, Stack, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { useHeader } from '../../contexts/HeaderContext';
import * as imageService from '../../services/imageService';
import { type Image } from '../../types/gallery';
import { ImageCard } from '../../components/Gallery/ImageCard';
import { SearchBar } from '../../components/Gallery/SearchBar';
import { AddImageForm } from '../../components/Gallery/AddImageForm';

type FilterType = 'all' | 'local';

export const Gallery: React.FC = () => {
  const { setTitle, setActions } = useHeader();
  const [apiImages, setApiImages] = useState<Image[]>([]);
  const [localImages, setLocalImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const fetchInitialImages = async () => {
      setLoading(true);
      const [fetchedApiImages, fetchedLocalImages] = await Promise.all([
        imageService.getImages(),
        imageService.getLocalImages()
      ]);
      setApiImages(fetchedApiImages);
      setLocalImages(fetchedLocalImages);
      setLoading(false);
    };
    fetchInitialImages();
  }, []);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      // Se a busca foi limpa, recarrega as imagens iniciais da API
      const initialApiImages = await imageService.getImages();
      setApiImages(initialApiImages);
      setSearchActive(false); // Desativa o modo de busca
    } else {
      // Se há uma busca, pesquisa na API
      const searchedImages = await imageService.searchImages(trimmedQuery);
      setApiImages(searchedImages);
      setSearchActive(true); // Ativa o modo de busca
    }
    setLoading(false);
  };
  
  const handleAddImage = (url: string, description: string) => {
    const newLocalImages = imageService.addLocalImage(url, description);
    setLocalImages(newLocalImages);
  };

  const handleDeleteImage = (id: string) => {
    const newLocalImages = imageService.deleteLocalImage(id);
    setLocalImages(newLocalImages);
  };

  useEffect(() => {
    setTitle('Galeria');
    setActions(
      <Stack direction="row" spacing={2} alignItems="center">
        <SearchBar onSearch={handleSearch} />
        <AddImageForm onAddImage={handleAddImage} />
      </Stack>
    );
    return () => {
      setTitle('Página Inicial');
      setActions(null);
    };
  }, [setTitle, setActions]);

  const displayedImages = useMemo(() => {
    // Se uma busca está ativa, mostramos APENAS os resultados da API (apiImages)
    if (searchActive) {
      return apiImages;
    }
    // Caso contrário, a lógica de filtro funciona normalmente
    return filter === 'all' ? [...localImages, ...apiImages] : localImages;
  }, [filter, localImages, apiImages, searchActive]);

  const isLocalFilterEmpty = filter === 'local' && localImages.length === 0;

  const isFilterDisabled = searchActive || loading;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Botões de Filtro */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          disabled={isFilterDisabled}
          onChange={(_, newFilter) => newFilter && setFilter(newFilter)}
          aria-label="image filter"
        >
          <ToggleButton value="all" aria-label="all photos">Todas as Fotos</ToggleButton>
          <ToggleButton value="local" aria-label="my photos">Minhas Fotos</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
      ) : (
        <>
          {isLocalFilterEmpty ? (
            // Se o filtro "Minhas Fotos" estiver ativo e vazio, mostra a mensagem para adicionar.
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" gutterBottom>
                Sua galeria pessoal está vazia.
              </Typography>
              <Typography color="text.secondary">
                Adicione sua primeira imagem para vê-la aqui.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <AddImageForm onAddImage={handleAddImage} />
              </Box>
            </Box>
          ) : (
            <ImageList variant="masonry" cols={3} gap={8}>
              {displayedImages.map((image) => (
                <ImageCard 
                  key={image.id} 
                  image={image} 
                  onDelete={image.isLocal ? handleDeleteImage : undefined}
                />
              ))}
            </ImageList>
          )}
        </>
      )}
    </Container>
  );
};