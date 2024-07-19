import * as React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ChangeUser from './pages/ChangeUser';
import Author from './pages/Author/AuthorAllBlogs';
import CreateNewBlogPage from './pages/Author/AuthorCreateNewBlogPage';
import EditBlogPage from './pages/Author/AuthorEditBlogPage';
import Reader from './pages/Reader';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPage } from './redux/pageSlice'; // Assuming your pageSlice is located in './redux/pageSlice'

function App() {

  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('themeMode');
    return storedTheme ? (storedTheme as 'light' | 'dark') : 'light'; 
  });

  const toggleTheme = () => {
    const newThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    localStorage.setItem('themeMode', newThemeMode);
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    const storedPage = localStorage.getItem('selectedPage');
    if (storedPage) {
      dispatch(setPage(storedPage));
    }
  }, [dispatch]);


  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <Navbar toggleTheme={toggleTheme} />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<ChangeUser />} />
            {/* <Route path="/author" element={<Author />} /> */}
            <Route path="/author/:emailAccountId/blogs" element={<Author />} />
            <Route path="/reader" element={<Reader />} />
            <Route path="/author/:emailAccountId/create-new-blog" element={<CreateNewBlogPage />} />
            <Route path="/author/:emailAccountId/blog/:blogId/edit" element={<EditBlogPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
