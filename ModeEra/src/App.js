import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import Tools from './pages/Tools';
import About from './pages/About';
import FAQ from './pages/FAQ';
import BackgroundRemover from './pages/tools/BackgroundRemover';
import ImageEnhancer from './pages/tools/ImageEnhancer';
import FormatConverter from './pages/tools/FormatConverter';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/tools/background-remover" element={<BackgroundRemover />} />
          <Route path="/tools/image-enhancer" element={<ImageEnhancer />} />
          <Route path="/tools/format-converter" element={<FormatConverter />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App; 