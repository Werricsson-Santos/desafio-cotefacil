
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';


export const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),

  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(8),
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(36),

  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(56),
  },
}));


export const Subtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2),
  maxWidth: '600px',
  fontSize: theme.typography.pxToRem(16),


  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.pxToRem(20),
  },
}));