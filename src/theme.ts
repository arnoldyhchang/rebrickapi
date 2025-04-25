import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
export const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: '#037cbf',
      dark: '#050539',
      light: '#00A2E3',
    },
    secondary: {
      main: '#d9d9dc',
      dark: '#4d556b',
    },
    background: {
      default: '#d9d9dc',
      paper: '#edeeef', // page content background
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: 'blue', // 👈 input text color
          },
          '& .MuiInputLabel-root': {
            color: 'gray', // 👈 label color
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1em',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Applies to all variants (standard, outlined, filled)
        root: {
          color: '#555', // default label color
          fontSize: '1rem', // default font size
          '&.Mui-focused': {
            color: '#1976d2', // color when input is focused
          },
          '&.Mui-error': {
            color: '#d32f2f', // color when in error state
          },
        },
        // If you want variant-specific tweaks:
        // outlined: { /* styles for outlined variant */ },
        // filled:   { /* styles for filled variant   */ },
        // standard:{ /* styles for standard variant*/ },
      },
    },
  },
});
