import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { Header } from '../Header';

export function RootLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Toolbar />

      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      > 
        <Outlet />
      </Box>
    </Box>
  );
}