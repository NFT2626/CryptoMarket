import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './demo';

ReactDOM.render(
  <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <Demo />
  </StyledEngineProvider>
  </React.StrictMode>,
  
  document.querySelector("#root")
);