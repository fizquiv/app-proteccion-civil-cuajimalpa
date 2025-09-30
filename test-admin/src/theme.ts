import { createTheme } from '@mui/material/styles';

// Simple theme with just top bar styling
const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f', // Emergency red
      dark: '#b71c1c',
    },
    background: {
      default: '#56aaffff',   // page background
      paper: '#ffffff',     // cards / Paper background
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a202c',
          background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#2e69a3ff', // Same as background.default
        },
      },
    },
  },
});

export default theme;