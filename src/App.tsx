import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChangeUser from './pages/ChangeUser';
import Author from './pages/Author';
import Reader from './pages/Reader';
import { lightTheme, darkTheme } from './theme';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';

function App() {

  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar toggleTheme={toggleTheme}/>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/change-user" element={<ChangeUser />} />
            <Route path="/author" element={<Author />} />
            <Route path="/reader" element={<Reader />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
