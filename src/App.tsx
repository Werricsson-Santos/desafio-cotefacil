import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material"
import { darkTheme } from "./styles/theme";
import { globalStyles } from "./styles/globalStyles";
import { AppRouter } from "./router";

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <GlobalStyles styles={globalStyles} />
      
      <AppRouter />
    </ThemeProvider>
  )
}