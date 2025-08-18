import { Link } from 'react-router-dom';
import { ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { type Image } from '../../types/gallery';

interface ImageCardProps {
  image: Image;
  onDelete?: (id: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onDelete }) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (onDelete) {
      onDelete(image.id);
    }
  };

  const detailPath = image.isLocal 
    ? `/minhas-fotos/${image.id}` 
    : `/galeria-de-imagens/${image.id}`;

  return (
    <ImageListItem
      component={Link}
      to={detailPath}
      sx={{
        borderRadius: '8px',
        overflow: 'hidden',
        '&:hover': {
          '& .MuiImageListItemBar-root': {
            opacity: 1,
          },
        }
      }}>
      {image.isLocal && onDelete && (
        <IconButton
          aria-label="delete image"
          onClick={handleDelete}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(255, 0, 0, 0.7)',
            }
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      )}
      <img
        src={image.urls.small}
        alt={image.alt_description}
        loading="lazy"
        style={{ display: 'block', width: '100%', height: 'auto' }}
      />
      <ImageListItemBar
        sx={{
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        title={image.alt_description}
        subtitle={<span>by: {image.user.name}</span>}
        actionIcon={
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${image.alt_description}`}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};