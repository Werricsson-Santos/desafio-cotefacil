// src/components/Header/index.tsx
import { AppBar, Toolbar, Container, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { applicationsData } from '../router'

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const path = event.target.value;
    if (path) {
      navigate(path);
    }
  };

  const currentPath = location.pathname;
  const isApplicationSelected = applicationsData.some(app => app.path === currentPath);

  return (
    <AppBar 
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{ backdropFilter: 'blur(10px)' }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ 
          paddingY: { xs: 1, sm: 2 },
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Logo />

          <Select
            value={isApplicationSelected ? currentPath : ''}
            onChange={handleSelectChange}
            displayEmpty
            variant="outlined"
            sx={{
              minWidth: 220,
              color: 'text.secondary',
              bgcolor: 'rgba(32, 32, 36, 0.7)',
              borderRadius: 2,
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
              '& .MuiSelect-icon': {
                color: 'text.secondary',
              },
            }}
          >
            {/* Placeholder quando nenhuma opção está selecionada */}
            <MenuItem value="" disabled>
              <em>Selecione uma aplicação</em>
            </MenuItem>
            
            {/* Mapeia nossos dados para criar as opções */}
            {applicationsData.map((app) => (
              <MenuItem key={app.path} value={app.path}>
                {app.name}
              </MenuItem>
            ))}
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
}