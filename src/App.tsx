import { CssBaseline, ThemeProvider } from "@mui/material"
import { HeaderProvider } from './contexts/HeaderContext';
import { darkTheme } from "./styles/theme";
import { AppRouter } from "./router";

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <HeaderProvider>
        <AppRouter />
      </HeaderProvider>
    </ThemeProvider>
  )
}