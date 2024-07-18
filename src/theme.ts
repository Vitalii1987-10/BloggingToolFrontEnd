import { createTheme } from '@mui/material/styles';

// Extend the Palette interface
declare module '@mui/material/styles' {
  interface Palette {
    navbar: {
      main: string;
      hover: string;
      borderColor: string
      text: string;
      selectedText: string;
    };

    mainContentArea: {
      main: string,
      borderColor: string,
      text: string
    }
  }

  interface PaletteOptions {
    navbar?: {
      main: string;
      hover: string;
      borderColor: string,
      text: string;
      selectedText: string;
    };

    mainContentArea?: {
      main: string,
      borderColor: string,
      text: string
    }
  }
}

// Light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff', 
    },
    navbar: {
      main: '#1976D2',
      hover: '#1565C0',
      borderColor: "#1565C0",
      text: '#FFFFFF',
      selectedText: "yellow"
    },
    mainContentArea: {
      main: "#E1E6FA",
      borderColor: "#C5CAE9",
      text: "#333333"
    }
  },
});

// Dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212', 
    },
    navbar: {
      main: '#212121',
      hover: '#424242',
      borderColor: "424242",
      text: '#E0E0E0',
      selectedText: "yellow"
    },
    mainContentArea: {
      main: "#1E1E1E",
      borderColor: "#424242",
      text: "#333333"
    }
  },
});

export { lightTheme, darkTheme };
