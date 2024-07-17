import { createTheme } from '@mui/material/styles';

// Extend the Palette interface
declare module '@mui/material/styles' {
  interface Palette {
    navbar: {
      main: string;
      hover: string;
      border: string;
      text: string;
    };
  }

  interface PaletteOptions {
    navbar?: {
      main: string;
      hover: string;
      border: string;
      text: string;
    };
  }
}

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // example primary color
    },
    background: {
      default: '#ffffff', // light background color
      paper: '#f0f0f0', // light paper color (optional)
    },
    navbar: {
      main: '#1976D2',
      hover: '#1565C0',
      border: '#1565C0',
      text: '#FFFFFF',
    },
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // example primary color
    },
    background: {
      default: '#303030', // dark background color
      paper: '#424242', // dark paper color (optional)
    },
    navbar: {
      main: '#212121',
      hover: '#424242',
      border: '#424242',
      text: '#E0E0E0',
    },
  },
});

export { lightTheme, darkTheme };
