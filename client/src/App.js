import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './scenes/LoginPage';
import HomePage from './scenes/HomePage';
import ProfilePage from './scenes/ProfilePage';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';
import Navbar from './scenes/Navbar';

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/profile/:userId' element={<ProfilePage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
