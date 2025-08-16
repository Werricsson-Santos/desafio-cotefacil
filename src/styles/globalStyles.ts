import type { Theme } from "@mui/material/styles";

export const globalStyles = (theme: Theme) => ({
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
});