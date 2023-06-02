
import './App.css';
import Auth from './components/auth/Auth';
import { useState, useEffect } from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Coaches from './components/coaches/Coaches';
import Home from './components/home/Home';
import News from './components/news/News';

import PlayerPage from './components/players/PlayerPage';

import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import TemporaryDrawer from './components/layout/TemporaryDrawer';

//IconButton is a Material-UI component that represents a button element that can contain an icon. It can be used to create clickable icons that trigger certain actions.

//Switch is another Material-UI component that represents a toggle switch that can be turned on or off. It can be used to create a switch that toggles between two states.
import { IconButton, Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';


function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      // (mode)determines whether the theme is in light or dark mode, based on the mode state variable defined in the App.jsx file. If mode is set to 'light', then the background color for the paper element (usually used for cards and other components) is set to #ffffff, which is white. If mode is set to 'dark', then the background color for the paper element is set to #424242, which is a dark gray.
      mode: mode,
      //primary: sets the color of the primary elements in the application, like the app bar and buttons. In this case, the color is set to #000000, which is black
      primary: {
        main: '#000000',
      },
      secondary: {
        main: '#800000', // Set the secondary color to maroon
      },

    //background property is used to define the background color of different components, such as Paper, Card, Modal,
    //If the mode state variable is equal to 'light', the background color of the Paper component will be set to #ffffff (white), otherwise, it will be set to #424242 (dark gray).

      background: {
        paper: mode === 'light' ? '#ffffff' : '#424242',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
        secondary: mode === 'dark' ? '#ffffff' : '#000000',
    },
     
    },
    typography: {
      h2: {
        fontFamily: 'Droid Serif',
        letterSpacing: '0.08em',
      },
      h6: {
        fontFamily: 'Droid Serif',
      },
      fontFamily: 'Source Sans Pro',
      h5: {
        fontFamily: 'Droid Serif',
      },
      h4: {
        fontFamily: 'Droid Serif',
      },
      h1: {
        fontFamily: 'Droid Serif',
      },
      h3: {
        fontFamily: 'Droid Serif',
      },
    },
  });
  
  const [sessionToken, setSessionToken] = useState('');

  console.log("App.jsx:", sessionToken);

  const updateToken = (newToken) => {
    console.log("updateToken called with newToken:", newToken);
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("useEffect storedToken:", storedToken);
    if (storedToken) {
      setSessionToken(storedToken);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <nav>
        <TemporaryDrawer sessionToken={sessionToken} onLogout={setSessionToken} />
        {/* This adds a button with a sun/moon icon that toggles between light and dark mode. When clicked, it calls the toggleMode function, which updates the mode state variable with the opposite mode value. */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="mode switch"
          onClick={toggleMode}
        >
          <Brightness4Icon />
          <Switch checked={mode === 'dark'} />
        </IconButton>
      </nav>

      <Routes>
        <Route path="/" element={<Auth updateToken={updateToken} />} />

        <Route path="/home" element={<Home token={sessionToken}/>} />

        <Route path="/coaches" element={<Coaches mode={mode} token={sessionToken} />} />


      

        <Route path="/add-player" element={<PlayerPage token={sessionToken} title={"New Player"} method={'POST'} />} />

<Route path="/edit-player/:id" element={<PlayerPage token={sessionToken} title={"Edit Player"} method={'PUT'} />} />

        <Route path="/dashboard" element={<Dashboard token={sessionToken}/>} />

        <Route path="/news" element={<News token={sessionToken} />} />


      </Routes>
    </div>
  </ThemeProvider>
);
}

export default App;

