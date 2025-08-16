import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const LogoLink = styled(Link)({
  display: 'inline-flex',
  textDecoration: 'none',
});

export const LogoBackground = styled('div')(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: theme.transitions.create('box-shadow', {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    boxShadow: `0 4px 20px -5px ${alpha(theme.palette.primary.main, 0.7)}`,
  },
}));

export const LogoImage = styled('img')({
  height: 32, 
  width: 'auto',
});