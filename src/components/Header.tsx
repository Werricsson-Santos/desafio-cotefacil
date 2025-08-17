import { useState, type ReactNode } from 'react';
import { useHeader } from '../contexts/HeaderContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { applicationsData } from '../router';

import { 
  AppBar, Toolbar, Container, Box, IconButton, Drawer, 
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ListAltIcon from '@mui/icons-material/ListAlt';

import { Logo } from './Logo';

const iconMap: { [key: string]: ReactNode } = {
  '/dashboard': <DashboardIcon />,
  '/galeria-de-imagens': <PhotoLibraryIcon />,
  '/lista-de-tarefas': <ListAltIcon />,
};

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title, actions } = useHeader();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };
  
  const currentPath = location.pathname;

  return (
    <>
      <AppBar 
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{ 
          backdropFilter: 'blur(10px)', 
          backgroundColor: 'rgba(18, 18, 20, 0.7)',
          top: 0, 
        }}
      >
        <Container maxWidth={false} sx={{ px: { xs: 2, lg: 3 } }}>
          <Toolbar disableGutters sx={{ paddingY: { xs: 1, sm: 2 } }}>
            <Logo />

            <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 3 }}>
              {title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
              {actions}
            </Box>

            <IconButton
              aria-label="open drawer"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{
                ml: 2,
                color: '#66bb6a',
              }}
            >
              <MenuIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            {applicationsData.map((app) => (
              <ListItem key={app.name} disablePadding>
                <ListItemButton 
                  onClick={() => handleNavigation(app.path)}
                  selected={currentPath === app.path}
                >
                  <ListItemIcon>{iconMap[app.path] || <ListAltIcon />}</ListItemIcon>
                  <ListItemText primary={app.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}