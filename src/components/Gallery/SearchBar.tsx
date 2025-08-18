import { useState } from 'react';
import { Box, TextField, IconButton, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isExpanded, setIsExpanded] = useState(!isMobile);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  if (isMobile && !isExpanded) {
    return (
      <IconButton color="inherit" onClick={() => setIsExpanded(true)} aria-label="open search bar">
        <SearchIcon />
      </IconButton>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', width: 300 }}>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        placeholder="Buscar imagens..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
};