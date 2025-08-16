// src/pages/Home/styles.ts
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HomeContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundImage: `radial-gradient(circle at top, ${alpha(theme.palette.background.paper, 0.3)}, transparent), radial-gradient(circle at bottom, ${theme.palette.primary.dark}, transparent)`,

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));