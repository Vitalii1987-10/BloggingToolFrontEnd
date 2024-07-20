import { createTheme } from '@mui/material/styles';

interface ButtonTheme {
  main: string;
  hoverColor: string;
  borderColor: string;
  text: string;
}

interface AreaTheme {
  main: string;
  borderColor: string;
  text: string;
}

interface CustomPalette {

  navbar: {
    main: string;
    hover: string;
    borderColor: string;
    text: string;
    selectedText: string;
  };

  mainContentArea: AreaTheme;
  card: AreaTheme;

  createNewBlogButton: ButtonTheme;
  createNewArticleButton: ButtonTheme;
  toArticlesButton: ButtonTheme;
  editButton: ButtonTheme;
  deleteButton: ButtonTheme;
  publishButton: ButtonTheme
  unpublishButton: ButtonTheme;
  openButton: ButtonTheme;
  submitCommentButton: ButtonTheme;
  likeButton: ButtonTheme;
  saveButton: ButtonTheme;
  backButton: ButtonTheme;
  shareButton: ButtonTheme;
}

// Extend the Palette interface
declare module '@mui/material/styles' {
  interface Palette extends CustomPalette {}

  interface PaletteOptions extends Partial<CustomPalette> {}
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
    },

    card: {
      main: "#FFFFFF",
      borderColor: "#E0E0E0",
      text: "#333333"
    },
    
    createNewBlogButton : {
      main: "#4CAF50",
      hoverColor: "#388E3C",
      borderColor: "#388E3C",
      text: "#FFFFFF"
    },

    createNewArticleButton : {
      main: "#4CAF50",
      hoverColor: "#388E3C",
      borderColor: "#388E3C",
      text: "#FFFFFF"
    },

    toArticlesButton : {
      main: "#0288D1",
      hoverColor: "#01579B",
      borderColor: "#0277BD",
      text: "#FFFFFF"
    },

    editButton: {
      main: "#FFA000",
      hoverColor: "#FF6F00",
      borderColor: "#FB8C00",
      text: "#FFFFFF"
    },

    deleteButton: {
      main: "#F44336",
      hoverColor: "#C62828",
      borderColor: "#D32F2F",
      text: "#FFFFFF"
    },

    publishButton: {
      main: "#4CAF50",
      hoverColor: "#388E3C",
      borderColor: "#388E3C",
      text: "#FFFFFF"
    },

    unpublishButton: {
      main: "#F44336",
      hoverColor: "#C62828",
      borderColor: "#D32F2F",
      text: "#FFFFFF"
    },

    openButton: {
      main: "#1976D2",
      hoverColor: "#0D47A1",
      borderColor: "#1565C0",
      text: "#FFFFFF"
    },

    submitCommentButton: {
      main: "#7B1FA2",
      hoverColor: "#4A148C",
      borderColor: "#6A1B9A",
      text: "#FFFFFF"
    },

    likeButton: {
      main: "#E91E63",
      hoverColor: "#AD1457",
      borderColor: "#C2185B",
      text: "#FFFFFF"
    },

    saveButton: {
      main: "#2196F3",
      hoverColor: "#1976D2",
      borderColor: "#1976D2",
      text: "#FFFFFF"
    },

    backButton: {
      main: "#757575",
      hoverColor: "#424242",
      borderColor: "#616161",
      text: "#FFFFFF"
    },

    shareButton: {
      main: "#4CAF50",
      hoverColor: "#388E3C",
      borderColor: "#388E3C",
      text: "#FFFFFF"
    },

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
    },

    card: {
      main: "#2C2C2C",
      borderColor: "#424242",
      text: "#E0E0E0"
    },
 
    createNewBlogButton : {
      main: "#388E3C",
      hoverColor: "#2E7D32",
      borderColor: "#2E7D32",
      text: "#E0E0E0"
    },

    createNewArticleButton : {
      main: "#388E3C",
      hoverColor: "#2E7D32",
      borderColor: "#2E7D32",
      text: "#E0E0E0"
    },

    toArticlesButton : {
      main: "#0277BD",
      hoverColor: "#01579B",
      borderColor: "#01579B",
      text: "#E0E0E0"
    },

    editButton: {
      main: "#FFA000",
      hoverColor: "#FF6F00",
      borderColor: "#FF6F00",
      text: "#E0E0E0"
    },

    deleteButton: {
      main: "#C62828",
      hoverColor: "#B71C1C",
      borderColor: "#B71C1C",
      text: "#E0E0E0"
    },

    publishButton: {
      main: "#388E3C",
      hoverColor: "#2E7D32",
      borderColor: "#2E7D32",
      text: "#E0E0E0"
    },

    unpublishButton: {
      main: "#C62828",
      hoverColor: "#B71C1C",
      borderColor: "#B71C1C",
      text: "#E0E0E0"
    },

    openButton: {
      main: "#3F51B5",
      hoverColor: "#303F9F",
      borderColor: "#303F9F",
      text: "#E0E0E0"
    },

    submitCommentButton: {
      main: "#6A1B9A",
      hoverColor: "#4A148C",
      borderColor: "#4A148C",
      text: "#E0E0E0"
    },

    likeButton: {
      main: "#AD1457",
      hoverColor: "#880E4F",
      borderColor: "#880E4F",
      text: "#E0E0E0"
    },

    saveButton: {
      main: "#1976D2",
      hoverColor: "#1565C0",
      borderColor: "#1565C0",
      text: "#E0E0E0"
    },

    backButton: {
      main: "#616161",
      hoverColor: "#424242",
      borderColor: "#424242",
      text: "#E0E0E0"
    },

    shareButton: {
      main: "#388E3C",
      hoverColor: "#2E7D32",
      borderColor: "#2E7D32",
      text: "#E0E0E0"
    },
  },
});

export { lightTheme, darkTheme };
