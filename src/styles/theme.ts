import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121214',
      paper: '#202024',
    },
    text: {
      primary: '#E1E1E6',
      secondary: '#A8A8B3',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          backgroundColor: theme.palette.background.paper, 
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.text.secondary,
          borderRadius: '4px'
        },
        '*::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme.palette.primary.main,
        },
        'body': {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        'button, a': {
          transition: 'all 0.2s ease-in-out'
        }
      })
    }
  }
});