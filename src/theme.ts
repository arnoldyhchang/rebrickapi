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
  },
});
