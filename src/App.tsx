import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import { CPTCodesManager } from './CPTCodesManager';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <a href="https://healthcare.utah.edu/" target="_blank" rel="noreferrer">
          <img
            src="https://healthcare.utah.edu/themes/custom/theme_uou_clinical/logo.svg"
            className="logo uhealth"
            alt="UHealth logo"
          />
        </a>
      </div>
      <h1>UMB React Project</h1>
      <CPTCodesManager />
    </ThemeProvider>
  );
}

export default App;
