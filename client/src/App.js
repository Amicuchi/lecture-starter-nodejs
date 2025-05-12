import React from 'react';
import StartScreen from './components/startScreen';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme();

function App() {

  return (
    <ThemeProvider theme={theme}>
      <StartScreen />
    </ThemeProvider>
  );
}

export default App;
