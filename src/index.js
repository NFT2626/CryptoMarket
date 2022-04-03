import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import App from './App.js';

ReactDOM.render(
  <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>
  </React.StrictMode>,
  
  document.querySelector("#root")
);