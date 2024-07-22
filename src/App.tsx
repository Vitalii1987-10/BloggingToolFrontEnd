import React, {  useState } from "react";
import './App.css';
import Navbar from './components/Navbar';
import ChangeUserPage from './pages/ChangeUserPage';
import AuthorBlogsDashboardPage from './pages/Author/AuthorBlogsDashboardPage';
import AuthorCreateNewBlogPage from './pages/Author/AuthorCreateNewBlogPage';
import CreateNewArticlePage from "./pages/Author/AuthorCreateNewArticle";
import AuthorEditBlogPage from './pages/Author/AuthorEditBlogPage';
import AuthorArticlesDashboardPage from './pages/Author/AuthorArticlesDashboardPage'; 
import AuthorEditArticlePage from './pages/Author/AuthorEditArticlePage';
import ReaderBlogsDashboard from './pages/Reader/ReaderBlogsDashboard';
import ReaderArticlesDashdoard from "./pages/Reader/ReaderArticlesDashdoard";
import ReaderArticle from "./pages/Reader/ReaderArticle";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lightTheme, darkTheme } from './theme';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPage } from './redux/pageSlice'; // Assuming your pageSlice is located in './redux/pageSlice'

function App() {

  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>(() => {
    const storedTheme = localStorage.getItem('themeMode');
    return storedTheme ? (storedTheme as 'light' | 'dark') : 'light'; 
  });

  const [emailAccountId, setEmailAccountId] = useState<number | null>(null);

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

  const [isLogged, setIsLogged] = React.useState(() => {
    return localStorage.getItem('isLogged') === 'true';
  });

  const toggleLoggin = () => {
    const storedIsLogged = localStorage.getItem('isLogged');
    if (storedIsLogged) {
      setIsLogged(storedIsLogged === 'true');
    } else {
      setIsLogged(storedIsLogged === 'false');
    }
  }

  const toggleUser = (user: number) => {
    setEmailAccountId(user)
    toggleLoggin();
  }

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
      {isLogged && <Navbar emailAccountId={emailAccountId} toggleTheme={toggleTheme} toggleLoggin={toggleLoggin} />} 
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<ChangeUserPage toggleUser={toggleUser} />} />
            <Route path="/author/:emailAccountId/blogs" element={<AuthorBlogsDashboardPage />} />
            <Route path="/author/:emailAccountId/create-new-blog" element={<AuthorCreateNewBlogPage />} />
            <Route path="/author/:emailAccountId/blog/:blogId/create-new-article" element={<CreateNewArticlePage />} />
            <Route path="/author/:emailAccountId/blog/:blogId/edit" element={<AuthorEditBlogPage />} />
            <Route path="/author/:emailAccountId/blog/:blogId/articles" element={<AuthorArticlesDashboardPage />} />
            <Route path="/author/:emailAccountId/blog/:blogId/article/:articleId/edit" element={<AuthorEditArticlePage />} />
            <Route path="/reader/:emailAccountId/blogs" element={<ReaderBlogsDashboard />} />
            <Route path="/reader/:emailAccountId/blog/:blogId/articles" element={<ReaderArticlesDashdoard />} />
            <Route path="/reader/:emailAccountId/blog/:blogId/article/:articleId" element={<ReaderArticle />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;

